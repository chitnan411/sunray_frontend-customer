import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import NoImageAvailable from "../../assets/images/noImg_2.jpg"


const SsHomeCategorySliderTile = ({ data, sliderClass }) => {
  return (
    <div className={`collection-product ${sliderClass ? sliderClass : ""}`}>
      <div className="collection-img">
        <Link to={`/products/${data._id}`}>
          <img height={201} src={data && data.categoryImage && data.categoryImage[0] && data.categoryImage[0].original || NoImageAvailable} alt="" />
        </Link>
      </div>
      <div className="collection-content text-center">
        <span>{data.subtitle}</span>
        <h4>
          <Link to={`/products/${data._id}`}>{data && data.categoryName}</Link>
        </h4>
        <Link
          to={`/products/${data._id}`}
          className="collection-btn"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

SsHomeCategorySliderTile.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default SsHomeCategorySliderTile;
