import axios from 'axios'
import Cookies from "js-cookie";
import {toast} from "react-hot-toast";
import {apiRootUrl, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../../utils/constants.js";
import {signOutRequest} from "../../actions/auth/ssLoginActions.js";
import {deleteAllFromCart, deleteFromCart, emptyCart} from "../../actions/cartActions.js";

import {
    deleteFromCartRequest,
    deleteFromCartRequestFailure,
    deleteFromCartRequestSuccess,
    emptyUserCartRequest,
    removeItemFromUserState, sendEmptyUserCartRequest, sendEmptyUserCartRequestFailure, sendEmptyUserCartRequestSuccess
} from "../../actions/ssCartActions.js"

const requestForDeleteUserCartItems = (requestedPayload) => {
    return async function (dispatch) {

        let requestMethod = () => {}
        let requestMethodSuccess = () => {}
        let requestMethodFailure = () => {}
        let payloadForDelete = {}
        let cartItem = requestedPayload.data
        if(requestedPayload.multiple === false){
            requestMethod = () => dispatch(deleteFromCartRequest())
            requestMethodSuccess = (data) => dispatch(deleteFromCartRequestSuccess(data))
            requestMethodFailure = (data) => dispatch(deleteFromCartRequestFailure(data))
            if ("productName" in cartItem) payloadForDelete = {product: cartItem._id}
            if ("comboName" in cartItem) payloadForDelete = {combo: cartItem._id}
        }
        if(requestedPayload.multiple === true){
            requestMethod = () => dispatch(sendEmptyUserCartRequest())
            requestMethodSuccess = (data) => dispatch(sendEmptyUserCartRequestSuccess(data))
            requestMethodFailure = (data) => dispatch(sendEmptyUserCartRequestFailure(data))
            payloadForDelete = {
                all: true
            }
        }

        dispatch(requestMethod())
        return await axios.delete(`${apiRootUrl}/v2/admin/cart`, {withCredentials: true,
            headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`},
            data: {...payloadForDelete}})
            .then(async (response) => {
                if(response.data){
                    if(response.data.confirmation){
                        if(response.data.confirmation.message){
                            if (response.data.confirmation.statusCode === 200) {
                                if(requestedPayload.multiple === false){
                                    // alert("delete success")
                                    // alert("delete response sent to user")
                                    await dispatch(deleteFromCart(cartItem, undefined))
                                    await dispatch(removeItemFromUserState(requestedPayload))
                                    return (dispatch(requestMethodSuccess(response.data.confirmation)))
                                }
                                if(requestedPayload.multiple === true){
                                    await dispatch(deleteAllFromCart(undefined))
                                    await dispatch(emptyUserCartRequest())
                                    return (dispatch(requestMethodSuccess(response.data.confirmation)))
                                }
                            }
                        }
                    }
                }
            })
            .catch((error) => {
                if(error.toString().includes('Network Error')){
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(requestMethodFailure(errorData)))
                }else {
                    if(error.response) {
                        if (error.response.data) {
                            if(error.response.data.code === 401){

                                Cookies.remove(ssClientAuthCookieKey)
                                Cookies.set(ssClientAuthFlagCookieKey, false)
                                dispatch(emptyUserCartRequest())
                                dispatch(emptyCart())
                                localStorage.removeItem("couponData")
                                dispatch(signOutRequest())

                                toast.error(`Session Expired! Try again.`,{
                                    style:{
                                        marginBottom: "40px"
                                    }
                                })
                            }
                            if(error.response.data.code === 400){
                                return (dispatch(requestMethodFailure(error.response.data)))

                                toast.error(error.response.data.message,{
                                    style:{
                                        marginBottom: "40px"
                                    }
                                })

                            }
                            if(error.response.data.code === 409){

                                return (dispatch(requestMethodFailure(error.response.data)))

                                toast.error(error.response.data.message,{
                                    style:{
                                        marginBottom: "40px"
                                    }
                                })
                            }
                        }
                    }
                }
            })
    }
}
export default requestForDeleteUserCartItems;
