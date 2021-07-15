import {
  checkFieldAvailability,
  emailAvailability, isObjectEmpty, isNotEmptyObject,
  justStrings, maxNumber,
  minMax, minMaxNumbers,
  validateEmail,
  validatePassword, emailAvailabilityForNewUser, validatePhone
} from "../commonUtils.js";


// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
//                                                                  ** AUTHENTICATION MODULE  **
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===


// ==================================================================
// SIGN IN
// ==================================================================

export const ssValidateUserSignIn = async (event, currentState) =>{
  const { email } = currentState
  const { name, value } = event.target
  let signInErrors = {...currentState.errors}
  switch (name) {
    case 'email':
      if (!value) {
        signInErrors.email.hasError = true
        signInErrors.email.errorMsg = 'Email address is required.'
        signInErrors.email.asyncLoading = false
      }
      else if (!validateEmail(value)) {
        signInErrors.email.hasError = true
        signInErrors.email.errorMsg = 'Please enter a valid email address.'
        signInErrors.email.asyncLoading = false
      }
      else if(event.type === 'blur') {
        if( !(await emailAvailability(value)) ) {
          signInErrors.email.hasError = true
          signInErrors.email.errorMsg = "You are not registered with us. Please create new account."
          signInErrors.email.asyncLoading = false
        }
      }
      else {
        signInErrors.email.hasError = false
        signInErrors.email.errorMsg = ''
        signInErrors.email.asyncLoading = false
      }
      break;
    case 'password':
      if (!value) {
        signInErrors.password.hasError = true
        signInErrors.password.errorMsg = 'Password is required.'
        signInErrors.password.asyncLoading = false
      }
      else if (!validatePassword(value)) {
        signInErrors.password.hasError = true
        signInErrors.password.errorMsg = "At least 1 letter, a number and 1 symbol, at least 6 characters"
        signInErrors.password.asyncLoading = false
      }
      else if (email === value) {
        signInErrors.password.hasError = true
        signInErrors.password.errorMsg = 'Password looks like your email address!'
        signInErrors.password.asyncLoading = false
      }
      else {
        signInErrors.password.hasError = false
        signInErrors.password.errorMsg = ''
        signInErrors.password.asyncLoading = false
      }
      break;
    default:
      break;
  }
  return signInErrors
}


// ==================================================================
// REGISTER
// ==================================================================

export const ssValidateUserRegister = async (event, currentState) =>{
  const { email } = currentState
  const { name, value } = event.target
  let signInErrors = {...currentState.errors}
  switch (name) {

    case 'firstName':
      if (!value) {
        signInErrors.firstName.hasError = true
        signInErrors.firstName.errorMsg = 'First name is required.'
        signInErrors.firstName.asyncLoading = false
      }
      if(!justStrings(value)){
        signInErrors.firstName.hasError = true
        signInErrors.firstName.errorMsg = 'First name has to be in letters only.'
        signInErrors.firstName.asyncLoading = false
      }
      else {
        signInErrors.firstName.hasError = false
        signInErrors.firstName.errorMsg = ''
        signInErrors.firstName.asyncLoading = false
      }
      break;

    case 'lastName':
      if (!value) {
        signInErrors.lastName.hasError = true
        signInErrors.lastName.errorMsg = 'Last name is required.'
        signInErrors.lastName.asyncLoading = false
      }
      if(!justStrings(value)){
        signInErrors.lastName.hasError = true
        signInErrors.lastName.errorMsg = 'Last name has to be in letters only.'
        signInErrors.lastName.asyncLoading = false
      }
      else {
        signInErrors.lastName.hasError = false
        signInErrors.lastName.errorMsg = ''
        signInErrors.lastName.asyncLoading = false
      }
      break;

    case 'email':
      if (!value) {
        signInErrors.email.hasError = true
        signInErrors.email.errorMsg = 'Email address is required.'
        signInErrors.email.asyncLoading = false
      }
      else if (!validateEmail(value)) {
        signInErrors.email.hasError = true
        signInErrors.email.errorMsg = 'Please enter a valid email address.'
        signInErrors.email.asyncLoading = false
      }
      else if(event.type === 'blur') {
        if( !(await emailAvailabilityForNewUser(value)) ) {
          signInErrors.email.hasError = true
          signInErrors.email.errorMsg = "You are already registered. Please log in."
          signInErrors.email.asyncLoading = false
        }
      }
      else {
        signInErrors.email.hasError = false
        signInErrors.email.errorMsg = ''
        signInErrors.email.asyncLoading = false
      }
      break;
    case 'password':
      if (!value) {
        signInErrors.password.hasError = true
        signInErrors.password.errorMsg = 'Password is required.'
        signInErrors.password.asyncLoading = false
      }
      else if (!validatePassword(value)) {
        signInErrors.password.hasError = true
        signInErrors.password.errorMsg = "At least 1 letter, a number and 1 symbol, Must contain between 7 and 15 characters."
        signInErrors.password.asyncLoading = false
      }
      else if (email === value) {
        signInErrors.password.hasError = true
        signInErrors.password.errorMsg = "Password looks like your email address!"
        signInErrors.password.asyncLoading = false
      }
      else {
        signInErrors.password.hasError = false
        signInErrors.password.errorMsg = ''
        signInErrors.password.asyncLoading = false
      }
      break;
    default:
      break;
  }
  return signInErrors
}





