import React, {Component} from "react";
import {toast} from "react-hot-toast";
import {connect} from "react-redux";
import {Link,withRouter} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from "reactstrap"
import mailSent2 from "../../../assets/images/mailSent2.svg";
import {forgotPasswordRequestClear} from "../../../redux/actions/auth/ssForgotPasswordActions.js";
import requestForUserForgotPassword from "../../../redux/middlewares/auth/ssForgotPasswordMiddleware.js";
import {renderToast} from "../../../utils/renderToast.js";
import {ssValidateForgotPassword} from "../../../utils/validations/ssValidations.js";


class SsForgotPasswordForm extends Component {

    state = {
        email: "",
        maskedEmail: "",
        hasAlert: false,
        isEmailFirstTime: true,
        isResendRequest: false,
        errors: ['email'].reduce((current, item) => {
            current[item] = {};
            current[item]['hasError'] = false;
            current[item]['errorMsg'] = '';
            current[item]['asyncLoading'] = false;
            return current;
        }, {})
    }

    componentDidMount() {
        let {clearUserForgotPasswordRequest} = this.props
        clearUserForgotPasswordRequest()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {email,maskedEmail} = this.state
        const {forgotPasswordState, history, handleResendFalse} = this.props
        const {
            forgotPasswordRequestPending,
            forgotPasswordSuccess,
            forgotPasswordFailure,
            forgotPasswordFailurePayload,
            forgotPasswordSuccessPayload,
        } = forgotPasswordState

        if(prevState !== this.state){
            console.log("state state state state state counter state counter state counter ",this.state)
        }

        if(prevProps.forgotPasswordState !== forgotPasswordState){
            if(forgotPasswordFailure === true){
                this.setState({hasAlert: true})
                toast.error(forgotPasswordFailurePayload && forgotPasswordFailurePayload.message,{
                    style:{
                        marginBottom: "40px"
                    }
                })
            }
            if(forgotPasswordSuccess === true){

                this.setState({
                    hasAlert: false,
                    isEmailFirstTime: false,
                    maskedEmail: this.getMsakedEmail2(email)
                })
                handleResendFalse()

                toast.success(`Reset password link sent to ${this.getMsakedEmail2(email)}`,{
                    style:{
                        marginBottom: "40px"
                    }
                })

            }
        }
    }

    getMsakedEmail2 = (email) => {
        let skipFirstChars = 3;
        let firstThreeChar = email.slice(0, skipFirstChars);

        let domainIndexStart = email.lastIndexOf("@");
        let maskedEmail = email.slice(skipFirstChars, domainIndexStart-1)
        maskedEmail = maskedEmail.replace(/./g, '*')
        let domainPlusPreviousChar = email.slice(domainIndexStart-1, email.length);

        return firstThreeChar.concat(maskedEmail).concat(domainPlusPreviousChar);
    }

    handleAsyncValidation = async (event) => {
        event.preventDefault();
        event.persist()
        const { name, value } = event.target;
        await this.setState({ [name]: value });
        const errorsReturned = await ssValidateForgotPassword(event,this.state)
        await this.setState({errors: errorsReturned})
    }

    handleForgotPasswordForm = e => {
        e.preventDefault()
        if (this.validateForgotPasswordForm()) {
            const {sendUserForgotPasswordRequest} = this.props
            const {email} = this.state
            const userData = {email:email}
            sendUserForgotPasswordRequest(userData)
        } else {
            console.error('Invalid Form')
        }
    }


    handleResendPassword = e => {
        e.preventDefault()
        this.setState({isResendRequest: true})
        const {sendUserForgotPasswordRequest} = this.props
        const {email} = this.state
        const userData = {email:email}
        sendUserForgotPasswordRequest(userData)
        console.info('Valid Form')
    }


