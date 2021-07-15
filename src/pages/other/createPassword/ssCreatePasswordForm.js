import React, {Component} from "react";
import Cookies from "js-cookie";
import {toast, Toaster} from "react-hot-toast";
import {connect} from "react-redux";
import {Link,withRouter} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import queryString from 'query-string'
import {Eye} from "@styled-icons/bootstrap/Eye"
import {EyeSlash} from "@styled-icons/bootstrap/EyeSlash"
import mailSent2 from "../../../assets/images/mailSent2.svg";
import linkExpired from "../../../assets/images/aaAsset 2.svg"
import requestForUserCreateNewPassword from "../../../redux/middlewares/auth/ssCreateNewPasswordMiddleware.js";
import requestForUserSignIn from "../../../redux/middlewares/auth/ssSignInMiddleware.js";
import requestForUserValidateCreateNewPasswordLink
    from "../../../redux/middlewares/auth/ssValidateCreatePasswordLinkMiddleware.js";
import {ssClientAuthFlagCookieKey,ssClientAuthCookieKey,setUserDataCookieKey} from "../../../utils/constants.js";
import {history} from "../../../utils/history.js";
import {ssValidateCreateNewPassword, ssValidateUserSignIn} from "../../../utils/validations/ssValidations.js";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle"
import {WifiOff} from "@styled-icons/boxicons-regular/WifiOff";


class SsCreatePasswordForm extends Component {

    state = {
        email: "",
        password: "",
        confirmPassword: "",
        remember: false,
        hasAlert: false,
        hasPasswordShow: false,
        hasNewPasswordShow: false,
        errors: ["password","confirmPassword"].reduce((current, item) => {
            current[item] = {};
            current[item]['hasError'] = false;
            current[item]['errorMsg'] = '';
            current[item]['asyncLoading'] = false;
            console.log(current, "current current current current current ")
            console.log(item, "item item item item item item ")
            return current;
        }, {})
    }


    renderError = type => {
        const { errors } = this.state;
        return errors[type].hasError === true ? <div className="ss-input-error-message">{errors[type].errorMsg}</div>   : null
    };

