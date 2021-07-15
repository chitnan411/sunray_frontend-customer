import axios from 'axios'
import {apiRootUrl, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../../utils/constants";
import Cookies from "js-cookie";
import { validateResetPasswordLinkRequest,validateResetPasswordLinkRequestSuccess, validateResetPasswordLinkRequestFailure } from '../../actions/auth/ssValidateCreatePasswordLinkActions.js';

const requestForUserValidateCreateNewPasswordLink = (requestedPayload) => {
  console.log(requestedPayload,"requestedPayload requestedPayload requestedPayload requestedPayload requestedPayload requestedPayload requestedPayload ")
  return async function (dispatch) {
    dispatch(validateResetPasswordLinkRequest())
    return await axios.post(`${apiRootUrl}/v1/auth/verify-token`,{
      token : requestedPayload.token
    },{withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
      .then((response) => {
        if(response.data){
          return (dispatch(validateResetPasswordLinkRequestSuccess(response.data.confirmation)))
        }
      })
      .catch((error) => {
        if(error.toString().includes('Network Error')){
          const errorData = {code: 503, message: "No internet connection"}
          return (dispatch(validateResetPasswordLinkRequestFailure(errorData)))
        }
        else {
          if(error.response){
            if(error.response.data){
              if(error.response.data.code === 500){
                const errorData = {code: 500, message: "The Link is invalid or expired"}
                return (dispatch(validateResetPasswordLinkRequestFailure(errorData)))
              }
            }
          }
        }
      })
  }
}
export default requestForUserValidateCreateNewPasswordLink;
