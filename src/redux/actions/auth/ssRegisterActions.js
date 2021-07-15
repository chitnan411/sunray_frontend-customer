import * as types from '../../../utils/actionTypes.js'

export function registerRequest() {
  return{
    type: types.REGISTER_USER_REQUEST
  }
}

export function registerRequestSuccess(data) {
  return{
    type: types.REGISTER_USER_REQUEST_SUCCESS,
    payload: data
  }
}

export function registerRequestFailure(data) {
  return{
    type: types.REGISTER_USER_REQUEST_FAILED,
    payload: data
  }
}
