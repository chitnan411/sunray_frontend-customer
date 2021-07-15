import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

import Swiper from "react-id-swiper";
import SectionTitle from "../../components/section-title/SectionTitle.js";
import SectionTitleFour from "../../components/section-title/SectionTitleFour.js";
import {apiRootUrl, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../utils/constants";
import Cookies from "js-cookie";
import ProductGridTwo from "./ProductGridTwo";


const SSHomeCrazyDealTab = ({ spaceTopClass, spaceBottomClass, bgColorClass, category, sectionTitle }) => {
  const [swiper, updateSwiper] = useState(null);
  const [swiper2, updateSwiper2] = useState(null);
  const [swiper3, updateSwiper3] = useState(null);
  const [crazyProducts, setCrazyDealProducts] = useState([]);
  const [featuredCombos, setFeaturedCombos] = useState([]);

  const getCrazyProducts = async () => {
    const crazyDealProducts = await axios.get(`${apiRootUrl}/v2/admin/product?crazyDeal=true`, {withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
        .then((response) => {
          if (response.data) {
            if (response.data.confirmation) {
              if (response.data.confirmation.message === "There is no record") {
                setCrazyDealProducts([])
              }
            }
            if (response.data.card) {
              if (response.data.card.data) {
                if((response.data && response.data.card && response.data.card.data && response.data.card.data.length) > 0){
                  setCrazyDealProducts(response.data.card.data)
                }
              }
            }
          }
        })
        .catch((error) => {
        })
    return crazyDealProducts
  }


  const getFeaturedCombos = async () => {

      const featuredCombos = await axios.get(`${apiRootUrl}/v2/admin/combo?featured=true&active=true`, {withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`} })
            .then((response) => {
              if (response.data) {
                if (response.data.confirmation) {
                  if (response.data.confirmation.message === "There is no record") {
                    setFeaturedCombos([])
                  }
                }
                if (response.data.card) {
                  if (response.data.card.data) {
                    setFeaturedCombos(response.data.card.data)
                  }
                }
              }
            })
            .catch((error) => {
            })
    return featuredCombos
  }


  useEffect( () => {
    getCrazyProducts()
  },[])

    const settings = {
      loop: false,
      containerClass:"ss-featured-swiper-container",
      grabCursor: true,
      observer: true,
      observeParents: true,
      navigation: true,
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

    const goNext = () => {
      if (swiper !== null) {
        swiper.slideNext();
      }
    };
    const goPrev = () => {
      if (swiper !== null) {
        swiper.slidePrev();
      }
    };

    const goNext2 = () => {
      if (swiper2 !== null) {
        swiper2.slideNext();
      }
    };
    const goPrev2 = () => {
      if (swiper2 !== null) {
        swiper2.slidePrev();
      }
    };

    const goNext3 = () => {
      if (swiper3 !== null) {
        swiper3.slideNext();
      }
    };
    const goPrev3 = () => {
      if (swiper3 !== null) {
        swiper3.slidePrev();
      }
    };

    console.log("crazyProducts crazyProducts crazyProducts",crazyProducts )

    if ((crazyProducts.length == 0)) {
      return ""
    }
    else {

      return (

        <div
          className={`product-area product-area--style2 ${spaceTopClass ? spaceTopClass : ""
            } ${spaceBottomClass ? spaceBottomClass : ""} ${bgColorClass ? bgColorClass : ""
            }`}
        >
          <SectionTitle spaceClass="mb-5" titleText={sectionTitle} positionClass="text-center" />
          <div className="container">
            <div className="product-tab-slider-wrapper position-relative">
                <div className="product-top-bar section-border mb-20">
                  {/*<SectionTitleFour className="text-dark font-weight-bolder" titleText={sectionTitle} />*/}
                </div>
                  {crazyProducts.length > 0 &&
                      <div className="row">
                        {crazyProducts.length > 4 &&
                          <Swiper {...settings} getSwiper={updateSwiper}>
                            <ProductGridTwo
                              category={category}
                              featuredData={crazyProducts}
                              type="new"
                              limit={8}
                              spaceTopClass="pt-25"
                              spaceBottomClass="mb-25"
                              sliderClassName="swiper-slide"
                            />
                          </Swiper>
                        }
                        {(crazyProducts.length > 0 && crazyProducts.length < 3)  &&
                          <ProductGridTwo
                              category={category}
                              featuredData={crazyProducts}
                              type="new"
                              limit={8}
                              spaceTopClass="pt-25"
                              spaceBottomClass="mb-25"
                              sliderClassName="swiper-slide"
                          />
                        }
                      </div>
                  }
            </div>
          </div>
        </div>
      );

    }
  };

  SSHomeCrazyDealTab.propTypes = {
    bgColorClass: PropTypes.string,
    category: PropTypes.string,
    sectionTitle: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string
  };

  export default SSHomeCrazyDealTab;
