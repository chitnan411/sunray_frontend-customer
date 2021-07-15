import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const HeroSliderTwelveSingle = ({ data, key, sliderClass }) => {
  return (
      <div
          className={`slider-height-4 d-flex align-items-center bg-img ${
              sliderClass ? sliderClass : ""
          }`}
          style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className={`slider-content-5 slider-animated-1 ${ data.id === 3 || data.id === 1 || data.id === 4 ? "text-center" : "text-left"}`}>
                {
                  data.id === 1
                      ?
                      <>
                      <h1 className="animated font-weight-bolder">Your Safety is Our First Priority</h1>
                        <div className="slider-btn-5 btn-hover text-center">
                          <Link
                              className="animated "
                              to={process.env.PUBLIC_URL + data.url}
                          >
                            ORDER NOW
                          </Link>
                        </div>
                      </>
                      :
                      data.id === 3
                          ?
                          <>
                          <h1 className="animated font-weight-bolder text-dark">Get Best Rates for Artist Stationery</h1>
                            <div className="slider-btn-5 btn-hover text-center">
                              <Link
                                  className="animated btn-ss-dark-bg"
                                  to={process.env.PUBLIC_URL + data.url}
                              >
                                SHOP NOW
                              </Link>
                            </div>
                          </>
                          :
                          data.id === 4
                              ?
                              <>
                                <h1 className="animated font-weight-bolder text-dark">For Office Supplies and Bulk Inquiries</h1>
                                <div className="slider-btn-5 btn-hover text-center">
                                  <Link
                                      className="animated btn-ss-dark-bg"
                                      to={process.env.PUBLIC_URL + data.url}
                                  >
                                    SHOP NOW
                                  </Link>
                                </div>
                              </>
                              :
                      <>
                        {data.title && <h3 className="animated">{data.title}</h3>}
                        {data.subtitle && <h1 className="animated font-weight-bolder">{data.subtitle}</h1>}
                        <p className="animated">{data.text}</p>
                        <div className="slider-btn-5 btn-hover">
                          <Link
                              className="animated"
                              to={process.env.PUBLIC_URL + data.url}
                          >
                            SHOP NOW
                          </Link>
                        </div>
                      </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

HeroSliderTwelveSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default HeroSliderTwelveSingle;
