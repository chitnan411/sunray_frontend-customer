// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
//                                                                  ** AUTHENTICATION MODULE  **
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===

// sign in action types
export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST"
export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST"
export const SIGN_IN_COOKIE_SET = "SIGN_IN_COOKIE_SET"
export const SIGN_IN_REQUEST_SUCCESS = "SIGN_IN_REQUEST_SUCCESS"
export const SIGN_IN_REQUEST_FAILED = "SIGN_IN_REQUEST_FAILED"

// register action types
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST"
export const REGISTER_USER_REQUEST_SUCCESS = "REGISTER_USER_REQUEST_SUCCESS"
export const REGISTER_USER_REQUEST_FAILED = "REGISTER_USER_REQUEST_FAILED"


// forgot password action types
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST"
export const FORGOT_PASSWORD_REQUEST_SUCCESS = "FORGOT_PASSWORD_REQUEST_SUCCESS"
export const FORGOT_PASSWORD_REQUEST_FAILED = "FORGOT_PASSWORD_REQUEST_FAILED"
export const FORGOT_PASSWORD_REQUEST_CLEAR = "FORGOT_PASSWORD_REQUEST_CLEAR"

// validate create new password link action types
export const VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST = "VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST"
export const VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST_SUCCESS = "VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST_SUCCESS"
export const VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST_FAILED = "VALIDATE_CREATE_NEW_PASSWORD_LINK_REQUEST_FAILED"

// create new password action types
export const CREATE_NEW_PASSWORD_REQUEST = "CREATE_NEW_PASSWORD_REQUEST"
export const CREATE_NEW_PASSWORD_REQUEST_SUCCESS = "CREATE_NEW_PASSWORD_REQUEST_SUCCESS"
export const CREATE_NEW_PASSWORD_REQUEST_FAILED = "CREATE_NEW_PASSWORD_REQUEST_FAILED"


// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
//                                                                  ** PRODUCT MODULE  **
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===

// ==================================================================
// PRODUCT CATEGORY
// ==================================================================
// get category action types
export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST"
export const GET_CATEGORIES_REQUEST_SUCCESS = "GET_CATEGORIES_REQUEST_SUCCESS"
export const GET_CATEGORIES_REQUEST_FAILED = "GET_CATEGORIES_REQUEST_FAILED"

// ==================================================================
// PRODUCT SUB CATEGORY
// ==================================================================

// get sub category action types
export const GET_SUB_CATEGORIES_REQUEST = "GET_SUB_CATEGORIES_REQUEST"
export const GET_SUB_CATEGORIES_REQUEST_SUCCESS = "GET_SUB_CATEGORIES_REQUEST_SUCCESS"
export const GET_SUB_CATEGORIES_REQUEST_FAILED = "GET_SUB_CATEGORIES_REQUEST_FAILED"

// ==================================================================
// PRODUCT CHILD CATEGORY
// ==================================================================

// get child category action types
export const GET_CHILD_CATEGORIES_REQUEST = "GET_CHILD_CATEGORIES_REQUEST"
export const GET_CHILD_CATEGORIES_REQUEST_SUCCESS = "GET_CHILD_CATEGORIES_REQUEST_SUCCESS"
export const GET_CHILD_CATEGORIES_REQUEST_FAILED = "GET_CHILD_CATEGORIES_REQUEST_FAILED"


// ==================================================================
// PRODUCT BRANDS
// ==================================================================

// get brand action types
export const GET_BRANDS_REQUEST = "GET_BRANDS_REQUEST"
export const GET_BRANDS_REQUEST_SUCCESS = "GET_BRANDS_REQUEST_SUCCESS"
export const GET_BRANDS_REQUEST_FAILED = "GET_BRANDS_REQUEST_FAILED"

// ==================================================================
// PRODUCT ( ALL PRODUCTS )
// ==================================================================

// get product action types

export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST"
export const GET_PRODUCT_REQUEST_SUCCESS = "GET_PRODUCT_REQUEST_SUCCESS"
export const GET_PRODUCT_REQUEST_FAILED = "GET_PRODUCT_REQUEST_FAILED"
export const CLEAN_STATE_GET_PRODUCT_REQUEST = "CLEAN_STATE_GET_PRODUCT_REQUEST"


