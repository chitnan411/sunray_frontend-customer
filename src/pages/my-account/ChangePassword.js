import {Eye} from "@styled-icons/bootstrap/Eye";
import {EyeSlash} from "@styled-icons/bootstrap/EyeSlash";
import {WifiOff} from "@styled-icons/boxicons-regular/WifiOff";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle";
import axios from "axios";
import CryptoAES from "crypto-js/aes.js";
import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import {toast} from "react-hot-toast";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Cookies from "js-cookie"
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {signOutRequest} from "../../redux/actions/auth/ssLoginActions.js";
import {emptyCart} from "../../redux/actions/cartActions.js";
import {emptyUserCartRequest} from "../../redux/actions/ssCartActions.js";
import {
    apiRootUrl,
    setUserDataCookieKey,
    ssClientAuthCookieKey,
    ssClientAuthFlagCookieKey, ssClientCryptoSecretKey
} from "../../utils/constants.js";
import {ssValidateChangePassword, ssValidatePlaceOrder} from "../../utils/validations/ssValidations.js";

const ChangePassword = ({ location, emptySSUserCart, emptyGuestUserCart, userSignOutRequest, history }) => {
    const { pathname } = location;
    const [currentPassword,setCurrentPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmNewPassword,setConfirmNewPassword] = useState("")
    const [errors,setErrors] = useState(
        ['currentPassword','newPassword','confirmNewPassword'].reduce((current, item) => {
            current[item] = {};
            current[item]['hasError'] = false;
            current[item]['errorMsg'] = '';
            current[item]['asyncLoading'] = false;
            return current;
        }, {}) )

    const renderError = (type) => {
        return errors[type].hasError === true ? <div className="ss-order-error-message">{errors[type].errorMsg}</div>   : null
    }

    const validatePlaceOrderForm = () => {
        const placeOrderErrors = {...errors}
        if(
            (!currentPassword || currentPassword == "" || currentPassword == null)
            || (!newPassword || newPassword == "" || newPassword == null)
            || (!confirmNewPassword || confirmNewPassword == "" || confirmNewPassword == null)
        ){


            if(!currentPassword || currentPassword == "" || currentPassword == null){
                placeOrderErrors.currentPassword.hasError = true
                placeOrderErrors.currentPassword.errorMsg = 'Current password is required.'
                setErrors({...placeOrderErrors})
            }
            else{
                placeOrderErrors.currentPassword.hasError = false
                placeOrderErrors.currentPassword.errorMsg = ''
                setErrors({...placeOrderErrors})
            }


            if(!newPassword || newPassword == "" || newPassword == null){
                placeOrderErrors.newPassword.hasError = true
                placeOrderErrors.newPassword.errorMsg = 'New password is required.'
                setErrors({...placeOrderErrors})
            }
            else{
                placeOrderErrors.newPassword.hasError = false
                placeOrderErrors.newPassword.errorMsg = ''
                setErrors({...placeOrderErrors})
            }


            if(!confirmNewPassword || confirmNewPassword == "" || confirmNewPassword == null){
                placeOrderErrors.confirmNewPassword.hasError = true
                placeOrderErrors.confirmNewPassword.errorMsg = 'Confirm password is required.'
                setErrors({...placeOrderErrors})
            }
            else{
                placeOrderErrors.confirmNewPassword.hasError = false
                placeOrderErrors.confirmNewPassword.errorMsg = ''
                setErrors({...placeOrderErrors})
            }

            setErrors({...placeOrderErrors})
            return false
        }
        else {

            if (
                (errors.currentPassword.hasError === true)
                || (errors.newPassword.hasError === true)
                || (errors.confirmNewPassword.hasError === true)
            ){
                return  false
            }
            else {
                return true
            }

        }
    }

    async function handleChangePasswordRequest(){
        await axios
            .post(`${apiRootUrl}/v1/auth/change-password`, {
                oldPassword: CryptoAES.encrypt(currentPassword, ssClientCryptoSecretKey).toString(),
                newPassword: CryptoAES.encrypt(confirmNewPassword, ssClientCryptoSecretKey).toString()
            },{withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
            .then((response) => {
                if(response.data){
                    if(response.data.confirmation){
                        if(response.data.confirmation.message){
                            if (response.data.confirmation.statusCode === 200) {

                                toast.success("Password changed successfully ",{
                                    style:{
                                        marginBottom: "40px"
                                    }
                                })
                                setConfirmNewPassword("")
                                setNewPassword("")
                                setCurrentPassword("")
                            }
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
            handleChangePasswordRequest()
        }
    };


    const handleAsyncValidation = async (e) => {
        e.preventDefault();
        e.persist()
        const {name,value} = e.target
        console.log(name,value,"name value")
        if(name == "currentPassword") setCurrentPassword(value)
        if(name == "newPassword") setNewPassword(value)
        if(name == "confirmNewPassword") setConfirmNewPassword(value)
        const errorsReturned = await ssValidateChangePassword(e, currentPassword, newPassword, confirmNewPassword, {...errors})
        setErrors({...errorsReturned})
    }

    const AuthUser = JSON.parse(Cookies.get(setUserDataCookieKey))

    return (
        <Fragment>
            <div className="pt-50 pb-70 ml-5">
                <div>
                    <h3 className="text-dark">Change Password</h3>
                </div>
                <div className="w-50 mt-4">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="form-label-group">
                            <Label for="password">Current Password</Label>
                            <Input
                                type="password"
                                value={currentPassword}
                                className={errors.currentPassword.hasError ? "ss-input-has-error" : "ss-input" }
                                id="currentPassword"
                                name="currentPassword"
                                placeholder="Type current password"
                                onBlur={handleAsyncValidation}
                                onChange={handleAsyncValidation}
                            />
                            {renderError("currentPassword")}
                        </FormGroup>

                        <FormGroup className="form-label-group">
                            <Label for="password">New Password</Label>
                            <Input
                                type="password"
                                value={newPassword}
                                className={errors.newPassword.hasError ? "ss-input-has-error" : "ss-input" }
                                id="newPassword"
                                name="newPassword"
                                placeholder="Type new password"
                                onBlur={handleAsyncValidation}
                                onChange={handleAsyncValidation}
                            />
                            {renderError("newPassword")}
                        </FormGroup>


                        <FormGroup className="form-label-group">
                            <Label for="password">Retype new Password</Label>
                            <Input
                                type="password"
                                value={confirmNewPassword}
                                className={errors.confirmNewPassword.hasError ? "ss-input-has-error" : "ss-input" }
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                placeholder="Retype new password"
                                onBlur={handleAsyncValidation}
                                onChange={handleAsyncValidation}
                            />
                            {renderError("confirmNewPassword")}
                        </FormGroup>

                        <Button className="btn-ss-dark-bg">CHANGE PASSWORD</Button>
                    </Form>
                </div>
            </div>
        </Fragment>
    );
};

ChangePassword.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(ChangePassword))
