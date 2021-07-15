import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack"
import axios from "axios";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {toast} from "react-hot-toast";
import MetaTags from "react-meta-tags";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import nothingToCheckout from "../../assets/images/bg/7.svg"
// import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import {Popover, PopoverBody} from "reactstrap/es";
import {signOutRequest} from "../../redux/actions/auth/ssLoginActions.js";

import {deleteAllFromCart, emptyCart} from "../../redux/actions/cartActions";
import {emptyUserCartRequest} from "../../redux/actions/ssCartActions.js";
import {
  apiRootUrl,
  setUserDataCookieKey,
  ssClientAuthCookieKey,
  ssClientAuthFlagCookieKey
} from "../../utils/constants";
import {ssValidatePlaceOrder, ssValidateUserSignIn} from "../../utils/validations/ssValidations.js";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {QuestionCircle} from "@styled-icons/fa-solid/QuestionCircle"
import {Warning} from "@styled-icons/entypo/Warning"


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const Checkout = ({ location, cartItems, currency, deleteAllFromCart, emptySSUserCart }) => {
  const [delivery, setDelivery] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [couponData, setCouponData] = useState();
  const [shipping, setShipping] = useState();
  const [grandCartTotal,setGrandTotal] = useState(0)


  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [streetName, setStreetName] = useState();
  const [streetAddress, setStreetAddress] = useState();
  const [city, setCity] = useState();
  const [postCode,setPostCode] = useState()
  const [addressState, setAddressState] = useState();
  const [isOrderPending, setOrderPending] = useState(false)


  const prevFirstName = usePrevious(firstName)
  const prevLastName = usePrevious(lastName)
  const prevEmail = usePrevious(email)
  const prevPhone = usePrevious(phone)
  const prevStreetName = usePrevious(streetName)
  const prevStreetAddress = usePrevious(streetAddress)
  const prevCity = usePrevious(city)
  const prevPostCode = usePrevious(postCode)
  const prevAddressState = usePrevious(addressState)
  const prevDelivery = useState(delivery)

  const [isEmailPopOpen,setIsEmailAddOpen] = useState(false)
  const [isPhonePopOpen,setIsPhoneAddOpen] = useState(false)


  const isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)
  let authUser;
  const [errors,setErrors] = useState(['firstName', 'lastName','email','phone','streetName','streetAddress','city','postCode','addressState'].reduce((current, item) => {
    current[item] = {};
    current[item]['hasError'] = false;
    current[item]['errorMsg'] = "";
    return current;
  }, {}))

  const { pathname } = location;

  const { addToast } = useToasts();

  useEffect(() => {
    let total = calcTotalPrice(cartItems);

    setFinalPrice(total);
    if (couponData) {
      applyCouponCode(couponData.code, couponData.affiliateCode, cartItems);
    }

    getDeliveryPrice(finalPrice);

  }, [cartItems]);

  useEffect(() => {
    getDeliveryPrice(finalPrice);
  }, []);


  useEffect(() => {
    console.log("delivery charges changes )()((()()()()", delivery)
    console.log("final price changes )()((()()()()", finalPrice)
    setGrandTotal(finalPrice + delivery)
  },[delivery])

  // useEffect(() => {
  //   if(prevDelivery !== delivery){
  //     setGrandTotal(finalPrice + delivery)
  //   }
  //   console.log("final price final price final price )()((()()()()",finalPrice, delivery)
  //   console.log(" setGrandTotal(Math.round(finalPrice + delivery))setGrandTotal(Math.round(finalPrice + delivery)) ", grandCartTotal)
  //   if(
  //       prevFirstName !== firstName
  //       || prevLastName !== lastName
  //       || prevEmail !== email
  //       || prevPhone !== phone
  //       || prevStreetName !== streetName
  //       || prevStreetAddress !== streetAddress
  //       || prevCity !== city
  //       || prevPostCode !== postCode
  //       || prevAddressState !== addressState
  //   ){}
  //   getDeliveryPrice(finalPrice)
  // })


    // useEffect(() => {
    //   getDeliveryPrice(finalPrice)
    // },[])

  useEffect(() => {
    getDeliveryPrice(finalPrice);
  }, [finalPrice, delivery]);

  useEffect(() => {
    let data = localStorage.getItem("couponData");

    if (data) {
      let parsedData = JSON.parse(data);
      setCouponData(parsedData);
      applyCouponCode(parsedData.code, parsedData.affiliateCode, cartItems);
    }
  }, []);

  const calcTotalDiscount = (data) => {
    let total = 0;
    data.forEach((cartItem) => {
      if (getDiscountedPrice(cartItem)) {
        let discount =
            Number(cartItem.price) - Number(getDiscountedPrice(cartItem));

        if (discount > 0) total += discount * cartItem.quantity;
      }
    });

    return parseFloat(total);
  };

  const calcFirstPrice = (data = []) => {
    let total = 0;
    data.forEach((cartItem) => {
      total += cartItem.price * cartItem.quantity;
    });
    return Math.round(total);
  };

  const getDeliveryPrice = async (totalPrice) => {
    try {
      let resp = await axios.get(
          `${apiRootUrl}/v2/admin/deliveryChargeForUser?subTotal=${totalPrice}`
      );

      setDelivery(resp.data.card.data);
    } catch (error) {
      console.log(error);
    }
  };

  const calcTotalPrice = (data = []) => {
    let total = 0;
    data.forEach((cartItem) => {
      const discountedPrice = getDiscountedPrice(cartItem);

      if (discountedPrice) total += discountedPrice * cartItem.quantity;
      else total += cartItem.price * cartItem.quantity;
    });

    return Math.round(total);
  };

  const getDiscountedPrice = (product) => {
    let price = 0;
    if ( ((product.crazyDealPrice) &&
        (new Date(product.crazyDealStartDate).getTime() <= new Date().getTime()) ) &&
        (new Date(product.crazyDealExpiryDate).getTime() >= new Date().getTime()) )
    {
      price = product.crazyDealPrice;
      return (price)
    }
    else if (
        (product.offeredPrice) &&
        (new Date(product.offerStartDate).getTime() <= new Date() ) &&
        (new Date(product.offerExpiryDate).getTime() >= new Date())
    ) {
      price = product.offeredPrice;
      return (price)
    }
    else {
      return (product.price);
    }
  };


  const validatePlaceOrderForm = () => {
    const placeOrderErrors = {...errors}
    if(
        (!firstName || firstName == "" || firstName == null)
        || (!lastName || lastName == "" || lastName == null)
        || (!email || email == "" || email == null)
        || (!phone || phone == "" || phone == null)
        || (!streetName || streetName == "" || streetName == null)
        || (!streetAddress || streetAddress == "" || streetAddress == null)
        || (!city || city == "" || city == null)
        || (!addressState || addressState == "" || addressState == null)
        || (!postCode || postCode == "" || postCode == null)
    ){



      if(!firstName || firstName == "" || firstName == null){
        placeOrderErrors.firstName.hasError = true
        placeOrderErrors.firstName.errorMsg = 'First name is required.'
        setErrors({...placeOrderErrors})
      }
      else{
        placeOrderErrors.firstName.hasError = false
        placeOrderErrors.firstName.errorMsg = ''
        setErrors({...placeOrderErrors})
      }


      if(!lastName || lastName == "" || lastName == null){
        placeOrderErrors.lastName.hasError = true
        placeOrderErrors.lastName.errorMsg = 'Last name is required.'
        setErrors({...placeOrderErrors})
      }
      else{
        placeOrderErrors.lastName.hasError = false
        placeOrderErrors.lastName.errorMsg = ''
        setErrors({...placeOrderErrors})
      }


      if(!email || email == "" || email == null){
        placeOrderErrors.email.hasError = true
        placeOrderErrors.email.errorMsg = 'Email address is required.'
        setErrors({...placeOrderErrors})
      }
      else{
        placeOrderErrors.email.hasError = false
        placeOrderErrors.email.errorMsg = ''
        setErrors({...placeOrderErrors})
      }

      if(!phone || phone == "" || phone == null){
        placeOrderErrors.phone.hasError = true
        placeOrderErrors.phone.errorMsg = 'Phone number is required.'
        setErrors({...placeOrderErrors})
      }
      else{
        placeOrderErrors.phone.hasError = false
        placeOrderErrors.phone.errorMsg = ''
        setErrors({...placeOrderErrors})
      }

      if(!streetName || streetName == "" || streetName == null){
        placeOrderErrors.streetName.hasError = true
        placeOrderErrors.streetName.errorMsg = 'Street name is required.'
        setErrors({...placeOrderErrors})
      }
      else{
        placeOrderErrors.streetName.hasError = false
        placeOrderErrors.streetName.errorMsg = ''
        setErrors({...placeOrderErrors})
      }

      if(!streetAddress || streetAddress == "" || streetAddress == null){
        placeOrderErrors.streetAddress.hasError = true
        placeOrderErrors.streetAddress.errorMsg = 'Street address is required.'
        setErrors({...placeOrderErrors})
      }
      else{
        placeOrderErrors.streetAddress.hasError = false
        placeOrderErrors.streetAddress.errorMsg = ''
        setErrors({...placeOrderErrors})
      }

      if(!city || city == "" || city == null){
        placeOrderErrors.city.hasError = true
        placeOrderErrors.city.errorMsg = 'City name is required.'
        setErrors({...placeOrderErrors})
      }
      else{
        placeOrderErrors.city.hasError = false
        placeOrderErrors.city.errorMsg = ''
        setErrors({...placeOrderErrors})
      }

      if(!addressState || addressState == "" || addressState == null){
        placeOrderErrors.addressState.hasError = true
        placeOrderErrors.addressState.errorMsg = 'State name is required.'
        setErrors({...placeOrderErrors})
      }
      else{
        placeOrderErrors.addressState.hasError = false
        placeOrderErrors.addressState.errorMsg = ''
        setErrors({...placeOrderErrors})
      }

      if(!postCode || postCode == "" || postCode == null){
        placeOrderErrors.postCode.hasError = true
        placeOrderErrors.postCode.errorMsg = 'Pincode is required.'
        setErrors({...placeOrderErrors})
      }
      else{
        placeOrderErrors.postCode.hasError = false
        placeOrderErrors.postCode.errorMsg = ''
        setErrors({...placeOrderErrors})
      }
      setErrors({...placeOrderErrors})
      return false
    }
    else {

      if (
          (errors.firstName.hasError === true)
          || (errors.lastName.hasError === true)
          || (errors.email.hasError === true)
          || (errors.phone.hasError === true)
          || (errors.streetName.hasError === true)
          || (errors.streetAddress.hasError === true)
          || (errors.city.hasError === true)
          || (errors.addressState.hasError === true)
          || (errors.postCode.hasError === true)
      ){
        return  false
      }
      else {
        return true
      }

    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validatePlaceOrderForm()) {
      let data = {
        products: [],
        combos: [],
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: {streetName: "", apartment: ""},
        town: "",
        state: "",
        postCode: "",
        discount: 0,
        subTotal: 0,
        shipping: 0,
        total: 0,
      };

      cartItems.forEach((cart) => {
        if (cart.productName) {
          data.products.push({product: cart._id, quantity: cart.quantity});
        }
      });

      cartItems.forEach((cart) => {
        if (cart.comboName) {
          data.combos.push({combo: cart._id, quantity: cart.quantity});
        }
      });

      data.firstName = firstName;
      data.lastName = lastName;
      data.email = email;
      data.phone = phone;
      data.streetAddress.streetName = streetName;
      data.streetAddress.apartment = streetAddress;
      data.town = city;
      data.state = addressState;
      data.postCode = postCode;
      data.shipping = parseFloat(delivery)
      data.total = calcFirstPrice(cartItems)
      data.subTotal = Math.round(parseFloat(finalPrice))

      if (couponData && couponData.code){
        data["offerCode"] = couponData.code;
      }

      if (couponData && couponData.data && couponData.data.discount){
        data["discount"] = (Math.round(couponData.data.discount));
      }
      else {
        data["discount"] = (Math.round(calcTotalDiscount(cartItems)));
      }

      if (couponData && couponData.affiliateCode){
        data["affiliateCode"] = couponData.affiliateCode;
      }

      console.log("data  daodsknm skn skns ========>",data)

      setOrderPending(true)

      axios
          .post(`${apiRootUrl}/v2/admin/checkout`, data)
          .then((d) => {
            setOrderPending(false)
            localStorage.removeItem("couponData");
            localStorage.removeItem("couponData");
            setCouponData()
            deleteAllFromCart();
            emptySSUserCart()
            toast.success("Your order has been placed.",{
              style:{
                marginBottom: "40px"
              }
            })
          })
          .catch((error) => {
            setOrderPending(false)
            console.log(error);
            if(error.response){
              if(error.response.data.message){
                toast.error(error.response.data.message,{
                  style:{
                    marginBottom: "40px"
                  }
                })
              }
            }


          });
    }
  };

  const applyCouponCode = (code, affiliateCode, data) => {
    let subTotal = calcTotalPrice(data);
    let discount = calcTotalDiscount(data);
    let total = (Number(subTotal) + Number(discount)).toFixed(2);

    let final = { code, subTotal, discount, total };
    if (affiliateCode) final["affiliateCode"] = affiliateCode;

    axios
        .post(`${apiRootUrl}/v2/admin/couponCodeForGuest`, final)
        .then((data) => {
          let coupon = {
            code,
            data: data.data,
          };

          if (affiliateCode) coupon["affiliateCode"] = affiliateCode;

          setCouponData(coupon);

          localStorage.setItem("couponData", JSON.stringify(coupon));
          setFinalPrice(data.data.subTotal);
        })
        .catch((error) => console.log(error));
  };


  const handleAsyncValidation = async (e) => {
    e.preventDefault();
    e.persist()
    const {name,value} = e.target
    console.log(name,value,"name value")
    if(name == "firstName") setFirstName(value)
    if(name == "lastName") setLastName(value)
    if(name == "email") setEmail(value)
    if(name == "phone") setPhone(value)
    if(name == "streetName") setStreetName(value)
    if(name == "streetAddress") setStreetAddress(value)
    if(name == "city") setCity(value)
    if(name == "addressState") setAddressState(value)
    if(name == "postCode") setPostCode(value)
    const errorsReturned = await ssValidatePlaceOrder(e, {...errors})
    setErrors({...errorsReturned})
  }


  const renderError = (type) => {
    return errors[type].hasError === true ? <div className="ss-order-error-message">{errors[type].errorMsg}</div>   : null
  }

  useEffect(() => {
    if(isAuthenticated == true || isAuthenticated == "true"){
      authUser = JSON.parse(Cookies.get(setUserDataCookieKey))
    }
    setEmail(authUser && authUser.email)
  }, [])


  return (
      <Fragment>
        <MetaTags>
          <title>Place your order now | sunraystationers.comss</title>
          <meta
              name="description"
              content="Checkout page of flone react minimalist eCommerce template."
          />
        </MetaTags>
        {console.log("errors errors errors errors", errors)}
        <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
        <BreadcrumbsItem className="font-weight-bolder" to={pathname}>
          Checkout
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="checkout-area pt-4 pb-100">
            <div className="container">
              {cartItems && cartItems.length >= 1 ? (
                  <Form
                      className="row"
                      onSubmit={handleSubmit}
                  >
                    <div className="col-lg-7">
                      <div className="billing-info-wrap">
                        <h3>Billing Details</h3>

                        <Row form>
                          <Col md={6}>
                            <FormGroup className="form-label-group">
                              <Label for="firstName" >First Name</Label>
                              <strong><span className="field-required text-danger">*</span></strong>
                              <Input
                                  id="firstName"
                                  value={firstName}
                                  type="text"
                                  maxLength={50}
                                  name="firstName"
                                  className={errors && errors.firstName && errors.firstName.hasError ? "ss-input-has-error" : "" }
                                  placeholder="First name"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={handleAsyncValidation}
                                  onChange={handleAsyncValidation}
                              />
                              {renderError("firstName")}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup className="form-label-group">
                              <Label for="lastName" >Last Name</Label>
                              <Input
                                  id="lastName"
                                  value={lastName}
                                  type="text"
                                  maxLength={50}
                                  name="lastName"
                                  className={errors && errors.lastName && errors.lastName.hasError ? "ss-input-has-error" : "" }
                                  placeholder="Last name"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={handleAsyncValidation}
                                  onChange={handleAsyncValidation}
                              />
                              {renderError("lastName")}
                            </FormGroup>
                          </Col>
                        </Row>


                        <Row form>
                          <Col md={6}>
                            <FormGroup className="form-label-group">
                              <Label for="email" >Email Address</Label>
                              <strong><span className="field-required text-danger">*</span></strong>

                              { (!isAuthenticated || isAuthenticated == false || isAuthenticated == "false") &&
                              <>
                                <span id="emailPopover"
                                      onMouseEnter={() => {
                                        setIsEmailAddOpen(true)
                                      }}
                                      onMouseLeave={() => {
                                        setIsEmailAddOpen(false)
                                      }}
                                      className="ml-1">
                                  <Warning size={15} color="orange"/>
                                </span>
                                <Popover
                                    placement="top"
                                    target="emailPopover"
                                    isOpen={isEmailPopOpen}
                                    toggle={() => setIsEmailAddOpen(!isEmailPopOpen)}
                                >
                                  <PopoverBody className="text-warning font-weight-bold">
                                    Kindly enter your real email address because we'll mail you auto generated password to track your order history.
                                  </PopoverBody>
                                </Popover>
                              </>
                              }
                              {
                                (!isAuthenticated || isAuthenticated == false || isAuthenticated == "false")
                                    ?
                                    <Input
                                        id="email"
                                        value={email}
                                        type="text"
                                        maxLength={50}
                                        name="email"
                                        className={errors && errors.email && errors.email.hasError ? "ss-input-has-error" : ""}
                                        placeholder="Email address"
                                        onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                        onBlur={handleAsyncValidation}
                                        onChange={handleAsyncValidation}
                                    />
                                    :
                                    <Input
                                        id="email"
                                        value={JSON.parse(Cookies.get(setUserDataCookieKey)) && JSON.parse(Cookies.get(setUserDataCookieKey)).email}
                                        type="text"
                                        disabled
                                        maxLength={50}
                                        name="email"
                                        style={{
                                          background: "#ececec",
                                          border: "none"
                                        }}
                                        placeholder="Email address"
                                        onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                        onBlur={handleAsyncValidation}
                                        onChange={handleAsyncValidation}
                                    />
                              }
                              {renderError("email")}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup className="form-label-group">
                              <Label for="phone" >Phone Number</Label>
                              <strong><span className="field-required text-danger">*</span></strong>
                              <span id="phonePopover"
                                    onMouseEnter={() => {
                                      setIsPhoneAddOpen(true)
                                    }}
                                    onMouseLeave={() => {
                                      setIsPhoneAddOpen(false)
                                    }}
                                    className="ml-1">
                              <Warning size={15} color="orange"/>
                            </span>
                              <Popover
                                  placement="top"
                                  target="phonePopover"
                                  isOpen={isPhonePopOpen}
                                  toggle={() =>  setIsPhoneAddOpen(!isPhonePopOpen) }
                              >
                                <PopoverBody className="text-warning font-weight-bold">
                                  Your order will be confirmed via your phone number.
                                </PopoverBody>
                              </Popover>
                              <Input
                                  id="phone"
                                  value={phone}
                                  type="number"
                                  maxLength={50}
                                  name="phone"
                                  className={errors && errors.phone && errors.phone.hasError ? "ss-input-has-error" : "" }
                                  placeholder="Phone number"
                                  onInput={(e) => e.target.value = e.target.value.slice(0,10)}
                                  onBlur={handleAsyncValidation}
                                  onChange={handleAsyncValidation}
                              />
                              {renderError("phone")}
                            </FormGroup>
                          </Col>
                        </Row>


                        <Row form>
                          <Col md={12}>
                            <FormGroup className="form-label-group">
                              <Label for="" >House No. / Street Name</Label>
                              <strong><span className="field-required text-danger">*</span></strong>
                              <Input
                                  id="streetName"
                                  value={streetName}
                                  type="text"
                                  maxLength={50}
                                  name="streetName"
                                  className={errors && errors.streetName && errors.streetName.hasError ? "ss-input-has-error" : "" }
                                  placeholder="House no. / street name"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={handleAsyncValidation}
                                  onChange={handleAsyncValidation}
                              />
                              {renderError("streetName")}
                            </FormGroup>


                            <FormGroup className="form-label-group">
                              <Label for="streetName" >Street address</Label>
                              <strong><span className="field-required text-danger">*</span></strong>
                              <Input
                                  id="streetAddress"
                                  value={streetAddress}
                                  type="text"
                                  maxLength={50}
                                  name="streetAddress"
                                  className={errors && errors.streetAddress && errors.streetAddress.hasError ? "ss-input-has-error" : "" }
                                  placeholder="Street address"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={handleAsyncValidation}
                                  onChange={handleAsyncValidation}
                              />
                              {renderError("streetAddress")}
                            </FormGroup>

                          </Col>
                        </Row>

                        <Row form>
                          <Col md={12}>
                            <FormGroup className="form-label-group">
                              <Label for="city" >City</Label>
                              <strong><span className="field-required text-danger">*</span></strong>
                              <Input
                                  id="city"
                                  value={city}
                                  type="text"
                                  maxLength={50}
                                  name="city"
                                  className={errors && errors.city && errors.city.hasError ? "ss-input-has-error" : "" }
                                  placeholder="City / city"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={handleAsyncValidation}
                                  onChange={handleAsyncValidation}
                              />
                              {renderError("city")}
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row form>
                          <Col md={6}>
                            <FormGroup className="form-label-group">
                              <Label for="addressState" >State</Label>
                              <strong><span className="field-required text-danger">*</span></strong>
                              <Input
                                  id="addressState"
                                  value={addressState}
                                  type="text"
                                  maxLength={50}
                                  name="addressState"
                                  className={errors && errors.addressState && errors.addressState.hasError ? "ss-input-has-error" : "" }
                                  placeholder="State"
                                  onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                                  onBlur={handleAsyncValidation}
                                  onChange={handleAsyncValidation}
                              />
                              {renderError("addressState")}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup className="form-label-group">
                              <Label for="postCode" >Pincode</Label>
                              <strong><span className="field-required text-danger">*</span></strong>
                              <Input
                                  id="postCode"
                                  value={postCode}
                                  type="number"
                                  name="postCode"
                                  className={errors && errors.postCode && errors.postCode.hasError ? "ss-input-has-error" : "" }
                                  placeholder="Pincode"
                                  onInput={(e) => e.target.value = e.target.value.slice(0,6)}
                                  onBlur={handleAsyncValidation}
                                  onChange={handleAsyncValidation}
                              />
                              {renderError("postCode")}
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <div className="your-order-area">
                        <div className="your-order-wrap gray-bg-4">
                          <h3>PRICE DETAILS ( {cartItems.length} Items ) </h3>
                          <div className="your-order-product-info">
                            <div className="your-order-top">
                              <ul>
                                <li>Product</li>
                                <li>Total</li>
                              </ul>
                            </div>
                            <div className="your-order-middle">
                              <ul>
                                {cartItems.map((cartItem, key) => {
                                  return (
                                      <li key={key}>
                                        <p className="order-middle-left">
                                          <span>
                                            {new Intl.NumberFormat('en-IN', {
                                              style: 'currency',
                                              currency: 'INR'
                                            }).format( (cartItem && cartItem.price) )} X {cartItem.quantity}
                                              </span>
                                        </p>
                                        <p className="order-price">
                                              <span>
                                                {new Intl.NumberFormat('en-IN', {
                                                  style: 'currency',
                                                  currency: 'INR'
                                                }).format( ((cartItem && cartItem.price) * cartItem.quantity) )}
                                              </span>
                                        </p>
                                      </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <div className="your-order-bottom">

                              <ul className="mb-2">
                                <li className="font-weight-bold your-order-shipping">Discount</li>
                                <li
                                    style={{
                                      fontSize: "19px"
                                    }}
                                >
                                    <span>
                                      -{new Intl.NumberFormat('en-IN', {
                                      style: 'currency',
                                      currency: 'INR'
                                    }).format(Math.round(calcTotalDiscount(cartItems))) }
                                    </span>
                                </li>
                              </ul>



                              { couponData &&
                              <ul className="mb-2">
                                <li className="font-weight-bold your-order-shipping">Coupon Discount</li>
                                <li
                                    style={{
                                      fontSize: "19px"
                                    }}
                                >{
                                  console.log(couponData,"couponDatacouponDatacouponData")
                                }
                                  <span>
                                      -{new Intl.NumberFormat('en-IN', {
                                    style: 'currency',
                                    currency: 'INR'
                                  }).format( Math.round(parseFloat(couponData.data.discount) - calcTotalDiscount(cartItems) ) )}
                                    </span>
                                </li>
                              </ul>
                              }

                              <ul>
                                <li className="font-weight-bold your-order-shipping">Shipping</li>
                                <li
                                    style={{
                                      fontSize: "19px"
                                    }}
                                >
                                  {delivery ? (
                                      <>
                                        {new Intl.NumberFormat('en-IN', {
                                          style: 'currency',
                                          currency: 'INR'
                                        }).format( delivery )}
                                      </>
                                  ) : (
                                      "Free Shipping"
                                  )}
                                </li>
                              </ul>

                            </div>

                            <div className="your-order-total border-bottom-0">
                              <ul>
                                <li style={{fontSize: "25px"}} className="font-weight-bolder order-total">Total Payable</li>
                                <li>
                              <span style={{fontSize: "25px"}} className="text-dark font-weight-bolder">
                                {console.log(">>>>>>>>>>>>>>>final peis ajaklsamkoa slj()()()()()",finalPrice, delivery, grandCartTotal, Math.round(parseFloat(finalPrice)))}
                                {new Intl.NumberFormat('en-IN', {
                                  style: 'currency',
                                  currency: 'INR'
                                }).format( (Math.round(parseFloat(finalPrice)) + parseFloat(delivery)) )}
                              </span>
                                </li>
                              </ul>
                            </div>
                            <div className="place-order mt-25">
                              <Button disabled={isOrderPending} className="ss-btn-primary" type="submit">
                                {
                                  isOrderPending ?
                                      <div id="ss-sm-spinner" /> :
                                      <>Order Now</>
                                }
                              </Button>
                            </div>
                            <div className="text-center mt-2">
                              <Link to={"/cart"} style={{fontSize: "18px"}}><ArrowBack size={20}/> Back to cart</Link>
                            </div>
                          </div>
                          {/*<div className="payment-method"></div>*/}
                        </div>
                      </div>
                    </div>
                  </Form>
              ) : (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="item-empty-area text-center">
                        <div className="item-empty-area__icon mb-30">
                          <img src={nothingToCheckout} alt="nothing to checkout" height="170" width="170"/>
                          {/*<i className="pe-7s-cash"></i>*/}
                        </div>
                        <div className="item-empty-area__text">
                          There is nothing to checkout <br />{" "}
                          <Link to={"/products"}>
                            Shop Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </LayoutOne>
      </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: () => {dispatch(emptyCart())},
    emptySSUserCart: () => dispatch(emptyUserCartRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
