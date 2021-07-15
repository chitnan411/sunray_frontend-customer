import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";
import requestForDeleteUserCartItems from "../../../redux/middlewares/cart/deleteFromUserCartMiddleware.js";
import {getPrice} from "../../../utils/commonUtils.js";
import {ssClientAuthFlagCookieKey} from "../../../utils/constants.js";

const MenuCart = ({ cartData, currency, deleteFromCart, sendDeleteUserCartItems }) => {

  const isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)


  let cartTotalPrice = 0;
  const { addToast } = useToasts();

  const getDiscountedPrice = (product) => {
    let price = 0;
    if (
        (product.crazyDealPrice &&
            new Date(product.crazyDealStartDate).getTime() <=
            new Date().getTime()) ||
        new Date(product.crazyDealExpiryDate).getTime() >= new Date().getTime()
    ) {
      price = product.crazyDealPrice;
    } else if (
        product.offeredPrice &&
        product.offerStartDate <= new Date() &&
        product.offerExpiryDate >= new Date()
    ) {
      price = product.offeredPrice;
    }

    return price;
  };

  const calcTotalPrice = (data = []) => {
    let total = 0;
    data.forEach((cartItem) => {
      total += (getPrice(cartItem)) * cartItem.quantity;
    });
    return Number(total).toFixed(2);
  };



  return (
      <div className="shopping-cart-content">
        {cartData && cartData.length > 0 ? (
            <Fragment>
              <ul>
                {cartData.map((single, key) => {
                  const discountedPrice = getDiscountPrice(single.price, single.discount);
                  const finalProductPrice = (single.price * currency.currencyRate).toFixed(2);
                  const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);

                  discountedPrice != null
                      ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                      : (cartTotalPrice += finalProductPrice * single.quantity);

                  return (
                      <li className="single-shopping-cart" key={key}>
                        <div className="shopping-cart-img">
                          <Link
                              to={"/product/" + single._id}
                          >
                            {single.productImages && (
                                <img
                                    alt=""
                                    src={single.productImages[0].original}
                                    className="img-fluid"
                                />
                            )}

                            {single.comboImages && (
                                <img
                                    alt=""
                                    src={single.comboImages[0].original}
                                    className="img-fluid"
                                />
                            )}
                          </Link>
                        </div>
                        <div className="shopping-cart-title">
                          <h4>
                            <Link
                                to={"/product/" + single._id}
                            >
                              {single.productName}
                              {single.comboName}
                            </Link>
                          </h4>
                          <h6>Qty: {single.quantity}</h6>
                          <span>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(getPrice(single))}
                    </span>
                        </div>
                        <div className="shopping-cart-delete">
                          <button onClick={ async () => {
                            if(isAuthenticated == true || isAuthenticated == "true"){
                              await sendDeleteUserCartItems({
                                multiple: false,
                                data: {...single}
                              })
                            }
                            else {
                              deleteFromCart(single, addToast)
                            }
                          }}>
                            <i className="fa fa-times-circle" />
                          </button>
                        </div>
                      </li>
                  );
                })}
              </ul>
              <div className="shopping-cart-total">
                <h4>
                  Total :
                  <span className="shop-total">
                {currency.currencySymbol + calcTotalPrice(cartData)}
              </span>
                </h4>
              </div>
              <div className="shopping-cart-btn btn-hover text-center">
                <Link className="btn-ss-primary" to={"/cart"}>
                  view cart
                </Link>

              </div>
            </Fragment>
        ) : (
            <p className="text-center">No items added to cart</p>
        )}
      </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendDeleteUserCartItems: (requestedPayload) => {
      dispatch(requestForDeleteUserCartItems(requestedPayload))
    },
  };
};

export default withRouter(connect( null,mapDispatchToProps)(MenuCart));
