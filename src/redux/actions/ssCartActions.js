import * as types from '../../utils/actionTypes.js'

// ========================================================================================================================================================================================================================
//                           *** GET USER CART ***
// ========================================================================================================================================================================================================================

export function getCartRequest() {
  return{
    type: types.GET_SS_CART_REQUEST
  }
}

export function getCartRequestSuccess(data) {
  return{
    type: types.GET_SS_CART_REQUEST_SUCCESS,
    payload: data
  }
}

export function getCartRequestFailure(data) {
  return{
    type: types.GET_SS_CART_REQUEST_FAILED,
    payload: data
  }
}

// ========================================================================================================================================================================================================================
//                           *** ADD TO USER CART ***
// ========================================================================================================================================================================================================================


export function addToCartRequest() {
  return{
    type: types.ADD_TO_SS_CART_REQUEST
  }
}

export function addToCartRequestSuccess(data) {
  return{
    type: types.ADD_TO_SS_CART_REQUEST_SUCCESS,
    payload: data
  }
}

export function addToCartRequestFailure(data) {
  return{
    type: types.ADD_TO_SS_CART_REQUEST_FAILED,
    payload: data
  }
}

// ========================================================================================================================================================================================================================
//                           *** UPDATE USER CART ***
// ========================================================================================================================================================================================================================

export function updateCartRequest() {
  return{
    type: types.UPDATE_SS_CART_REQUEST
  }
}

export function updateCartRequestSuccess(data) {
  return{
    type: types.UPDATE_SS_CART_REQUEST_SUCCESS,
    payload: data
  }
}

export function updateCartRequestFailure(data) {
  return{
    type: types.UPDATE_SS_CART_REQUEST_FAILED,
    payload: data
  }
}

// ========================================================================================================================================================================================================================
//                           *** DELETE FROM USER CART ***
// ========================================================================================================================================================================================================================

export function deleteFromCartRequest() {
  return{
    type: types.DELETE_FROM_SS_CART_REQUEST
  }
}

export function deleteFromCartRequestSuccess(data) {
  return{
    type: types.DELETE_FROM_SS_CART_REQUEST_SUCCESS,
    payload: data
  }
}

export function deleteFromCartRequestFailure(data) {
  return{
    type: types.DELETE_FROM_SS_CART_REQUEST_FAILED,
    payload: data
  }
}


// DELETE SINGLE ITEM FROM CART STATE

export function removeItemFromUserState(data) {
  return{
    type: types.DELETE_ITEM_FROM_STATE_REQUEST,
    payload: data
  }
}

// EMPTY USER CART FROM STATE

export function resetDeleteUserCartState(data) {
  return{
    type: types.RESET_DELETE_CART_USER_STATE,
    payload: data
  }
}


// SEND REQUEST TO EMPTY USER CART

export function sendEmptyUserCartRequest() {
  return{
    type: types.SEND_EMPTY_USER_CART_REQUEST
  }
}

export function sendEmptyUserCartRequestSuccess(data) {
  return{
    type: types.SEND_EMPTY_USER_CART_REQUEST_SUCCESS,
    payload: data
  }
}

export function sendEmptyUserCartRequestFailure(data) {
  return{
    type: types.SEND_EMPTY_USER_CART_REQUEST_FAILED,
    payload: data
  }
}


// ========================================================================================================================================================================================================================
//                           *** EMPTY USER CART ***
// ========================================================================================================================================================================================================================


export function emptyUserCartRequest() {
  return{
    type: types.EMPTY_USER_CART_REQUEST
  }
}

