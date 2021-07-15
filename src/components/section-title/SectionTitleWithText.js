import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To<strong className="text-primary"> Sunray </strong> Stationers</h1>


          {/*About us*/}
          {/*Whether you need basic supplies for your office, superior-quality stationery for your school notes, or any art material to create flawless designs, Sunray Stationers will deliver it all at your doorstep. We understand your fear of stepping out of your homes in the middle of a pandemic and have curated a precise process of sanitising the products you order so that you don’t have to. Buying stationery will now be as easy and quick as getting food online from your favourite restaurant. From adhesives to paints, from plain paper to executive notebooks and diaries, from highlighters to professional paint, we’ve got you covered so that you can sit back to work without worry.*/}
          <p>
            Whether you need basic supplies for your office, superior-quality stationery for your school notes, or any art material to create flawless designs, Sunray Stationers will deliver it all at your doorstep. We understand your fear of stepping out of your homes in the middle of a pandemic and have curated a precise process of sanitising the products you order so that you don’t have to. Buying stationery will now be as easy and quick as getting food online from your favourite restaurant. From adhesives to paints, from plain paper to executive notebooks and diaries, from highlighters to professional paint, we’ve got you covered so that you can sit back to work without worry.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
