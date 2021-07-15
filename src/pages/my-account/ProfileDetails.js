import React, { Component } from 'react'
import { Container, Button, Row, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import {withRouter} from 'react-router-dom'
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

 class ProfileDetails extends Component {
     
  state = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: [],
    address2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    password: '*********',
    oldPassword: "",
    newPassword: "",
    editName: false,
    editPassword: false,
    isLoading: false,
    apiError: "",
    error: {
      errorText: "",
      errorType: "",
    },
  };

  
    render() {
        const { first_name, last_name, email, phone, password, editName, oldPassword, newPassword, editPassword,pathname,Input } = this.state;
        return (
            <>
             <MetaTags>
        <title>Flone | Cart</title>
        <meta
          name="description"
          content="Cart page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
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
                    <a href="/account/login-security" class="segmentLink">Profile</a>
                 
                    <a href="/account/addresses/yours" class="segmentLink">Addresses</a>
                  </div>
                </div>
              </Col>
              {/* <Col lg={9}> */}
              <Col lg={8}>
                <div className="pageProfile">
                  <div className="profileEdit-card">
                    <div className="profileEdit-infoLabel">
                      Edit Details
                    </div>
                    <div className="optionWrapper">

                      <div className="option" key={'Name'}>
                        <div>
                          <h3 className="name">{'Name'}</h3>
                          {
                            !editName ? <p className="value">{first_name} {' '} {last_name}</p> :
                              <>
                                <Row form>
                                  <Col md={6}>
                                    <Input
                                      type="text"
                                      name="first_name"
                                      maxLength={15}
                                      value={first_name}
                                      onChange={this.handleInput}
                                    />
                                  </Col>
                                  <Col md={6}>
                                    <Input
                                      type="text"
                                      name="last_name"
                                      maxLength={15}
                                      value={last_name}
                                      onChange={this.handleInput}
                                    />
                                  </Col>
                                </Row>
                              </>
                          }
                        </div>
                        <div>
                          {
                            !editName ? <Button size="sm" onClick={() => this.setState({ editName: true })}>Edit</Button>
                              : <><Button size="sm" onClick={this.updateProfile}>Save</Button> <Button size="sm" onClick={() => this.setState({editName: false})}>Cancel</Button></>
                          }
                        </div>
                      </div>

                      <div className="option" key={'Email'}>
                        <div>
                          <h3 className="name">{'Email'}</h3>
                          <p className="value">{email}</p>
                        </div>

                      </div>


                      <div className="option" key={'Mobile Phone Number:'}>
                        <div>
                          <h3 className="name">{'Mobile Phone Number:'}</h3>
                          <p className="value">{phone}</p>
                        </div>

                      </div>


                      <div className="option" key={'Password'}>
                        <div>
                          <h3 className="name">{'Password'}</h3>
                          {
                            !editPassword ? <p className="value">{password}</p> :
                              <>
                                <Row form>
                                  <Col md={6}>
                                    <Input
                                      type="password"
                                      name="oldPassword"
                                      placeholder="Old Password"
                                      maxLength={15}
                                      value={oldPassword}
                                      onChange={this.handleInput}
                                    />
                                    {this.errorShow('oldPassword')}

                                  </Col>
                                  <Col md={6}>
                                    <Input
                                      type="password"
                                      name="newPassword"
                                      placeholder="New Password"
                                      maxLength={15}
                                      value={newPassword}
                                      onChange={this.handleInput}
                                    />
                                    {this.errorShow('newPassword')}
                                  </Col>
                                </Row>
                              </>
                          }


                        </div>
                        <div>
                          {
                            !editPassword ? <Button size="sm" onClick={() => this.setState({ editPassword: true })}>Edit</Button>
                              : <><Button size="sm" onClick={this.changePassword}>Save</Button> <Button size="sm" onClick={() => this.setState({editPassword: false})}>Cancel</Button></>
                          }
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </Col>
              {/* </Col> */}
            </Row>
          </div>
        </Container>
      </div>
      
      </LayoutOne>
    
            </>
        )
    }
}

export default  withRouter(ProfileDetails)