import CryptoAES from 'crypto-js/aes';
import axios from 'axios'
import {apiRootUrl, ssClientAuthCookieKey, ssClientCryptoSecretKey, ssClientAuthFlagCookieKey} from "../../../utils/constants.js";
import Cookies from "js-cookie";
import { createNewPasswordRequest,createNewPasswordRequestSuccess, createNewPasswordRequestFailure } from '../../actions/auth/ssCreateNewPasswordActions.js';

const requestForUserCreateNewPassword = (requestedPayload) => {
  let encryptedPassword  = CryptoAES.encrypt(requestedPayload.password, ssClientCryptoSecretKey).toString()
  console.log(requestedPayload,"requestedPayload requestedPayload requestedPayload requestedPayload requestedPayload requestedPayload requestedPayload ")
  return async function (dispatch) {
    dispatch(createNewPasswordRequest())
    return await axios.post(`${apiRootUrl}/v1/auth/reset-password?token=${requestedPayload.token}`,{
      password : encryptedPassword
    },{withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
      .then((response) => {
        return (dispatch(createNewPasswordRequestSuccess(response.data)))
      })
      .catch((error) => {
        if(error.toString().includes('Network Error')){
          const errorData = {code: 503, message: "No internet connection"}
          return (dispatch(createNewPasswordRequestFailure(errorData)))
        }else {
          if(error.response) {
            if (error.response.data) {
              if(error.response.data.code === 400){
                if(error.response.data.message === "Please enter another password"){
                  const errorData = {code:400, message: "Do not use any of your old passwords"}
                  return (dispatch(createNewPasswordRequestFailure(errorData)))
                }
              }
            }
          }
        }
      })
  }
}
export default requestForUserCreateNewPassword;
