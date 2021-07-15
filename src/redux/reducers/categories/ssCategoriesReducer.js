import * as types from '../../../utils/actionTypes.js'

const initialState = {
    getCategoriesRequestPending: false,
    getCategoriesSuccess: false,
    getCategoriesFailure: false,
    getCategoriesFailurePayload: {},
    productCategories: [],
}

export const ssCategoryList = (state = initialState, action) => {
    switch(action.type){
        case types.GET_CATEGORIES_REQUEST:
            return {
                ...state,
                getCategoriesRequestPending: true,
                getCategoriesSuccess: false,
                getCategoriesFailure: false,
            }
        case types.GET_CATEGORIES_REQUEST_SUCCESS:
            return {
                ...state,
                getCategoriesRequestPending: false,
                getCategoriesSuccess: true,
                getCategoriesFailure: false,
                productCategories: action.payload,
            }
        case types.GET_CATEGORIES_REQUEST_FAILED:
            return {
                ...state,
                getCategoriesFailure: true,
                getCategoriesSuccess: false,
                getCategoriesRequestPending: false,
                getCategoriesFailurePayload: action.payload,
            }
        default :
            return state;
    }
}
