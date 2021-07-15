import * as types from '../../../utils/actionTypes.js'

const initialState = {
  registerUserRequestPending: false,
  registerUserSuccess: false,
  registerUserFailure: false,
  registerUserFailurePayload: {},
  registerUserSuccessPayload: {},
}

export const ssRegisterUser = (state = initialState, action) => {
  switch(action.type){
    case types.REGISTER_USER_REQUEST:
      return {
        ...state,
        registerUserRequestPending: true,
        registerUserSuccess: false,
        registerUserFailure: false,
      }
    case types.REGISTER_USER_REQUEST_SUCCESS:
      return {
        ...state,
        registerUserRequestPending: false,
        registerUserSuccess: true,
        registerUserFailure: false,
        registerUserSuccessPayload: action.payload,
      }
    case types.REGISTER_USER_REQUEST_FAILED:
      return {
        ...state,
        registerUserFailure: true,
        registerUserSuccess: false,
        registerUserRequestPending: false,
        registerUserFailurePayload: action.payload,
      }
    default :
      return state;
  }
}
