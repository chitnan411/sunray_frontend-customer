import axios from 'axios'
import {apiRootUrl, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../../utils/constants";
import Cookies from "js-cookie";
import { forgotPasswordRequest,forgotPasswordRequestSuccess, forgotPasswordRequestFailure } from '../../actions/auth/ssForgotPasswordActions.js';

const requestForUserForgotPassword = (requestedUser) => {
  return async function (dispatch) {
    dispatch(forgotPasswordRequest())
    return await axios.post(`${apiRootUrl}/v1/auth/forgot-password`,{
      email : requestedUser.email,
    },{withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
      .then((response) => {
        console.log(response,"response response response response response ")
        return (dispatch(forgotPasswordRequestSuccess(response.data.confirmation)))
      })
      .catch((error) => {
        if(error.toString().includes('Network Error')){
          const errorData = {code: 503, message: "No internet connection"}
          return (dispatch(forgotPasswordRequestFailure(errorData)))
        }else {
          console.log(error);
          return (dispatch(forgotPasswordRequestFailure(error.response.data)))
        }
      })
  }
}
export default requestForUserForgotPassword;