// ==================================================================
// FORGOT PASSWORD
// ==================================================================

export const ssValidateForgotPassword = async (event, currentState) =>{
  console.log(event.type,"event event event event eventevent")
  const { name, value } = event.target
  let forgotErrors = {...currentState.errors}
  switch (name) {
    case 'email':
      if (!value) {
        forgotErrors.email.hasError = true
        forgotErrors.email.errorMsg = 'Email address is required.'
        forgotErrors.email.asyncLoading = false
      }
      else if (!validateEmail(value)) {
        forgotErrors.email.hasError = true
        forgotErrors.email.errorMsg = 'Please enter a valid email address.'
        forgotErrors.email.asyncLoading = false
      }
      else if(event.type === 'blur') {
        if( !(await emailAvailability(value)) ) {
          forgotErrors.email.hasError = true
          forgotErrors.email.errorMsg = "This email isn't associated with an account. Please try a different email."
          forgotErrors.email.asyncLoading = false
        }
      }
      else {
        forgotErrors.email.hasError = false
        forgotErrors.email.errorMsg = ''
        forgotErrors.email.asyncLoading = false
      }
      break;
    default:
      break;
  }
  return forgotErrors
}




// ==================================================================
// CREATE NEW PASSWORD
// ==================================================================

export const ssValidateCreateNewPassword = async (event, currentState) =>{
  console.log(event.type,"event event event event eventevent")
  const {password , confirmPassword } = currentState
  const { name, value } = event.target
  let createNewPasswordErrors = {...currentState.errors}
  switch (name) {
    case 'password':
      if(event.type === 'blur') {
        if(!confirmPassword){
          createNewPasswordErrors.confirmPassword.hasError = true
          createNewPasswordErrors.confirmPassword.errorMsg = 'Confirm password is required.'
          createNewPasswordErrors.confirmPassword.asyncLoading = false
        }
      }

      if (!value) {
        createNewPasswordErrors.password.hasError = true
        createNewPasswordErrors.password.errorMsg = 'Password is required.'
        createNewPasswordErrors.password.asyncLoading = false
      }
      else if (!validatePassword(value)) {
        createNewPasswordErrors.password.hasError = true
        createNewPasswordErrors.password.errorMsg = "At least 1 letter, a number and 1 symbol, at least 6 characters"
        createNewPasswordErrors.password.asyncLoading = false
      }
      else {
        createNewPasswordErrors.password.hasError = false
        createNewPasswordErrors.password.errorMsg = ''
        createNewPasswordErrors.password.asyncLoading = false
      }
      break;
    case 'confirmPassword':
      if(!password){
        createNewPasswordErrors.password.hasError = true
        createNewPasswordErrors.password.errorMsg = 'Password is required.'
        createNewPasswordErrors.password.asyncLoading = false
      }
      else {if (!value) {
        createNewPasswordErrors.confirmPassword.hasError = true
        createNewPasswordErrors.confirmPassword.errorMsg = 'Confirm password is required.'
        createNewPasswordErrors.confirmPassword.asyncLoading = false
      }
      else if (!validatePassword(value)) {
        createNewPasswordErrors.confirmPassword.hasError = true
        createNewPasswordErrors.confirmPassword.errorMsg = "At least 1 letter, a number and 1 symbol, at least 6 characters"
        createNewPasswordErrors.confirmPassword.asyncLoading = false
      }
      else if(event.type === 'blur') {
        if (password !== value) {
          createNewPasswordErrors.confirmPassword.hasError = true
          createNewPasswordErrors.confirmPassword.errorMsg = 'Please make sure both passwords match'
          createNewPasswordErrors.confirmPassword.asyncLoading = false
        }
      }
      else {
        createNewPasswordErrors.confirmPassword.hasError = false
        createNewPasswordErrors.confirmPassword.errorMsg = ''
        createNewPasswordErrors.confirmPassword.asyncLoading = false
      }}
      break;
    default:
      break;
  }
  return createNewPasswordErrors
}








