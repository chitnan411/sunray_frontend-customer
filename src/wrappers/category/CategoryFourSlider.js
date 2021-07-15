import PropTypes from "prop-types";
import React, {useEffect} from "react";
import Swiper from "react-id-swiper";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BrandSliderTile from "../../components/category/BrandSliderTile.js";
import categoryData from "../../data/category/category-four.json";
import CategoryFourSingle from "../../components/category/CategoryFourSingle.js";
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";

const CategoryfourSlider = ({ spaceTopClass, spaceBottomClass, sendBrandsGetRequest, brands  }) => {

  useEffect(()=> {
    sendBrandsGetRequest({subModuleName: "brand", doFilter: false})
  },[])

  // swiper slider settings
  const settings = {
    loop: true,
    spaceBetween: 30,
    autoplay: {
      delay: 6300,
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
                {brands && brands.map((single, key) => {
                  return (
                      <BrandSliderTile
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

CategoryfourSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  brands: PropTypes.array,
};


const mapStateToProps = state => ({
  brands: state.brands.productBrands
});

const mapDispatchToProps = dispatch => ({
  sendBrandsGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(CategoryfourSlider))

