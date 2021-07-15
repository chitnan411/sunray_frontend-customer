import * as types from '../../../utils/actionTypes.js'

export function createNewPasswordRequest() {
  return{
    type: types.CREATE_NEW_PASSWORD_REQUEST,
  }
}

export function createNewPasswordRequestSuccess(data) {
  return{
    type: types.CREATE_NEW_PASSWORD_REQUEST_SUCCESS,
    payload: data
  }
}

export function createNewPasswordRequestFailure(data) {
  return{
    type: types.CREATE_NEW_PASSWORD_REQUEST_FAILED,
    payload: data
  }
}
