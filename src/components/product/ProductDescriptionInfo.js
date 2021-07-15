import {WifiOff} from "@styled-icons/boxicons-regular/WifiOff";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle";
import {ArrowRight2} from "@styled-icons/icomoon/ArrowRight2";
import {convertFromRaw} from "draft-js";
import {stateToHTML} from "draft-js-export-html";
import he from "he";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {toast} from "react-hot-toast";
import {Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import {useCartManager} from "../../api/cart.hooks.js";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import {getPercentageCount, isNotEmptyObject, isObjectEmpty} from "../../utils/commonUtils.js";
import {ssClientAuthFlagCookieKey} from "../../utils/constants.js";
import {ShoppingBag} from "@styled-icons/heroicons-solid/ShoppingBag"

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ProductDescriptionInfo = ({product,  history,  cartItems,  addToast, addToCart }) => {
  const [selectedProductColor, setSelectedProductColor] = useState(
      product && product.variation ? product && product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(product && product.variation ? product && product.variation[0].size[0].name : "");
  const [productStock, setProductStock] = useState(product && product.variation ? product && product.variation[0].size[0].stock : product && product.stock);
  const [quantityCount, setQuantityCount] = useState(1);

  const prevCartItems = usePrevious(cartItems)
  const prevSingleProduct = usePrevious(product)

  const isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)
  const {
    addItemToCart,
    addToCartFailurePayload,
    addToCartFailure,
    addToCartRequestPending,
    addToCartSuccess,
    addToCartSuccessPayload
  } = useCartManager()

  useEffect(() => {
    if( addToCartFailure === true && addToCartSuccess === false && addToCartRequestPending === false && isObjectEmpty(addToCartSuccessPayload) && isNotEmptyObject(addToCartFailurePayload)){

      toast.error(addToCartFailurePayload.message,{
        icon: addToCartFailurePayload.message.toString().includes("Connection problem") ? <WifiOff size={30} color="#FF4343"/> : <ErrorCircle size={30} color="#FF4343"/> ,
        style:{
          marginBottom: "40px"
        }
      })
    }
    if(addToCartFailure === false && addToCartSuccess === true  && addToCartRequestPending === false && isNotEmptyObject(addToCartSuccessPayload) && isObjectEmpty(addToCartFailurePayload)){
      if(addToCartSuccessPayload.code === 401){
        history.push("/login")
        addToCart(product, false, true,  addToast)
      }
      else {
        addToCart(product, true, true,  addToast)
      }
    }
  },[addItemToCart,addToCartFailurePayload, addToCartFailure, addToCartRequestPending, addToCartSuccess, addToCartSuccessPayload])



  const [cartItem,setCartItem] = useState({})

  useEffect(() => {
    if(prevCartItems !== cartItems){
      setCartItem(cartItems.filter((cartItem) => cartItem._id === product._id)[0])
    }
    if(prevSingleProduct !== product){
      setCartItem(cartItems.filter((cartItem) => cartItem._id === product._id)[0])
    }
  },[product, cartItems])


  let isDiscountedPrice = false
  let isCrazyDealPrice = false

  const getPrice = (product) => {
    let price = 0;
    // console.log("offer condition =>",product._id, new Date(product.offerStartDate).getTime() <= new Date().getTime() )
    if (( (product && product.crazyDealPrice) && new Date(product && product.crazyDealStartDate).getTime() <= new Date().getTime()) && new Date(product && product.crazyDealExpiryDate).getTime() >= new Date().getTime())
    {
      price = product.crazyDealPrice;
      isCrazyDealPrice = true
    }
    else if ( (product && product.offeredPrice) && ( new Date(product && product.offerStartDate).getTime() <= new Date().getTime() ) && ( new Date(product && product.offerExpiryDate).getTime() >= new Date().getTime() ) )
    {
      price = product.offeredPrice;
      isDiscountedPrice = true
    }
    else{
      price = product && product.price;
      isCrazyDealPrice = false
      isDiscountedPrice = false
    }
    return price;
  };



  return (
      <div className="product-details-content py-2 ml-70">
        <h2 className="productView-title">{product && product.productName}</h2>
        {
          ( (product && product.crazyDealPrice)
              && new Date(product && product.crazyDealStartDate).getTime() <= new Date().getTime()
              && new Date(product && product.crazyDealExpiryDate).getTime() >= new Date().getTime() )
          &&
          <>
            <div className="xcelerator-pdpXceleratorImageTag">CRAZY DEAL ON</div>
          </>
        }

        <a href={`/products/?brand=${product && product.brand && product.brand._id}`} className="productView-brand py-2">{product && product.brand && product.brand.brandName}</a>
        <div className="product-details-price">
          <Fragment>
                      <span>
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR'
                        }).format( getPrice(product))}
                      </span>{" "}
            { (isDiscountedPrice || isCrazyDealPrice)  &&
            <>
                      <span className="old">
                            {new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR'
                            }).format(product.price)}
                      </span>
              <span className="text-discount-percentage">
                        ({getPercentageCount(product)}% OFF)
                        </span>
            </>
            }
          </Fragment>
        </div>


        {( product && product.highLights && product.highLights && product.highLights.length > 0) &&
        <div className="pro-details-list">
          <div className="px-4"
               dangerouslySetInnerHTML={{__html: stateToHTML(convertFromRaw(JSON.parse(he.decode(product && product.highLights))))}}></div>
        </div>
        }



        <div>
        <span>
          * {product && product.refundable ? "Easy return is available." : "No refund or returns is availble."}
        </span>
          <br/>
          <span>
          * {product && product.cancelAvailable ? "Order cancellation is available." : "Order cancellation is not available."}
        </span>
        </div>

        <hr/>


        {product && product.affiliateLink ? (
            <div className="pro-details-quality">
              <div className="pro-details-cart btn-hover ml-0">
                <a
                    href={product && product.affiliateLink}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                  Buy Now
                </a>
              </div>
            </div>
        ) : (
            <div className="pro-details-quality">
              <div className="pro-details-cart btn-hover w-50">
                {product && product.quantity > 0 ? (
                    <button
                        className={`w-100 ${
                            (addToCartFailure === false &&
                                addToCartSuccess === false &&
                                addToCartRequestPending === true &&
                                isObjectEmpty(addToCartSuccessPayload) &&
                                isObjectEmpty(addToCartFailurePayload)) ? "cursor-na" : ""
                        }`}
                        onClick={ async () =>
                        {
                          if (cartItem !== undefined && cartItem.quantity > 0) {
                            history.push("/cart")
                          }
                          else{
                            if(isAuthenticated == "true" ||isAuthenticated == true){
                              await addItemToCart(product, 1)
                            }
                            else {
                              addToCart(product, false, true, addToast)
                            }
                          }
                        }}
                    >
                      {" "}
                      {
                        (addToCartFailure === false &&
                            addToCartSuccess === false &&
                            addToCartRequestPending === true &&
                            isObjectEmpty(addToCartSuccessPayload) &&
                            isObjectEmpty(addToCartFailurePayload))
                            ?
                            <div id="ss-sm-spinner" />
                            :
                            cartItem !== undefined && cartItem.quantity > 0
                                ?
                                <>
                                  Go to cart <ArrowRight2 className="ml-2 mb-1" size={20}/>
                                </>
                                :
                                <>
                                  <ShoppingBag className="mr-2 mb-1" size={20}/> Add to cart
                                </>
                      }
                      {" "}
                    </button>
                ) : (
                    <button disabled className="w-100">Out of Stock</button>
                )}
              </div>
              {/*<div className="pro-details-wishlist">*/}
              {/*  <button*/}
              {/*      className={wishlistItem !== undefined ? "active" : ""}*/}
              {/*      disabled={wishlistItem !== undefined}*/}
              {/*      title={*/}
              {/*        wishlistItem !== undefined*/}
              {/*            ? "Added to wishlist"*/}
              {/*            : "Add to wishlist"*/}
              {/*      }*/}
              {/*      onClick={() => addToWishlist(product, addToast)}*/}
              {/*  >*/}
              {/*    <i className="pe-7s-like" />*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
        )}
        {product && product.category ? (
            <div className="pro-details-meta">
              <span>Categories :</span>
              <ul>
                {product && product.category.map((single, key) => {
                  return (
                      <li key={key}>
                        <Link to={"/shop-grid-standard"}>
                          {single}
                        </Link>
                      </li>
                  );
                })}
              </ul>
            </div>
        ) : (
            ""
        )}
        {product && product.tag ? (
            <div className="pro-details-meta">
              <span>Tags :</span>
              <ul>
                {product && product.tag.map((single, key) => {
                  return (
                      <li key={key}>
                        <Link to={"/shop-grid-standard"}>
                          {single}
                        </Link>
                      </li>
                  );
                })}
              </ul>
            </div>
        ) : (
            ""
        )}

        <div className="pro-details-social">
          <ul>
            <li>
              <a href="https://www.facebook.com/sunray.stationers/" title="Instagram">
                <i className="fa fa-facebook text-primary" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com/sunray.stationers?igshid=lttzxenfps3z" title="Instagram">
                <i className="fa fa-instagram text-primary" />
              </a>
            </li>

          </ul>
        </div>
      </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount, selectedProductColor, selectedProductSize) => {dispatch(addToCart(item, addToast, quantityCount, selectedProductColor, selectedProductSize))},
    addToWishlist: (item, addToast) => {dispatch(addToWishlist(item, addToast))},
    addToCompare: (item, addToast) => {dispatch(addToCompare(item, addToast))}
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ProductDescriptionInfo));
