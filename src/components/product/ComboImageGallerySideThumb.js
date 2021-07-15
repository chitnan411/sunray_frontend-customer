import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";

const ComboImageGalleryLeftThumb = ({ combo, thumbPosition }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
        gallerySwiper !== null &&
        gallerySwiper.controller &&
        thumbnailSwiper !== null &&
        thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade"
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    clickable: true,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      1200: {
        slidesPerView: 4,
        direction: "vertical"
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      320: {
        slidesPerView: 4,
        direction: "horizontal"
      }
    }
  };

  return (
      <Fragment>
        <div className="row row-5">
          <div className={` ${thumbPosition && thumbPosition === "left" ? "col-xl-10 order-1 order-xl-2" : "col-xl-10"}`}>

            <div className="product-large-image-wrapper">
              {/*{combo.discount || combo.new ? (*/}
              {/*  <div className="product-img-badges">*/}
              {/*    {combo.discount ? (*/}
              {/*      <span className="pink">-{combo.discount}%</span>*/}
              {/*    ) : (*/}
              {/*      ""*/}
              {/*    )}*/}
              {/*    {combo.new ? <span className="purple">New</span> : ""}*/}
              {/*  </div>*/}
              {/*) : (*/}
              {/*  ""*/}
              {/*)}*/}
              {(combo.comboImages && combo.comboImages.length > 1) &&
              <Swiper {...gallerySwiperParams}>
                {combo.comboImages && combo.comboImages.map((single, key) => {
                      return (
                          <div key={key}>
                            <div className="single-image">
                              <img
                                  src={single && single.original}
                                  className="img-fluid"
                                  alt=""
                              />
                            </div>
                          </div>
                      );
                    }
                )}
              </Swiper>
              }
            </div>
          </div>
          {(combo.comboImages && combo.comboImages.length > 1) &&
          <div
              className={` ${
                  thumbPosition && thumbPosition === "left"
                      ? "col-xl-2 order-2 order-xl-1"
                      : "col-xl-2"
              }`}
          >
            <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
              <Swiper {...thumbnailSwiperParams}>
                {combo.comboImages &&
                combo.comboImages.map((single, key) => {
                  return (
                      <div key={key}>
                        <div className="single-image">
                          <img
                              src={single && single.original}
                              className="img-fluid"
                              alt=""
                          />
                        </div>
                      </div>
                  );
                })}
              </Swiper>
            </div>
          </div>}

          {combo.comboImages && combo.comboImages.length === 1 &&
          <div className="single-image-one-image">
            <img
                src={combo.comboImages && combo.comboImages[0] && combo.comboImages[0].original}
                className="img-fluid w-100"
                alt=""
            />
          </div>
          }

        </div>
      </Fragment>
  );
};

ComboImageGalleryLeftThumb.propTypes = {
  combo: PropTypes.object,
  thumbPosition: PropTypes.string
};

export default ComboImageGalleryLeftThumb;
