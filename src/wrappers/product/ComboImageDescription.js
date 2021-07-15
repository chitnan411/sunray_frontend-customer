import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";
import ComboImageGalleryLeftThumb from "../../components/product/ComboImageGallerySideThumb";
import ComboDescriptionInfo from "../../components/product/ComboDescriptionInfo";

const ComboImageDescription = ({spaceTopClass, spaceBottomClass, galleryType, combo, currency, cartItems, wishlistItems, compareItems}) => {
  const wishlistItem = wishlistItems.filter(wishlistItem => wishlistItem.id === combo.id)[0];
  const compareItem = compareItems.filter(compareItem => compareItem.id === combo.id)[0];
  const { addToast } = useToasts();

  // const discountedPrice = getDiscountPrice(combo.price, combo.discount);
  const discountedPrice = combo && combo.price
  // const finalProductPrice = +(combo.price * currency.currencyRate).toFixed(2);
  const finalProductPrice = combo && combo.price

  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate).toFixed(2);

  return (
    <div className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">


            {/* combo image gallery */}
            {galleryType === "leftThumb" ? (
              <ComboImageGalleryLeftThumb
                combo={combo}
                thumbPosition="left"
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb combo={combo} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed combo={combo} />
            ) : (
              <ProductImageGallery combo={combo} />
            )}
          </div>


          <div className="col-lg-6 col-md-6">
            {/* combo description info */}
            <ComboDescriptionInfo
              combo={combo}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              addToast={addToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ComboImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  combo: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

export default connect(mapStateToProps)(ComboImageDescription);
