import * as types from '../../../utils/actionTypes.js'

const initialState = {
    getSubCategoriesRequestPending: false,
    getSubCategoriesSuccess: false,
    getSubCategoriesFailure: false,
    getSubCategoriesFailurePayload: {},
    productSubCategories: []
}

export const ssSubCategoryList = (state = initialState, action) => {
    switch(action.type){
        case types.GET_SUB_CATEGORIES_REQUEST:
            return {
                ...state,
                getSubCategoriesRequestPending: true,
                getSubCategoriesSuccess: false,
                getSubCategoriesFailure: false,
                getSubCategoriesFailurePayload: {},
                productSubCategories: []
            }
        case types.GET_SUB_CATEGORIES_REQUEST_SUCCESS:
            return {
                ...state,
                getSubCategoriesRequestPending: false,
                getSubCategoriesSuccess: true,
                getSubCategoriesFailure: false,
                productSubCategories: action.payload,
            }
        case types.GET_SUB_CATEGORIES_REQUEST_FAILED:
            return {
                ...state,
                getSubCategoriesFailure: true,
                getSubCategoriesSuccess: false,
                getSubCategoriesRequestPending: false,
                getSubCategoriesFailurePayload: action.payload,
            }
        default :
            return state;
    }
}
