import PropTypes from "prop-types";
import React, {Fragment, lazy} from "react";
import {toast} from "react-hot-toast";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import {connect} from "react-redux";
import {BrowserRouter, Link, Router, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import {SSAuthenticatedRoute} from "../../components/HOC/ssUserAuthRoutes.js";
import LayoutOne from "../../layouts/LayoutOne";
import { Container, Row, Col } from "reactstrap";
import Cookies from "js-cookie"
import {signOutRequest} from "../../redux/actions/auth/ssLoginActions.js";
import {emptyCart} from "../../redux/actions/cartActions.js";
import {emptyUserCartRequest} from "../../redux/actions/ssCartActions.js";
import {setUserDataCookieKey, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../utils/constants.js";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import {AccountBox} from "@styled-icons/material/AccountBox"
import {ListAlt} from "@styled-icons/fa-solid/ListAlt"
import {CreditCard2BackFill} from "@styled-icons/bootstrap/CreditCard2BackFill"
import {PowerOff} from "@styled-icons/fa-solid/PowerOff"
import {LockPassword} from  "@styled-icons/remix-fill/LockPassword"
import {Edit} from "@styled-icons/boxicons-regular/Edit"


const AccountOverview = lazy(() => import("./AccountOverview.js"));
const UserAccountOrders = lazy(() => import("./UserAccountOrders.js"));
const CreditNotes = lazy(() => import("./CreditNotes.js"));
const ChangePassword = lazy(() => import("./ChangePassword.js"))
const EditProfile = lazy(() => import("./EditProfile.js"))

const MyAccount = ({ location, userSignOutRequest, emptyGuestUserCart, emptySSUserCart, match, history }) => {
    const { pathname } = location;
    console.log("path aakjsnaksn asans====> ",pathname)

    const handleLogout = () => {
        Cookies.remove(ssClientAuthCookieKey)
        Cookies.remove(setUserDataCookieKey)
        Cookies.remove(setUserDataCookieKey)
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
        Cookies.set(ssClientAuthFlagCookieKey,false)


        toast.success("Logged out successfully",{
            style:{
                marginBottom: "40px"
            }
        })
        history.push("/")
    }


    return (
        <Fragment>
            <MetaTags>
                <title>My Account - SunrayStationers.com</title>
                <meta
                    name="description"
                    content="Compare page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem className="font-weight-bold" to={process.env.PUBLIC_URL + pathname}>
                My Account
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="py-3">
                    <Container>
                        <div className="accountPage">
                            <Row className="mt-3">
                                <Col lg={3}>
                                    <div className="sidebarSidebar ">
                                        <div className="segmentSegment">
                                            <Link to="/my-account" className={`${ pathname == "/my-account" ? "segment-activeLink" : " " } segmentLink`}>
                                                <AccountBox className="mr-3" size={25}/>
                                                Overview
                                            </Link>
                                        </div>
                                        <div className="segmentSegment">
                                            <div className="segment-heading">ORDERS</div>
                                            <Link to={`/my-account/orders`} className={`${ pathname == "/my-account/orders" ? "segment-activeLink" : "" } segmentLink`}>
                                                <ListAlt className="mr-3" size="20"/>
                                                My Orders
                                            </Link>
                                        </div>
                                        {/*<div className="segmentSegment">*/}
                                        {/*    <div className="segment-heading">CREDITS</div>*/}
                                        {/*    <Link to="/my-account/credit-notes" className={`${ pathname == "/my-account/credit-notes" ? "segment-activeLink" : ""} segmentLink`}>*/}
                                        {/*        <CreditCard2BackFill className="mr-3" size="19"/>*/}
                                        {/*        Credit Notes*/}
                                        {/*    </Link>*/}
                                        {/*</div>*/}
                                        <div className="segmentSegment">
                                            <div className="segment-heading">ACCOUNT</div>
                                            <Link to="/my-account/profile" className={`${ pathname == "/my-account/profile" ? "segment-activeLink" : ""} segmentLink`}>
                                                <Edit size={21} className="mr-3"/>
                                                Profile Details
                                            </Link>

                                            <Link to="/my-account/change-password" className={`${ pathname == "/my-account/change-password" ? "segment-activeLink" : ""} segmentLink`}>
                                                <LockPassword className="mr-3" size="19"/>
                                                Edit Password
                                            </Link>

                                            <Link onClick={async () => {
                                                Cookies.remove(ssClientAuthCookieKey)
                                                Cookies.set(ssClientAuthFlagCookieKey, false)
                                                await userSignOutRequest()
                                                await emptyGuestUserCart()
                                                await emptySSUserCart()
                                                // emptyUserCartRequest()
                                                // emptyCart()
                                                localStorage.removeItem("couponData")
                                                // signOutRequest()
                                                history.push("/")
                                                window.location.reload()
                                            }} className={`segmentLink`}>
                                                <PowerOff className="mr-3" size="20"/>
                                                Logout
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={9}>
                                    <div className="page-fullWidthComponent">
                                        <>
                                            <SSAuthenticatedRoute
                                                exact
                                                path={`${match.url}`}
                                                component={AccountOverview}
                                            />

                                            <SSAuthenticatedRoute
                                                path={`${match.url}/orders`}
                                                component={UserAccountOrders}
                                            />

                                            {/*<SSAuthenticatedRoute*/}
                                            {/*    path={`${match.url}/credit-notes`}*/}
                                            {/*    component={CreditNotes}*/}
                                            {/*/>*/}

                                            <SSAuthenticatedRoute
                                                path={`${match.url}/profile`}
                                                component={EditProfile}
                                            />

                                            <SSAuthenticatedRoute
                                                path={`${match.url}/change-password`}
                                                component={ChangePassword}
                                            />

                                        </>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

MyAccount.propTypes = {
    location: PropTypes.object
};

const mapStateToProps = state => ({
    signInState: state.auth.ssSignIn,
    cartItems: state.cartData
});

const mapDispatchToProps = dispatch => ({
    userSignOutRequest: (requestedUserData) => dispatch(signOutRequest()),
    emptyGuestUserCart: () => dispatch(emptyCart()),
    emptySSUserCart: (requestedUserData) => dispatch(emptyUserCartRequest()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(MyAccount))
