import PropTypes from "prop-types";
import React, {Fragment, useEffect} from "react";
import { connect } from "react-redux";
import SSHomeProductCard from "../../components/product/SSHomeProductCard.js";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";

const ProductGrid = ({products, currency, addToCart, addToWishlist, addToCompare, cartItems, wishlistItems, compareItems, sliderClassName, spaceBottomClass}) => {

  return (
    <Fragment>
      {products.map(product => {
        console.log(cartItems.filter((cartItem) => cartItem._id === product._id)[0],"cartItems.filter((cartItem) => cartItem._id === product._id)[0] cartItems.filter((cartItem) => cartItem._id === product._id)[0]")
        return (
          <SSHomeProductCard
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            cartItem={
              cartItems.filter((cartItem) => cartItem._id === product._id)[0]
            }
            wishlistItem={
              wishlistItems.filter(
                (wishlistItem) => wishlistItem._id === product._id
              )[0]
            }
            compareItem={
              compareItems.filter(
                (compareItem) => compareItem._id === product._id
              )[0]
            }
            key={product._id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount, selectedProductColor, selectedProductSize) => {dispatch(addToCart(item, addToast, quantityCount, selectedProductColor, selectedProductSize));},
    addToWishlist: (item, addToast) => {dispatch(addToWishlist(item, addToast))},
    addToCompare: (item, addToast) => {dispatch(addToCompare(item, addToast));}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
