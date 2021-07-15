import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {toast} from "react-hot-toast";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import {Link, withRouter} from "react-router-dom";
import {Form, FormGroup, Input, Label} from "reactstrap";
import LayoutOne from "../../layouts/LayoutOne";
import {apiRootUrl} from "../../utils/constants.js";
import {ssValidateUserContactUs} from "../../utils/validations/ssValidations.js";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios"
// import LocationMap from "../../components/contact/LocationMap";

class Contact extends React.Component {

  state = {
    name: "",
    email: "",
    subject: "",
    message: "",
    errors: ['name', 'email',"subject","message"].reduce((current, item) => {
      current[item] = {};
      current[item]['hasError'] = false;
      current[item]['errorMsg'] = '';
      current[item]['asyncLoading'] = false;
      return current;
    }, {})
  }

  renderError = type => {
    const { errors } = this.state;
    if(type === "message"){
      return errors[type].hasError === true ? <div className="ss-textarea-error-message">{errors[type].errorMsg}</div>   : null
    }
    else {

      return errors[type].hasError === true ? <div className="ss-input-error-message">{errors[type].errorMsg}</div>   : null
    }
  };

  handleAsyncValidation = async (event) => {
    event.preventDefault();
    event.persist()
    const { name, value } = event.target;
    await this.setState({ [name]: value });
    const errorsReturned = await ssValidateUserContactUs(event,this.state)
    await this.setState({errors: errorsReturned})
  }


  validateUserRegisterForm = () => {
    const { name, subject, email, message } = this.state
    const errors = this.state.errors

    if((name == '' || name == null || !name)
        || (subject == '' || subject == null || !subject)
        || (email == '' || email == null || !email)
        || (message == '' || message == null || !message)
    ){

      if (name == '' || name == null || !name) {
        errors.name.hasError = true
        errors.name.errorMsg = 'Name is required.'
        errors.name.asyncLoading = false
      }
      else {
        errors.name.hasError = false
        errors.name.errorMsg = ""
        errors.name.asyncLoading = false
      }

      if (subject == '' || subject == null || !subject) {
        errors.subject.hasError = true
        errors.subject.errorMsg = 'Subject name is required.'
        errors.subject.asyncLoading = false
      }
      else {
        errors.subject.hasError = false
        errors.subject.errorMsg = ""
        errors.subject.asyncLoading = false
      }

      if (email == '' || email == null || !email) {
        errors.email.hasError = true
        errors.email.errorMsg = 'Email address is required.'
        errors.email.asyncLoading = false
      }
      else {
        errors.email.hasError = false
        errors.email.errorMsg = ""
        errors.email.asyncLoading = false
      }

      if (message == '' || message == null || !message) {
        errors.message.hasError = true
        errors.message.errorMsg = 'Enquiry description is required.'
        errors.message.asyncLoading = false
      }
      else {
        errors.message.hasError = false
        errors.message.errorMsg = ""
        errors.message.asyncLoading = false
      }
      this.setState({ errors: errors });
      return false
    }
    else{
      if(  errors.name.hasError === true
          || errors.subject.hasError === true
          || errors.email.hasError === true
          || errors.message.hasError === true){
        return false
      }
      else {
        return true
      }
    }
  }


  handleContactForm = (e) => {
    const {message, subject, name,email} = this.state
    e.preventDefault()
    if(this.validateUserRegisterForm()){
      axios.post(`${apiRootUrl}/v2/admin/inquiryBox`, {
        name : name,
        subject : subject,
        email : email,
        message : message
      }, {})
          .then(function (response) {
            this.props.history.push("/")
            this.setState({
              name : "",
              subject : "",
              email : "",
              message : ""
            })
            toast.success("Your inquiry has been successfully sent to the store owner.",{
              style:{
                marginBottom: "40px"
              }
            })
          })
          .catch(function (error) {
            toast.error("Something went wrong! Please try again later.",{style:{marginBottom: "40px"}})
          });
    }
  }

