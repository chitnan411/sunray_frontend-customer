import * as types from '../../../utils/actionTypes.js'

const initialState = {
    getCombosRequestPending: false,
    getCombosSuccess: false,
    getCombosFailure: false,
    getCombosFailurePayload: {},
    combos: [],
}

export const ssComboList = (state = initialState, action) => {
    switch(action.type){
        case types.GET_COMBOS_REQUEST:
            return {
                ...state,
                getCombosRequestPending: true,
                getCombosSuccess: false,
                getCombosFailure: false,
            }
        case types.GET_COMBOS_REQUEST_SUCCESS:
            return {
                ...state,
                getCombosRequestPending: false,
                getCombosSuccess: true,
                getCombosFailure: false,
                combos: action.payload,
            }
        case types.GET_COMBOS_REQUEST_FAILED:
            return {
                ...state,
                getCombosFailure: true,
                getCombosSuccess: false,
                getCombosRequestPending: false,
                getCombosFailurePayload: action.payload,
            }
        default :
            return state;
    }
}
