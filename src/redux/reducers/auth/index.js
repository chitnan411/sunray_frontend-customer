import { combineReducers } from "redux"
import {ssSignIn} from "./ssLoginReducer.js";
import {ssForgotPassword} from "./ssForgotPasswordReducer.js";
import {ssCreateNewPassword} from "./ssCreateNewPasswordReducer.js";
import {ssValidateCreateNewPassword} from './ssValidateCreatePasswordLinkReducer.js'
import {ssRegisterUser} from "./ssRegisterReducer.js"

const authReducers = combineReducers({
  ssSignIn,
  ssRegisterUser,
  ssForgotPassword,
  ssCreateNewPassword,
  ssValidateCreateNewPassword,
})

export default authReducers
