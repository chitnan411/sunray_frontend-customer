import React, {Component} from "react";
import {toast} from "react-hot-toast";
import {connect} from "react-redux";
import Cookies from "js-cookie";
import {Link, withRouter} from "react-router-dom";
import {Form, FormGroup, Input, Label} from "reactstrap";
import requestForUserRegister from "../../../redux/middlewares/auth/ssRegisterUserMiddleware.js";
import {renderToast} from "../../../utils/renderToast.js";
import {ssValidateUserRegister} from "../../../utils/validations/ssValidations.js";
import {ssClientAuthFlagCookieKey,ssClientAuthCookieKey,setUserDataCookieKey} from "../../../utils/constants.js";
import {Eye} from "@styled-icons/bootstrap/Eye";
import {EyeSlash} from "@styled-icons/bootstrap/EyeSlash";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle";
import {WifiOff} from  "@styled-icons/boxicons-regular/WifiOff";

class SsRegisterForm extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        remember: false,
        hasPasswordShow: false,
        errors: ["firstName", "lastName","email", "password"].reduce((current, item) => {
            current[item] = {};
            current[item]['hasError'] = false;
            current[item]['errorMsg'] = '';
            current[item]['asyncLoading'] = false;
            return current;
        }, {})
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const { email, password, remember, errors, errors2 } = this.state
        const { registerUserState,history, cartItems } = this.props

        const {
            registerUserSuccess,
            registerUserFailure,
            registerUserSuccessPayload,
            registerUserFailurePayload,
        } = registerUserState
        if (prevState !== this.state) {
            console.log(this.state, "current state current state current state current state current state current state current state current state current state current state ")
        }
        if(prevProps.registerUserState !== registerUserState){
            if(registerUserSuccess === true){

                if(cartItems.length > 0){

                }

                Cookies.set(ssClientAuthFlagCookieKey,true)
                Cookies.set(setUserDataCookieKey,JSON.stringify(registerUserSuccessPayload))
                // if(history.length <= 2){

                history.push("/")

                // }
                // else {
                //     if(history.action.toString() == "REPLACE" ){
                //         history.push("/")
                //     }
                //     else if (history.action.toString() == "PUSH" ){
                //         history.goBack()
                //     }
                // }
                const user = Cookies.get(setUserDataCookieKey)
                this.setState({hasAlert: false})

                // Display register success toast
            }
            if(registerUserFailure === true){
                // Display register error toast
                if(registerUserFailurePayload.message.toString().includes("Could not connect to any servers in your MongoDB Atlas cluster")){
                    toast.error("Something went wrong! Please try again later.",{
                        icon: <ErrorCircle size={30} color="#FF4343"/>,
                        style:{
                            marginBottom: "40px"
                        }
                    })
                }
                else {
                    toast.error(registerUserFailurePayload && registerUserFailurePayload.message,{
                        icon: registerUserFailurePayload.message.toString().includes("Connection problem") ? <WifiOff size={30} color="#FF4343"/> : <ErrorCircle size={30} color="#FF4343"/> ,
                        style:{
                            marginBottom: "40px"
                        }
                    })
                }
            }
        }
    }

    validateUserRegisterForm = () => {
        const { firstName, lastName, email, password } = this.state
        const errors = this.state.errors

        if((firstName == '' || firstName == null || !firstName)
            || (lastName == '' || lastName == null || !lastName)
            || (email == '' || email == null || !email)
            || (password == '' || password == null || !password)
        ){

            if (firstName == '' || firstName == null || !firstName) {
                errors.firstName.hasError = true
                errors.firstName.errorMsg = 'First name is required.'
                errors.firstName.asyncLoading = false
            }
            else {
                errors.firstName.hasError = false
                errors.firstName.errorMsg = ""
                errors.firstName.asyncLoading = false
            }

            if (lastName == '' || lastName == null || !lastName) {
                errors.lastName.hasError = true
                errors.lastName.errorMsg = 'Last name is required.'
                errors.lastName.asyncLoading = false
            }
            else {
                errors.lastName.hasError = false
                errors.lastName.errorMsg = ""
                errors.lastName.asyncLoading = false
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

            if (password == '' || password == null || !password) {
                errors.password.hasError = true
                errors.password.errorMsg = 'Password is required.'
                errors.password.asyncLoading = false
            }
            else {
                errors.password.hasError = false
                errors.password.errorMsg = ""
                errors.password.asyncLoading = false
            }
            this.setState({ errors: errors });
            return false
        }
        else{
            if(  errors.firstName.hasError === true
                || errors.lastName.hasError === true
                || errors.email.hasError === true
                || errors.password.hasError === true){
                return false
            }
            else {
                return true
            }
        }
    }


    renderError = type => {
        const { errors } = this.state;
        if(errors[type].errorMsg === "You are already registered. Please log in.")
        {
            return errors[type].errorMsg === "You are already registered. Please log in."
                ? <div className="ss-input-error-message">
                    You are already registered. Please log in
                    <Link to={"/login"} className="text-primary" style={{textTransform: "underline !important"}}>
                        &nbsp;here.
                    </Link>
                </div>
                : null
        }
        else{
            return errors[type].hasError === true ? <div className="ss-input-error-message">{errors[type].errorMsg}</div>   : null
        }
        // return errors[type].hasError === true ? <div className="ss-input-error-message">{errors[type].errorMsg}</div> : null
    };

    handleUserRegisterForm = e => {
        console.log("==========================================================================================")
        console.log("handle login handle login handle login handle login handle login handle login handle login ")
        console.log("*******************************************************************************************")
        const { errors } = this.state

        e.preventDefault()
        if (this.validateUserRegisterForm()) {
            const { sendUserRegisterRequest} = this.props
            const {firstName, lastName,email,password} = this.state
            console.info('Valid Form')
            const userData = {firstName: firstName, lastName: lastName,email:email, password: password}
            sendUserRegisterRequest(userData)
        } else {
            console.error('Invalid Form')
        }
    }


    handleAsyncValidation = async (event) => {
        event.preventDefault();
        event.persist()
        const { name, value } = event.target;
        await this.setState({ [name]: value });
        const errorsReturned = await ssValidateUserRegister(event,this.state)
        await this.setState({errors: errorsReturned})
    }



    render() {

        const {
            firstName,
            lastName,
            email,
            password,
            hasPasswordShow,
            errors,
        } = this.state

        const { registerUserState } = this.props

        const {registerUserRequestPending} = registerUserState

        return (
            <>
                <Form onSubmit={this.handleUserRegisterForm}>
                    <FormGroup className="form-label-group">
                        <Label for="firstName" >First Name</Label>
                        <Input
                            id="firstName"
                            value={firstName}
                            type="text"
                            maxLength={50}
                            name="firstName"
                            className={errors.firstName.hasError ? "ss-input-has-error" : "" }
                            placeholder="First name"
                            onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                            onBlur={this.handleAsyncValidation}
                            onChange={this.handleAsyncValidation}
                        />
                        {this.renderError("firstName")}
                    </FormGroup>
                    <FormGroup className="form-label-group">
                        <Label for="lastName" >Last Name</Label>
                        <Input
                            id="lastName"
                            value={lastName}
                            type="text"
                            maxLength={50}
                            name="lastName"
                            className={errors.lastName.hasError ? "ss-input-has-error" : "" }
                            placeholder="Last name"
                            onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                            onBlur={this.handleAsyncValidation}
                            onChange={this.handleAsyncValidation}
                        />
                        {this.renderError("lastName")}
                    </FormGroup>
                    <FormGroup className="form-label-group">
                        <Label for="registerEmail" >Email address</Label>
                        <Input
                            id="registerEmail"
                            value={email}
                            type="email"
                            maxLength={119}
                            name="email"
                            className={errors.email.hasError ? "ss-input-has-error" : "" }
                            placeholder="Email address"
                            onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                            onBlur={this.handleAsyncValidation}
                            onChange={this.handleAsyncValidation}
                        />
                        {this.renderError("email")}
                    </FormGroup>
                    <FormGroup>
                        <Label for="registerPassword">Password</Label>
                        <a target="_parent" className="ss_show_hide_password"
                           onClick={() => this.setState({hasPasswordShow: !hasPasswordShow})}>
                            {hasPasswordShow ?
                                <span>
                    <EyeSlash className="ss_show_hide_password-icons" size={13}/>Hide
                  </span>
                                : <span>
                    <Eye className="ss_show_hide_password-icons" size={13}/>Show
                  </span>}
                        </a>
                        <Input
                            id="registerPassword"
                            minLength={6}
                            value={password}
                            type={hasPasswordShow ? "text" : "password"}
                            name="password"
                            className={errors.password.hasError ? "ss-input-has-error" : "" }
                            placeholder="Password"
                            onInput={(e) => e.target.value = e.target.value.replace(/  +/g, ' ').trimStart()}
                            onBlur={this.handleAsyncValidation}
                            onChange={this.handleAsyncValidation}
                        />
                        {this.renderError("password")}
                    </FormGroup>
                    <div className="button-box">
                        <button className={`w-100 ${ registerUserRequestPending ? "cr-not-allowed" : ""}`} type="submit">
                            {registerUserRequestPending === true ? <div id="ss-sm-spinner" /> : <span>Create Account</span> }
                        </button>
                    </div>

                    <div className="ss-signin-divider">
                        <div className="text-center pt-4 pb-2">
                            Already have an account? &nbsp;&nbsp;
                            <Link className="text-primary" style={{textDecoration: "underline"}} to={"/login"}>
                                Sign in
                            </Link>
                        </div>
                    </div>
                </Form>
            </>
        );
    }
}


const mapStateToProps = state => ({
    registerUserState: state.auth.ssRegisterUser,
    cartItems: state.cartData
});

const mapDispatchToProps = dispatch => ({
    sendUserRegisterRequest: (requestedUserData) => dispatch(requestForUserRegister(requestedUserData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(SsRegisterForm))
