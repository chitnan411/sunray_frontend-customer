import {combineReducers} from "redux";
import {ssDeleteFromCart} from "./delete/deleteCartReducer.js";
import {ssAddToCart} from "./add/ssAddToCartReducer.js";
import {ssEmptyUserCart} from "./delete/emptyCartReducer.js";
import {ssCartItemsData} from "./ssGetCartReducer.js";
import {ssUpdateCart} from "./update/ssUpdateCartReducer.js";

export const ssCartReducers = combineReducers({
    ssCartData: ssCartItemsData,
    ssAddToCart: ssAddToCart,
    ssUpdateCart: ssUpdateCart,
    ssDeleteFromCart: ssDeleteFromCart,
    ssEmptyUserCart: ssEmptyUserCart
})
