import * as types from '../../../../utils/actionTypes.js'

const initialState = {
    updateSSCartRequestPending: false,
    updateSSCartSuccess: false,
    updateSSCartFailure: false,
    updateSSCartFailurePayload: {},
    updateSSCartSuccessPayload: {},
}

export const ssUpdateCart = (state = initialState, action) => {
    switch(action.type){
        case types.UPDATE_SS_CART_REQUEST:
            return {
                ...state,
                updateSSCartRequestPending: true,
                updateSSCartSuccess: false,
                updateSSCartFailure: false,
            }
        case types.UPDATE_SS_CART_REQUEST_SUCCESS:
            return {
                ...state,
                updateSSCartRequestPending: false,
                updateSSCartSuccess: true,
                updateSSCartFailure: false,
                updateSSCartSuccessPayload: action.payload,
            }
        case types.UPDATE_SS_CART_REQUEST_FAILED:
            return {
                ...state,
                updateSSCartFailure: true,
                updateSSCartSuccess: false,
                updateSSCartRequestPending: false,
                updateSSCartFailurePayload: action.payload,
            }
        default :
            return state;
    }
}
