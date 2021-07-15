import * as types from '../../../utils/actionTypes.js'

const initialState = {
  signInRequestPending: false,
  signInSuccess: false,
  signInCookieSet: false,
  signInFailure: false,
  signInFailurePayload: {},
  signInSuccessPayload: {},
}

export const ssSignIn = (state = initialState, action) => {
  switch(action.type){
    case types.SIGN_IN_REQUEST:
      return {
        ...state,
        signInRequestPending: true,
        signInSuccess: false,
        signInFailure: false,
        signInCookieSet: false,
      }
    case types.SIGN_IN_COOKIE_SET:
      return {
        ...state,
        signInRequestPending: false,
        signInSuccess: true,
        signInCookieSet: true,
        signInFailure: false,
      }
    case types.SIGN_OUT_REQUEST:
      return {
        ...state,
        signInRequestPending: false,
        signInSuccess: false,
        signInCookieSet: false,
        signInFailurePayload: {},
        signInSuccessPayload: {},
        signInFailure: false,
      }
    case types.SIGN_IN_REQUEST_SUCCESS:
      return {
        ...state,
        signInRequestPending: false,
        signInSuccess: true,
        signInCookieSet: false,
        signInFailure: false,
        signInSuccessPayload: action.payload,
      }
    case types.SIGN_IN_REQUEST_FAILED:
      return {
        ...state,
        signInFailure: true,
        signInSuccess: false,
        signInCookieSet: false,
        signInRequestPending: false,
        signInFailurePayload: action.payload,
      }
    default :
      return state;
  }
}
