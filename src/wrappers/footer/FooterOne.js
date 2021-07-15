import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import {UncontrolledTooltip} from "reactstrap";
import FooterCopyright from "../../components/footer/FooterCopyright";
import FooterNewsletter from "../../components/footer/FooterNewsletter";
import {Whatsapp} from "@styled-icons/icomoon/Whatsapp"
import {Facebook} from "@styled-icons/boxicons-logos/Facebook"
import {Instagram} from "@styled-icons/bootstrap/Instagram"
import {TwitterOutline} from "@styled-icons/evaicons-outline/TwitterOutline"

const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  containerClass,
  extraFooterClass,
  sideMenu
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ""
      } ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${extraFooterClass ? extraFooterClass : ""}`}
    >
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo="/assets/img/logo/sunray_logo.svg"
              spaceBottomClass="mb-30"
            />
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>Information</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={"/about"}>About us</Link>
                  </li>
                  <li>
                    <Link to={"/contact"}>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to={"/terms-of-sale"}>
                      Terms of sale
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            <div
              className={`${
                sideMenu
                  ? "footer-widget mb-30 ml-95"
                  : "footer-widget mb-30 ml-50"
              }`}
            >
              <div className="footer-title">
                <h3>Useful Links</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={"/combos"}>
                      Combos
                    </Link>
                  </li>
                  <li>
                    <Link to={"/products"}>
                      Our Products
                    </Link>
                  </li>
                  {/*<li>*/}
                  {/*  <Link to={"/brands"}>*/}
                  {/*    Our Brands*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-4" : "col-lg-2 col-sm-6"
            }`}
          >
            <div className={`${
                sideMenu
                  ? "footer-widget mb-30 ml-145"
                  : "footer-widget mb-30 ml-75"
              }`}>
              <div className="footer-title">
                <h3>Find Us On</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/sunray.stationers/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook size={18}/>
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/sunray.stationers?igshid=lttzxenfps3z"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram size={12}/>
                      &nbsp;Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-8" : "col-lg-4 col-sm-6"
            }`}
          >
            {/* footer newsletter */}
            <FooterNewsletter spaceBottomClass="mb-30" spaceLeftClass="ml-70" sideMenu={sideMenu} />
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>

      <button
          className={`ss-wp-stick`}
          id="UncontrolledTooltipExample"
          onClick={() => {
            window.open( "https://wa.me/+919725634911",'_blank')
          }}>
        <Whatsapp size={50}/>
      </button>
      <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
        For Business Inquires
      </UncontrolledTooltip>
    </footer>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default FooterOne;