    componentDidMount() {
        const { sendValidateCreateNewPasswordLinkRequest } = this.props
        const queryParams=queryString.parse(this.props.location.search);
        this.setState({
            resetToken: queryParams.token
        })
        if(Object.keys(queryParams).length > 0){
            if(queryParams.token){
                sendValidateCreateNewPasswordLinkRequest(queryParams)
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { createNewPasswordState, history } = this.props

        const {
            createNewPasswordRequestPending,
            createNewPasswordSuccess,
            createNewPasswordFailure,
            createNewPasswordFailurePayload,
            createNewPasswordSuccessPayload,
        } = createNewPasswordState
        if(prevProps.createNewPasswordState !== createNewPasswordState){
            if(createNewPasswordSuccess === true){
                this.setState({hasAlert: false})
                history.push('/login')
                toast.success("Your password has been reset",{
                    style:{
                        marginBottom: "40px"
                    }
                })
            }
            if(createNewPasswordFailure === true){
                toast.error(createNewPasswordFailurePayload && createNewPasswordFailurePayload.message,{
                    style:{
                        marginBottom: "40px"
                    }
                })
            }
        }
        if(prevProps !== this.props){
            const queryParams=queryString.parse(this.props.location.search);
            this.setState({
                resetToken: queryParams.token
            })
        }
        if(prevState !== this.state){
            console.log(this.state,"state state state state state state state state ")
        }
    }


    handleAsyncCreateNewPasswordValidation = async (event) => {
        event.preventDefault();
        event.persist()
        const { name, value } = event.target;
        await this.setState({ [name]: value });
        const errorsReturned = await ssValidateCreateNewPassword(event,this.state)
        await this.setState({errors: errorsReturned})
    }

    validateResetPasswordForm = () => {
        const { password, confirmPassword } = this.state
        const errors = this.state.errors

        if ((password == '' || password == null || !password) && (confirmPassword == '' || confirmPassword == null || !confirmPassword)) {
            errors.password.hasError = true
            errors.password.errorMsg = 'Password is required.'
            errors.password.asyncLoading = false

            errors.confirmPassword.hasError = true
            errors.confirmPassword.errorMsg = 'Confirm password is required.'
            errors.confirmPassword.asyncLoading = false
            this.setState({ errors });
            return false
        }
        else if ((password == '' || password == null || !password)) {
            errors.password.hasError = true
            errors.password.errorMsg = 'Password is required.'
            errors.password.asyncLoading = false
            this.setState({ errors });
            return false
        }
        else if ((confirmPassword == '' || confirmPassword == null || !confirmPassword)) {
            errors.confirmPassword.hasError = true
            errors.confirmPassword.errorMsg = 'Confirm password is required.'
            errors.confirmPassword.asyncLoading = false
            this.setState({ errors });
            return false
        }
        else {
            if(this.state.errors.password.hasError === true || this.state.errors.confirmPassword.hasError === true){
                return false
            }
            else {
                return true
            }
        }
    }


    handleCreateNewPasswordForm = e => {
        e.preventDefault()
        if (this.validateResetPasswordForm()) {
            // this.props.loginWithJWT(this.state)
            const {sendCreateNewPasswordRequest} = this.props
            const {confirmPassword, resetToken} = this.state
            const userData = {
                password:confirmPassword,
                token: resetToken
            }
            sendCreateNewPasswordRequest(userData)
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    }

    render() {
        const {password, confirmPassword, hasPasswordShow, hasNewPasswordShow, errors, hasAlert} = this.state

        const { createNewPasswordState, validateCreatePasswordLinkState } = this.props

        const {createNewPasswordRequestPending} = createNewPasswordState

        const {
            validateCreatePasswordLinkRequestPending,
            validateCreatePasswordLinkSuccess,
            validateCreatePasswordLinkFailure,
            validateCreatePasswordLinkSuccessPayload,
        } = validateCreatePasswordLinkState


        return (
            <>

                {validateCreatePasswordLinkRequestPending && <>
                    <div id="circle2" />
                </>
                }

                { validateCreatePasswordLinkFailure && (
                    <>
                        <div className="text-center my-4">
                            <img alt="Expired link" src={linkExpired} height={130} width={250}/>
                        </div>
                        <h2 className="text-center text-dark">The Link is invalid or expired !</h2>
                        <p className="text-center">
                            The reset password link is invalid or expired or new password was already created using this
                            link or the request is rejected.
                        </p>
                        <div className="button-box text-center">
                            <Link to={"/login"}>
                            <Button className={`w-50 resend-rs-link`}
                                    type="button">
                                <span>Back to login</span>
                            </Button>
                            </Link>
                        </div>
                    </>)
                }


                {( validateCreatePasswordLinkSuccess && validateCreatePasswordLinkSuccessPayload ) &&
                    <Form onSubmit={this.handleCreateNewPasswordForm}>
                    <FormGroup className="form-label-group">
                        <Label for="password">Password</Label>
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
                            type={hasPasswordShow ? "text" : "password"}
                            value={password}
                            className={errors.password.hasError ? "ss-input-has-error" : ""}
                            id="password"
                            name="password"
                            placeholder="Password"
                            onBlur={this.handleAsyncCreateNewPasswordValidation}
                            onChange={this.handleAsyncCreateNewPasswordValidation}
                        />
                        {this.renderError("password")}
                    </FormGroup>


                    <FormGroup className="form-label-group">
                        <Label for="email">Confirm Password</Label>
                        <a target="_parent" className="ss_show_hide_password"
                           onClick={() => this.setState({hasNewPasswordShow: !hasNewPasswordShow})}>
                            {hasNewPasswordShow ?
                                <span>
                    <EyeSlash className="ss_show_hide_password-icons" size={13}/>Hide
                  </span>
                                : <span>
                    <Eye className="ss_show_hide_password-icons" size={13}/>Show
                  </span>}
                        </a>
                        <Input
                            type={hasNewPasswordShow ? "text" : "password"}
                            value={confirmPassword}
                            className={errors.confirmPassword.hasError ? "ss-input-has-error" : ""}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onBlur={this.handleAsyncCreateNewPasswordValidation}
                            onChange={this.handleAsyncCreateNewPasswordValidation}
                        />
                        {this.renderError("confirmPassword")}
                    </FormGroup>

                    <div className="button-box">
                        <button className={`w-100 ${createNewPasswordRequestPending ? "cr-not-allowed" : ""}`}
                                disabled={createNewPasswordRequestPending} type="submit">
                            {createNewPasswordRequestPending === true ? <div id="ss-sm-spinner"/> : <span>Reset</span>}
                        </button>
                    </div>

                    {/*<div className="ss-signin-divider">*/}
                    {/*    <div className="text-center pt-4 pb-2">*/}
                    {/*        Don't you have an account ? &nbsp;&nbsp;*/}
                    {/*        <Link className="text-primary" style={{textDecoration: "underline"}} to={"/create-account"}>*/}
                    {/*            Create account*/}
                    {/*        </Link>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </Form>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    validateCreatePasswordLinkState: state.auth.ssValidateCreateNewPassword,
    createNewPasswordState: state.auth.ssCreateNewPassword
});

const mapDispatchToProps = dispatch => ({
    sendCreateNewPasswordRequest: (requestedUserData) => dispatch(requestForUserCreateNewPassword(requestedUserData)),
    sendValidateCreateNewPasswordLinkRequest: (requestedUserData) => dispatch(requestForUserValidateCreateNewPasswordLink(requestedUserData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(SsCreatePasswordForm))
