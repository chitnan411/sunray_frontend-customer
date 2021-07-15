import * as types from '../../../utils/actionTypes.js'

export function getProductSubCategoriesRequest() {
    return{
        type: types.GET_SUB_CATEGORIES_REQUEST
    }
}

export function getProductSubCategoriesRequestSuccess(data) {
    return{
        type: types.GET_SUB_CATEGORIES_REQUEST_SUCCESS,
        payload: data
    }
}

export function getProductSubCategoriesRequestFailure(data) {
    return{
        type: types.GET_SUB_CATEGORIES_REQUEST_FAILED,
        payload: data
    }
}
