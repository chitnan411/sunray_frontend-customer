import {WifiOff} from "@styled-icons/boxicons-regular/WifiOff";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {toast} from "react-hot-toast";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {Button} from "reactstrap";
import {useCartManager} from "../../api/cart.hooks.js";
import { getDiscountPrice } from "../../helpers/product";
import requestForUserSignIn from "../../redux/middlewares/auth/ssSignInMiddleware.js";
import requestForAddItemToCart from "../../redux/middlewares/cart/addToCartMiddleware.js";
import {isNotEmptyObject, isObjectEmpty} from "../../utils/commonUtils.js";
import {ssClientAuthFlagCookieKey} from "../../utils/constants.js";
import ComboModal from "./ComboModal.js";

const SSHomeComboCard = ({product, history, colXlClass, currency, addToCart, addToWishlist, addToCompare, cartItem, wishlistItem, compareItem, sliderClassName, spaceBottomClass}) => {
    const [modalShow, setModalShow] = useState(false);
    const { addToast } = useToasts();
    let isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)

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


    const discountedPrice = getDiscountPrice(product.price, product.discount);
    const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
    const finalDiscountedPrice = +(
        discountedPrice * currency.currencyRate
    ).toFixed(2);

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

    const getPercentageCount = (product) => {
        if(product) {
            let offerPrice = product && product.offeredPrice
            let originalPrice = product && product.price
            let diffrence = parseFloat(originalPrice) - parseFloat(offerPrice)
            let percentageCount = (diffrence / parseFloat(originalPrice) ) * 100
            return Math.round(percentageCount)
        }
    }


    return (
        <Fragment>
            <div
                className={`${
                    colXlClass ? colXlClass : ""
                } col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ""}`}
            >
                <div
                    className={`product-wrap-2 ${
                        spaceBottomClass ? spaceBottomClass : ""
                    }`}
                >
                    <div className="product-img">
                        <Link to={"/combo/" + product._id}>
                            {/*<a target={"_blank"} href={"/combo/" + product._id}>*/}
                            <img
                                className="default-img"
                                src={
                                    product.comboImages &&
                                    product.comboImages[0] &&
                                    product.comboImages[0].original
                                }
                                alt=""
                            />
                            {product.comboImages && product.comboImages.length > 1 && (
                                <img
                                    className="hover-img"
                                    src={
                                        product.comboImages &&
                                        product.comboImages[1] &&
                                        product.comboImages[1].original
                                    }
                                    alt=""
                                />
                            )}

                            {product.comboImages && product.comboImages.length === 1 && (
                                <img
                                    className="hover-img"
                                    src={
                                        product.comboImages &&
                                        product.comboImages[0] &&
                                        product.comboImages[0].original
                                    }
                                    alt=""
                                />
                            )}
                        </Link>



                        {
                            (product && product.offeredPrice) && ( new Date(product && product.offerStartDate).getTime() <= new Date().getTime() ) && ( new Date(product && product.offerExpiryDate).getTime() >= new Date().getTime() )
                            || parseInt(product.quantity) <= 0
                                ? (
                                    <div className="product-img-badges" style={{textAlign: "-webkit-right"}}>
                                        {(product && product.offeredPrice) && ( new Date(product && product.offerStartDate).getTime() <= new Date().getTime() ) && ( new Date(product && product.offerExpiryDate).getTime() >= new Date().getTime() ) &&
                                        <span style={{background: "#06A4F0", width: "fit-content"}}
                                              className="pink font-weight-bold  text-white">{getPercentageCount(product)}% OFF</span>
                                        }

                                        {parseInt(product.quantity) <= 0 && (
                                            <span className="red font-weight-bold out-of-stock-chip">
                                            OUT OF STOCK
                                        </span>
                                        )}
                                    </div>

                                ) : ("")
                        }

                        <div className="product-action-2">
                            { product.quantity && product.quantity > 0 ? (
                                <button
                                    onClick={async () => {
                                        if(isAuthenticated == "true" ||isAuthenticated == true){
                                            await addItemToCart(product, 1)
                                        }
                                        else {
                                            // alert("isAuthenticated ====> ",isAuthenticated)
                                            // alert("you have just added combo to your local cart with isadded false ")
                                            addToCart(product, false, true, addToast)
                                        }
                                    }}
                                    className={
                                        cartItem !== undefined && cartItem.quantity > 0
                                            ? "active"
                                            : ""
                                    }
                                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                                    title={
                                        cartItem !== undefined ? "Added to cart" : "Add to cart"
                                    }
                                >
                                    {" "}
                                    <i className="fa fa-shopping-cart"></i>{" "}
                                </button>
                            ) : (
                                <button disabled className="active" title="Out of stock">
                                    <i className="fa fa-shopping-cart"></i>
                                </button>
                            )
                            }

                            <button onClick={() => setModalShow(true)} title="Quick View">
                                <i className="fa fa-eye"></i>
                            </button>

                        </div>
                    </div>
                    <div className="product-content-2">
                        <div className="title-price-wrap-2 w-100 text-center">
                            <h3 className="text-dark">
                                <Link to={"/combo/" + product._id}>{product.comboName}</Link>
                            </h3>
                            <div className="price-2">

                                {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                }).format(getPrice(product))}


                                {( isDiscountedPrice || isCrazyDealPrice ) &&
                                <span style={{verticalAlign: "middle"}} className="old">
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                    }).format(product && product.price)}
                                </span>
                                }

                            </div>

                            {parseInt(product && product.quantity) <= 0 ? (
                                <Button disabled className="ss-btn-primary mt-1 cursor-na">
                                    OUT OF STOCK
                                </Button>
                            ) : (
                                <Button
                                    onClick={ async () => {
                                        if(cartItem !== undefined && cartItem.quantity > 0){
                                            history.push("/cart")
                                        }
                                        else{
                                            if(isAuthenticated == "true" ||isAuthenticated == true){
                                                await addItemToCart(product, 1)
                                            }
                                            else {
                                                // alert("you have just added combo to your local cart with isadded false ")
                                                // alert("isAuth",isAuthenticated)
                                                addToCart(product, false, true,  addToast)
                                            }
                                        }
                                    }}
                                    title={
                                        cartItem !== undefined ? "Added to cart" : "Add to cart"
                                    }
                                    className={`ss-btn-primary mt-1 ${
                                        (addToCartFailure === false &&
                                            addToCartSuccess === false &&
                                            addToCartRequestPending === true &&
                                            isObjectEmpty(addToCartSuccessPayload) &&
                                            isObjectEmpty(addToCartFailurePayload)) ? "cursor-na" : ""
                                    }`}
                                >
                                    {
                                        (addToCartFailure === false &&
                                            addToCartSuccess === false &&
                                            addToCartRequestPending === true &&
                                            isObjectEmpty(addToCartSuccessPayload) &&
                                            isObjectEmpty(addToCartFailurePayload))
                                            ?  <div id="ss-sm-spinner" /> :
                                            cartItem !== undefined && cartItem.quantity > 0 ? "GO TO CART" : "ADD TO CART"
                                    }
                                </Button>
                            )}
                        </div>
                        {/* <div className="pro-wishlist-2">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => addToWishlist(product, addToast)}
              >
                <i className="fa fa-heart-o" />
              </button>
            </div>
           */}
                    </div>
                </div>
            </div>
            {/* product modal */}
            <ComboModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                currency={currency}
                discountedprice={discountedPrice}
                finalproductprice={finalProductPrice}
                finaldiscountedprice={finalDiscountedPrice}
                cartitem={cartItem}
                wishlistitem={wishlistItem}
                compareitem={compareItem}
                addtocart={addToCart}
                addtowishlist={addToWishlist}
                addtocompare={addToCompare}
                addtoast={addToast}
            />
        </Fragment>
    );
};

SSHomeComboCard.propTypes = {
    addToCart: PropTypes.func,
    addToCompare: PropTypes.func,
    addToWishlist: PropTypes.func,
    cartItem: PropTypes.object,
    compareItem: PropTypes.object,
    currency: PropTypes.object,
    product: PropTypes.object,
    colXlClass: PropTypes.string,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    wishlistItem: PropTypes.object,
};

export default withRouter(SSHomeComboCard);
