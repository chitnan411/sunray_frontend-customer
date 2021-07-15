import * as types from '../../../utils/actionTypes.js'

export function signInRequest() {
  return{
    type: types.SIGN_IN_REQUEST
  }
}

export function signOutRequest() {
  return{
    type: types.SIGN_OUT_REQUEST
  }
}

export function signInCookieSet() {
  return{
    type: types.SIGN_IN_COOKIE_SET
  }
}

export function signInRequestSuccess(data) {
  return{
    type: types.SIGN_IN_REQUEST_SUCCESS,
    payload: data
  }
}

export function signInRequestFailure(data) {
  return{
    type: types.SIGN_IN_REQUEST_FAILED,
    payload: data
  }
}
