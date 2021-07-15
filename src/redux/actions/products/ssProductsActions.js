import * as types from '../../../utils/actionTypes.js'


export function getProductRequest() {
    return{
        type: types.GET_PRODUCT_REQUEST
    }
}

export function getProductRequestSuccess(data) {
    return{
        type: types.GET_PRODUCT_REQUEST_SUCCESS,
        payload: data
    }
}

export function getProductRequestFailure(data) {
    return{
        type: types.GET_PRODUCT_REQUEST_FAILED,
        payload: data
    }
}


export function cleanGetProductRequestState() {
    return{
        type: types.CLEAN_STATE_GET_PRODUCT_REQUEST,
    }
}



export function getAllProductsRequest() {
    return{
        type: types.GET_PRODUCTS_REQUEST
    }
}

export function getAllProductsRequestSuccess(data) {
    return{
        type: types.GET_PRODUCTS_REQUEST_SUCCESS,
        payload: data
    }
}

export function getAllProductsRequestFailure(data) {
    return{
        type: types.GET_PRODUCTS_REQUEST_FAILED,
        payload: data
    }
}



export function getFeaturedProductsRequest() {
    return{
        type: types.GET_FEATURED_PRODUCTS_REQUEST
    }
}

export function getFeaturedProductsRequestSuccess(data) {
    return{
        type: types.GET_FEATURED_PRODUCTS_REQUEST_SUCCESS,
        payload: data
    }
}

export function getFeaturedProductsRequestFailure(data) {
    return{
        type: types.GET_FEATURED_PRODUCTS_REQUEST_FAILED,
        payload: data
    }
}
