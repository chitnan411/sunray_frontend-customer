import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import SSHomeComboCard from "../../components/product/SSHomeComboCard.js";
import SSHomeProductCard from "../../components/product/SSHomeProductCard.js";
import { getProducts } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";

const ComboGridTwo = ({products, featuredData, currency, addToCart, addToWishlist, addToCompare, cartItems, wishlistItems, compareItems, sliderClassName, spaceBottomClass}) => {

 console.log(" featureddata featureddatafeatureddatafeatureddatafeatureddata", featuredData)

  return (
    <Fragment>
      {featuredData && featuredData.map(product => {
        return (
          <SSHomeComboCard
            colXlClass={"col-xl-3"}
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
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

ComboGridTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  featuredData: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(state.productData.products, ownProps.category, ownProps.type, ownProps.limit),
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, isAddedToUserCart, showAlert, addToast, quantityCount) => {dispatch(addToCart(item, isAddedToUserCart, showAlert, addToast, quantityCount));},
    addToWishlist: (item, addToast) => {dispatch(addToWishlist(item, addToast));},
    addToCompare: (item, addToast) => {dispatch(addToCompare(item, addToast));}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboGridTwo);