// ==================================================================
// REGISTER
// ==================================================================

export const ssValidateUserContactUs = async (event, currentState) =>{
  const { email } = currentState
  const { name, value } = event.target
  let contactUsErrors = {...currentState.errors}
  switch (name) {

    case 'name':
      if (!value) {
        contactUsErrors.name.hasError = true
        contactUsErrors.name.errorMsg = 'Name is required.'
        contactUsErrors.name.asyncLoading = false
      }
      if(!justStrings(value)){
        contactUsErrors.name.hasError = true
        contactUsErrors.name.errorMsg = 'Name has to be in letters only.'
        contactUsErrors.name.asyncLoading = false
      }
      else {
        contactUsErrors.name.hasError = false
        contactUsErrors.name.errorMsg = ''
        contactUsErrors.name.asyncLoading = false
      }
      break;

    case 'subject':
      if (!value) {
        contactUsErrors.subject.hasError = true
        contactUsErrors.subject.errorMsg = 'Subject is required.'
        contactUsErrors.subject.asyncLoading = false
      }
      if(!justStrings(value)){
        contactUsErrors.subject.hasError = true
        contactUsErrors.subject.errorMsg = 'Subject has to be in letters only.'
        contactUsErrors.subject.asyncLoading = false
      }
      else {
        contactUsErrors.subject.hasError = false
        contactUsErrors.subject.errorMsg = ''
        contactUsErrors.subject.asyncLoading = false
      }
      break;

    case 'email':
      if (!value) {
        contactUsErrors.email.hasError = true
        contactUsErrors.email.errorMsg = 'Email address is required.'
        contactUsErrors.email.asyncLoading = false
      }
      else if (!validateEmail(value)) {
        contactUsErrors.email.hasError = true
        contactUsErrors.email.errorMsg = 'Please enter a valid email address.'
        contactUsErrors.email.asyncLoading = false
      }
      else {
        contactUsErrors.email.hasError = false
        contactUsErrors.email.errorMsg = ''
        contactUsErrors.email.asyncLoading = false
      }
      break;
    case 'message':
      if (!value) {
        contactUsErrors.message.hasError = true
        contactUsErrors.message.errorMsg = 'Enquiry description is required.'
        contactUsErrors.message.asyncLoading = false
      }
      else {
        contactUsErrors.message.hasError = false
        contactUsErrors.message.errorMsg = ''
        contactUsErrors.message.asyncLoading = false
      }
      break;
    default:
      break;
  }
  return contactUsErrors
}








// ==================================================================
// PLACE ORDER
// ==================================================================

