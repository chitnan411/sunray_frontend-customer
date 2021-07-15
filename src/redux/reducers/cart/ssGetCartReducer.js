import * as types from '../../../utils/actionTypes.js'

const initialState = {
    getCartRequestPending: false,
    getCartSuccess: false,
    getCartFailure: false,
    getCartFailurePayload: {},
    cartItems: [],
}

export const ssCartItemsData = (state = initialState, action) => {
    switch(action.type){
        case types.GET_SS_CART_REQUEST:
            return {
                ...state,
                getCartRequestPending: true,
                getCartSuccess: false,
                getCartFailure: false,
                cartItems: [],
            }
        case types.GET_SS_CART_REQUEST_SUCCESS:
            if(action.payload){
                return {
                    ...state,
                    getCartRequestPending: false,
                    getCartSuccess: true,
                    getCartFailure: false,
                    cartItems: action.payload,
                }
            }
            else {
                return {
                    ...state,
                    getCartRequestPending: false,
                    getCartSuccess: true,
                    getCartFailure: false,
                    cartItems: []
                }
            }
        case types.GET_SS_CART_REQUEST_FAILED:
            return {
                ...state,
                getCartFailure: true,
                getCartSuccess: false,
                getCartRequestPending: false,
                getCartFailurePayload: action.payload,
            }
        case types.EMPTY_USER_CART_REQUEST:
            return {
                ...state,
                getCartRequestPending: false,
                getCartSuccess: false,
                getCartFailure: false,
                getCartFailurePayload: {},
                cartItems: [],
            }
        case types.DELETE_ITEM_FROM_STATE_REQUEST:
            let itemId = action.payload
            let tempItems = [...state.cartItems]
            let finalItems = tempItems.filter(item => item._id !== itemId)
            return {
                ...state,
                getCartRequestPending: false,
                getCartSuccess: false,
                getCartFailure: false,
                getCartFailurePayload: {},
                cartItems: [...finalItems],
            }
        default :
            return state;
    }
}
