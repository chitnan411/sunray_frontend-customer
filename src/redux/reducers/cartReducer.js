import {toast} from "react-hot-toast";
import uuid from "uuid/v4";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART, UPDATE_IS_AVAILABLE, EMPTY_CART, UPDATE_IS_ADDED_TO_USER_CART, SET_USER_CART_DATA
} from "../actions/cartActions";

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;

  if (action.type === ADD_TO_CART) {
    // for non variant products
    if (product.variation === undefined) {

      const cartItem = cartItems.filter((item) => item._id === product._id)[0];

      if (cartItem === undefined) {

        if(product.showAlert){
          toast.success("Added to cart",{style:{marginBottom: "40px", backgroundColor: "#012835"}})
        }

        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuid(),
          },
        ];
      }
      else {


        if(product.showAlert){

          // toast.success(`You have changed QUANTITY '${cartItem.productName || cartItem.comboName }' `,{
          //   style:{
          //     marginBottom: "40px",
          //     backgroundColor: "#012835"
          //   }
          // })

        }


        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
              }
            : item
        );
      }
      // for variant products
    } else {
      const cartItem = cartItems.filter(
        (item) =>
          item._id === product._id &&
          product.selectedProductColor &&
          product.selectedProductColor === item.selectedProductColor &&
          product.selectedProductSize &&
          product.selectedProductSize === item.selectedProductSize &&
          (product.cartItemId ? product.cartItemId === item.cartItemId : true)
      )[0];

      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuid(),
          },
        ];
      } else if (
        cartItem !== undefined &&
        (cartItem.selectedProductColor !== product.selectedProductColor ||
          cartItem.selectedProductSize !== product.selectedProductSize)
      ) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuid(),
          },
        ];
      } else {
        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
                selectedProductColor: product.selectedProductColor,
                selectedProductSize: product.selectedProductSize,
              }
            : item
        );
      }
    }
  }

  if (action.type === UPDATE_IS_AVAILABLE) {
    const {id, isAvailable} = action.payload
    console.log("action payload action payload action payload",action.payload)
    const updatedItems = cartItems.map(item => {
      if(item._id === id){
        item["isAvailable"] = isAvailable
        return item
      }
      else {
        return item
      }
    })
    return [...updatedItems]
  }


  if (action.type === UPDATE_IS_ADDED_TO_USER_CART) {
    console.log("action payload action payload action payload",action.payload)
    const {id, isAddedToUserCart} = action.payload
    const tempCartItems = [...cartItems]
    const updatedItemIndex = cartItems.findIndex(singleItem => singleItem._id === id)
    tempCartItems[updatedItemIndex] = {
      ...tempCartItems[updatedItemIndex],
      isAddedToUserCart: isAddedToUserCart
    }
    return [...tempCartItems]
  }

  if (action.type === SET_USER_CART_DATA) {
    const tempCartItems = [...action.payload]
    return [...tempCartItems]
  }

  if (action.type === DECREASE_QUANTITY) {


    if (product.quantity === 1) {
      toast.success("Removed from cart",{
        style:{
          marginBottom: "40px",
          backgroundColor: "#012835"
        }
      })
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          (cartItem) => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(cartItems, product);
    } else {

      // toast.success(`You have changed QUANTITY '${product.productName || product.comboName }' `,{
      //   style:{
      //     marginBottom: "40px",
      //     backgroundColor: "#012835"
      //   }
      // })

      return cartItems.map((item) =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }

  if (action.type === DELETE_FROM_CART) {

    console.log(product," product._id product._id product._id product._id ")
    toast.success("Removed from cart",{
      style:{
        marginBottom: "40px",
        backgroundColor: "#012835"
      }
    })
    let tempList = [...cartItems]
    let filteredList = tempList.filter(cartItem => cartItem._id !== product._id);
    return [...filteredList]
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    toast.success("Removed all from cart ",{
      style:{
        marginBottom: "40px",
        backgroundColor: "#012835"
      }
    })
    return cartItems.filter(item => {
      return false;
    });
  }

  if (action.type === EMPTY_CART) {
    return cartItems.filter(item => {return false});
  }

  return state;
};

export default cartReducer;
