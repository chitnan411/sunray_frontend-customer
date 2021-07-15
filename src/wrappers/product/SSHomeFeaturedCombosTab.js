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
import ComboGridTwo from "./ComboGridTwo.js";
import ProductGridTwo from "./ProductGridTwo";


const SSHomeFeaturedCombosTab = ({ spaceTopClass, spaceBottomClass, bgColorClass, category, sectionTitle }) => {
  const [swiper, updateSwiper] = useState(null);
  const [swiper2, updateSwiper2] = useState(null);
  const [swiper3, updateSwiper3] = useState(null);
  const [featuredCombos, setFeaturedCombos] = useState([]);



  const getFeaturedCombos = async () => {

    const featuredCombos = await axios.get(`${apiRootUrl}/v2/admin/combo?featured=true&active=true`, {withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
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
    getFeaturedCombos()
  },[])

  const settings = {
    loop: false,
    containerClass:"ss-featured-combo-swiper-container",
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
            </div>
            {featuredCombos.length > 0 &&
            <div className="row">
              {featuredCombos.length > 4 &&
              <Swiper {...settings} getSwiper={updateSwiper}>
                <ComboGridTwo
                    category={category}
                    featuredData={featuredCombos}
                    limit={8}
                    spaceTopClass="pt-25"
                    spaceBottomClass="mb-25"
                    sliderClassName="swiper-slide"
                />
              </Swiper>
              }

              {featuredCombos.length <= 4 &&
              <ComboGridTwo
                  category={category}
                  featuredData={featuredCombos}
                  limit={8}
                  spaceTopClass="pt-25"
                  spaceBottomClass="mb-25"
                  sliderClassName="swiper-slide"
              />
              }

              {featuredCombos.length > 4 &&
                <div className="swiper-slider-navigation-wrapper product-slider-active">
                <button
                    className="swiper-button-prev ht-swiper-button-nav"
                    onClick={goPrev}
                >
                  <i className="pe-7s-angle-left"/>
                </button>
                <button
                    className="swiper-button-next ht-swiper-button-nav"
                    onClick={goNext}
                >
                  <i className="pe-7s-angle-right"/>
                </button>
              </div>}
            </div>
            }
          </div>
        </div>
      </div>
  );

};

SSHomeFeaturedCombosTab.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  sectionTitle: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SSHomeFeaturedCombosTab;
