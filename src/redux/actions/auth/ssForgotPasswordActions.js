import * as types from '../../../utils/actionTypes.js'

export function forgotPasswordRequest() {
  return{
    type: types.FORGOT_PASSWORD_REQUEST,
  }
}

export function forgotPasswordRequestSuccess(data) {
  return{
    type: types.FORGOT_PASSWORD_REQUEST_SUCCESS,
    payload: data
  }
}

export function forgotPasswordRequestFailure(data) {
  return{
    type: types.FORGOT_PASSWORD_REQUEST_FAILED,
    payload: data
  }
}

export function forgotPasswordRequestClear() {
  return{
    type: types.FORGOT_PASSWORD_REQUEST_CLEAR,
  }
}
