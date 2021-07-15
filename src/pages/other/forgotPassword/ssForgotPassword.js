import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import MetaTags from "react-meta-tags";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import LayoutOne from "../../../layouts/LayoutOne.js";
import requestForUserForgotPassword from "../../../redux/middlewares/auth/ssForgotPasswordMiddleware.js";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb.js";
import SsForgotPasswordForm from "./ssForgotPasswordForm.js";
import mailSent2 from "./../../../assets/images/mailSent2.svg"

const SsForgotPassword = ({ location, forgotPasswordState }) => {

    const [isEmailFirstTime,setEmailFirstTime] = useState(true)

    const { pathname } = location;

    const {
        forgotPasswordRequestPending,
        forgotPasswordSuccess,
        forgotPasswordFailure,
        forgotPasswordFailurePayload
    } = forgotPasswordState

    return (
        <Fragment>
            <MetaTags>
                <title>Forgot Password | sunraystationers.com - Ask for anything you want, from the moon to Sunray we sell everything!</title>
                <meta
                    name="description"
                    content="Compare page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem className="font-weight-bold" to={process.env.PUBLIC_URL + pathname}>
                Forgot Password
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="login-register-area pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 ss-login-wrapper col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    { ((!forgotPasswordSuccess && isEmailFirstTime) || forgotPasswordFailure)  && <>
                                        <h3 className="text-center font-weight-bolder text-dark">Forgot your password?<br/> We can help.</h3>
                                        <p className="text-center px-4 mb-0 pt-4">
                                            Enter your email address and we’ll send a link on your email to reset your password.
                                        </p>
                                    </>}
                                    <div className="login-form-container">
                                        <div className="login-register-form">
                                            <SsForgotPasswordForm isEmailFirstTime={isEmailFirstTime} handleResendFalse={() => {
                                                setEmailFirstTime(false)
                                            }}/>
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

SsForgotPassword.propTypes = {
    location: PropTypes.object
};

const mapStateToProps = state => ({
    forgotPasswordState: state.auth.ssForgotPassword
});

const mapDispatchToProps = dispatch => ({
    sendUserForgotPasswordRequest: (requestedUserData) => dispatch(requestForUserForgotPassword(requestedUserData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(SsForgotPassword))