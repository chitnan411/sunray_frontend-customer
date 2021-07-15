import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const MobileNavMenu = ({ strings }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={"/"}>
            Shop
          </Link>
        </li>

        <li className="menu-item-has-children">
          <Link to={"/products"}>
            Products
          </Link>
        </li>

        <li>
          <Link to={"/combos"}>
            Combos
          </Link>
        </li>

        <li className="menu-item-has-children">
          <Link to={"/about"}>
            About Us
          </Link>
        </li>

        <li>
          <Link to={"/contact"}>
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(MobileNavMenu);
