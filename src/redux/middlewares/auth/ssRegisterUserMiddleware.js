import CryptoAES from 'crypto-js/aes';
import axios from 'axios'
import {apiRootUrl, ssClientAuthFlagCookieKey, ssClientCryptoSecretKey, ssClientAuthCookieKey} from "../../../utils/constants.js";
import {registerRequest,registerRequestSuccess,registerRequestFailure} from '../../actions/auth/ssRegisterActions.js';
import Cookies from 'js-cookie'

const requestForUserRegister = (requestedUser) => {
  let encryptedPassword  = CryptoAES.encrypt(requestedUser.password, ssClientCryptoSecretKey).toString()
  return async function (dispatch) {
    dispatch(registerRequest())
    return await axios.post(`${apiRootUrl}/v1/auth/register`,{
      firstName: requestedUser.firstName,
      lastName: requestedUser.lastName,
      email : requestedUser.email,
      password : encryptedPassword
    },{withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
      .then((response) => {
        if(response) {
          console.log(response,"response login response login response login response login response login response login response login response login response login response login ")
          Cookies.set(ssClientAuthCookieKey,response.data.card.token)
          return (dispatch(registerRequestSuccess(response.data.card.data)))
        }
      })
      .catch((error) => {
        console.log("error error error error ",error);
        if(error.toString().includes('Network Error')){
          const errorData = {code: 503, message: "Connection problem! try again later."}
          return (dispatch(registerRequestFailure(errorData)))
        }else {
          // SnackbarUtils.error(error.response.data.message)
          return (dispatch(registerRequestFailure(error.response.data)))
        }
      })
  }
}
export default requestForUserRegister;
