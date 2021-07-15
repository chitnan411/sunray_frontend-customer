import * as types from '../../../utils/actionTypes.js'

const initialState = {
    getSingleProductRequestPending: false,
    getSingleProductSuccess: false,
    getSingleProductFailure: false,
    getSingleProductFailurePayload: {},
    productDocument: {},
}

export const ssSingleProduct = (state = initialState, action) => {
    switch(action.type){
        case types.GET_PRODUCT_REQUEST:
            return {
                ...state,
                getSingleProductRequestPending: true,
                getSingleProductSuccess: false,
                getSingleProductFailure: false,
                getSingleProductFailurePayload: {},
                productDocument: {},
            }
        case types.GET_PRODUCT_REQUEST_SUCCESS:
            return {
                ...state,
                getSingleProductRequestPending: false,
                getSingleProductSuccess: true,
                getSingleProductFailure: false,
                getSingleProductFailurePayload: {},
                productDocument: action.payload,
            }
        case types.GET_PRODUCT_REQUEST_FAILED:
            return {
                ...state,
                getSingleProductRequestPending: false,
                getSingleProductSuccess: false,
                getSingleProductFailure: true,
                getSingleProductFailurePayload: action.payload,
                productDocument: {},
            }
        case types.CLEAN_STATE_GET_PRODUCT_REQUEST:
            return {
                ...state,
                getSingleProductRequestPending: false,
                getSingleProductSuccess: false,
                getSingleProductFailure: false,
                getSingleProductFailurePayload: {},
                productDocument: {},
            }
        default :
            return state;
    }
}
