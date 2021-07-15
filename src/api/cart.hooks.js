import axios from "axios";
import Cookies from "js-cookie";
import {useCallback, useEffect, useRef, useState} from "react";
import {unstable_batchedUpdates} from "react-dom";
import {toast} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {emptyCart} from "../redux/actions/cartActions.js";
import {emptyUserCartRequest} from "../redux/actions/ssCartActions.js";
import {apiRootUrl, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../utils/constants.js";
import {history} from "../utils/history.js";

export function useCartManager() {

    // add to cart
    const [addToCartRequestPending,setAddToCartRequestPending] = useState(false)
    const [addToCartSuccess,setAddToCartSuccess] = useState(false)
    const [addToCartFailure,setAddToCartFailure] = useState(false)
    const [addToCartFailurePayload,setAddToCartFailurePayload] = useState({})
    const [addToCartSuccessPayload,setAddToCartSuccessPayload] = useState({})
    const [payloadItemId, setItemId] = useState()

    const dispatch = useDispatch()

    /*useEffect(() => {},[
        addToCartRequestPending,
        addToCartSuccess,
        addToCartFailure,
        addToCartSuccessPayload,
        addToCartFailurePayload,
    ])*/

    const unmounted = useRef(false);
    useEffect(() => {
        return () => {
            unmounted.current = true;
        };
    }, []);


    // add item to user cart
    const addItemToCart = useCallback(async (item,quantity) => {

        setItemId(item._id)

        unstable_batchedUpdates(() => {
            setAddToCartRequestPending(true)
            setAddToCartFailure(false)
            setAddToCartSuccess(false)
            setAddToCartFailurePayload({})
            setAddToCartSuccessPayload({})
        })
        let requestPayload = {}
        if("productName" in item){
            requestPayload = {
                product: item._id,
                quantity: quantity
            }
        }
        if("comboName" in item){
            requestPayload = {
                combo: item._id,
                quantity: quantity
            }
        }
        await axios.post(`${apiRootUrl}/v2/admin/cart`, {...requestPayload},{withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
            .then((response) => {
                if(response.data){
                    if(response.data.confirmation){
                        if(response.data.confirmation.message){
                            if (response.data.confirmation.statusCode === 200) {
                                const successPayload = {
                                    id: item._id,
                                    ...response.data.confirmation
                                }
                                unstable_batchedUpdates(() => {
                                    setAddToCartRequestPending(false)
                                    setAddToCartSuccess(true)
                                    setAddToCartFailure(false)
                                    setAddToCartSuccessPayload({...successPayload})
                                    setAddToCartFailurePayload({})
                                })
                            }
                        }
                    }
                }
            })
            .catch( (error) => {
                if(error.toString().includes('Network Error')){
                    const errorData = {code: 503, message: "Connection problem! try again later."}
                    unstable_batchedUpdates(() => {
                        !unmounted.current && setAddToCartRequestPending(false)
                        !unmounted.current && setAddToCartFailure(true)
                        !unmounted.current && setAddToCartSuccess(false)
                        !unmounted.current && setAddToCartFailurePayload(errorData)
                        !unmounted.current && setAddToCartSuccessPayload({})
                    })
                }else {
                    if(error.response) {
                        if (error.response.data) {
                            if(error.response.data.code === 401){
                                Cookies.remove(ssClientAuthCookieKey)
                                Cookies.set(ssClientAuthFlagCookieKey, false)
                                dispatch(emptyUserCartRequest())
                                dispatch(emptyCart())
                                localStorage.removeItem("couponData")
                                unstable_batchedUpdates(() => {
                                    setAddToCartRequestPending(false)
                                    setAddToCartSuccess(true)
                                    setAddToCartFailure(false)
                                    setAddToCartSuccessPayload(error.response.data)
                                    setAddToCartFailurePayload({})
                                })
                            }
                            if(error.response.data.code === 400){
                                unstable_batchedUpdates(() => {
                                    !unmounted.current && setAddToCartRequestPending(false)
                                    !unmounted.current && setAddToCartFailure(true)
                                    !unmounted.current && setAddToCartSuccess(false)
                                    !unmounted.current && setAddToCartFailurePayload(error.response.data)
                                    !unmounted.current && setAddToCartSuccessPayload({})
                                })
                            }
                        }
                    }
                }
            })
    },[addToCartRequestPending, addToCartSuccess, addToCartFailure, addToCartSuccessPayload, addToCartFailurePayload])

    // return all variables and methods
    return {
        addItemToCart,
        payloadItemId,
        addToCartRequestPending,
        addToCartSuccess,
        addToCartFailure,
        addToCartSuccessPayload,
        addToCartFailurePayload,
    };

}