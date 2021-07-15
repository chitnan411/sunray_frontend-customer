import * as types from '../../../utils/actionTypes.js'


export function getComboRequest() {
    return{
        type: types.GET_COMBO_REQUEST
    }
}

export function getComboRequestSuccess(data) {
    return{
        type: types.GET_COMBO_REQUEST_SUCCESS,
        payload: data
    }
}

export function getComboRequestFailure(data) {
    return{
        type: types.GET_COMBO_REQUEST_FAILED,
        payload: data
    }
}

export function clearComboRequestState() {
    return{
        type: types.CLEAN_GET_COMBO_REQUEST,
    }
}



export function getAllCombosRequest() {
    return{
        type: types.GET_COMBOS_REQUEST
    }
}

export function getAllCombosRequestSuccess(data) {
    return{
        type: types.GET_COMBOS_REQUEST_SUCCESS,
        payload: data
    }
}

export function getAllCombosRequestFailure(data) {
    return{
        type: types.GET_COMBOS_REQUEST_FAILED,
        payload: data
    }
}

export function getFeaturedCombosRequest() {
    return{
        type: types.GET_COMBOS_REQUEST
    }
}

export function getFeaturedCombosRequestSuccess(data) {
    return{
        type: types.GET_COMBOS_REQUEST_SUCCESS,
        payload: data
    }
}

export function getFeaturedCombosRequestFailure(data) {
    return{
        type: types.GET_COMBOS_REQUEST_FAILED,
        payload: data
    }
}










export function getComboCategoriesRequest() {
    return{
        type: types.GET_COMBO_CATEGORIES_REQUEST
    }
}

export function getComboCategoriesRequestSuccess(data) {
    return{
        type: types.GET_COMBO_CATEGORIES_REQUEST_SUCCESS,
        payload: data
    }
}

export function getComboCategoriesRequestFailure(data) {
    return{
        type: types.GET_COMBO_CATEGORIES_REQUEST_FAILED,
        payload: data
    }
}
