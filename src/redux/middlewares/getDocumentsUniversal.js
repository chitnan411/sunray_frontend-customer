import axios from 'axios'
import Cookies from "js-cookie";
import queryString from "query-string"
import {toast} from "react-hot-toast";
import {history} from "../../utils/history.js";
import {apiRootUrl, ssClientAuthCookieKey, setUserDataCookieKey, ssClientAuthFlagCookieKey} from "../../utils/constants";
import {isNotEmptyObject} from "../../utils/commonUtils.js";
import {
  getAllCombosRequest, getAllCombosRequestFailure, getAllCombosRequestSuccess,
  getComboCategoriesRequest,
  getComboCategoriesRequestFailure,
  getComboCategoriesRequestSuccess,
    getComboRequest,getComboRequestSuccess,getComboRequestFailure
} from "../actions/combos/ssCombosActions.js";

// import {
//   getComboCategoriesRequest, getComboCategoriesRequestFailure,
//   getComboCategoriesRequestSuccess
// } from "../actions/combos/comboCategory/ssComboCategoriesActions.js";
import {
  getAllProductsRequest, getAllProductsRequestFailure,
  getAllProductsRequestSuccess, getProductRequest, getProductRequestFailure, getProductRequestSuccess
} from "../actions/products/ssProductsActions.js";
import {
  getProductBrandsRequest,
  getProductBrandsRequestFailure,
  getProductBrandsRequestSuccess
} from "../actions/brands/ssBrandsActions.js";
import { getProductCategoriesRequest,getProductCategoriesRequestSuccess, getProductCategoriesRequestFailure } from '../actions/categories/ssCategoriesActions.js';
import {getCartRequest, getCartRequestFailure, getCartRequestSuccess} from "../actions/ssCartActions.js";
import {
  getProductSubCategoriesRequest, getProductSubCategoriesRequestFailure,
  getProductSubCategoriesRequestSuccess
} from "../actions/subCategories/ssSubCategoriesActions.js";

const requestForGetDocuments = (requestedPayload) => {
  return async function (dispatch) {
    let requestMethod = () => {}
    let requestSuccessMethod = () => {}
    let requestFailureMethod = () => {}
    if(requestedPayload.subModuleName === "category"){
      requestMethod = () => dispatch(getProductCategoriesRequest())
      requestSuccessMethod = (data) => dispatch(getProductCategoriesRequestSuccess(data))
      requestFailureMethod = (data) => dispatch(getProductCategoriesRequestFailure(data))
    }
    if(requestedPayload.subModuleName === "subcategory"){
      requestMethod = () => dispatch(getProductSubCategoriesRequest())
      requestSuccessMethod = (data) => dispatch(getProductSubCategoriesRequestSuccess(data))
      requestFailureMethod = (data) => dispatch(getProductSubCategoriesRequestFailure(data))
    }
    if(requestedPayload.subModuleName === "brand"){
      requestMethod = () => dispatch(getProductBrandsRequest())
      requestSuccessMethod = (data) => dispatch(getProductBrandsRequestSuccess(data))
      requestFailureMethod = (data) => dispatch(getProductBrandsRequestFailure(data))
    }
    if(requestedPayload.subModuleName === "product" || requestedPayload.subModuleName === "discount/productList" || requestedPayload.subModuleName === "crazyDeal/existList" ){
      requestMethod = () => dispatch(getAllProductsRequest())
      requestSuccessMethod = (data) => dispatch(getAllProductsRequestSuccess(data))
      requestFailureMethod = (data) => dispatch(getAllProductsRequestFailure(data))
    }

    if(requestedPayload.subModuleName === "product" && requestedPayload.isSingle === true){
      requestMethod = () => dispatch(getProductRequest())
      requestSuccessMethod = (data) => dispatch(getProductRequestSuccess(data))
      requestFailureMethod = (data) => dispatch(getProductRequestFailure(data))
    }

    if(requestedPayload.subModuleName === "comboCategory"){
      requestMethod = () => dispatch(getComboCategoriesRequest())
      requestSuccessMethod = (data) => dispatch(getComboCategoriesRequestSuccess(data))
      requestFailureMethod = (data) => dispatch(getComboCategoriesRequestFailure(data))
    }

    if(requestedPayload.subModuleName === "combo"){
      requestMethod = () => dispatch(getAllCombosRequest())
      requestSuccessMethod = (data) => dispatch(getAllCombosRequestSuccess(data))
      requestFailureMethod = (data) => dispatch(getAllCombosRequestFailure(data))
    }

    if(requestedPayload.subModuleName === "combo" && requestedPayload.isSingle === true){
      requestMethod = () => dispatch(getComboRequest())
      requestSuccessMethod = (data) => dispatch(getComboRequestSuccess(data))
      requestFailureMethod = (data) => dispatch(getComboRequestFailure(data))
    }

    if(requestedPayload.subModuleName === "cart" ){
      requestMethod = () => dispatch(getCartRequest())
      requestSuccessMethod = (data) => dispatch(getCartRequestSuccess(data))
      requestFailureMethod = (data) => dispatch(getCartRequestFailure(data))
    }

    requestMethod()
    return await axios.get(`${apiRootUrl}/v2/admin/${requestedPayload.subModuleName}${( (requestedPayload.doFilter) && isNotEmptyObject(requestedPayload.filters) ) ? `?${queryString.stringify(requestedPayload.filters)}` : '' }`, {withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
      .then((response) => {
        if (response.data) {
          if(response.data.confirmation){
            if(response.data.confirmation.message === "There is no record"){
              return (requestSuccessMethod([]))
            }
          }
          if(response.data.card){
            if(response.data.card.data){
              if(requestedPayload.subModuleName === "cart"){
                return (requestSuccessMethod(response.data.card.data.cartItems))
              }
              return (requestSuccessMethod(response.data.card.data))
            }
          }
        }
      })
      .catch((error) => {
        if(error.toString().includes('Network Error')){
          const errorData = {code: 503, message: "Network Error"}

          toast.error("Can't connect to server",{style:{marginBottom: "40px"}})

          return requestFailureMethod(errorData)
        }else {
          if(error.response) {
            if (error.response.data) {
              if(error.response.data.code === 401){
                // toast.error("Session expired. Sign In again.",{style:{marginBottom: "40px"}})
                Cookies.remove(ssClientAuthFlagCookieKey)
                Cookies.remove(setUserDataCookieKey)
                history.push('/login')
              }
              if(error.response.data.code === 400){
                // SnackbarUtils.error("Bad request. Please try later.")
                return requestFailureMethod(error.response.data)
              }
              if(error.response.data.code === 409){
                const errorData = {code:409, message: error.response.data.message}
                return requestFailureMethod(errorData)
              }
              if(error.response.data.code === 500){
                toast.error("Internal Server Error",{style:{marginBottom: "40px"}})
                const errorData = {code: 500, message: "Internal Server Error"}
                return requestFailureMethod(errorData)
              }
            }
          }
        }
      })
  }
}
export default requestForGetDocuments;
