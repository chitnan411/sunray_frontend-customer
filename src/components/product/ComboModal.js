import {WifiOff} from "@styled-icons/boxicons-regular/WifiOff";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle";
import {ShoppingBag} from "@styled-icons/heroicons-solid/ShoppingBag";
import {ArrowRight2} from "@styled-icons/icomoon/ArrowRight2";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import {toast} from "react-hot-toast";
import Swiper from "react-id-swiper";
import {Link, withRouter} from "react-router-dom";
import {useCartManager} from "../../api/cart.hooks.js";
import { getProductCartQuantity } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import {getPercentageCount, isNotEmptyObject, isObjectEmpty} from "../../utils/commonUtils.js";
import {ssClientAuthFlagCookieKey} from "../../utils/constants.js";
import Rating from "./sub-components/ProductRating";
import { connect } from "react-redux";
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from "draft-js-export-html";
import he from "he"
import {Facebook} from "@styled-icons/boxicons-logos/Facebook";
import {GooglePlus} from "@styled-icons/boxicons-logos/GooglePlus";
import {Instagram} from "@styled-icons/boxicons-logos/Instagram";
import {Twitter} from "@styled-icons/boxicons-logos/Twitter";

function ComboModal(props) {
  const { product } = props;
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
        props.history.push("/login")
        addToCart(product, false, true,  addToast)
      }
      else {
        addToCart(product, true, true,  addToast)
      }
    }
  },[addItemToCart,addToCartFailurePayload, addToCartFailure, addToCartRequestPending, addToCartSuccess, addToCartSuccessPayload])


  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [selectedProductColor, setSelectedProductColor] = useState(
      product && product.variation ? product && product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
      product && product.variation ? product && product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(product && product.quantity );
  const [quantityCount, setQuantityCount] = useState(1);

  const wishlistItem = props.wishlistitem;
  const compareItem = props.compareitem;

  const addToCart = props.addtocart;
  const addToWishlist = props.addtowishlist;
  const addToCompare = props.addtocompare;

  const addToast = props.addtoast;
  const cartItems = props.cartitems;
  const [cartItem,setCartItem] = useState({})

  const productCartQty = getProductCartQuantity(
      cartItems,
      product,
      selectedProductColor,
      selectedProductSize
  );


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
      price = product.price;
      isCrazyDealPrice = false
      isDiscountedPrice = false
    }
    return price;
  };


  useEffect(() => {
    if (gallerySwiper !== null &&
        gallerySwiper.controller &&
        thumbnailSwiper !== null &&
        thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);



  useEffect(() => {
    setCartItem(cartItems.filter((cartItem) => cartItem._id === product._id)[0])
  },[cartItems])

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    loop: true
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
        <button className="swiper-button-prev ht-swiper-button-nav">
          <i className="pe-7s-angle-left" />
        </button>
    ),
    renderNextButton: () => (
        <button className="swiper-button-next ht-swiper-button-nav">
          <i className="pe-7s-angle-right" />
        </button>
    )
  };

  return (
      <Fragment>
        <Modal
            show={props.show}
            onHide={props.onHide}
            className="product-quickview-modal-wrapper"
        >
          <Modal.Header closeButton></Modal.Header>{props.onHide}

          <div className="modal-body">
            <div className="row">
              <div className="col-md-5 col-sm-12 col-xs-12">
                <div className="product-large-image-wrapper">
                  {(product && product.comboImages && product && product.comboImages.length > 1 )?
                      <Swiper {...gallerySwiperParams}>
                        {(product && product.comboImages && product && product.comboImages.length) &&
                        product && product.comboImages.map((single, key) => {
                          return (
                              <div key={key}>
                                <div className="single-image">
                                  <img
                                      src={single["original"]}
                                      className="img-fluid"
                                      alt={single["fileName"]}
                                  />
                                </div>
                              </div>
                          );
                        })}
                      </Swiper>
                      :  <img
                          src={product && product.comboImages[0]["original"]}
                          className="img-fluid"
                          alt={product && product.comboImages[0]["fileName"]}
                      />
                  }
                </div>
                {/*<div className="product-small-image-wrapper mt-15">*/}
                {/*  <Swiper {...thumbnailSwiperParams}>*/}
                {/*    {(product && product.comboImages && product && product.comboImages.length) &&*/}
                {/*    product && product.comboImages.map((single, key) => {*/}
                {/*      return (*/}
                {/*          <div key={key}>*/}
                {/*            <div className="single-image">*/}
                {/*              <img*/}
                {/*                  src={single["original"]}*/}
                {/*                  className="img-fluid"*/}
                {/*                  alt=""*/}
                {/*              />*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*      );*/}
                {/*    })}*/}
                {/*  </Swiper>*/}
                {/*</div>*/}
              </div>
              <div className="col-md-7 col-sm-12 col-xs-12">
                <div className="product-details-content quickview-content">
                  <h2>{product && product.comboName}</h2>
                  {parseInt(product.quantity) <= 0 && (
                      <div className="mt-1">
                          <span style={{fontSize: "12px !important", color: "red", fontWeight: "bolder", marginTop: "31px !important"}}>
                          OUT OF STOCK
                          </span>
                      </div>
                  )}


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


                  {product && product.rating && product && product.rating > 0 ? (
                      <div className="pro-details-rating-wrap">
                        <div className="pro-details-rating">
                          <Rating ratingValue={product && product.rating} />
                        </div>
                      </div>
                  ) : (
                      ""
                  )}
                  <div>
                    <span to={`/combos/${product && product.comboCategory && product.comboCategory._id}`} style={{ fontSize: "14px !important" }}>{product && product.comboCategory && product.comboCategory["comboCategoryName"]}</span>
                  </div>
                  <div className="pro-details-list">
                    <div dangerouslySetInnerHTML={{ __html:  stateToHTML(convertFromRaw(JSON.parse(he.decode(product && product.highLights))))  }} ></div>
                    {/*<p>{product && product.highLights}</p>*/}
                  </div>


                  <div>
                    <span>
                      * {product.refundable ? "Easy return is available." : "No refund or returns is availble."}
                    </span>
                    <br/>
                    <span>
                      * {product.cancelAvailable ? "Order cancellation is available." : "Order cancellation is not available."}
                    </span>
                  </div>

                  <hr/>



                  <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                      <div className="pro-details-color-content">
                        <Facebook className="m-2 text-dark" size={20}/>
                        <Instagram className="m-2 text-dark" size={20}/>
                        <GooglePlus className="m-2 text-dark" size={20}/>
                        <Twitter className="m-2 text-dark" size={20}/>
                      </div>
                    </div>
                  </div>


                  <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover w-50">
                      {product.quantity && product.quantity > 0 ? (
                          <button
                              className={`w-100 ${
                                  (addToCartFailure === false &&
                                      addToCartSuccess === false &&
                                      addToCartRequestPending === true &&
                                      isObjectEmpty(addToCartSuccessPayload) &&
                                      isObjectEmpty(addToCartFailurePayload)) ? "cursor-na" : ""
                              }`}
                              onClick={async () => {
                                if (cartItem !== undefined && cartItem.quantity > 0) {
                                  props.history.push("/cart")
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

                  </div>

                </div>
              </div>
            </div>
          </div>
        </Modal>
      </Fragment>
  );
}

ComboModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  addtocompare: PropTypes.func,
  addtowishlist: PropTypes.func,
  cartitems: PropTypes.array,
  compareitem: PropTypes.object,
  currency: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartitems: state.cartData
  };
};

export default withRouter(connect(mapStateToProps)(ComboModal));
