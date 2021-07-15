import React, {Component} from "react";
import Cookies from "js-cookie";
import {toast, Toaster} from "react-hot-toast";
import {connect} from "react-redux";
import {Link,withRouter} from "react-router-dom";
import {Form, FormGroup, Input, Label} from "reactstrap";
import {Eye} from "@styled-icons/bootstrap/Eye"
import {EyeSlash} from "@styled-icons/bootstrap/EyeSlash"
import {addToCart, emptyCart, updateIsAddedToUserCart} from "../../../redux/actions/cartActions.js";
import requestForUserSignIn from "../../../redux/middlewares/auth/ssSignInMiddleware.js";
import requestForAddItemToCart from "../../../redux/middlewares/cart/addToCartMiddleware.js";
import requestForGetDocuments from "../../../redux/middlewares/getDocumentsUniversal.js";
import {ssClientAuthFlagCookieKey,ssClientAuthCookieKey,setUserDataCookieKey} from "../../../utils/constants.js";
import {renderToast} from "../../../utils/renderToast.js";
import {ssValidateUserSignIn} from "../../../utils/validations/ssValidations.js";
import {ErrorCircle} from "@styled-icons/boxicons-solid/ErrorCircle"
import {WifiOff} from "@styled-icons/boxicons-regular/WifiOff";


class SsLoginForm extends Component {

    state = {
        email: "",
        password: "",
        remember: false,
        hasAlert: false,
        hasPasswordShow: false,
        errors: ['email', 'password'].reduce((current, item) => {
            current[item] = {};
            current[item]['hasError'] = false;
            current[item]['errorMsg'] = '';
            current[item]['asyncLoading'] = false;
            return current;
        }, {})
    }

    componentDidMount() {
        const {ssUserCartData} = this.props
        console.log(ssUserCartData, " ssUserCartData ssUserCartData ssUserCartData ssUserCartData ")
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            signInState,
            history,
            cartItems,
            ssUserCartData,
            sendRequestForAddItemToCart,
            sendUserCartGetRequest,
            changeIsAddedOfCartItem,
            emptyGuestUserCart,
            addToLocalCartData
        } = this.props


        const {signInSuccess, signInFailure, signInSuccessPayload, signInFailurePayload} = signInState

        const {
            getCartSuccess,
        } = ssUserCartData

        if(prevProps.ssUserCartData !== ssUserCartData){
            if(getCartSuccess === true){

                let tempUserCartItems = [...ssUserCartData.cartItems]

                if( tempUserCartItems && tempUserCartItems.length > 0){
                    for(let i = 0; i < tempUserCartItems.length; i++){
                        let cartItemIndex = cartItems.findIndex(singleItem => singleItem._id === tempUserCartItems[i]._id)
                        if(cartItemIndex === -1){
                            addToLocalCartData(tempUserCartItems[i], true, false)
                        }
                        else {
                            if(tempUserCartItems[i]._id == cartItems[cartItemIndex]._id){
                                if(cartItems[cartItemIndex].isAddedToUserCart === false){
                                    changeIsAddedOfCartItem({id: tempUserCartItems[i]._id, isAddedToUserCart: true })
                                }
                            }
                        }
                    }
                }
                else {
                    emptyGuestUserCart()
                }
            }
        }


        if(prevProps !== this.props){
            console.log(ssUserCartData["cartItems"]," ssUserCartItems ssUserCartItems ssUserCartItemsssUserCartItemsssUserCartItems")
        }