export const ssValidateChangePassword = async (event,currentPassword, newPassword,confirmNewPassword, errors) =>{

  const { name, value } = event.target
  let changePasswordErrors = {...errors}

  switch (name) {
    case 'currentPassword':
      if (!value) {
        changePasswordErrors.currentPassword.hasError = true
        changePasswordErrors.currentPassword.errorMsg = 'Current password is required.'
        changePasswordErrors.currentPassword.asyncLoading = false
      }
      else if (!validatePassword(value)) {
        changePasswordErrors.currentPassword.hasError = true
        changePasswordErrors.currentPassword.errorMsg = "At least 1 letter, a number and 1 symbol, at least 6 characters"
        changePasswordErrors.currentPassword.asyncLoading = false
      }
      else {
        changePasswordErrors.currentPassword.hasError = false
        changePasswordErrors.currentPassword.errorMsg = ''
        changePasswordErrors.currentPassword.asyncLoading = false
      }
      break;
    case 'newPassword':
      if (!value) {
        changePasswordErrors.newPassword.hasError = true
        changePasswordErrors.newPassword.errorMsg = 'New Password is required.'
        changePasswordErrors.newPassword.asyncLoading = false
      }
      else if (!validatePassword(value)) {
        changePasswordErrors.newPassword.hasError = true
        changePasswordErrors.newPassword.errorMsg = "At least 1 letter, a number and 1 symbol, at least 6 characters"
        changePasswordErrors.newPassword.asyncLoading = false
      }
      else {
        changePasswordErrors.newPassword.hasError = false
        changePasswordErrors.newPassword.errorMsg = ''
        changePasswordErrors.newPassword.asyncLoading = false
      }
      break;
    case 'confirmNewPassword':
      if (!value) {
        changePasswordErrors.confirmNewPassword.hasError = true
        changePasswordErrors.confirmNewPassword.errorMsg = 'Confirm Password is required.'
        changePasswordErrors.confirmNewPassword.asyncLoading = false
      }
      else if (!validatePassword(value)) {
        changePasswordErrors.confirmNewPassword.hasError = true
        changePasswordErrors.confirmNewPassword.errorMsg = "At least 1 letter, a number and 1 symbol, at least 6 characters"
        changePasswordErrors.confirmNewPassword.asyncLoading = false
      }
      else if (newPassword !== value) {
        changePasswordErrors.confirmNewPassword.hasError = true
        changePasswordErrors.confirmNewPassword.errorMsg = "Confirm password is can't be same as current password"
        changePasswordErrors.confirmNewPassword.asyncLoading = false
      }
      else {
        changePasswordErrors.confirmNewPassword.hasError = false
        changePasswordErrors.confirmNewPassword.errorMsg = ''
        changePasswordErrors.confirmNewPassword.asyncLoading = false
      }
      break;
    default:
      break;
  }
  return changePasswordErrors
}



// CHANGE PASSWORD

