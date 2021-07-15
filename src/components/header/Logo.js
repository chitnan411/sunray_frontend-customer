import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import SunrayLogo from "../../assets/images/sunray_logo.svg"

const Logo = ({ imageUrl, logoClass, showLogo }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + "/"}>
          { showLogo ?
              <img alt="" className="d-lg-inline" src={SunrayLogo} height={35} width={35}/>
              : <img alt="" className="d-none d-lg-inline" src={SunrayLogo} height={48} width={41}/>
          }
          <span className="ss_brand_title">
              SUNRAY
          </span>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
