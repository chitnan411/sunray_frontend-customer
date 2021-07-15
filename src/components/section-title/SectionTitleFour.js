import PropTypes from "prop-types";
import React from "react";

const SectionTitleFour = ({ titleText,className, spaceBottomClass }) => {
  return (
    <div
      className={`section-title-3  ${spaceBottomClass ? spaceBottomClass : ""}`}
    >
      <h4 className={className ? className : ""}>{titleText}</h4>
    </div>
  );
};

SectionTitleFour.propTypes = {
  spaceBottomClass: PropTypes.string,
  titleText: PropTypes.string,
  className: PropTypes.string,
};

export default SectionTitleFour;
