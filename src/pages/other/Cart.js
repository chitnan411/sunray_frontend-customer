import {WifiOff} from "@styled-icons/boxicons-regular/WifiOff";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle";
import PropTypes from "prop-types";
import React, {Fragment, useState, useEffect, useRef} from "react";
import {toast} from "react-hot-toast";
import {Link, withRouter} from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import {CircleWithCross} from "@styled-icons/entypo/CircleWithCross"
import {ArrowBack} from "@styled-icons/ionicons-solid/ArrowBack"
import {Discount} from  "@styled-icons/boxicons-solid/Discount"
import {Tags} from "@styled-icons/fa-solid/Tags"
import {Trash} from "@styled-icons/fa-solid/Trash"
import {RemoveShoppingCart} from "@styled-icons/material/RemoveShoppingCart"
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useCartManager} from "../../api/cart.hooks.js";
import {addToCart, decreaseQuantity, deleteFromCart, cartItemStock, deleteAllFromCart, updateIsAvailable, setUserCartData, emptyCart, updateIsAddedToUserCart,} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import {emptyUserCartRequest, removeItemFromUserState, resetDeleteUserCartState} from "../../redux/actions/ssCartActions.js";
import requestForDeleteUserCartItems from "../../redux/middlewares/cart/deleteFromUserCartMiddleware.js";
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";
import {isNotEmptyObject, isObjectEmpty} from "../../utils/commonUtils.js";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import EmptyCart from "../../assets/images/empty_cart.svg";
import axios from "axios";
import {apiRootUrl, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../utils/constants";
import Cookies from "js-cookie";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Cart = ({location,deleteItemFromUserState,resetDeleteUserCartState,ssUserCartItems, emptyCartRequestState, sendCartGetRequest,emptyGuestUserCart, userCartDeleteState, sendDeleteUserCartItems,getUserCartState, changeIsAddedOfCartItem, emptySSUserCart, updateIsAvailable, cartItems, history, currency, decreaseQuantity, addToCart, deleteFromCart, deleteAllFromCart, auth,}) => {

  const isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)

  const [quantityCount] = useState(1);
  const [delivery, setDelivery] = useState(0);
  const [affliateStatus, setAffliateStatus] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const [affiliateCode, setAffiliateCode] = useState();

  const [isCouponCodeApplied, setCouponCodeApplied] = useState(false);
  const [couponHasError, setCouponError] = useState(false)
  const [couponErrorMsg, setCouponErrorMsg] = useState("")
  const [isAffiliateCodeApplied, setAffiliateCodeApplied] = useState(false);
  const [affiliateErrorMsg, setAffiliateErrorMsg] = useState("")
  const [affiliateHasError, setAffiliateError] = useState(false)

  const [couponData, setCouponData] = useState();
  const [couponDiscountedTotal,setCouponDiscountedTotal] = useState(0)

  const [finalPrice, setFinalPrice] = useState(0);

  const [firstPriceTotal, setFirstPriceTotal] = useState(0)
  const [discountTotal,setDiscountTotal] = useState(0)
  const [grandCartTotal,setGrandTotal] = useState(0)

  const [outStockItems, setOutofStocksItems] = useState([])
  const prevCoupon = usePrevious(couponCode)
  const prevAffiliate = usePrevious(affiliateCode)
  const prevCartItems = usePrevious(cartItems)
  const { addToast } = useToasts();
  const { pathname } = location;

  const prevCartDeleteState = usePrevious(userCartDeleteState)
  const prevUserCartState = usePrevious(getUserCartState)
  const {
    getCartRequestPending,
    getCartSuccess,
    getCartFailure,
    getCartFailurePayload,
  } = getUserCartState

  async function getLoggedInUserCart(){
    await sendCartGetRequest({
      subModuleName: "cart",
      doFilter: false
    })
  }



  // MANAGE ADD TO CART OR UPDATE CART CUSTOM HOOKS

  const {
    addItemToCart,
    addToCartFailurePayload,
    addToCartFailure,
    addToCartRequestPending,
    addToCartSuccess,
    addToCartSuccessPayload,
    payloadItemId
  } = useCartManager()

  useEffect(() => {
    if( addToCartFailure === true && addToCartSuccess === false && addToCartRequestPending === false && isObjectEmpty(addToCartSuccessPayload) && isNotEmptyObject(addToCartFailurePayload)){
      toast.error(addToCartFailurePayload.message,{
        icon: addToCartFailurePayload.message.toString().includes("Connection problem") ? <WifiOff size={30} color="#FF4343"/> : <ErrorCircle size={30} color="#FF4343"/> ,
        style:{
          marginBottom: "40px"
        }
      })
      // alert("item increase or decrease error occured"+addToCartFailurePayload.message)
    }
    if(addToCartFailure === false && addToCartSuccess === true  && addToCartRequestPending === false && isNotEmptyObject(addToCartSuccessPayload) && isObjectEmpty(addToCartFailurePayload)){
      if(addToCartSuccessPayload.code === 401){
        // addToCart(product, false, true,  addToast)
        getLoggedInUserCart()

        history.push("/login")
      }
      else {
        // addToCart(product, true, true,  addToast)
        getLoggedInUserCart()
      }
    }
  },[addItemToCart,addToCartFailurePayload, addToCartFailure, addToCartRequestPending, addToCartSuccess, addToCartSuccessPayload])




  // Effect for logged in user cart data

  useEffect(() => {
    if(isAuthenticated == "true" || isAuthenticated == true){
      getLoggedInUserCart()
    }
  },[]);


  // Effect for logged in user cart data

  useEffect(()=> {
    if(isAuthenticated == "true" || isAuthenticated == true){
      if(prevUserCartState !== getUserCartState){
        if(getCartSuccess === true){

          let userCartItems = getUserCartState["cartItems"]

          //alert(cartItems.length+"cartItems.length cartItems.length cartItems.length ")
          //alert(userCartItems.length+" userCartItems.length userCartItems.length userCartItems.length userCartItems.length")

          if( userCartItems && userCartItems.length > 0){

            if((userCartItems && userCartItems.length) > cartItems.length ){

              for(let i = 0; i < userCartItems.length; i++){
                let cartItemIndex = cartItems.findIndex(singleItem => singleItem._id === userCartItems[i]._id)
                if(cartItemIndex === -1){
                  addToCart(userCartItems[i], true, false)
                }
                else {
                  if(userCartItems[i]._id == cartItems[cartItemIndex]._id){
                    if(cartItems[cartItemIndex].isAddedToUserCart === false){
                      changeIsAddedOfCartItem({id: userCartItems[i]._id, isAddedToUserCart: true })
                    }
                  }
                }
              }

            }
            else if((userCartItems && userCartItems.length) < cartItems.length ){

              for(let i = 0; i < cartItems.length; i++){
                let userItemIndex = userCartItems.findIndex(singleItem => singleItem._id === cartItems[i]._id)
                if(userItemIndex === -1){
                  deleteFromCart(cartItems[i], undefined)
                }
                else {
                  if(cartItems[i]._id == userCartItems[userItemIndex]._id){
                    if(cartItems[i].isAddedToUserCart === false){
                      changeIsAddedOfCartItem({id: cartItems[i]._id, isAddedToUserCart: true })
                    }
                  }
                }
              }

            }
            else if( (userCartItems && userCartItems.length) ==  cartItems.length ){

              //alert("both has same number of items ")
              for(let i = 0; i < userCartItems.length; i++){
                let cartItemIndex = cartItems.findIndex(singleItem => singleItem._id === userCartItems[i]._id)
                if(cartItemIndex === -1){
                  addToCart(userCartItems[i], true, false)
                  // alert("-11 matched")
                }
                else {
                  if(userCartItems[i]._id == cartItems[cartItemIndex]._id){
                    if(cartItems[cartItemIndex].isAddedToUserCart === false){
                      changeIsAddedOfCartItem({id: userCartItems[i]._id, isAddedToUserCart: true })
                    }
                    else{
                      if(cartItems[cartItemIndex].quantity !== userCartItems[i].quantity){
                        if(cartItems[cartItemIndex].quantity > userCartItems[i].quantity){
                          decreaseQuantity(cartItems[cartItemIndex], true, true, addToast)
                        }
                        else {
                          addToCart(cartItems[cartItemIndex], false, true, undefined)
                        }
                      }
                      // changeIsAddedOfCartItem({id: userCartItems[i]._id, isAddedToUserCart: true })
                    }
                  }
                }
              }

            }

          }
          else {

            setCouponData();
            setCouponCode();
            setAffiliateCode();
            setAffliateStatus(false);
            setCouponCodeApplied(false)
            setAffiliateCodeApplied(false)
            localStorage.removeItem("couponData");

            emptySSUserCart()
            emptyGuestUserCart()
          }


        }
      }
    }
  },[getUserCartState])


  // Effect for logged in user DELETE cart data

  // useEffect(() => {
  //   if(prevCartDeleteState !== userCartDeleteState){
  //     if(deleteFromSSCartSuccess === true){
  //       let itemForDel = cartItems.filter(i => i._id === deleteFromSSCartSuccessPayload.id)[0]
  //       deleteFromCart(itemForDel,null,() => {
  //         deleteItemFromUserState(deleteFromSSCartSuccessPayload.id)
  //       })
  //       resetDeleteUserCartState()
  //     }
  //   }
  // },[userCartDeleteState])

  // useEffect(() => {
  //   if(prevCartDeleteState !== userCartDeleteState){
  //     if(deleteFromSSCartSuccess === true){
  //       deleteItemFromUserState(deleteFromSSCartSuccessPayload.id)
  //       ssUserCartItems
  //     }
  //   }
  // },[])


  console.log(outStockItems,"outStockItems outStockItems outStockItems outStockItems outStockItems")


  useEffect(() => {

    let total = calcTotalPrice(cartItems);

    setFinalPrice(total);
    if (couponData) {
      applyCouponCode(couponCode, affiliateCode, cartItems);
    }
  }, [cartItems]);


  useEffect(() =>{
    setFirstPriceTotal(calcFirstPrice(cartItems))
    setDiscountTotal(calcTotalDiscountPrice(cartItems))
  },[cartItems])



  useEffect(() => {
    getDeliveryPrice(finalPrice);
  }, [finalPrice]);


// useEffect(() => {
//   if(prevCartItems !== cartItems){
//     if(cartItems.length > 0){
//       let tempArray = cartItems.filter(item => item.isAvailable == false)
//       setOutofStocksItems([...tempArray])
//     }
//   }
// },[cartItems])




  useEffect(() => {
    setGrandTotal(Math.round(firstPriceTotal) - Math.round(discountTotal) + Math.round(delivery))
    if(prevAffiliate !== affiliateCode || prevCoupon !== couponCode){}
    else{
      getDeliveryPrice(finalPrice)
    }
  })

  useEffect(() => {
    getDeliveryPrice(finalPrice)
  },[isAffiliateCodeApplied, isCouponCodeApplied])


  useEffect(() => {
    let data = localStorage.getItem("couponData");
    if (data) {
      let parsedData = JSON.parse(data);
      setCouponData(parsedData);
      // setFinalPrice(parsedData.data.subTotal);
      setCouponCode(parsedData.code);
      setCouponCodeApplied(true)
      applyCouponCode(parsedData.code, parsedData.affiliateCode, cartItems);
      if (parsedData.affiliateCode) {
        setAffiliateCode(parsedData.affiliateCode);
        setAffiliateCodeApplied(true)
        setAffliateStatus(true);
      }
    }
  }, []);


  useEffect(() => {
    if(outStockItems.length == 0){
      cartItems.map(singleCartItem => {
        updateIsAvailable({id: singleCartItem._id, isAvailable: true})
      })
    }
    else{
      outStockItems.map(outStockItem => {
        updateIsAvailable({id: outStockItem._id, isAvailable: false})
      })
    }
    console.log("outStockItems from useEffect")
  }, [outStockItems]);



  useEffect(() => {
    let tempArray = cartItems.map(item => item.isAvailable == false)
    setOutofStocksItems([...tempArray])
  }, []);



  const renderError = type => {
    if(type === "discount"){
      return couponHasError ? <div className="ss-input-error-message ml-1">{couponErrorMsg}</div>   : null
    }
    else {
      return affiliateHasError ? <div className="ss-input-error-message ml-1">{affiliateErrorMsg}</div> : null
    }
  };


// ============================================================================================================================================
//                                              DIRECT API CALLS
// ============================================================================================================================================

  const onCheckout = () => {
    let data = { product: [], combo: [] };
    if (cartItems.length) {
      cartItems.map((d) => {
        if (d.productName)
          data.product.push({ product: d._id, quantity: d.quantity });
      });

      cartItems.map((d) => {
        if (d.comboName)
          data.combo.push({ combo: d._id, quantity: d.quantity });
      });
      axios
          .post(`${apiRootUrl}/v2/admin/checkInventory`, data)
          .then((d) => {
            let name = [];

            let notAvailbleItems = []

            d.data.card &&
            d.data.card.data &&
            d.data.card.data.products &&
            d.data.card.data.products.map((d) => {
              name.push(d.productName)
              let NAProudct = cartItems.filter(item => item._id == d._id)[0]
              if (NAProudct)  notAvailbleItems.push(NAProudct)
            });

            d.data.card &&
            d.data.card.data &&
            d.data.card.data.combos &&
            d.data.card.data.combos.map((d  ) => {
              name.push(d.comboName)
              let NAComnbo = cartItems.filter(item => item._id == d._id)[0]
              if (NAComnbo) notAvailbleItems.push(NAComnbo)
            });

            if (notAvailbleItems.length > 0 ) setOutofStocksItems(notAvailbleItems)

            const isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)

            if (name.length === 0) {
              setOutofStocksItems([])
              if(!isAuthenticated || isAuthenticated === "false" || isAuthenticated === false){
                history.push("/checkout-as-guest");
              }
              else {
                history.push("/checkout");
              }
            }
            else {

              toast.error(`${name.length > 1 ? `There are ${name.length} items out of stock remove them from your cart.` : `${name[0]} is out of stock remove it from cart.`}`,{
                style:{
                  marginBottom: "40px"
                }
              })

            }
          })
          .catch((err) => {

            toast.error(`Something went wrong! Try again later.`,{
              style:{
                marginBottom: "40px"
              }
            })
            console.log(err);
          });
    }
  };





  const getDiscountedPrice = (product) => {
    let price = 0;
    let isUserLoggedIn = Cookies.get(ssClientAuthFlagCookieKey) && Cookies.get(ssClientAuthCookieKey)
    if ( ((product.crazyDealPrice) &&
        (new Date(product.crazyDealStartDate).getTime() <= new Date().getTime()) ) &&
        (new Date(product.crazyDealExpiryDate).getTime() >= new Date().getTime()) )
    {
      price = product.crazyDealPrice;
      return price
    }
    else if (
        (product.offeredPrice) &&
        (new Date(product.offerStartDate).getTime() <= new Date() ) &&
        (new Date(product.offerExpiryDate).getTime() >= new Date())
    ) {
      price = product.offeredPrice;
      return price
    }
    else {
      return product && product.price
    }
  };



  const calcTotalPrice = (data = []) => {
    let total = 0;
    data.forEach((cartItem) => {
      const discountedPrice = getDiscountedPrice(cartItem);

      if (discountedPrice) total += discountedPrice * cartItem.quantity;
      else total += cartItem.price * cartItem.quantity;
    });
    return Math.round(Number(total));
  };

  const calcTotalDiscountPrice = (data = []) => {
    let total = 0;
    let discount = 0
    data.forEach((cartItem) => {
      if(cartItem.offeredPrice){
        discount = cartItem.offeredPrice
      }
      else if(cartItem.discountedPrice){
        discount = cartItem.crazyDealPrice
      }
      else{
        discount = cartItem.price
      }
      const discountedPrice = getDiscountedPrice(cartItem)
      const originalPrice = cartItem.price
      const diff = Number(originalPrice - discountedPrice)
      // console.log("discount total => original  ",originalPrice)
      // console.log("discount total => discount  ", discountedPrice)
      // console.log("discount total => diff  ",diff)
      total += diff * cartItem.quantity;
      // console.log("discount total =>", total)
    });
    return Math.round(total)
  };

  const calcFirstPrice = (data = []) => {
    let total = 0;
    data.forEach((cartItem) => {
      total += cartItem.price * cartItem.quantity;
    });
    return Math.round(total);
  };

  let cartTotalPrice = calcTotalPrice(cartItems);

  const getDeliveryPrice = async (totalPrice) => {

    if(totalPrice <= 0){
      setDelivery(0)
    }
    else {
      try {
        let resp = await axios.get(
            `${apiRootUrl}/v2/admin/deliveryChargeForUser?subTotal=${totalPrice}`
        );
        setDelivery(resp.data.card.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const calcTotalDiscount = (data) => {
    let total = 0;
    data.forEach((cartItem) => {
      if (getDiscountedPrice(cartItem)) {
        let discount =
            Number(cartItem.price) - Number(getDiscountedPrice(cartItem));

        if (discount > 0) total += discount * cartItem.quantity;
      }
    });

    return Math.round(total);
  };

  const applyCouponCode = (code, affiliateCode, data) => {


    let subTotal = calcTotalPrice(data);
    let discount = calcTotalDiscount(data);
    let total = (Number(subTotal) + Number(discount)).toFixed(2);

    let final = {}

    let isUserLoggedIn = Cookies.get(ssClientAuthFlagCookieKey) && Cookies.get(ssClientAuthCookieKey)

    if(isUserLoggedIn){
      final = {code: code}
    }
    else {
      final = { code, subTotal, discount, total };
    }

    if (affiliateCode){
      final["affiliateCode"] = affiliateCode;
    }
    let url = `${apiRootUrl}/v2/admin/couponCodeForGuest`;
    let config = {withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}};


    if(isUserLoggedIn){
      url = `${apiRootUrl}/v2/admin/couponCodeForUser`;
    }

    if(cartItems.length > 0){
      axios
          .post(url, final, {...config})
          .then((data) => {
            let coupon = {
              code,
              data: data.data,
            };

            if (affiliateCode){
              coupon["affiliateCode"] = affiliateCode;
            }

            setCouponData(coupon);
            localStorage.setItem("couponData", JSON.stringify(coupon));
            setDiscountTotal(data.data.discount)
            // setFinalPrice(data.data.subTotal);
          })
          .catch((error) => {
            if(error.response) {
              if(error.response.data.message){
                toast.error(error.response.data.message,{
                  style:{
                    marginBottom: "40px"
                  }
                })
              }
            }
            console.log(error)
          });
    }

  };

  const validateForm = () => {

    if(affliateStatus === true){
      if(!couponCode && !affiliateCode){
        setCouponError(true)
        setCouponErrorMsg("Please enter valid coupon code")

        setAffiliateError(true)
        setAffiliateErrorMsg("Please enter valid special code")
        return false
      }
      else if (!couponCode ) {
        setCouponError(true)
        setCouponErrorMsg("Please enter valid coupon code")
        return false
      }
      else if(!affiliateCode){
        setAffiliateError(true)
        setAffiliateErrorMsg("Please enter valid special code")
        return false
      }
      else{
        setCouponError(false)
        setCouponErrorMsg("")
        setAffiliateError(false)
        setAffiliateErrorMsg("")
        return true
      }
    }
    else{
      if(!couponCode){
        setCouponError(true)
        setCouponErrorMsg("Please enter valid coupon code")
        return false
      }
      else {
        setCouponError(false)
        setCouponErrorMsg("")
        return true
      }
    }

  }

  const handleCouponSubmit = (event, errors, values) => {
    if (validateForm()) {

      let affiliate_code = affiliateCode
      const code = couponCode

      let subTotal = calcTotalPrice(cartItems);
      let discount = calcTotalDiscount(cartItems);
      let total = (Number(subTotal) + Number(discount)).toFixed(2);
      let final = {}

      let isUserLoggedIn = Cookies.get(ssClientAuthFlagCookieKey) && Cookies.get(ssClientAuthCookieKey)

      if(isUserLoggedIn){
        final = {code: code}
      }
      else {
        final = { code, subTotal, discount, total };
      }
      if (affiliate_code) {
        final["affiliateCode"] = affiliate_code;
      }

      let url = `${apiRootUrl}/v2/admin/couponCodeForGuest`;
      let config = {withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}};


      if(isUserLoggedIn){
        url = `${apiRootUrl}/v2/admin/couponCodeForUser`;
      }

      if(cartItems.length > 0) {
        axios.post(url, final, {...config})
            .then((data) => {
              let coupon = {
                code,
                data: data.data,
              };

              if (affiliate_code) {
                coupon["affiliateCode"] = affiliate_code;
                setAffiliateCodeApplied(true)
              } else {
                setCouponCodeApplied(true)
                setCouponData(coupon);
              }

              localStorage.setItem("couponData", JSON.stringify(coupon));
              setDiscountTotal(data.data.discount)
              setCouponDiscountedTotal()
              // setFinalPrice(data.data.subTotal);
            })
            .catch((error) => {
              if (error.response) {
                if (error.response.data.message) {
                  toast.error(error.response.data.message, {
                    style: {
                      marginBottom: "40px"
                    }
                  })
                }
              }
              console.log(error);
            });
      }
    }
  };

  return (
      <Fragment>
        <MetaTags>
          <title>My Cart - sunraystationers.com</title>
          <meta
              name="description"
              content="Cart page of flone react minimalist eCommerce template."
          />
        </MetaTags>

        <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
        <BreadcrumbsItem className="font-weight-bold" to={pathname}>
          My Cart
        </BreadcrumbsItem>

        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="cart-main-area pt-30 pb-100">
            <div className="container">
              {cartItems && cartItems.length >= 1 ? (
                  <Fragment>
                    <h3 className="cart-page-title">My Cart ({cartItems.length})</h3>
                    <div className="row">
                      <div className="col-12">
                        <div className="table-content table-responsive cart-table-content">
                          <table>
                            <thead>
                            <tr>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Unit Price</th>
                              <th>Qty</th>
                              <th>Subtotal</th>
                              <th>action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((cartItem, key) => {

                              console.log("cartItem cartItem cartItem cartItem ",cartItem )

                              return (
                                  <tr key={key}>
                                    <td className="product-thumbnail">
                                      <Link
                                          to={
                                            process.env.PUBLIC_URL +
                                            "/product/" +
                                            cartItem && cartItem._id
                                          }
                                      >
                                        {cartItem && cartItem.productImages && (
                                            <img
                                                className="img-fluid"
                                                height="70"
                                                width="55"
                                                src={cartItem && cartItem.productImages[0].original}
                                                alt=""
                                            />
                                        )}

                                        {cartItem && cartItem.comboImages && (
                                            <img
                                                className="img-fluid"
                                                height="70"
                                                width="55"
                                                src={cartItem && cartItem.comboImages[0].original}
                                                alt=""
                                            />
                                        )}
                                      </Link>
                                      {((cartItem && cartItem.isAvailable) !== undefined && (cartItem && cartItem.isAvailable) == false) && <div className="cart-na">Out of stock</div>}
                                    </td>

                                    <td className="product-name">
                                      <Link
                                          to={
                                            process.env.PUBLIC_URL +
                                            "/product/" +
                                            cartItem._id
                                          }
                                      >
                                        {cartItem.productName
                                            ? cartItem.productName
                                            : cartItem.comboName}
                                      </Link>
                                      {cartItem.selectedProductColor &&
                                      cartItem.selectedProductSize ? (
                                          <div className="cart-item-variation">
                                      <span>
                                        Color: {cartItem.selectedProductColor}
                                      </span>
                                            <span>
                                        Size: {cartItem.selectedProductSize}
                                      </span>
                                          </div>
                                      ) : (
                                          ""
                                      )}
                                    </td>

                                    {/*{*/}
                                    {/*  (isAuthenticated == true || isAuthenticated == "true")*/}
                                    {/*      ?*/}
                                    {/*      <td className="product-price-cart">*/}
                                    {/*        <p>*/}
                                    {/*          {*/}
                                    {/*            ( (cartItem && cartItem.crazyDealPrice) ||*/}
                                    {/*                ((cartItem && cartItem.offeredPrice) && (cartItem && cartItem.offeredPrice) !== (cartItem && cartItem.price) )*/}
                                    {/*            )*/}
                                    {/*                ?*/}
                                    {/*                <>*/}
                                    {/*        <span*/}
                                    {/*            style={{*/}
                                    {/*              textDecorationLine: "line-through",*/}
                                    {/*              paddingRight: 8,*/}
                                    {/*              opacity: 0.7,*/}
                                    {/*            }}*/}
                                    {/*        >*/}
                                    {/*          {new Intl.NumberFormat('en-IN', {*/}
                                    {/*            style: 'currency',*/}
                                    {/*            currency: 'INR'*/}
                                    {/*          }).format( (cartItem && cartItem.price) )}*/}
                                    {/*        </span>*/}
                                    {/*                  <span>*/}

                                    {/*              {new Intl.NumberFormat('en-IN', {*/}
                                    {/*                style: 'currency',*/}
                                    {/*                currency: 'INR'*/}
                                    {/*              }).format( Math.round((cartItem && cartItem.offeredPrice) || (cartItem && cartItem.crazyDealPrice)) )}*/}

                                    {/*            </span>*/}
                                    {/*                </>*/}
                                    {/*                : <>*/}
                                    {/*            <span>*/}
                                    {/*              {new Intl.NumberFormat('en-IN', {*/}
                                    {/*                style: 'currency',*/}
                                    {/*                currency: 'INR'*/}
                                    {/*              }).format( (cartItem && cartItem.price) )}*/}
                                    {/*              </span>*/}
                                    {/*                </>*/}
                                    {/*          }*/}
                                    {/*        </p>*/}
                                    {/*      </td>*/}
                                    {/*      :*/}
                                    <td className="product-price-cart">
                                      <p>
                                        {
                                          (  ( (cartItem && cartItem.crazyDealPrice)
                                              && new Date(cartItem && cartItem.crazyDealStartDate).getTime() <= new Date().getTime()
                                              && new Date(cartItem && cartItem.crazyDealExpiryDate).getTime() >= new Date().getTime() )
                                              ||
                                              ( (cartItem && cartItem.offeredPrice)
                                                  && ( new Date(cartItem && cartItem.offerStartDate).getTime() <= new Date().getTime() )
                                                  && ( new Date(cartItem && cartItem.offerExpiryDate).getTime() >= new Date().getTime() ) )  )
                                              ?
                                              <>
                                            <span
                                                style={{
                                                  textDecorationLine: "line-through",
                                                  paddingRight: 8,
                                                  opacity: 0.7,
                                                }}
                                            >
                                              {new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR'
                                              }).format( (cartItem && cartItem.price) )}
                                            </span>
                                                <span>

                                                  {new Intl.NumberFormat('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR'
                                                  }).format((cartItem && cartItem.offeredPrice) || (cartItem && cartItem.crazyDealPrice) )}

                                                </span>
                                              </>
                                              : <>
                                                <span>
                                                  {new Intl.NumberFormat('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR'
                                                  }).format( (cartItem && cartItem.price) )}
                                                  </span>
                                              </>
                                        }
                                      </p>
                                    </td>
                                    {/*}*/}

                                    <td className="product-quantity">
                                      <div className="cart-plus-minus ">
                                        <button
                                            className={`dec qtybutton ${

                                                addToCartFailure === false &&
                                                addToCartSuccess === false &&
                                                addToCartRequestPending === true &&
                                                isObjectEmpty(addToCartSuccessPayload) &&
                                                isObjectEmpty(addToCartFailurePayload) &&
                                                payloadItemId == cartItem._id ? "cursor-na" : ""
                                            }`}
                                            disabled={
                                              addToCartFailure === false &&
                                              addToCartSuccess === false &&
                                              addToCartRequestPending === true &&
                                              isObjectEmpty(addToCartSuccessPayload) &&
                                              isObjectEmpty(addToCartFailurePayload) &&
                                              payloadItemId == cartItem._id
                                            }
                                            onClick={async () =>{
                                              if( parseInt(cartItem.quantity) <= parseInt(cartItem.minimumBuyableQuantity) ){

                                                toast.error("Sorry! We can't sell less units for this item.",{
                                                  style:{
                                                    marginBottom: "40px"
                                                  }
                                                })

                                              }
                                              else {

                                                if(isAuthenticated == true || isAuthenticated == "true"){
                                                  if(parseInt(cartItem.quantity) == 1){
                                                    await sendDeleteUserCartItems({
                                                      multiple: false,
                                                      data: {...cartItem}
                                                    })
                                                  }
                                                  else {
                                                    await addItemToCart(cartItem, parseInt(cartItem && cartItem.quantity) - 1)
                                                  }
                                                }
                                                else{
                                                  decreaseQuantity(cartItem, false, true, addToast)
                                                }


                                              }
                                            }}
                                        >
                                          -
                                        </button>
                                        {
                                          (addToCartFailure === false &&
                                              addToCartSuccess === false &&
                                              addToCartRequestPending === true &&
                                              isObjectEmpty(addToCartSuccessPayload) &&
                                              isObjectEmpty(addToCartFailurePayload)) &&
                                          payloadItemId == cartItem._id
                                              ?  <div id="ss-cart-spinner" /> :  <input
                                                  className="cart-plus-minus-box"
                                                  type="text"
                                                  value={cartItem.quantity}
                                                  readOnly
                                              />
                                        }
                                        <button
                                            className={`inc qtybutton ${

                                                addToCartFailure === false &&
                                                addToCartSuccess === false &&
                                                addToCartRequestPending === true &&
                                                isObjectEmpty(addToCartSuccessPayload) &&
                                                isObjectEmpty(addToCartFailurePayload) &&
                                                payloadItemId == cartItem._id ? "cursor-na" : ""
                                            }`}
                                            disabled={
                                              addToCartFailure === false &&
                                              addToCartSuccess === false &&
                                              addToCartRequestPending === true &&
                                              isObjectEmpty(addToCartSuccessPayload) &&
                                              isObjectEmpty(addToCartFailurePayload) &&
                                              payloadItemId == cartItem._id
                                            }
                                            onClick={ async () =>{
                                              if( parseInt(cartItem.quantity) >= parseInt(cartItem.maximumBuyableQuantity) ){

                                                toast.error("Sorry! We don't have any more units for this item.",{
                                                  style:{
                                                    marginBottom: "40px"
                                                  }
                                                })

                                              }
                                              else {
                                                if(isAuthenticated == true || isAuthenticated == "true"){
                                                  await addItemToCart(cartItem, parseInt(cartItem && cartItem.quantity) + 1)
                                                }
                                                else {
                                                  addToCart(cartItem, false, true, addToast, quantityCount)
                                                }
                                              }

                                            }
                                            }
                                            disabled={
                                              cartItem !== undefined &&
                                              cartItem.quantity &&
                                              cartItem.quantity >=
                                              cartItemStock(
                                                  cartItem,
                                                  cartItem.selectedProductColor,
                                                  cartItem.selectedProductSize
                                              )
                                            }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </td>
                                    <td className="product-subtotal">

                                      <p>
                                        {
                                          (  ( (cartItem && cartItem.crazyDealPrice)
                                              && new Date(cartItem && cartItem.crazyDealStartDate).getTime() <= new Date().getTime()
                                              && new Date(cartItem && cartItem.crazyDealExpiryDate).getTime() >= new Date().getTime() )
                                              ||
                                              ( (cartItem && cartItem.offeredPrice)
                                                  && ( new Date(cartItem && cartItem.offerStartDate).getTime() <= new Date().getTime() )
                                                  && ( new Date(cartItem && cartItem.offerExpiryDate).getTime() >= new Date().getTime() ) )  )
                                              ?
                                              <>
                                              <span>

                                                  {new Intl.NumberFormat('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR'
                                                  }).format( ((cartItem && cartItem.offeredPrice) || (cartItem && cartItem.crazyDealPrice)) * Number(cartItem.quantity)  )}


                                                </span>
                                              </>
                                              : <>
                                                <span>
                                                  {new Intl.NumberFormat('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR'
                                                  }).format( ((cartItem && cartItem.price) * Number(cartItem.quantity)) )}
                                                  </span>
                                              </>
                                        }
                                      </p>
                                    </td>

                                    <td className="product-remove">
                                      <button
                                          onClick={async () =>{
                                            if(isAuthenticated == true || isAuthenticated == "true"){
                                              await sendDeleteUserCartItems({
                                                multiple: false,
                                                data: {...cartItem}
                                              })
                                            }
                                            else {
                                              deleteFromCart(cartItem, addToast)
                                            }
                                          }}
                                      >
                                        <Trash color="#012835" size={20} className="mb-1"/>
                                      </button>
                                    </td>
                                  </tr>
                              );
                            })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="cart-shiping-update-wrapper">
                          <div className="cart-shiping-update">
                            <Link to={"/products"} style={{
                              color: "#012835",
                              background: "#e6e6e6"
                            }} className="py-2 px-4" color="#fff" type="button">
                              <ArrowBack className="mr-2 mb-1" size={20} />Continue Shopping
                            </Link>
                            {/*<Link >*/}
                            {/*  Continue Shopping*/}
                            {/*</Link>*/}
                          </div>
                          <div className="cart-clear">
                            <button onClick={ async () => {
                              if(isAuthenticated == true || isAuthenticated == "true"){
                                await sendDeleteUserCartItems({
                                  multiple: true,
                                  data:{
                                    all: true
                                  }
                                })
                              }
                              else {
                                await deleteAllFromCart(addToast)
                              }
                              setCouponData();
                              setCouponCode();
                              setAffiliateCode();
                              setAffliateStatus(false);
                              setCouponCodeApplied(false)
                              setAffiliateCodeApplied(false)
                              localStorage.removeItem("couponData");
                            }}>
                              {
                                emptyCartRequestState.emptyUserCartRequestPending === true
                                    ? <div id="ss-sm-spinner" />
                                    :
                                    <>
                                      <RemoveShoppingCart className="mr-2 mb-1" size={20}/>
                                      Clear Shopping Cart
                                    </>
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="discount-code-wrapper">
                          <h4 style={{fontSize:"19px !important"}} className=" text-dark font-weight-bolder">
                            Apply Coupons
                          </h4>
                          <div className="discount-code text-dark">
                            { !isCouponCodeApplied &&  <p>Enter your coupon code if you have one.</p>}
                            {

                            }
                            <Form onSubmit={(e) => {e.preventDefault()}}>

                              { !isCouponCodeApplied && <FormGroup className="form-label-group">
                                <Input
                                    id="couponCode"
                                    className={couponHasError ? "ss-input-has-error" : ""}
                                    type="text"
                                    value={couponCode}
                                    name="couponCode"
                                    placeholder="COUPON CODE"
                                    onChange={
                                      (e) => {
                                        setCouponCode(e.target.value)
                                      }
                                    }
                                />
                                {renderError("discount")}
                              </FormGroup>}


                              { affliateStatus && !isAffiliateCodeApplied &&
                              <FormGroup className="form-label-group">
                                <Label className="pl-1">Special code</Label>
                                <Input
                                    id="affiliateCode"
                                    className={ affiliateHasError ? "ss-input-has-error" : "" }
                                    type="text"
                                    value={affiliateCode}
                                    name="affiliateCode"
                                    placeholder="Ex. REFER10"
                                    onChange={
                                      (e) => {
                                        setAffiliateCode(e.target.value)
                                      }
                                    }
                                />
                                {renderError("affiliate")}
                              </FormGroup>
                              }

                              { (!affliateStatus && isCouponCodeApplied) && <p className="pl-1">
                                Have a special code ? <a className="text-primary"
                                                          onClick={() => (setAffliateStatus(true))}>apply now.</a>
                              </p>}

                              { affliateStatus && !isAffiliateCodeApplied && <p className="pl-1">
                                Don't have a special code ? <a className="text-primary"
                                                               onClick={() => (setAffliateStatus(false))}>No.</a>
                              </p>}

                              { (!isCouponCodeApplied && !isAffiliateCodeApplied) && <Button onClick={handleCouponSubmit} className="py-2 w-60 px-4" color="ss-dark"
                                                                                             type="button">
                                Apply Coupon
                              </Button>}


                              { (affliateStatus &&  isCouponCodeApplied && !isAffiliateCodeApplied) && <Button onClick={handleCouponSubmit} className="py-2 w-60 px-4" color="ss-dark"
                                                                                                               type="button">
                                Apply Coupon
                              </Button>}

                              { isCouponCodeApplied &&
                              <div className="coupon-applied-green mt-4 d-flex flex-row justify-content-between">
                                <div>
                                <span style={{
                                  textTransform: "uppercase"
                                }}>
                                  <Discount className="mr-2" size={25}/>
                                  {couponCode}
                                </span>
                                  {" "}applied.
                                </div>
                                <div>
                                  <CircleWithCross onClick={() => {
                                    setCouponData();
                                    setCouponCode();
                                    setAffiliateCode();
                                    setAffliateStatus(false);
                                    setCouponCodeApplied(false)
                                    setAffiliateCodeApplied(false)
                                    setDiscountTotal( calcTotalDiscount(cartItems))
                                    localStorage.removeItem("couponData");
                                  }} size={19}/>
                                </div>
                              </div>}

                              { isAffiliateCodeApplied &&
                              <div className="coupon-applied-green mt-4 d-flex flex-row justify-content-between">
                                <div >
                                <span style={{
                                  textTransform: "uppercase"
                                }}>
                                  <Tags className="mr-2" size={25} />
                                  {affiliateCode}
                                </span>
                                  {" "}applied.
                                </div>
                                <div>
                                  <CircleWithCross
                                      onClick={() => {
                                        setCouponData();
                                        setCouponCode();
                                        setAffiliateCode();
                                        setAffliateStatus(false);
                                        setCouponCodeApplied(false)
                                        setAffiliateCodeApplied(false)
                                        setDiscountTotal(( calcTotalDiscount(cartItems)))
                                        localStorage.removeItem("couponData");
                                      }} size={19} />
                                </div>
                              </div>
                              }

                            </Form>


                            {/*<AvForm*/}
                            {/*    onSubmit={handleCouponSubmit}*/}
                            {/*>*/}
                            {/*  <AvField*/}
                            {/*      name="code"*/}
                            {/*      placeholder={"Coupon Code"}*/}
                            {/*      required*/}
                            {/*      style={{ marginBottom: 0 }}*/}
                            {/*  />*/}
                            {/*  */}
                            {/*  <button className="cart-btn-2" type="submit">*/}
                            {/*    Apply Coupon*/}
                            {/*  </button>*/}

                            {/*  {affliateStatus && (*/}
                            {/*      <AvField*/}
                            {/*          name="affiliateCode"*/}
                            {/*          placeholder={"Affilate Code"}*/}
                            {/*      />*/}
                            {/*  )}*/}


                            {/*  {!affliateStatus && (*/}
                            {/*      <a*/}
                            {/*          style={{*/}
                            {/*            marginTop: 8,*/}
                            {/*            padding: "0 12px",*/}
                            {/*            opacity: 0.7,*/}
                            {/*            display: "block",*/}
                            {/*          }}*/}
                            {/*          onClick={() => setAffliateStatus(true)}*/}
                            {/*      >*/}
                            {/*        Enter Affiliate Code*/}
                            {/*      </a>*/}
                            {/*  )}*/}
                            {/*</AvForm>*/}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12">
                        <div className="grand-totall">

                          <h4 style={{fontSize:"19px !important"}} className="cart-bottom-title font-weight-bolder text-dark ">
                            Price Details
                          </h4>

                          <h5>
                            Price ( {cartItems.length} items )
                            <span>
                                {new Intl.NumberFormat('en-IN', {
                                  style: 'currency',
                                  currency: 'INR'
                                }).format( firstPriceTotal )}
                            </span>
                          </h5>

                          <h5>
                            Discount
                            <span>
                            -{new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR'
                            }).format( calcTotalDiscount(cartItems) )}
                            </span>
                          </h5>

                          { (discountTotal - calcTotalDiscount(cartItems) !== 0 && discountTotal - calcTotalDiscount(cartItems) > 0)
                          &&
                          <h5>
                            Coupon Discount
                            <span>
                            -{new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR'
                            }).format( Math.round(discountTotal - calcTotalDiscount(cartItems)) )}
                            </span>
                          </h5>
                          }

                          <h5>
                            Delivery Charges :
                            <span>
                            {new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR'
                            }).format( delivery )}
                            </span>
                          </h5>


                          <h4 className="grand-totall-title font-weight-bolder">
                            Total Amount
                            <span className="font-weight-bolder">
                              {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                              }).format( grandCartTotal )}
                            </span>
                          </h4>

                          <Button onClick={onCheckout} className="py-2 w-100 text-uppercase px-4" color="ss-dark" type="button">
                            Proceed to Checkout
                          </Button>
                          {/*{ outStockItems.length > 0 &&*/}
                          {/*    <div className="d-flex flex-row justify-content-between">*/}
                          {/*      <div>*/}
                          {/*        <p className="ss-na-text font-weight-bolder font">*Note: </p>*/}
                          {/*      </div>*/}
                          {/*      <div>*/}
                          {/*        <p className="ss-na-text pl-1"> Cart contains some not available products remove them from your cart to place the order.</p>*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*}*/}
                          {/*<Link to={"/checkout"}>Proceed to Checkout</Link>*/}
                        </div>
                      </div>
                    </div>
                  </Fragment>
              ) : (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="item-empty-area text-center">
                        <div className="item-empty-area__icon mt-50 mb-10">
                          <img alt={"empty cart"} width={179} src={EmptyCart} />
                        </div>
                        <div className="item-empty-area__text">
                          <h3 className="text-dark mt-30 mb-0 pb-0 ">
                            Hey, it feels so light!
                          </h3>{" "}
                          <p>There is nothing in your cart. Let's add some items.</p>
                          <Link to={"/products"}>Add items</Link>
                        </div>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </LayoutOne>
      </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    getUserCartState: state.ssCart.ssCartData,
    emptyCartRequestState: state.ssCart.ssEmptyUserCart,
    ssUserCartItems: state.ssCart.ssCartData.cartItems,
    userCartDeleteState: state.ssCart.ssDeleteFromCart,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, isAddedToUserCart, showAlert, addToast, quantityCount) => {dispatch(addToCart(item, isAddedToUserCart, showAlert, addToast, quantityCount));},
    emptyGuestUserCart: () => {dispatch(emptyCart())},
    emptySSUserCart: () => {dispatch(emptyUserCartRequest())},
    resetDeleteUserCartState: () => dispatch(resetDeleteUserCartState()),
    changeIsAddedOfCartItem: (requestedPayload) => dispatch(updateIsAddedToUserCart(requestedPayload)),
    deleteItemFromUserState: (requestedPayload) => {dispatch(removeItemFromUserState(requestedPayload))},
    sendCartGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
    sendDeleteUserCartItems: (requestedPayload) => dispatch(requestForDeleteUserCartItems(requestedPayload)),
    updateIsAvailable: (data) => {dispatch(updateIsAvailable(data))},
    decreaseQuantity: (item, addToast) => {dispatch(decreaseQuantity(item, addToast));},
    deleteFromCart: (item, addToast) => {dispatch(deleteFromCart(item, addToast));},
    deleteAllFromCart: (addToast) => {dispatch(deleteAllFromCart(addToast));},
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));