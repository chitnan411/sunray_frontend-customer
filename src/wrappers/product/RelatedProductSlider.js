import PropTypes from "prop-types";
import React, {useEffect} from "react";
import Swiper from "react-id-swiper";
import {connect} from "react-redux";
import SectionTitle from "../../components/section-title/SectionTitle";
import {ssGetRelatedItems} from "../../helpers/product.js";
import {addToCart} from "../../redux/actions/cartActions.js";
import {addToCompare} from "../../redux/actions/compareActions.js";
import {addToWishlist} from "../../redux/actions/wishlistActions.js";
import ProductGrid from "./ProductGrid";
import RelatedProductsGrid from "./RelatedProductsGrid.js";

const RelatedProductSlider = ({ spaceBottomClass, category, productId, products }) => {


  console.log("products products products products =======> ",products )

  const settings = {
    loop: false,
    slidesPerView: 4,
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 3
      },
      640: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    }
  };


  return (
      <div
          className={`related-product-area ${
              spaceBottomClass ? spaceBottomClass : ""
          }`}
      >
        <div className="container">
          <SectionTitle
              titleText="You May Also Like"
              positionClass="text-center"
              spaceClass="mb-50"
          />
          <div className="row">
            {
              <RelatedProductsGrid
                  productId={productId}
                  category={category}
                  limit={4}
                  sliderClassName="swiper-slide"
              />
            }
          </div>
        </div>
      </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  products: PropTypes.array,
  spaceBottomClass: PropTypes.string
};


const mapStateToProps = (state, ownProps) => {
  return {
    products: ssGetRelatedItems(state.products.products, state.combos.combos,"products"),
  };
};

export default connect(mapStateToProps, null)(RelatedProductSlider);

