import * as types from '../../../utils/actionTypes.js'

const initialState = {
    getComboCategoriesRequestPending: false,
    getComboCategoriesSuccess: false,
    getComboCategoriesFailure: false,
    getComboCategoriesFailurePayload: {},
    comboCategories: [],
}

export const ssComboCategoriesList = (state = initialState, action) => {
    switch(action.type){
        case types.GET_COMBO_CATEGORIES_REQUEST:
            return {
                ...state,
                getComboCategoriesRequestPending: true,
                getComboCategoriesSuccess: false,
                getComboCategoriesFailure: false,
            }
        case types.GET_COMBO_CATEGORIES_REQUEST_SUCCESS:
            return {
                ...state,
                getComboCategoriesRequestPending: false,
                getComboCategoriesSuccess: true,
                getComboCategoriesFailure: false,
                comboCategories: action.payload,
            }
        case types.GET_COMBO_CATEGORIES_REQUEST_FAILED:
            return {
                ...state,
                getComboCategoriesFailure: true,
                getComboCategoriesSuccess: false,
                getComboCategoriesRequestPending: false,
                getComboCategoriesFailurePayload: action.payload,
            }
        default :
            return state;
    }
}
