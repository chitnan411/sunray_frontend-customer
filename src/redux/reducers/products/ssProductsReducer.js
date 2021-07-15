import * as types from '../../../utils/actionTypes.js'

const initialState = {
    getProductsRequestPending: false,
    getProductsSuccess: false,
    getProductsFailure: false,
    getProductsFailurePayload: {},
    products: [],
}

export const ssProductList = (state = initialState, action) => {
    switch(action.type){
        case types.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                getProductsRequestPending: true,
                getProductsSuccess: false,
                getProductsFailure: false,
            }
        case types.GET_PRODUCTS_REQUEST_SUCCESS:
            return {
                ...state,
                getProductsRequestPending: false,
                getProductsSuccess: true,
                getProductsFailure: false,
                products: action.payload,
            }
        case types.GET_PRODUCTS_REQUEST_FAILED:
            return {
                ...state,
                getProductsFailure: true,
                getProductsSuccess: false,
                getProductsRequestPending: false,
                getProductsFailurePayload: action.payload,
            }
        default :
            return state;
    }
}

