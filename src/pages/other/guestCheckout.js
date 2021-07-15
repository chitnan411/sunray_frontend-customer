import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import {withRouter} from "react-router";
import {Button, Col, Container, Row} from "reactstrap";
import LayoutOne from "../../layouts/LayoutOne.js";
import SsLoginForm from "./login/ssLoginForm.js";

const SsLogin = ({ location, history }) => {
    const { pathname } = location;

    return (
        <Fragment>
            <MetaTags>
                <title>Checkout | sunraystationers.com</title>
                <meta
                    name="description"
                    content="Compare page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <LayoutOne headerTop="visible">
                <div className="login-register-area pb-100">
                    <Container>
                        <Row className="mt-70">
                            <Col className="mx-5">
                                <Row>
                                    <div className="login-register-wrapper ss-border-btm-grey mt-5">
                                        <h3 className="text-left font-weight-bold text-dark">PERSONALIZED SHOPPING EXPERIENCE</h3>
                                        <p>Create an account now for a personalized shopping experience. It's easy!</p>
                                        <Button onClick={() => {
                                            history.push("/create-account")
                                        }} className="ss-sm-btn-primary mb-5" type="button">
                                            SIGN UP
                                        </Button>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="login-register-wrapper w-100 mt-5">
                                        <h3 className="text-left font-weight-bold text-dark">No account? No worries.</h3>
                                        <p>You can checkout without creating an account.</p>
                                        <Button onClick={() => {
                                            history.push("/checkout")
                                        }} className="ss-btn-primary w-75 mb-5" type="button">
                                            CHECKOUT AS A GUEST
                                        </Button>
                                    </div>
                                </Row>
                            </Col>
                            <Col className="mx-5 gc-signin-wrapper">
                                <div  className="login-register-wrapper mt-5">
                                    <h3 style={{padding: "0 1rem"}} className="text-left font-weight-bold text-dark">RETURNING CUSTOMER</h3>
                                    <div className="login-form-container">
                                        <div className="login-register-form">
                                            <SsLoginForm/>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

SsLogin.propTypes = {
    location: PropTypes.object
};

export default withRouter(SsLogin);
