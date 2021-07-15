import * as types from '../../../utils/actionTypes.js'

const initialState = {
    getBrandsRequestPending: false,
    getBrandsSuccess: false,
    getBrandsFailure: false,
    getBrandsFailurePayload: {},
    productBrands: [],
}

export const ssBrandList = (state = initialState, action) => {
    switch(action.type){
        case types.GET_BRANDS_REQUEST:
            return {
                ...state,
                getBrandsRequestPending: true,
                getBrandsSuccess: false,
                getBrandsFailure: false,
            }
        case types.GET_BRANDS_REQUEST_SUCCESS:
            return {
                ...state,
                getBrandsRequestPending: false,
                getBrandsSuccess: true,
                getBrandsFailure: false,
                productBrands: action.payload,
            }
        case types.GET_BRANDS_REQUEST_FAILED:
            return {
                ...state,
                getBrandsFailure: true,
                getBrandsSuccess: false,
                getBrandsRequestPending: false,
                getBrandsFailurePayload: action.payload,
            }
        default :
            return state;
    }
}