export const ssValidatePlaceOrder = async (event, errors) =>{

  const { name, value } = event.target
  let placeOrderErrors = {...errors}

  switch (name) {
    case 'firstName':
      console.log("name ,vallue nam",name,value)
      if (value == "" || value == !undefined || value == null ) {
        placeOrderErrors.firstName.hasError = true
        placeOrderErrors.firstName.errorMsg = 'First name is required.'
        return placeOrderErrors
      }
      else if(value.length < 3 || value.length > 20){
        placeOrderErrors.firstName.hasError = true
        placeOrderErrors.firstName.errorMsg = 'First name must be between 3 to 20 characters long.'
        return placeOrderErrors
      }
      else if(!justStrings(value)){
        placeOrderErrors.firstName.hasError = true
        placeOrderErrors.firstName.errorMsg = 'First name has to be in letters only.'
        return placeOrderErrors
      }
      else {
        placeOrderErrors.firstName.hasError = false
        placeOrderErrors.firstName.errorMsg = ''
        return placeOrderErrors
      }
      break;

    case 'lastName':
      if (value == "" || value == !undefined || value == null ) {
        placeOrderErrors.lastName.hasError = true
        placeOrderErrors.lastName.errorMsg = 'Last name is required.'
        return placeOrderErrors
      }
      else if(value.length < 3 || value.length > 20){
        placeOrderErrors.lastName.hasError = true
        placeOrderErrors.lastName.errorMsg = 'Last name must be between 3 to 20 characters long.'
        return placeOrderErrors
      }
      else if(!justStrings(value)){
        placeOrderErrors.lastName.hasError = true
        placeOrderErrors.lastName.errorMsg = 'Last name has to be in letters only.'
        return placeOrderErrors
      }
      else {
        placeOrderErrors.lastName.hasError = false
        placeOrderErrors.lastName.errorMsg = ''
        return placeOrderErrors
      }
      break;
    case 'email':
      if (!value) {
        placeOrderErrors.email.hasError = true
        placeOrderErrors.email.errorMsg = 'Email address is required.'
        return placeOrderErrors
      }
      else if (!validateEmail(value)) {
        placeOrderErrors.email.hasError = true
        placeOrderErrors.email.errorMsg = 'Please enter a valid email address.'
        return placeOrderErrors
      }
      else if(event.type === 'blur') {
        if( !(await emailAvailabilityForNewUser(value)) ) {
          placeOrderErrors.email.hasError = true
          placeOrderErrors.email.errorMsg = "You are already registered. Please log in to your account."
          return placeOrderErrors
        }
      }
      else {
        placeOrderErrors.email.hasError = false
        placeOrderErrors.email.errorMsg = ''
        return placeOrderErrors
      }
      break;
    case 'phone':
      if (!value) {
        placeOrderErrors.phone.hasError = true
        placeOrderErrors.phone.errorMsg = 'Phone number is required.'
        return placeOrderErrors
      }
      else if (!validatePhone(value)) {
        placeOrderErrors.phone.hasError = true
        placeOrderErrors.phone.errorMsg = 'Please enter a valid phone number.'
        return placeOrderErrors
      }
      else {
        placeOrderErrors.phone.hasError = false
        placeOrderErrors.phone.errorMsg = ''
        return placeOrderErrors
      }
      break;
    case 'streetName':
      if (!value) {
        placeOrderErrors.streetName.hasError = true
        placeOrderErrors.streetName.errorMsg = 'Street name is required.'
        return placeOrderErrors
      }
      else {
        placeOrderErrors.streetName.hasError = false
        placeOrderErrors.streetName.errorMsg = ''
        return placeOrderErrors
      }
      break;
    case 'streetAddress':
      if (!value) {
        placeOrderErrors.streetAddress.hasError = true
        placeOrderErrors.streetAddress.errorMsg = 'Street address is required.'
        return placeOrderErrors
      }
      else if (value.length < 3) {
        placeOrderErrors.streetAddress.hasError = true
        placeOrderErrors.streetAddress.errorMsg = 'Street address must be two to three characters long. '
        return placeOrderErrors
      }
      else {
        placeOrderErrors.streetAddress.hasError = false
        placeOrderErrors.streetAddress.errorMsg = ''
        return placeOrderErrors
      }
      break;
    case 'city':
      if (!value) {
        placeOrderErrors.city.hasError = true
        placeOrderErrors.city.errorMsg = 'City name is required.'
        return placeOrderErrors
      }
      else if (value.length < 3) {
        placeOrderErrors.city.hasError = true
        placeOrderErrors.city.errorMsg = 'City must be two to three characters long. '
        return placeOrderErrors
      }
      else {
        placeOrderErrors.city.hasError = false
        placeOrderErrors.city.errorMsg = ''
        return placeOrderErrors
      }
      break;
    case 'addressState':
      if (!value) {
        placeOrderErrors.addressState.hasError = true
        placeOrderErrors.addressState.errorMsg = 'State name is required.'
        return placeOrderErrors
      }
      else if (value.length < 3) {
        placeOrderErrors.addressState.hasError = true
        placeOrderErrors.addressState.errorMsg = 'State must be two to three characters long. '
        return placeOrderErrors
      }
      else {
        placeOrderErrors.addressState.hasError = false
        placeOrderErrors.addressState.errorMsg = ''
        return placeOrderErrors
      }
      break;
    case 'postCode':
      if (!value) {
        placeOrderErrors.postCode.hasError = true
        placeOrderErrors.postCode.errorMsg = 'Pincode is required.'
        return placeOrderErrors
      }
      else if (value.length < 6) {
        placeOrderErrors.postCode.hasError = true
        placeOrderErrors.postCode.errorMsg = 'Pincode is invalid.'
        return placeOrderErrors
      }
      else {
        placeOrderErrors.postCode.hasError = false
        placeOrderErrors.postCode.errorMsg = ''
        return placeOrderErrors
      }
      break;
    default:
      break;
  }
  return placeOrderErrors
}
