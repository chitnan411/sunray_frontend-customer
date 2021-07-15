import CryptoAES from 'crypto-js/aes';
import axios from 'axios'
import {apiRootUrl, ssClientAuthFlagCookieKey, ssClientCryptoSecretKey, ssClientAuthCookieKey} from "../../../utils/constants.js";
import {signInRequestSuccess, signInRequestFailure, signInRequest} from '../../actions/auth/ssLoginActions.js';
import Cookies from 'js-cookie'

const requestForUserSignIn = (requestedUser) => {
  let encryptedPassword  = CryptoAES.encrypt(requestedUser.password, ssClientCryptoSecretKey).toString()
  return async function (dispatch) {
    dispatch(signInRequest())
    return await axios.post(`${apiRootUrl}/v1/auth/login`,{
      email : requestedUser.email,
      password : encryptedPassword
    })
        .then((response) => {
          if(response) {
            console.log(response,"response login response login response login response login response login response login response login response login response login response login ")
            Cookies.set(ssClientAuthCookieKey,response.data.card.token)
            if (response.data.card.data.role === "user"){
              return (dispatch(signInRequestSuccess(response.data.card.data)))
            }
            else {
              return (dispatch(signInRequestFailure({code: 403, message: "Sorry! Your are not allowed to login."})))
            }
          }
        })
        .catch((error) => {
          console.log("error error error error ",error);
          if(error.toString().includes('Network Error')){
            const errorData = {code: 503, message: "Connection problem! try again later."}
            return (dispatch(signInRequestFailure(errorData)))
          }else {
            // SnackbarUtils.error(error.response.data.message)
            return (dispatch(signInRequestFailure(error.response.data)))
          }
        })
  }
}
export default requestForUserSignIn;
