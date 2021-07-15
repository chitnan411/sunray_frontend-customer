import * as types from '../../../utils/actionTypes.js'

export function getProductCategoriesRequest() {
    return{
        type: types.GET_CATEGORIES_REQUEST
    }
}

export function getProductCategoriesRequestSuccess(data) {
    return{
        type: types.GET_CATEGORIES_REQUEST_SUCCESS,
        payload: data
    }
}

export function getProductCategoriesRequestFailure(data) {
    return{
        type: types.GET_CATEGORIES_REQUEST_FAILED,
        payload: data
    }
}
