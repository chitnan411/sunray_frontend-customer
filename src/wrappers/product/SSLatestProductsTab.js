import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";
import SSHomeLatestProductsGrid from "./SSHomeLatestProductsGrid.js";

const SSLatestProductsTab = ({spaceTopClass, spaceBottomClass, bgColorClass, category}) => {
  return (
      <div
          className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
              spaceBottomClass ? spaceBottomClass : ""
          } ${bgColorClass ? bgColorClass : ""}`}
      >
        <div className="container">
          <SectionTitle spaceClass="mb-5" titleText="Latest Products" positionClass="text-center" />

          <div className="row">
            <SSHomeLatestProductsGrid
                category={category}
                type="new"
                limit={8}
                spaceTopClass="mt-59"
                spaceBottomClass="mb-25"
            />
          </div>

          <div className="view-more text-center mt-20 toggle-btn6 col-12">
            <Link
                className="loadMore6"
                to={"/products"}
            >
              VIEW MORE PRODUCTS
            </Link>
          </div>

        </div>
      </div>
  );
};

SSLatestProductsTab.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string

};

export default SSLatestProductsTab;
