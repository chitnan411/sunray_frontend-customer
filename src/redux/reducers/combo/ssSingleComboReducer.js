import * as types from '../../../utils/actionTypes.js'

const initialState = {
    getSingleComboRequestPending: false,
    getSingleComboSuccess: false,
    getSingleComboFailure: false,
    getSingleComboFailurePayload: {},
    comboDocument: {},
}

export const ssSingleCombo = (state = initialState, action) => {
    switch(action.type){
        case types.GET_COMBO_REQUEST:
            return {
                ...state,
                getSingleComboRequestPending: true,
                getSingleComboSuccess: false,
                getSingleComboFailure: false,
                getSingleComboFailurePayload: {},
                comboDocument: {},
            }
        case types.GET_COMBO_REQUEST_SUCCESS:
            return {
                ...state,
                getSingleComboRequestPending: false,
                getSingleComboSuccess: true,
                getSingleComboFailure: false,
                getSingleComboFailurePayload: {},
                comboDocument: action.payload,
            }
        case types.GET_COMBO_REQUEST_FAILED:
            return {
                ...state,
                getSingleComboFailure: true,
                getSingleComboSuccess: false,
                getSingleComboRequestPending: false,
                getSingleComboFailurePayload: action.payload,
                comboDocument: {},
            }
        case types.CLEAN_GET_COMBO_REQUEST:
            return {
                ...state,
                getSingleComboRequestPending: false,
                getSingleComboSuccess: false,
                getSingleComboFailure: false,
                getSingleComboFailurePayload: {},
                comboDocument: {},
            }
        default :
            return state;
    }
}