        if (prevState !== this.state) {
            console.log(this.state, "current state current state current state current state current state current state current state current state current state current state ")
        }
        if(prevProps.signInState !== signInState){

            if(signInSuccess === true){

                await Cookies.set(ssClientAuthFlagCookieKey,true)
                await Cookies.set(setUserDataCookieKey,JSON.stringify(signInSuccessPayload))

                if(cartItems.length > 0){
                    for(let i = 0; i < cartItems.length; i++){
                        if(cartItems[i].isAddedToUserCart == false || cartItems[i].isAddedToUserCart == "false"){
                            if ("productName" in cartItems[i]){
                                await sendRequestForAddItemToCart({product: cartItems[i]._id, quantity: cartItems[i].quantity})
                            }
                            if ("comboName" in cartItems[i]){
                                await sendRequestForAddItemToCart({combo: cartItems[i]._id, quantity: cartItems[i].quantity})
                            }
                        }
                    }
                }

                localStorage.removeItem("couponData")

                this.setState({hasAlert: false})

                // Display login success toast
                toast.success("Logged in successfully",{
                    style:{
                        marginBottom: "40px"
                    }
                })

                await sendUserCartGetRequest({
                    subModuleName: "cart",
                    doFilter: false
                })


                history.push("/")
            }

            if(signInFailure === true){
                // Display login error toast
                toast.error(signInFailurePayload && signInFailurePayload.message,{
                    icon: signInFailurePayload.message.toString().includes("Connection problem") ? <WifiOff size={30} color="#FF4343"/> : <ErrorCircle size={30} color="#FF4343"/> ,
                    style:{
                        marginBottom: "40px"
                    }
                })
            }
        }
    }

    validateLoginForm = () => {
        const { email, password } = this.state
        const errors = this.state.errors

        if ((email == '' || email == null || !email) && (password == '' || password == null || !password)) {
            errors.email.hasError = true
            errors.email.errorMsg = 'Email address is required.'
            errors.email.asyncLoading = false

            errors.password.hasError = true
            errors.password.errorMsg = 'Password is required.'
            errors.password.asyncLoading = false
            this.setState({ errors });
            return false
        }
        else if (email === '' || email == null || !email) {
            errors.email.hasError = true
            errors.email.errorMsg = 'Email address is required.'
            errors.email.asyncLoading = false
            this.setState({ errors });
            return false
        }
        else if (password === '' || password == null || !password) {
            errors.password.hasError = true
            errors.password.errorMsg = 'Password is required.'
            errors.password.asyncLoading = false
            this.setState({ errors });
            return false
        }
        else {
            if ( (email !== '' || email !== null || email )&& (password !== '' || password !== null || password)) {
                if (errors.email.hasError === true || errors.password.hasError === true) {
                    return false
                }
                if (errors.email.hasError === false && errors.password.hasError === false) {
                    return true
                }
            }
        }
    }


    handleLogin = e => {
        const { errors } = this.state

        e.preventDefault()
        if (this.validateLoginForm()) {
            const { sendUserSignInRequest} = this.props
            const {email,password} = this.state
            const userData = {email:email, password: password}
            sendUserSignInRequest(userData)
        } else {
            console.error('Invalid Form')
        }
    }


    renderError = type => {
        const { errors } = this.state;
        const { email, password } = errors;
        if(errors[type].errorMsg === "You are not registered with us. Please create new account.")
        {
            return errors[type].errorMsg === "You are not registered with us. Please create new account."
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

    handleAsyncValidation = async (event) => {
        event.preventDefault();
        event.persist()
        const { name, value } = event.target;
        await this.setState({ [name]: value });
        const errorsReturned = await ssValidateUserSignIn(event,this.state)
        await this.setState({errors: errorsReturned})
    }



    render() {
        const {
            email,
            password,
            errors,
            hasPasswordShow
        } = this.state

        const { signInState, ssUserCartData } = this.props

        const {signInRequestPending} = signInState

        const {getCartRequestPending} = ssUserCartData

        return (
            <>
                <Form onSubmit={this.handleLogin}>
                    <FormGroup className="form-label-group">
                        <Label for="email">Email address</Label>
                        <Input
                            id="email"
                            className={errors.email.hasError ? "ss-input-has-error" : "" }
                            type="email"
                            value={email}
                            name="email"
                            placeholder="Email address"
                            onBlur={this.handleAsyncValidation}
                            onChange={this.handleAsyncValidation}
                        />
                        {this.renderError("email")}
                    </FormGroup>
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
                            className={errors.password.hasError ? "ss-input-has-error" : "" }
                            id="password"
                            name="password"
                            placeholder="Password"
                            onBlur={this.handleAsyncValidation}
                            onChange={this.handleAsyncValidation}
                        />
                        {this.renderError("password")}
                    </FormGroup>
                    <div className="button-box">
                        <div className="login-toggle-btn">
                            <input type="checkbox" />
                            <label className="ml-10">Remember me</label>
                            <Link to={process.env.PUBLIC_URL + "/forgot-password"}>
                                Forgot Password?
                            </Link>
                        </div>
                        <button className={`w-100 ${ signInRequestPending ? "cr-not-allowed" : ""}`} disabled={signInRequestPending} type="submit">
                            {(signInRequestPending === true || getCartRequestPending === true) ? <div id="ss-sm-spinner" /> : <span>Sign In</span> }
                        </button>
                    </div>

                    <div className="ss-signin-divider">
                        <div className="text-center pt-4 pb-2">
                            Don't you have an account ? &nbsp;&nbsp;
                            <Link className="text-primary" style={{textDecoration: "underline"}} to={"/create-account"}>
                                Create account
                            </Link>
                        </div>
                    </div>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    signInState: state.auth.ssSignIn,
    ssUserCartData: state.ssCart.ssCartData,
    cartItems: state.cartData
});

const mapDispatchToProps = dispatch => ({
    addToLocalCartData: (item, isAddedToUserCart, showAlert) => {dispatch(addToCart(item, isAddedToUserCart, showAlert))},
    emptyGuestUserCart: () => {dispatch(emptyCart())},
    changeIsAddedOfCartItem: (requestedPayload) => dispatch(updateIsAddedToUserCart(requestedPayload)),
    sendUserSignInRequest: (requestedUserData) => dispatch(requestForUserSignIn(requestedUserData)),
    sendUserCartGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
    sendRequestForAddItemToCart: (requestedPayload) => dispatch(requestForAddItemToCart(requestedPayload))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(SsLoginForm))
