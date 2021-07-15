import * as types from '../../../../utils/actionTypes.js'

const initialState = {
    emptyUserCartRequestPending: false,
    emptyUserCartSuccess: false,
    emptyUserCartFailure: false,
    emptyUserCartFailurePayload: {},
    emptyUserCartSuccessPayload: {},
}

export const ssEmptyUserCart = (state = initialState, action) => {
    switch(action.type){
        case types.SEND_EMPTY_USER_CART_REQUEST:
            return {
                ...state,
                emptyUserCartRequestPending: true,
                emptyUserCartSuccess: false,
                emptyUserCartFailure: false,
            }
        case types.SEND_EMPTY_USER_CART_REQUEST_SUCCESS:
            return {
                ...state,
                emptyUserCartRequestPending: false,
                emptyUserCartSuccess: true,
                emptyUserCartFailure: false,
                emptyUserCartSuccessPayload: action.payload,
            }
        case types.SEND_EMPTY_USER_CART_REQUEST_FAILED:
            return {
                ...state,
                emptyUserCartFailure: true,
                emptyUserCartSuccess: false,
                emptyUserCartRequestPending: false,
                emptyUserCartFailurePayload: action.payload,
            }
        default :
            return state;
    }
}
