import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass }) => {
  return (
    <div className={`copyright ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="footer-logo mt-0 text-center">
          <img alt="" src={process.env.PUBLIC_URL + footerLogo} height={48} width={41} />
          <Link to={process.env.PUBLIC_URL + "/"}>
              <span className="ss_brand_title text-center" style={{display: "block"}}>
              SUNRAY
          </span>
          </Link>

        {/*<Link to={process.env.PUBLIC_URL + "/"}>*/}
        {/*  <img alt="" src={process.env.PUBLIC_URL + footerLogo} />*/}
        {/*</Link>*/}
      </div>
      <p className="text-center">
        © 2021{" "}
<br/>
        <a href="http://sunraystationers.com/" rel="noopener noreferrer" target="_blank">
          Sunray Stationers
        </a>
        .<br /> All Rights Reserved
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default FooterCopyright;
