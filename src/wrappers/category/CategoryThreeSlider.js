import PropTypes from "prop-types";
import React, {useEffect} from "react";
import Swiper from "react-id-swiper";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import SsHomeCategorySliderTile from "../../components/category/ssHomeCategorySliderTile.js";
import categoryData from "../../data/category/category-two.json";
import CategoryThreeSingle from "../../components/category/CategoryThreeSingle.js";
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";

const CategoryThreeSlider = ({ spaceTopClass, spaceBottomClass, sendCategoriesGetRequest, categories }) => {

  useEffect(() => {
    const filters = {
      active: true
    }
    sendCategoriesGetRequest({subModuleName: "category", doFilter: true, filters: filters})
  },[])

  // swiper slider settings
  const settings = {
    loop: false,
    spaceBetween: 30,
    autoplay: {
      delay: 5291,
      disableOnInteraction: false
    },
    breakpoints: {
      992: {
        slidesPerView: 4
      },
      576: {
        slidesPerView: 3
      },
      320: {
        slidesPerView: 1
      }
    }
  };
  return (
    <div
      className={`collections-area ${spaceTopClass ? spaceTopClass : ""}  ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="collection-wrap">
          <div className="collection-active">
            <Swiper {...settings}>
              {categories &&
                categories.map((single, key) => {
                  return (
                    <SsHomeCategorySliderTile
                      data={single}
                      key={key}
                      sliderClass="swiper-slide"
                    />
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryThreeSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  sendCategoriesGetRequest: PropTypes.func,
  categories: PropTypes.array
};



const mapStateToProps = state => ({
  categories: state.categories.productCategories,
});

const mapDispatchToProps = dispatch => ({
  sendCategoriesGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(CategoryThreeSlider))
