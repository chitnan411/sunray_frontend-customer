import PropTypes from "prop-types";
import React from "react";
import {Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import {setUserDataCookieKey, ssClientAuthFlagCookieKey} from "../../utils/constants.js";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";

const IconGroup = ({
                     currency,
                     cartData,
                     wishlistData,
                     compareData,
                     deleteFromCart,
                     iconWhiteClass,
                     history
                   }) => {

  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const handleUserClick = e => {
    e.preventDefault()
    let isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)
    let hasUser = Cookies.get(setUserDataCookieKey)

    if(isAuthenticated && hasUser){
      history.push("/my-account")
    }
    else {
      history.push("/login")
    }
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
        "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
      <div
          className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
      >
        {/*<div className="same-style header-search d-none d-lg-block">*/}
        {/*  <button className="search-active" onClick={e => handleClick(e)}>*/}
        {/*    <i className="pe-7s-search ss-header-icon" />*/}
        {/*  </button>*/}
        {/*  <div className="search-content">*/}
        {/*    <form action="#">*/}
        {/*      <input type="text" placeholder="Search for products..." />*/}
        {/*      <button className="button-search">*/}
        {/*        <i className="pe-7s-search" />*/}
        {/*      </button>*/}
        {/*    </form>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="same-style account-setting d-sm-block d-lg-block">
          <button
              className="account-setting-active"
              onClick={handleUserClick}
          >
            <i className="pe-7s-user ss-header-icon" />
          </button>
          <div className="account-dropdown">
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login"}>Login</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login"}>
                  Register
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  my account
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/*<div className="same-style header-compare">*/}
        {/*  <Link to={process.env.PUBLIC_URL + "/compare"}>*/}
        {/*    <i className="pe-7s-shuffle" />*/}
        {/*    <span className="count-style">*/}
        {/*      {compareData && compareData.length ? compareData.length : 0}*/}
        {/*    </span>*/}
        {/*  </Link>*/}
        {/*</div>*/}
        {/*<div className="same-style header-wishlist">*/}
        {/*  <Link to={process.env.PUBLIC_URL + "/wishlist"}>*/}
        {/*    <i className="pe-7s-like ss-header-icon" />*/}
        {/*    <span className="count-style">*/}
        {/*    {wishlistData && wishlistData.length ? wishlistData.length : 0}*/}
        {/*  </span>*/}
        {/*  </Link>*/}
        {/*</div>*/}
        <div className="same-style cart-wrap d-none d-lg-block">

          { cartData && cartData.length > 0
              ?
              <button className="icon-cart" onClick={e => handleClick(e)}>
                <i className="pe-7s-shopbag ss-header-icon"/>
                <span className="count-style">
                {cartData && cartData.length ? cartData.length : 0}
              </span>
              </button>
              :
              <button className="icon-cart" onClick={() => {
                history.push("/cart")
              }}>
                <i className="pe-7s-shopbag ss-header-icon"/>
                <span className="count-style">
                {cartData && cartData.length ? cartData.length : 0}
              </span>
              </button>
          }


          {/* menu cart */}
          { cartData && cartData.length > 0
          && <MenuCart
              cartData={cartData}
              currency={currency}
              deleteFromCart={deleteFromCart}
          />
          }
        </div>
        <div className="same-style cart-wrap d-block d-lg-none">
          <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
            <i className="pe-7s-shopbag" />
            <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
          </Link>
        </div>
        <div className="same-style mobile-off-canvas d-block d-lg-none">
          <button
              className="mobile-aside-button"
              onClick={() => triggerMobileMenu()}
          >
            <i className="pe-7s-menu" />
          </button>
        </div>
      </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IconGroup));
