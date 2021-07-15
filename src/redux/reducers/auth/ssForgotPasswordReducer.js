import * as types from '../../../utils/actionTypes.js'

const initialState = {
  forgotPasswordRequestPending: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailure: false,
  forgotPasswordFailurePayload: {},
  forgotPasswordSuccessPayload: {},
}

export const ssForgotPassword = (state = initialState, action) => {
  switch(action.type){
    case types.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordRequestPending: true,
        forgotPasswordSuccess: false,
        forgotPasswordFailure: false,
        forgotPasswordFailurePayload: {},
        forgotPasswordSuccessPayload: {},
      }
    case types.FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        forgotPasswordRequestPending: false,
        forgotPasswordSuccess: true,
        forgotPasswordFailure: false,
        forgotPasswordFailurePayload: {},
        forgotPasswordSuccessPayload: action.payload
      }
    case types.FORGOT_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        forgotPasswordFailure: true,
        forgotPasswordSuccess: false,
        forgotPasswordRequestPending: false,
        forgotPasswordFailurePayload: action.payload,
        forgotPasswordSuccessPayload: {}
      }
    case types.FORGOT_PASSWORD_REQUEST_CLEAR:
      return {
        ...state,
        forgotPasswordRequestPending: false,
        forgotPasswordSuccess: false,
        forgotPasswordFailure: false,
        forgotPasswordFailurePayload: {},
        forgotPasswordSuccessPayload: {},
      }
    default :
      return state;
  }
}
