import axios from "axios";
import Cookies from "js-cookie";
import {useCallback, useEffect, useRef, useState} from "react";
import {unstable_batchedUpdates} from "react-dom";
import {apiRootUrl, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../utils/constants.js";

export function useGetUseCartHook() {

    // get cart
    const [getCartRequestPending,setGetCartRequestPending] = useState(false)
    const [getCartSuccess,setGetCartSuccess] = useState(false)
    const [getCartFailure,setgetCartFailure] = useState(false)
    const [getCartFailurePayload,setGetCartFailurePayload] = useState({})
    const [userCartItems,setCartItems] = useState([])


    const unmounted = useRef(false);
    useEffect(() => {
        return () => {
            unmounted.current = true;
        };
    }, []);


    // get user cart
    const getSSUserCart = useCallback(async () => {
        unstable_batchedUpdates(() => {
            setGetCartRequestPending(true)
            setgetCartFailure(false)
            setGetCartSuccess(false)
            setGetCartFailurePayload({})
            setCartItems([])
        })
        await axios.get(`${apiRootUrl}/v2/admin/cart`,{withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
            .then((response) => {
                if(response.data){
                    if(response.data.confirmation){
                        if(response.data.confirmation.message){
                            if (response.data.confirmation.statusCode === 200) {
                                // alert("cart data get")
                                console.log(response.data.card.data,"response.data.card.data response.data.card.data response.data.card.data response.data.card.data response.data.card.dataresponse.data.card.dataresponse.data.card.data")
                                unstable_batchedUpdates(() => {
                                    setGetCartRequestPending(false)
                                    setgetCartFailure(false)
                                    setGetCartSuccess(true)
                                    setGetCartFailurePayload({})
                                    setCartItems(response.data.card.data.cartItems)
                                })
                                // alert("after set state alert ")
                            }
                        }
                    }
                }
            })
            .catch( (error) => {
                if(error.toString().includes('Network Error')){
                    const errorData = {code: 503, message: "Connection problem! try again later."}
                    unstable_batchedUpdates(() => {
                        setGetCartRequestPending(false)
                        setgetCartFailure(true)
                        setGetCartSuccess(false)
                        setGetCartFailurePayload(errorData)
                        setCartItems([])
                    })
                }else {
                    if(error.response) {
                        if (error.response.data) {
                            if(error.response.data.code === 401){
                                Cookies.remove(ssClientAuthCookieKey)
                                Cookies.set(ssClientAuthFlagCookieKey, false)
                                unstable_batchedUpdates(() => {
                                    setGetCartRequestPending(false)
                                    setgetCartFailure(true)
                                    setGetCartSuccess(false)
                                    setGetCartFailurePayload(error.response.data)
                                    setCartItems([])
                                })
                            }
                            if(error.response.data.code === 400){
                                unstable_batchedUpdates(() => {
                                    setGetCartRequestPending(false)
                                    setgetCartFailure(true)
                                    setGetCartSuccess(false)
                                    setGetCartFailurePayload(error.response.data)
                                    setCartItems([])
                                })
                            }
                        }
                    }
                }
            })
    },[getCartRequestPending,
        getCartSuccess,
        getCartFailure,
        getCartFailurePayload,
        userCartItems])

    // return all variables and methods
    return {
        getSSUserCart,
        getCartRequestPending,
        getCartSuccess,
        getCartFailure,
        getCartFailurePayload,
        userCartItems,
    };

}