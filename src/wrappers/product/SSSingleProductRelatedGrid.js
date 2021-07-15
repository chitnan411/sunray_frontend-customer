import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import { connect } from "react-redux";
import SSHomeProductCard from "../../components/product/SSHomeProductCard.js";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";

const SSHomeLatestProductsGrid = ({products, sendProductsGetRequest, currency, addToCart, addToWishlist, addToCompare, cartItems, wishlistItems, compareItems, sliderClassName, spaceBottomClass}) => {

  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    const filters = {
      active: true
    }
    sendProductsGetRequest({subModuleName: "product", doFilter: true, filters: filters})
    setLatestProducts(products.splice(0,8))
  },[])


  return (
      <Fragment>
        {latestProducts.map(product => {
          console.log(cartItems.filter((cartItem) => cartItem._id === product._id)[0],"cartItems.filter((cartItem) => cartItem._id === product._id)[0] cartItems.filter((cartItem) => cartItem._id === product._id)[0]")
          return (
              <SSHomeProductCard
                  colXlClass={"col-xl-3"}
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

SSHomeLatestProductsGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  sendProductsGetRequest: PropTypes.func,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    products: state.products.products,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendProductsGetRequest: (requestedPayload) => {dispatch(requestForGetDocuments(requestedPayload))},
    addToCart: (item, isAddedToUserCart, showAlert, addToast, quantityCount) => {dispatch(addToCart(item, isAddedToUserCart, showAlert, addToast, quantityCount));},
    addToWishlist: (item, addToast) => {dispatch(addToWishlist(item, addToast))},
    addToCompare: (item, addToast) => {dispatch(addToCompare(item, addToast));}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SSHomeLatestProductsGrid);

