import {Eye} from "@styled-icons/bootstrap/Eye";
import {EyeSlash} from "@styled-icons/bootstrap/EyeSlash";
import {Edit} from "@styled-icons/boxicons-regular/Edit";
import {WifiOff} from "@styled-icons/boxicons-regular/WifiOff";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle";
import axios from "axios";
import CryptoAES from "crypto-js/aes.js";
import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Cookies from "js-cookie"
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {signOutRequest} from "../../redux/actions/auth/ssLoginActions.js";
import {emptyCart} from "../../redux/actions/cartActions.js";
import {emptyUserCartRequest} from "../../redux/actions/ssCartActions.js";
import {
    apiRootUrl,
    setUserDataCookieKey,
    ssClientAuthCookieKey,
    ssClientAuthFlagCookieKey, ssClientCryptoSecretKey
} from "../../utils/constants.js";
import noProfileImage from "../../assets/images/bg/noProfileImage.svg"
import {
    ssValidateChangePassword,
    ssValidateEditProfile,
    ssValidatePlaceOrder
} from "../../utils/validations/ssValidations.js";

const EditProfile = ({ location, emptySSUserCart, emptyGuestUserCart, userSignOutRequest, history }) => {
    const { pathname } = location;
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [profileImage,setProfileImage] = useState({})
    const [confirmNewPassword,setConfirmNewPassword] = useState("")
    const AuthUser = JSON.parse(Cookies.get(setUserDataCookieKey))
    const [profileUrl,setProfileUrl] = useState("")

    const [isEditOn, setEditMode] = useState(false)

    const [errors,setErrors] = useState(
        ['firstName','lastName','profileImage','confirmNewPassword'].reduce((current, item) => {
            current[item] = {};
            current[item]['hasError'] = false;
            current[item]['errorMsg'] = '';
            return current;
        }, {}) )

    const renderError = (type) => {
        return errors[type].hasError === true ? <div className="ss-order-error-message">{errors[type].errorMsg}</div>   : null
    }

    useEffect(() => {
        setFirstName(AuthUser.firstName)
        setLastName(AuthUser.lastName)
        setProfileUrl( AuthUser.profilepic.length > 0 ? (AuthUser.profilepic && AuthUser.profilepic[0] && AuthUser.profilepic[0].original) : noProfileImage)
    },[])

    const validatePlaceOrderForm = () => {
        const placeOrderErrors = {...errors}
        if(
            (!firstName || firstName == "" || firstName == null)
            || (!lastName || lastName == "" || lastName == null)
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

            setErrors({...placeOrderErrors})
            return false
        }
        else {
            if (
                (errors.firstName.hasError === true)
                || (errors.lastName.hasError === true)
            ){
                return  false
            }
            else {
                return true
            }

        }
    }

    async function handleEditProfileRequest(){

        const formD = new FormData()

        formD.append("firstName",firstName)
        formD.append("lastName", lastName)
        if(AuthUser.profilepic.length === 0 && profileUrl != "https://constant.myntassets.com/mymyntra/assets/img/default-image.png" ){
            formD.append("profilepic", profileImage, profileImage.name)
        }
        if(AuthUser.profilepic.length > 0 && profileUrl !== AuthUser.profilepic[0].original ){
            formD.append("profilepic", profileImage, profileImage.name)
        }

        await axios
            .patch(`${apiRootUrl}/v1/users/${AuthUser && AuthUser.id}`, formD,{withCredentials: true,
                headers: {
                'content-type': 'multipart/form-data',
                 Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`
                } })
            .then(async (response) => {
                if(response.data){
                    if(response.data){
                        if(response.data.id){
                            await Cookies.set(setUserDataCookieKey,JSON.stringify(response.data))
                            setEditMode(false)
                            setEditMode(false)
                            toast.success("Profile Updated.",{
                                style:{
                                    marginBottom: "40px"
                                }
                            })
                        }
                    }
                }
            })
            .catch( (error) => {
                if(error.toString().includes('Network Error')){
                    toast.error("Connection problem! try again later.",{
                        icon: <WifiOff size={30} color="#FF4343"/>,
                        style:{
                            marginBottom: "40px"
                        }
                    })
                }else {
                    if(error.response) {
                        if (error.response.data) {
                            if(error.response.data.code === 401){
                                Cookies.remove(ssClientAuthCookieKey)
                                Cookies.set(ssClientAuthFlagCookieKey, false)
                                emptyUserCartRequest()
                                emptyCart()
                                // localStorage.removeItem("couponData")
                                signOutRequest()

                                toast.error(`Session Expired! Try again.`,{
                                    style:{
                                        marginBottom: "40px"
                                    }
                                })

                            }
                            if(error.response.data.code === 400){

                                toast.error(error.response.data.message,{
                                    style:{
                                        marginBottom: "40px"
                                    }
                                })

                            }
                        }
                    }
                }
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (validatePlaceOrderForm()) {
            handleEditProfileRequest()
        }
    };


    const handleAsyncValidation = async (e) => {
        e.preventDefault();
        e.persist()
        const {name,value} = e.target
        console.log(name,value,"name value")
        if(name == "firstName") setFirstName(value)
        if(name == "lastName") setLastName(value)
        const errorsReturned = await ssValidatePlaceOrder(e, {...errors})
        setErrors({...errorsReturned})
    }

    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];


    function fileValidation(e) {

        const {value,files} = e.target
        let filePath = value;

        let editErrors = {...errors}

        // Allowing file type
        let allowedExtensions =
            /(\.jpg|\.jpeg|\.png)$/i;

        if (!allowedExtensions.exec(filePath)) {
            editErrors.profileImage.hasError = true
            editErrors.profileImage.errorMsg = 'Profile image should be file type of .jpg, .jpeg, .png'
            setErrors({...editErrors})
            setProfileImage({})
            return false;
        }
        else if( (files[0].size / 1048576 ) > 2 ){
            editErrors.profileImage.hasError = true
            editErrors.profileImage.errorMsg = "Profile image shouldn't  be more than 2MBs."
            setErrors({...editErrors})
            setProfileImage({})
            return false;
        }
        else
        {// Image preview
            if (files && files[0]) {
                setProfileImage(files[0])
                console.log(files[0],"profileImage profileImage profileImage profileImage profileImage ")
                editErrors.profileImage.hasError = false
                editErrors.profileImage.errorMsg = ""
                setErrors({...editErrors})
                setProfileUrl(URL.createObjectURL(files[0]))
            }
        }
    }


    return (
        <Fragment>
            <div className="pt-50 pb-70 ml-5">
                <div>
                    <h3 className="text-dark">Profile Details <Edit onClick={() => setEditMode(!isEditOn)} size={21} className="mr-3 text-dark "/></h3>
                </div>
                <div className="w-75 mt-4">
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className="d-flex flex-row justify-content-start">
                                <div>
                                    <img alt="" src={profileUrl}
                                         width={100} height={100}/>
                                </div>

                                { isEditOn &&
                                <div className="image-upload ml-3">
                                    <label htmlFor="file-input">
                                        <Edit size={21} className="mr-3 mt-2 mb-1 text-dark "/>Update image
                                    </label>
                                    <input onChange={(e) => {
                                        fileValidation(e)
                                    }} id="file-input" type="file"/>
                                    {renderError("profileImage")}
                                </div>
                                }
                            </div>
                        </div>
                        <Row>
                            <Col sm={6}>
                                <FormGroup className="form-label-group">
                                    <Label for="password">First Name</Label>
                                    <Input
                                        type="text"
                                        value={firstName}
                                        disabled={!isEditOn}
                                        className={errors.firstName.hasError ? "ss-input-has-error " : !isEditOn ?  "ss-disabled" : "ss-input" }
                                        name="firstName"
                                        onBlur={handleAsyncValidation}
                                        onChange={handleAsyncValidation}
                                    />
                                    {renderError("firstName")}
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup className="form-label-group">
                                    <Label for="password">Last Name</Label>
                                    <Input
                                        type="text"
                                        value={lastName}
                                        className={errors.lastName.hasError ? "ss-input-has-error" : !isEditOn ?  "ss-disabled" : "ss-input" }
                                        id="lastName"
                                        disabled={!isEditOn}
                                        name="lastName"
                                        onBlur={handleAsyncValidation}
                                        onChange={handleAsyncValidation}
                                    />
                                    {renderError("lastName")}
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12}>
                                <FormGroup className="form-label-group">
                                    <Label for="password">Email address</Label>
                                    <Input
                                        type="text"
                                        value={AuthUser.email}
                                        className={"ss-disabled"}
                                        disabled={!isEditOn}
                                        onBlur={handleAsyncValidation}
                                        onChange={handleAsyncValidation}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        { isEditOn && <Button className="btn-ss-dark-bg">Save Changes</Button>}
                    </Form>
                </div>
            </div>
        </Fragment>
    );
};

EditProfile.propTypes = {
    location: PropTypes.object
};

const mapStateToProps = state => ({
    signInState: state.auth.ssSignIn,
    cartItems: state.cartData
});

const mapDispatchToProps = dispatch => ({
    userSignOutRequest: () => dispatch(signOutRequest()),
    emptyGuestUserCart: () => dispatch(emptyCart()),
    emptySSUserCart: (requestedUserData) => dispatch(emptyUserCartRequest()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(EditProfile))
