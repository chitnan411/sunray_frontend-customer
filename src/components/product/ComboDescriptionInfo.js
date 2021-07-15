import {WifiOff} from "@styled-icons/boxicons-regular/WifiOff";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle";
import {ShoppingBag} from "@styled-icons/heroicons-solid/ShoppingBag";
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
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import {getPercentageCount, isNotEmptyObject, isObjectEmpty} from "../../utils/commonUtils.js";
import {ssClientAuthFlagCookieKey} from "../../utils/constants.js";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


const ComboDescriptionInfo = ({combo, history,  cartItems,  addToast, addToCart}) => {
    const [selectedProductColor, setSelectedProductColor] = useState(
        combo && combo.variation ? combo && combo.variation[0].color : ""
    );
    const [selectedProductSize, setSelectedProductSize] = useState(combo && combo.variation ? combo && combo.variation[0].size[0].name : "");
    const [productStock, setProductStock] = useState(combo && combo.variation ? combo && combo.variation[0].size[0].stock : combo && combo.stock);
    const [quantityCount, setQuantityCount] = useState(1);
    const [cartItem,setCartItem] = useState({})

    const prevCartItems = usePrevious(cartItems)
    const prevSingleProduct = usePrevious(combo)


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
                addToCart(combo, false,  addToast)
            }
            else {
                addToCart(combo, true,  addToast)
            }
        }
    },[addItemToCart,addToCartFailurePayload, addToCartFailure, addToCartRequestPending, addToCartSuccess, addToCartSuccessPayload])

    useEffect(() => {
        if(prevCartItems !== cartItems){
            setCartItem(cartItems.filter((cartItem) => cartItem._id === combo._id)[0])
        }
        if(prevSingleProduct !== combo){
            setCartItem(cartItems.filter((cartItem) => cartItem._id === combo._id)[0])
        }
    },[combo, cartItems])

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

    return (
        <div className="product-details-content py-2 ml-70">
            <h2 className="productView-title">{combo && combo.comboName}</h2>
            <Link to={`/combos/${combo && combo.comboCategory && combo.comboCategory._id}`} className="productView-brand py-2">{combo && combo.comboCategory && combo.comboCategory.comboCategoryName}</Link>
            <div className="product-details-price">
                <Fragment>
                      <span>
                        {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                        }).format( getPrice(combo))}
                      </span>{" "}
                    { (isDiscountedPrice || isCrazyDealPrice)  &&
                    <>
                      <span className="old">
                            {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                            }).format(combo.price)}
                      </span>
                        <span className="text-discount-percentage">
                        ({getPercentageCount(combo)}% OFF)
                        </span>
                    </>
                    }
                </Fragment>
            </div>

            <div className="pro-details-list">
                { combo && combo.highLights &&
                <div className="px-4" dangerouslySetInnerHTML={{__html: stateToHTML(convertFromRaw(JSON.parse(he.decode(combo && combo.highLights))))}}></div>
                }
            </div>



            <div>
        <span>
          * {combo.refundable ? "Easy return is available." : "No refund or returns is availble."}
        </span>
                <br/>
                <span>
          * {combo.cancelAvailable ? "Order cancellation is available." : "Order cancellation is not available."}
        </span>
            </div>

            <hr/>


            {combo && combo.affiliateLink ? (
                <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover ml-0">
                        <a
                            href={combo && combo.affiliateLink}
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
                        {combo && combo.quantity > 0 ? (
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
                                            await addItemToCart(combo, 1)
                                        }
                                        else {
                                            addToCart(combo, false, addToast)
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
                    {/*    <button*/}
                    {/*        className={wishlistItem !== undefined ? "active" : ""}*/}
                    {/*        disabled={wishlistItem !== undefined}*/}
                    {/*        title={*/}
                    {/*            wishlistItem !== undefined*/}
                    {/*                ? "Added to wishlist"*/}
                    {/*                : "Add to wishlist"*/}
                    {/*        }*/}
                    {/*        onClick={() => addToWishlist(combo, addToast)}*/}
                    {/*    >*/}
                    {/*        <i className="pe-7s-like" />*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
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

ComboDescriptionInfo.propTypes = {
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
    combo: PropTypes.object,
    wishlistItem: PropTypes.object
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (item, addToast, quantityCount, selectedProductColor, selectedProductSize) => {dispatch(addToCart(item, addToast, quantityCount, selectedProductColor, selectedProductSize));},
        addToWishlist: (item, addToast) => {dispatch(addToWishlist(item, addToast));},
        addToCompare: (item, addToast) => {dispatch(addToCompare(item, addToast));}
    };
};

export default withRouter(connect(null, mapDispatchToProps)(ComboDescriptionInfo));
