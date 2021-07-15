import * as types from '../../../utils/actionTypes.js'

const initialState = {
  createNewPasswordRequestPending: false,
  createNewPasswordSuccess: false,
  createNewPasswordFailure: false,
  createNewPasswordFailurePayload: {},
  createNewPasswordSuccessPayload: {},
}

export const ssCreateNewPassword = (state = initialState, action) => {
  switch(action.type){
    case types.CREATE_NEW_PASSWORD_REQUEST:
      return {
        ...state,
        createNewPasswordRequestPending: true,
        createNewPasswordSuccess: false,
        createNewPasswordFailure: false,
      }
    case types.CREATE_NEW_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        createNewPasswordRequestPending: false,
        createNewPasswordSuccess: true,
        createNewPasswordFailure: false,
        createNewPasswordSuccessPayload: action.payload
      }
    case types.CREATE_NEW_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        createNewPasswordFailure: true,
        createNewPasswordSuccess: false,
        createNewPasswordRequestPending: false,
        createNewPasswordFailurePayload: action.payload,
      }
    default :
      return state;
  }
}
