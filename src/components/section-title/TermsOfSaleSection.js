import PropTypes from "prop-types";
import React from "react";

const TermsOfSaleSection = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h1><strong className="text-primary"> Terms of Sale </strong></h1>
          <div>
            <p className="w-100 py-3">
              All orders, whether through our website or otherwise, shall be governed by the following terms and conditions.
            </p>
          </div>
          <div className="text-left">
            <ol type="1" >
              <li>
                Goods once sold will not be accepted back.
</li>
              <li>
                Payment to be made on the delivery of goods no credit facility.
</li>
              <li>
                No claims will be entertained without  our notice within 24 hours of sale and without invoice.
</li>
              <li>
                Our responsibility ceases on the moment goods have been delivered to the buyer.
  </li>

            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

TermsOfSaleSection.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TermsOfSaleSection;
