import * as types from '../../../utils/actionTypes.js'

export function getProductBrandsRequest() {
    return{
        type: types.GET_BRANDS_REQUEST
    }
}

export function getProductBrandsRequestSuccess(data) {
    return{
        type: types.GET_BRANDS_REQUEST_SUCCESS,
        payload: data
    }
}

export function getProductBrandsRequestFailure(data) {
    return{
        type: types.GET_BRANDS_REQUEST_FAILED,
        payload: data
    }
}
