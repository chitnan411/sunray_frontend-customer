import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";
import { setActiveSort } from "../../helpers/product";

const ShopComboCategories = ({ categories, getSortParams, activeId }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Combo Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
              <div className={`sidebar-widget-list-left`}>
                  <Link to={"/combos"} className={`${activeId === undefined || activeId === null || !activeId ? "active-link" : ""}`} >
                      <span className="checkmark" /> View All{" "}
                  </Link>
              </div>
            {categories.map((category, key) => {
              return (

                  <div className={`sidebar-widget-list-left`}>
                      <Link className={`${activeId === category._id ? "active-link" : ""}`} to={{
                          pathname:`/combos/${category._id}`,
                      }}>
                          <span className="checkmark" /> {category.comboCategoryName}{" "}
                      </Link>
                  </div>

                // <li key={key}>
                //   <div className="sidebar-widget-list-left">
                //     <button
                //       onClick={e => {
                //         getSortParams("category", category.comboCategoryName);
                //         setActiveSort(e);
                //       }}
                //     >
                //       {" "}
                //       <span className="checkmark" /> {category.comboCategoryName}{" "}
                //     </button>
                //   </div>
                // </li>
              );
            })}
          </ul>
        ) : (
          "No combo categories found"
        )}
      </div>
    </div>
  );
};

ShopComboCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopComboCategories;
