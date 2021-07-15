import * as types from '../../../utils/actionTypes.js'

export function validateResetPasswordLinkRequest() {
  return{
    type: types.VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST
  }
}

export function validateResetPasswordLinkRequestSuccess(data) {
  return{
    type: types.VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST_SUCCESS,
    payload: data
  }
}

export function validateResetPasswordLinkRequestFailure(data) {
  return{
    type: types.VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST_FAILED,
    payload: data
  }
}
