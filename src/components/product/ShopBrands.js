import PropTypes from "prop-types";
import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import { setActiveSort } from "../../helpers/product";

const ShopBrands = ({ brands, getSortParams, activeBrandId }) => {
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title mt-5">Shop by Brands </h4>
            <div className="sidebar-widget-list mt-20">
                {brands ? (
                    <ul>
                        {brands.map((brand, key) => {
                            return (
                                <div className={`sidebar-widget-list-left`}>
                                    <a className={`${activeBrandId === brand._id ? "active-link" : ""}`} href={`/products/?brand=${brand._id}`}>
                                        <span className="checkmark" /> {brand.brandName}{" "}
                                    </a>
                                </div>
                            );
                        })}
                    </ul>
                ) : (
                    "No brands found"
                )}
            </div>
        </div>
    );
};

ShopBrands.propTypes = {
    brands: PropTypes.array,
    getSortParams: PropTypes.func
};

export default withRouter(ShopBrands);
