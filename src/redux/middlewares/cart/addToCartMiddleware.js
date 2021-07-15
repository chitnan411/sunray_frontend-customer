import axios from 'axios'
import Cookies from "js-cookie";
import {apiRootUrl, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../../utils/constants.js";
import {addToCartRequest, addToCartRequestFailure, addToCartRequestSuccess} from "../../actions/ssCartActions.js"

const requestForAddItemToCart = (requestedPayload) => {
    return async function (dispatch) {
        dispatch(addToCartRequest())
        return await axios.post(`${apiRootUrl}/v2/admin/cart`, {...requestedPayload},{withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
            .then((response) => {
                if(response.data){
                    if(response.data.confirmation){
                        if(response.data.confirmation.message){
                            if (response.data.confirmation.statusCode === 200) {
                                return (dispatch(addToCartRequestSuccess(response.data.confirmation)))
                            }
                        }
                    }
                }
            })
            .catch((error) => {
                if(error.toString().includes('Network Error')){
                    const errorData = {code: 503, message: "Network Error"}
                    return (dispatch(addToCartRequestFailure(errorData)))
                }else {
                    if(error.response) {
                        if (error.response.data) {
                            if(error.response.data.code === 401){
                                Cookies.remove(ssClientAuthCookieKey)
                                Cookies.set(ssClientAuthFlagCookieKey, false)
                            }
                            if(error.response.data.code === 400){
                                return (dispatch(addToCartRequestFailure(error.response.data)))
                            }
                            if(error.response.data.code === 409){
                                if(error.response.data.message === "Record already exist"){
                                    const errorData = {code:409, message: `${requestedPayload.categoryName} is already exists.`}
                                    return (dispatch(addToCartRequestFailure(errorData)))
                                }
                            }
                        }
                    }
                }
            })
    }
}
export default requestForAddItemToCart;
