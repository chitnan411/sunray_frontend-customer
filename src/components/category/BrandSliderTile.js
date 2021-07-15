import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import NoImageAvailable from "../../assets/images/noImg_2.jpg"

const BrandSliderTile = ({ data, sliderClass }) => {
  return (
    <div className={`collection-product ${sliderClass ? sliderClass : ""}`}>
      <div className="collection-img" >
        <Link to={process.env.PUBLIC_URL + data && data.link}>
                <img
                    height={91}
                    src={data && data.logo &&  data.logo.length <= 0 ? NoImageAvailable : data.logo[0].original }
                    alt="" />
        </Link>

      </div>
      <div className="collection-content text-center">
        {/*<span>{data.brandName}</span>*/}
        <h4>
          <Link to={process.env.PUBLIC_URL + data.link}>{data.title}</Link>
        </h4>
        {/*<Link*/}
        {/*  to={process.env.PUBLIC_URL + data.link}*/}
        {/*  className="collection-btn"*/}
        {/*>*/}
        {/*  SHOP NOW*/}
        {/*</Link>*/}
      </div>
    </div>
  );
};

BrandSliderTile.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default BrandSliderTile;
