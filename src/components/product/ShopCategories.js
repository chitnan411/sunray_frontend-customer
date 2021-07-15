import PropTypes from "prop-types";
import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categories, getSortParams, activeBrandId, activeId }) => {
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Explore by Category </h4>
            <div className="sidebar-widget-list mt-30">
                {categories ? (
                    <ul>
                        <div className={`sidebar-widget-list-left`}>
                            <Link to={"/products"} className={`${( (activeId === undefined || activeId === null || !activeId) && (activeBrandId === undefined || activeBrandId === null || !activeBrandId ) )? "active-link" : ""}`} >
                                <span className="checkmark" /> View All{" "}
                            </Link>
                        </div>
                        {categories.map((category, key) => {
                            return (
                                <div className={`sidebar-widget-list-left`}>
                                    <Link className={`${activeId === category._id ? "active-link" : ""}`} to={{
                                        pathname:`/products/${category._id}`,
                                    }}>
                                        <span className="checkmark" /> {category.categoryName}{" "}
                                    </Link>
                                </div>
                            );
                        })}
                    </ul>
                ) : (
                    "No categories found"
                )}
            </div>
        </div>
    );
};

ShopCategories.propTypes = {
    categories: PropTypes.array,
    getSortParams: PropTypes.func
};

export default withRouter(ShopCategories);