export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST"
export const GET_PRODUCTS_REQUEST_SUCCESS = "GET_PRODUCTS_REQUEST_SUCCESS"
export const GET_PRODUCTS_REQUEST_FAILED = "GET_PRODUCTS_REQUEST_FAILED"


export const GET_FEATURED_PRODUCTS_REQUEST = "GET_FEATURED_PRODUCTS_REQUEST"
export const GET_FEATURED_PRODUCTS_REQUEST_SUCCESS = "GET_FEATURED_PRODUCTS_REQUEST_SUCCESS"
export const GET_FEATURED_PRODUCTS_REQUEST_FAILED = "GET_FEATURED_PRODUCTS_REQUEST_FAILED"

// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
//                                                                  ** COMBOS MODULE  **
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===


// ==================================================================
// COMBO CATEGORY
// ==================================================================

// get combo category action types
export const GET_COMBO_CATEGORIES_REQUEST = "GET_COMBO_CATEGORIES_REQUEST"
export const GET_COMBO_CATEGORIES_REQUEST_SUCCESS = "GET_COMBO_CATEGORIES_REQUEST_SUCCESS"
export const GET_COMBO_CATEGORIES_REQUEST_FAILED = "GET_COMBO_CATEGORIES_REQUEST_FAILED"


// ==================================================================
// COMBO ( ALL COMBOS )
// ==================================================================

// get combo action types
export const GET_COMBOS_REQUEST = "GET_COMBOS_REQUEST"
export const GET_COMBOS_REQUEST_SUCCESS = "GET_COMBOS_REQUEST_SUCCESS"
export const GET_COMBOS_REQUEST_FAILED = "GET_COMBOS_REQUEST_FAILED"

export const GET_COMBO_REQUEST = "GET_COMBO_REQUEST"
export const GET_COMBO_REQUEST_SUCCESS = "GET_COMBO_REQUEST_SUCCESS"
export const GET_COMBO_REQUEST_FAILED = "GET_COMBO_REQUEST_FAILED"
export const CLEAN_GET_COMBO_REQUEST = "CLEAN_GET_COMBO_REQUEST"




// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
//                                                                  ** OFFER MODULE  **
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
// ==================================================================
// OFFER CRAZY DEALS
// ==================================================================

// get crazy deal action types
export const GET_CRAZY_DEALS_REQUEST = "GET_CRAZY_DEALS_REQUEST"
export const GET_CRAZY_DEALS_REQUEST_SUCCESS = "GET_CRAZY_DEALS_REQUEST_SUCCESS"
export const GET_CRAZY_DEALS_REQUEST_FAILED = "GET_CRAZY_DEALS_REQUEST_FAILED"

// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
//                                                                  ** SALES MODULE  **
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===


// ==================================================================
// SALES ALL ORDERS
// ==================================================================

// get sale order action types
export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST"
export const GET_ORDERS_REQUEST_SUCCESS = "GET_ORDERS_REQUEST_SUCCESS"
export const GET_ORDERS_REQUEST_FAILED = "GET_ORDERS_REQUEST_FAILED"

// ==================================================================
// SALES ALL ORDER PAYMENTS
// ==================================================================

// get sale order payment action types
export const GET_ORDER_PAYMENTS_REQUEST = "GET_ORDER_PAYMENTS_REQUEST"
export const GET_ORDER_PAYMENTS_REQUEST_SUCCESS = "GET_ORDER_PAYMENTS_REQUEST_SUCCESS"
export const GET_ORDER_PAYMENTS_REQUEST_FAILED = "GET_ORDER_PAYMENTS_REQUEST_FAILED"

// ==================================================================
// SALES ALL ORDER REVIEWS
// ==================================================================

