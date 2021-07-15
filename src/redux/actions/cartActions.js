import {toast} from "react-hot-toast";

export const ADD_TO_CART = "ADD_TO_CART";
export const SET_USER_CART_DATA = "SET_USER_CART_DATA"
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const UPDATE_IS_AVAILABLE = "UPDATE_IS_AVAILABLE";
export const EMPTY_CART = "EMPTY_CART";
export const UPDATE_IS_ADDED_TO_USER_CART = "UPDATE_IS_ADDED_TO_USER_CART"

//add to cart
export const addToCart = (item, isAddedToUserCart, showAlert, addToast, quantityCount, selectedProductColor,selectedProductSize) => {
  // console.log(item);
  console.log(quantityCount,"quantityCount, quantityCount,quantityCount,quantityCount,quantityCount,quantityCount,quantityCount, ");
  // alert(item.toString(), "item tem asa,ma s")
  // alert(isAddedToUserCart.toString() + " <===isAddedToUserCart, isAddedToUserCart, isAddedToUserCart, isAddedToUserCart,")
  // alert("show alret ",showAlert.toString())
  // alert(addToast,"addToast, addToast, addToast,")

  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
        isAvailable: true,
        showAlert: showAlert,
        isAddedToUserCart: isAddedToUserCart,
        selectedProductColor: selectedProductColor
            ? selectedProductColor
            : item.selectedProductColor
                ? item.selectedProductColor
                : null,
        selectedProductSize: selectedProductSize
            ? selectedProductSize
            : item.selectedProductSize
                ? item.selectedProductSize
                : null,
      },
    });
  };
};


export const setUserCartData = (data) => {
  console.log(data,"action payload action payload action payload from actions ")
  return (dispatch) => {
    dispatch({ type: SET_USER_CART_DATA, payload: data });
  };
};


//update is available
export const updateIsAvailable = (data) => {
  console.log(data,"action payload action payload action payload from actions ")
  return (dispatch) => {
    dispatch({ type: UPDATE_IS_AVAILABLE, payload: data });
  };
};


//update is added to user cart
export const updateIsAddedToUserCart = (data) => {
  console.log(data,"action payload action payload action payload from actions ")
  // alert(data.isAddedToUserCart+" isAddedToUserCart isAddedToUserCart isAddedToUserCart")
  return (dispatch) => {
    dispatch({ type: UPDATE_IS_ADDED_TO_USER_CART, payload: data });
  };
};



//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
  dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (itemForDelete, addToast) => {
  console.log(itemForDelete,"deltete cart itemForDelete delete cart irem ")
  return (dispatch) => {
    dispatch({ type: DELETE_FROM_CART, payload: itemForDelete });
  };
};
//delete all from cart
export const deleteAllFromCart = (addToast) => {
  return (dispatch) => {
    if (addToast) {
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};


export const emptyCart = () => {
  return (dispatch) => {
    dispatch({ type: EMPTY_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else if (item.variation) {
    return item.variation
        .filter((single) => single.color === color)[0]
        .size.filter((single) => single.name === size)[0].stock;
  }
};
