import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import RelatedProductGridSingle from "../../components/product/RelatedProductGridSingle.js";
import SSHomeProductCard from "../../components/product/SSHomeProductCard.js";
import {getProducts, getSortedProducts, ssGetRelatedItems} from "../../helpers/product";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";

const ProductGrid = ({products,addItemToCart, currency, addToWishlist, addToCompare, cartItems, wishlistItems, compareItems, sliderClassName, spaceBottomClass, productId}) => {
  return (
      <Fragment>
        {products && products.slice(0,8).map(product => {
          return (
              <SSHomeProductCard
                  colXlClass={"col-xl-3"}
                  sliderClassName={sliderClassName}
                  spaceBottomClass={spaceBottomClass}
                  product={product}
                  currency={currency}
                  addToCart={addItemToCart}
                  addToWishlist={addToWishlist}
                  addToCompare={addToCompare}
                  cartItem={
                    cartItems.filter(cartItem => cartItem._id === product._id)[0]
                  }
                  wishlistItem={
                    wishlistItems.filter(
                        wishlistItem => wishlistItem.id === product.id
                    )[0]
                  }
                  compareItem={
                    compareItems.filter(
                        compareItem => compareItem.id === product.id
                    )[0]
                  }
                  key={product.id}
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
  wishlistItems: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  return {
    products: ssGetRelatedItems(state.products.products, state.combos.combos,"products"),
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (item, isAddedToUserCart, showAlert, addToast, quantityCount) => {dispatch(addToCart(item, isAddedToUserCart, showAlert, addToast, quantityCount));},
    addToWishlist: (item, addToast) => {dispatch(addToWishlist(item, addToast));},
    addToCompare: (item, addToast) => {dispatch(addToCompare(item, addToast));}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