// get sale order reviews action types
export const GET_ORDER_REVIEWS_REQUEST = "GET_ORDER_REVIEWS_REQUEST"
export const GET_ORDER_REVIEWS_REQUEST_SUCCESS = "GET_ORDER_REVIEWS_REQUEST_SUCCESS"
export const GET_ORDER_REVIEWS_REQUEST_FAILED = "GET_ORDER_REVIEWS_REQUEST_FAILED"


// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
//                                                                  ** CUSTOMERS MODULE  **
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===


// ==================================================================
// ALL CUSTOMERS
// ==================================================================

// get all customers action types
export const GET_CUSTOMERS_REQUEST = "GET_CUSTOMERS_REQUEST"
export const GET_CUSTOMERS_REQUEST_SUCCESS = "GET_CUSTOMERS_REQUEST_SUCCESS"
export const GET_CUSTOMERS_REQUEST_FAILED = "GET_CUSTOMERS_REQUEST_FAILED"

// ==================================================================
// CUSTOMERS INQUIRIES
// ==================================================================

// get customers inquiries action types
export const GET_CUSTOMER_INQUIRIES_REQUEST = "GET_CUSTOMER_INQUIRIES_REQUEST"
export const GET_CUSTOMER_INQUIRIES_REQUEST_SUCCESS = "GET_CUSTOMER_INQUIRIES_REQUEST_SUCCESS"
export const GET_CUSTOMER_INQUIRIES_REQUEST_FAILED = "GET_CUSTOMER_INQUIRIES_REQUEST_FAILED"

// ==================================================================
// CREDIT NOTES
// ==================================================================

// get credit notes action types
export const GET_CREDIT_NOTES_REQUEST = "GET_CREDIT_NOTES_REQUEST"
export const GET_CREDIT_NOTES_REQUEST_SUCCESS = "GET_CREDIT_NOTES_REQUEST_SUCCESS"
export const GET_CREDIT_NOTES_REQUEST_FAILED = "GET_CREDIT_NOTES_REQUEST_FAILED"


export const ADD_TO_SS_CART_REQUEST = "ADD_TO_SS_CART_REQUEST"
export const ADD_TO_SS_CART_REQUEST_SUCCESS = "ADD_TO_SS_CART_REQUEST_SUCCESS"
export const ADD_TO_SS_CART_REQUEST_FAILED = "ADD_TO_SS_CART_REQUEST_FAILED"

export const GET_SS_CART_REQUEST = "GET_SS_CART_REQUEST"
export const GET_SS_CART_REQUEST_SUCCESS = "GET_SS_CART_REQUEST_SUCCESS"
export const GET_SS_CART_REQUEST_FAILED = "GET_SS_CART_REQUEST_FAILED"

export const UPDATE_SS_CART_REQUEST = "UPDATE_SS_CART_REQUEST"
export const UPDATE_SS_CART_REQUEST_SUCCESS = "UPDATE_SS_CART_REQUEST_SUCCESS"
export const UPDATE_SS_CART_REQUEST_FAILED = "UPDATE_SS_CART_REQUEST_FAILED"

export const DELETE_FROM_SS_CART_REQUEST = "DELETE_FROM_SS_CART_REQUEST"
export const DELETE_FROM_SS_CART_REQUEST_SUCCESS = "DELETE_FROM_SS_CART_REQUEST_SUCCESS"
export const DELETE_FROM_SS_CART_REQUEST_FAILED = "DELETE_FROM_SS_CART_REQUEST_FAILED"

export const SEND_EMPTY_USER_CART_REQUEST = "SEND_EMPTY_USER_CART_REQUEST"
export const SEND_EMPTY_USER_CART_REQUEST_SUCCESS = "SEND_EMPTY_USER_CART_REQUEST_SUCCESS"
export const SEND_EMPTY_USER_CART_REQUEST_FAILED = "SEND_EMPTY_USER_CART_REQUEST_FAILED"

export const RESET_DELETE_CART_USER_STATE = "RESET_DELETE_CART_USER_STATE"
export const DELETE_ITEM_FROM_STATE_REQUEST = "DELETE_ITEM_FROM_STATE_REQUEST"
export const EMPTY_USER_CART_REQUEST = "EMPTY_USER_CART_REQUEST"