  render() {
    let {location} = this.props;
    const {pathname} = location;
    const {email,errors,message,name,subject} = this.state



    return (
        <Fragment>
          <MetaTags>
            <title>Suggest your need & reach us | sunraystationers.com</title>
            <meta
                name="description"
                content="Didn't find your need ? suggest us all your needs we will source it for you or call us. "
            />
          </MetaTags>
          <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
          <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
            Contact
          </BreadcrumbsItem>
          <LayoutOne headerTop="visible">
            {/* breadcrumb */}
            <Breadcrumb/>
            <div className="contact-area pt-10 pb-5">
              <div className="container">
                <div className="contact-map mb-10">
                  <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4494.636431811797!2d72.50841928641228!3d23.026402265811438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b30d68a516d%3A0x44cd1d647f6bd556!2sSarthak%20Tower%2C%20Ramdevnagar%20Rd%2C%20Ramdev%20Nagar%2C%20Ahmedabad%2C%20Gujarat%20380015!5e0!3m2!1sen!2sin!4v1613512302835!5m2!1sen!2sin"
                      frameBorder="0" className="w-100 h-100" style={{border: 0}} allowFullScreen="" aria-hidden="false"
                      tabIndex="0">
                  </iframe>
                  {/*<LocationMap latitude="47.444" longitude="-122.176" />*/}
                </div>
                <div className="custom-row-2">
                  <div className="col-lg-4 col-md-5">
                    <div className="contact-info-wrap">
                      <div className="single-contact-info">
                        <div className="contact-icon">
                          <i className="fa fa-phone"/>
                        </div>
                        <div className="contact-info-dec">
                          <p>+91 97256 34911</p>
                          <p>+91 98240 89367</p>
                        </div>
                      </div>
                      <div className="single-contact-info">
                        <div className="contact-icon">
                          <i className="fa fa-globe"/>
                        </div>
                        <div className="contact-info-dec">
                          <p>
                            <a href="mailto:urname@email.com">info@sunraystationers.com</a>
                          </p>
                        </div>
                      </div>
                      <div className="single-contact-info">
                        <div className="contact-icon">
                          <i className="fa fa-map-marker"/>
                        </div>
                        <div className="contact-info-dec">
                          <p style={{lineHeight: "25px"}}>A 202 Sarthak Towers, Ramdev Nagar,
                            Nr Courtyard Marriott, Satellite
                            Ahmedabad -380015.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-7">
                    <div className="contact-form">
                      <div className="contact-title mb-30">
                        <h2 className="text-dark">Send us a message</h2>
                      </div>
                      <Form onSubmit={this.handleContactForm} className="contact-form-style">
                        <div className="row">
                          <div className="col-lg-6">
                            <FormGroup className="form-label-group">
                              <Label>Name</Label>
                              <Input
                                  value={name}
                                  type="text"
                                  maxLength={50}
                                  name="name"
                                  className={errors.name.hasError ? "ss-input-has-error" : "" }
                                  placeholder="Name*"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={this.handleAsyncValidation}
                                  onChange={this.handleAsyncValidation}
                              />
                              {this.renderError("name")}
                            </FormGroup>
                          </div>
                          <div className="col-lg-6">
                            <FormGroup className="form-label-group">
                              <Label for="registerEmail" >Email</Label>
                              <Input
                                  id="registerEmail"
                                  value={email}
                                  type="email"
                                  maxLength={119}
                                  name="email"
                                  className={errors.email.hasError ? "ss-input-has-error" : "" }
                                  placeholder="Email*"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={this.handleAsyncValidation}
                                  onChange={this.handleAsyncValidation}
                              />
                              {this.renderError("email")}
                            </FormGroup>
                          </div>
                          <div className="col-lg-12">
                            <FormGroup className="form-label-group">
                              <Label>Subject</Label>
                              <Input
                                  value={subject}
                                  type="text"
                                  name="subject"
                                  className={errors.subject.hasError ? "ss-input-has-error" : "" }
                                  placeholder="Subject*"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={this.handleAsyncValidation}
                                  onChange={this.handleAsyncValidation}
                              />
                              {this.renderError("subject")}
                            </FormGroup>
                          </div>
                          <div className="col-lg-12">

                            <FormGroup className="form-label-group">
                              <Label>Enquiry Description</Label>
                              <Input
                                  value={message}
                                  type="textarea"
                                  name="message"
                                  className={errors.message.hasError ? "ss-text-area-has-error" : "" }
                                  placeholder="Enquiry description*"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={this.handleAsyncValidation}
                                  onChange={this.handleAsyncValidation}
                              />
                              {this.renderError("message")}
                            </FormGroup>

                        {/*<textarea*/}
                        {/*    name="message"*/}
                        {/*    placeholder="Your Massege*"*/}
                        {/*    defaultValue={""}*/}
                        {/*/>*/}
                            <button className="submit" type="submit">
                              SEND
                            </button>
                          </div>
                        </div>
                      </Form>
                      <p className="form-messege"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LayoutOne>
        </Fragment>
    );
  }
}

Contact.propTypes = {
  location: PropTypes.object
};

export default withRouter(Contact);
