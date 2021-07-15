import * as types from '../../../../utils/actionTypes.js'

const initialState = {
    deleteFromSSCartRequestPending: false,
    deleteFromSSCartSuccess: false,
    deleteFromSSCartFailure: false,
    deleteFromSSCartFailurePayload: {},
    deleteFromSSCartSuccessPayload: {},
}

export const ssDeleteFromCart = (state = initialState, action) => {
    switch(action.type){
        case types.DELETE_FROM_SS_CART_REQUEST:
            return {
                ...state,
                deleteFromSSCartRequestPending: true,
                deleteFromSSCartSuccess: false,
                deleteFromSSCartFailure: false,
            }
        case types.DELETE_FROM_SS_CART_REQUEST_SUCCESS:
            return {
                ...state,
                deleteFromSSCartRequestPending: false,
                deleteFromSSCartSuccess: true,
                deleteFromSSCartFailure: false,
                deleteFromSSCartSuccessPayload: action.payload,
            }
        case types.DELETE_FROM_SS_CART_REQUEST_FAILED:
            return {
                ...state,
                deleteFromSSCartFailure: true,
                deleteFromSSCartSuccess: false,
                deleteFromSSCartRequestPending: false,
                deleteFromSSCartFailurePayload: action.payload,
            }
        default :
            return state;
    }
}
