import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../../layouts/LayoutOne.js";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb.js";
import SsLoginForm from "./ssLoginForm.js";

const SsLogin = ({ location }) => {
  const { pathname } = location;

  return (
      <Fragment>
        <MetaTags>
          <title>Login | sunraystationers.com - Ask for anything you want, from the moon to Sunray we sell everything!</title>
          <meta
              name="description"
              content="Compare page of flone react minimalist eCommerce template."
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
        <BreadcrumbsItem className="font-weight-bold" to={process.env.PUBLIC_URL + pathname}>
          Login
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="login-register-area pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 ss-login-wrapper col-md-12 ml-auto mr-auto">
                  <div className="login-register-wrapper">
                    <h3 className="text-center font-weight-bolder text-dark">Sign in to your account</h3>
                    <div className="login-form-container">
                      <div className="login-register-form">
                        <SsLoginForm/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment>
  );
};

SsLogin.propTypes = {
  location: PropTypes.object
};

export default SsLogin;
