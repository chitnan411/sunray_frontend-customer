import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import LayoutOne from "../../../layouts/LayoutOne.js";
import requestForUserCreateNewPassword from "../../../redux/middlewares/auth/ssCreateNewPasswordMiddleware.js";
import requestForUserValidateCreateNewPasswordLink
    from "../../../redux/middlewares/auth/ssValidateCreatePasswordLinkMiddleware.js";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb.js";
import SsCreatePasswordForm from "./ssCreatePasswordForm.js";

const SsCreatePassword = ({ location,createNewPasswordState, validateCreatePasswordLinkState  }) => {

    const { pathname } = location;

    const {
        createNewPasswordRequestPending,
        createNewPasswordSuccess,
        createNewPasswordFailure,
        createNewPasswordFailurePayload,
        createNewPasswordSuccessPayload,
    } = createNewPasswordState

    const {
        validateCreatePasswordLinkRequestPending,
        validateCreatePasswordLinkSuccess,
        validateCreatePasswordLinkFailure,
        validateCreatePasswordLinkFailurePayload,
        validateCreatePasswordLinkSuccessPayload,
    } = validateCreatePasswordLinkState


    return (
        <Fragment>
            <MetaTags>
                <title>Create new password | sunraystationers.com - Ask for anything you want, from the moon to Sunray we sell everything!</title>
                <meta
                    name="description"
                    content="Compare page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem className="font-weight-bold" to={process.env.PUBLIC_URL + pathname}>
                Reset Password
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="login-register-area pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 ss-login-wrapper col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    {( validateCreatePasswordLinkSuccess && validateCreatePasswordLinkSuccessPayload ) &&
                                        <h3 className="text-center text-dark">Reset password</h3>
                                    }
                                    <div className="login-form-container">
                                        <div className="login-register-form">
                                            <SsCreatePasswordForm/>
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

SsCreatePassword.propTypes = {
    location: PropTypes.object
};


const mapStateToProps = state => ({
    validateCreatePasswordLinkState: state.auth.ssValidateCreateNewPassword,
    createNewPasswordState: state.auth.ssCreateNewPassword
});

const mapDispatchToProps = dispatch => ({
    sendCreateNewPasswordRequest: (requestedUserData) => dispatch(requestForUserCreateNewPassword(requestedUserData)),
    sendValidateCreateNewPasswordLinkRequest: (requestedUserData) => dispatch(requestForUserValidateCreateNewPasswordLink(requestedUserData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(SsCreatePassword))
