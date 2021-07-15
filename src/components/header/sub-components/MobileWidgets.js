import React from "react";

const MobileWidgets = () => {
  return (
    <div className="offcanvas-widget-area">
      <div className="off-canvas-contact-widget">
        <div className="header-contact-info">
          <ul className="header-contact-info__list">
            <li>
              <i className="fa fa-phone"></i>{" "}
              <a href="tel://+919725634911">+91 97256 34911</a>
            </li>
            <li>
              <i className="fa fa-phone"></i>{" "}
              <a href="tel://+919824089367">+91 98240 89367</a>
            </li>
            <li>
              <i className="fa fa-envelope"></i>{" "}
              <a href="mailto:info@yourdomain.com">info@sunraystationers.com</a>
            </li>
          </ul>
        </div>
      </div>
      {/*Off Canvas Widget Social Start*/}
      <div className="off-canvas-widget-social">
        <a href="https://instagram.com/sunray.stationers?igshid=lttzxenfps3z" title="Instagram">
          <i className="fa fa-instagram text-primary"></i>
        </a>
        <a href="https://www.facebook.com/sunray.stationers/" title="Facebook">
          <i className="fa fa-facebook text-primary"></i>
        </a>
      </div>
      {/*Off Canvas Widget Social End*/}
    </div>
  );
};

export default MobileWidgets;
