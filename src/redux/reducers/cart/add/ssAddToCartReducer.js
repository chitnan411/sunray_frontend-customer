import * as types from '../../../../utils/actionTypes.js'

const initialState = {
    addToSSCartRequestPending: false,
    addToSSCartSuccess: false,
    addToSSCartFailure: false,
    addToSSCartFailurePayload: {},
    addToSSCartSuccessPayload: {},
}

export const ssAddToCart = (state = initialState, action) => {
    switch(action.type){
        case types.ADD_TO_SS_CART_REQUEST:
            return {
                ...state,
                addToSSCartRequestPending: true,
                addToSSCartSuccess: false,
                addToSSCartFailure: false,
            }
        case types.ADD_TO_SS_CART_REQUEST_SUCCESS:
            return {
                ...state,
                addToSSCartRequestPending: false,
                addToSSCartSuccess: true,
                addToSSCartFailure: false,
                addToSSCartSuccessPayload: action.payload,
            }
        case types.ADD_TO_SS_CART_REQUEST_FAILED:
            return {
                ...state,
                addToSSCartFailure: true,
                addToSSCartSuccess: false,
                addToSSCartRequestPending: false,
                addToSSCartFailurePayload: action.payload,
            }
        default :
            return state;
    }
}
