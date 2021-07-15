import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {toast} from "react-hot-toast";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Cookies from "js-cookie"
import {signOutRequest} from "../../redux/actions/auth/ssLoginActions.js";
import {emptyCart} from "../../redux/actions/cartActions.js";
import {emptyUserCartRequest} from "../../redux/actions/ssCartActions.js";
import {setUserDataCookieKey, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../utils/constants.js";
import changePass from "../../assets/images/changepass.svg"
import noProfileImage from "../../assets/images/bg/noProfileImage.svg"

const AccountOverview = ({ location, emptySSUserCart, emptyGuestUserCart, userSignOutRequest, history }) => {
    const { pathname } = location;

    const AuthUser = JSON.parse(Cookies.get(setUserDataCookieKey))

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
            <div className="personPerson">
                <div className="person-background">
                    <div className="person-infoWrapper">
                        <div className="person-imageHolder">
                            <div className="over-account">
                                <img src={AuthUser && AuthUser.profilepic && AuthUser.profilepic.length > 0 ? AuthUser.profilepic[0].original : noProfileImage} height={125} width={125} />
                            </div>
                        </div>
                        <Row style={{ justifyContent: 'flex-end' }}>
                            <div className="person-infoHolder">
                                <Link className="person-editProfile" to="/my-account/profile">Edit Profile</Link>
                            </div>
                        </Row>
                        <Row className="mt-4">
                            <div className="ml-4 person-info">
                                <h4 className="text-dark font-weight-bolder">
                                    {AuthUser && AuthUser.firstName} &nbsp;
                                    {AuthUser && AuthUser.lastName}
                                </h4>
                            </div>
                        </Row>
                        <Row className="mt-1">
                            <div className=" ml-4 person-info">
                                {AuthUser && AuthUser.email}
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
            <div className="dashboardData">
                <Row className="dashboard-squareContainer">
                    <Col lg={4}>
                        <Link className="linkCard" to="/my-account/orders">
                            <div className="linkContent">
                                <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-orders.png" />
                                <div className="link-labels">
                                    <div className="link-label">Orders</div>
                                    <div className="link-subLabel">Check your order status</div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                    {/*<Col lg={4}>*/}
                    {/*    <Link className="linkCard" to="/my-account/credit-notes">*/}
                    {/*        <div className="linkContent">*/}
                    {/*            <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-myntrapoints.png" />*/}
                    {/*            <div className="link-labels">*/}
                    {/*                <div className="link-label">Credit Notes</div>*/}
                    {/*                <div className="link-subLabel">Earn Cash as you shop and use them in checkout</div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </Link>*/}
                    {/*</Col>*/}
                    <Col lg={4}>
                        <Link className="linkCard" to="/my-account/profile">
                            <div className="linkContent">
                                <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-edit.png" />
                                <div className="link-labels">
                                    <div className="link-label">Profile Details</div>
                                    <div className="link-subLabel">Manage your profile </div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col lg={4}>
                        <Link className="linkCard" to="/my-account/change-password">
                            <div className="linkContent">
                                <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-edit.png" />
                                <div className="link-labels">
                                    <div className="link-label">Change Password</div>
                                    <div className="link-subLabel">Change your current password</div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>
                <Row className="dashboard-squareContainer">
                </Row>
            </div>
            {/*<div onClick={() => {*/}
            {/*    handleLogout()*/}
            {/*    emptySSUserCart()*/}
            {/*    emptyGuestUserCart()*/}
            {/*    localStorage.removeItem("couponData")*/}
            {/*    userSignOutRequest()*/}
            {/*}} className="dashboard-logoutButton">*/}
            {/*    Logout*/}
            {/*</div>*/}
        </Fragment>
    );
};

AccountOverview.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(AccountOverview))