    validateForgotPasswordForm = () => {
        const { email } = this.state
        const errors = this.state.errors
        if (email =='' || email == null || !email) {
            errors.email.hasError = true
            errors.email.errorMsg = 'Email address is required.'
            errors.email.asyncLoading = false
            this.setState({ errors });
            // alert("return false")
            return false
        }
        else {
            if(this.state.errors.email.hasError === true ){
                // alert("return false")
                return false
            }
            else {
                // alert("return true")
                return true
            }
        }
    }


    renderError = type => {
        const { errors } = this.state;
        if(errors[type].errorMsg === "This email isn't associated with an account. Please try a different email.")
        {
            return errors[type].errorMsg === "This email isn't associated with an account. Please try a different email."
                ? <div className="ss-input-error-message">
                    You are not registered with us. Please create new account
                    <Link to={"/create-account"} className="text-primary" style={{textTransform: "underline !important"}}>
                        &nbsp;here.
                    </Link>
                </div>
                : null
        }
        else{
            return errors[type].hasError === true ? <div className="ss-input-error-message">{errors[type].errorMsg}</div>   : null
        }
    };


    render() {
        const { email, maskedEmail, errors } = this.state
        const { forgotPasswordState, isEmailFirstTime } = this.props
        const {
            forgotPasswordRequestPending,
            forgotPasswordSuccess,
            forgotPasswordFailure,
            forgotPasswordFailurePayload,
            forgotPasswordSuccessPayload
        } = forgotPasswordState

        return (
            <>

                { ((forgotPasswordSuccess || (isEmailFirstTime === false && forgotPasswordRequestPending))) && <>
                    <div className="text-center my-4">
                        <img alt="email sent" src={mailSent2} height={130} width={130}/>
                    </div>
                    {/*Email Sent*/}
                    <h2 className="text-center text-dark">Check your email</h2>
                    <p className="text-center">
                        We emailed a password reset link to {maskedEmail} . Please follow the instructions in that email.
                        If you can't find our message, it might be in your spam/junk.
                    </p>
                    <div className="button-box text-center">
                        <Button className={`w-50 resend-rs-link ${forgotPasswordRequestPending ? "cr-not-allowed" : ""}`}
                                type="button"
                                onClick={this.handleResendPassword}>
                            {forgotPasswordRequestPending === true ? <div id="ss-sm-spinner"/> : <span>Resend</span>}
                        </Button>
                    </div>



                </>}

                { ((!forgotPasswordSuccess && isEmailFirstTime) || forgotPasswordFailure) &&
                <Form className="ss-forgot-password-form" onSubmit={e => e.preventDefault()}>
                    <FormGroup className="form-label-group">
                        <Label for="email">Email address</Label>
                        <Input
                            id="email"
                            className={errors.email.hasError ? "ss-input-has-error" : ""}
                            type="text"
                            value={email}
                            name="email"
                            placeholder="Email address"
                            onBlur={this.handleAsyncValidation}
                            onChange={this.handleAsyncValidation}
                        />
                        {this.renderError("email")}
                    </FormGroup>
                    <div className="button-box">
                        <button className={`w-100 ${forgotPasswordRequestPending ? "cr-not-allowed" : ""}`}
                                type="button"
                                onClick={this.handleForgotPasswordForm}>
                            {forgotPasswordRequestPending === true ? <div id="ss-sm-spinner"/> : <span>Send Link</span>}
                        </button>
                    </div>
                    <h5 className="text-dark pt-5 pb-2">OR</h5>
                    <div className="ss-signin-divider">
                        <div className="text-center pb-2">
                            <Link className="text-primary" style={{textDecoration: "underline"}} to={"/create-account"}>
                                Create New Account
                            </Link>
                        </div>
                    </div>
                </Form>}
            </>
        );
    }
}

const mapStateToProps = state => ({
    forgotPasswordState: state.auth.ssForgotPassword
});

const mapDispatchToProps = dispatch => ({
    sendUserForgotPasswordRequest: (requestedUserData) => dispatch(requestForUserForgotPassword(requestedUserData)),
    clearUserForgotPasswordRequest: () => dispatch(forgotPasswordRequestClear())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(SsForgotPasswordForm))
