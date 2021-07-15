import * as types from '../../../utils/actionTypes.js'

const initialState = {
  validateCreatePasswordLinkRequestPending: false,
  validateCreatePasswordLinkSuccess: false,
  validateCreatePasswordLinkFailure: false,
  validateCreatePasswordLinkFailurePayload: {},
  validateCreatePasswordLinkSuccessPayload: {},
}

export const ssValidateCreateNewPassword = (state = initialState, action) => {
  switch(action.type){
    case types.VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST:
      return {
        ...state,
        validateCreatePasswordLinkRequestPending: true,
        validateCreatePasswordLinkSuccess: false,
        validateCreatePasswordLinkFailure: false,
      }
    case types.VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST_SUCCESS:
      return {
        ...state,
        validateCreatePasswordLinkRequestPending: false,
        validateCreatePasswordLinkSuccess: true,
        validateCreatePasswordLinkFailure: false,
        validateCreatePasswordLinkSuccessPayload: action.payload
      }
    case types.VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST_FAILED:
      return {
        ...state,
        validateCreatePasswordLinkFailure: true,
        validateCreatePasswordLinkSuccess: false,
        validateCreatePasswordLinkRequestPending: false,
        validateCreatePasswordLinkFailurePayload: action.payload,
      }
    default :
      return state;
  }
}
