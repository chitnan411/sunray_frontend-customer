import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";
import noProductFound from "../../assets/images/1.svg"

const ShopProducts = ({ products, layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ""}`}>
          {products.length > 0 &&
          <ProductgridList
              products={products}
              spaceBottomClass="mb-25"
          />}
          {products.length === 0 &&
              <div className="w-100 text-center">
                  <img style={{
                      height: "139px",
                      marginTop: "7rem"
                  }} src={noProductFound} height={200} width={300}/>
                  <h3 className="text-dark pt-4 mb-5 font-weight-bold text-center">Sorry, There are no products available!</h3>
              </div>
          }
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;
