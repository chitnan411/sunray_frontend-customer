import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {toast} from "react-hot-toast";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import LayoutOne from "../../layouts/LayoutOne";
import { Container, Row, Col } from "reactstrap";
import Cookies from "js-cookie"
import {signOutRequest} from "../../redux/actions/auth/ssLoginActions.js";
import {emptyCart} from "../../redux/actions/cartActions.js";
import {emptyUserCartRequest} from "../../redux/actions/ssCartActions.js";
import requestForUserSignIn from "../../redux/middlewares/auth/ssSignInMiddleware.js";
import {setUserDataCookieKey, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../utils/constants.js";

import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Link } from "react-scroll";
// import {Link} from "react-router-dom"

const MyAccount = ({ location, emptySSUserCart, emptyGuestUserCart, userSignOutRequest, history }) => {
  const { pathname } = location;

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
          <title>Flone | My Account</title>
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
              {/* <div style={{ maxWidth: 700 }} className="mx-auto">
            <h3 className="mb-4">Your Account</h3>
            <Row>
              {accountOptions.map((data, index) => (
                <ReactWOW key={data.name} animation={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}>
                  <Col md={6} className="mb-3 mb-md-4">
                    <OptionCard {...data} />
                  </Col>
                </ReactWOW>
              ))}
            </Row>
          </div> */}
              <div className="accountPage">
                <div className="accountAccount">
                  <div className="accountHeading">
                    Account
                  </div>
                  <div>
                    {/* {`${first_name} ${last_name}`} */}
                  </div>
                  <div style={{ border: '1px ' }}></div>
                </div>
                <Row className="mt-3">
                  <Col lg={3}>
                    <div className="sidebarSidebar ">
                      <div className="segmentSegment">
                        <a href="/account" class="segment-activeLink segmentLink">Overview</a>
                      </div>
                      <div className="segmentSegment">
                        <div class="segment-heading">ORDERS</div>
                        <a href="/my-account/orders" class="segmentLink">Orders &amp; Returns</a>
                      </div>
                      <div className="segmentSegment">
                        <div class="segment-heading">CREDITS</div>
                        <a href="/account/coupons" class="segmentLink">Coupons</a>

                        <a href="/account" class="segmentLink">Credit Notes</a>
                      </div>
                      <div className="segmentSegment">
                        <div class="segment-heading">ACCOUNT</div>
                        <a href="/profile-details" class="segmentLink">Profile</a>

                        <a href="/user-address" class="segmentLink">Addresses</a>
                      </div>
                    </div>
                  </Col>
                  <Col lg={9}>
                    <div className="page-fullWidthComponent">
                      <div className="personPerson">
                        <div className="person-background">
                          <div className="person-infoWrapper">
                            <div className="person-imageHolder">
                              <div className="person-defaultImage">
                              </div>
                            </div>
                            <Row style={{ justifyContent: 'flex-end' }}>
                              <div className="person-infoHolder">
                                <a class="person-editProfile" href="/account/login-security">Edit Profile</a>
                              </div>
                            </Row>
                            <Row className="mt-4">
                              <div class="person-info">
                                {/* &nbsp;&nbsp;&nbsp;{email} */}
                              </div>
                            </Row>
                          </div>
                        </div>
                      </div>
                      <div className="dashboardData">
                        <Row className="dashboard-squareContainer">
                          <Col lg={4}>
                            <a className="linkCard" href="/odersreturn">
                              <div className="linkContent">
                                <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-orders.png" />
                                <div className="link-labels">
                                  <div className="link-label">Orders</div>
                                  <div className="link-subLabel">Check your order status</div>
                                </div>
                              </div>
                            </a>
                          </Col>
                          <Col lg={4}>
                            <a className="linkCard" href="/wishlist">
                              <div className="linkContent">
                                <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-collections.png" />
                                <div className="link-labels">
                                  <div className="link-label">Collections & Wishlist</div>
                                  <div className="link-subLabel">All your curated product collections</div>
                                </div>
                              </div>
                            </a>
                          </Col>
                          {/* <Col lg={4}>
                          <a className="linkCard" href="/account">
                            <div className="linkContent">
                              <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-myntra-credit.png" />
                              <div className="link-labels">
                                <div className="link-label">Myntra Credit</div>
                                <div className="link-subLabel">Manage all your refunds & gift cards</div>
                              </div>
                            </div>
                          </a>
                        </Col> */}
                          <Col lg={4}>
                            <a className="linkCard" href="/account">
                              <div className="linkContent">
                                <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-myntrapoints.png" />
                                <div className="link-labels">
                                  <div className="link-label">Credit Notes</div>
                                  <div className="link-subLabel">Earn Cash as you shop and use them in checkout</div>
                                </div>
                              </div>
                            </a>
                          </Col>
                        </Row>
                        <Row className="dashboard-squareContainer">
                          <Col lg={4}>
                            <a className="linkCard" href="/account/addresses/yours">
                              <div className="linkContent">
                                <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-address.png" />
                                <div className="link-labels">
                                  <div className="link-label">Addresses</div>
                                  <div className="link-subLabel">Save addresses for a hassle-free checkout</div>
                                </div>
                              </div>
                            </a>
                          </Col>
                          <Col lg={4}>
                            <a className="linkCard" href="/account/coupons">
                              <div className="linkContent">
                                <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-coupons.png" />
                                <div className="link-labels">
                                  <div className="link-label">Coupons</div>
                                  <div className="link-subLabel">Manage coupons for additional discounts</div>
                                </div>
                              </div>
                            </a>
                          </Col>
                          <Col lg={4}>
                            <a className="linkCard" href="/profile-details">
                              <div className="linkContent">
                                <img className="link-icon" src="https://constant.myntassets.com/mymyntra/assets/img/profile-edit.png" />
                                <div className="link-labels">
                                  <div className="link-label">Profile Details</div>
                                  <div className="link-subLabel">Change your profile details & password</div>
                                </div>
                              </div>
                            </a>
                          </Col>
                        </Row>
                        <Row className="dashboard-squareContainer">
                        </Row>
                      </div>
                      <div onClick={() => {
                        handleLogout()
                        emptySSUserCart()
                        emptyGuestUserCart()
                        localStorage.removeItem("couponData")
                        userSignOutRequest()
                      }} className="dashboard-logoutButton">
                        Logout
                      </div>
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
