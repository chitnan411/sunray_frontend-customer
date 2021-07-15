import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {toast} from "react-hot-toast";
import {connect} from "react-redux";
import {withRouter,Link
} from "react-router-dom";
import {useGetUseCartHook} from "../../api/getCart.hooks.js";
import {setUserCartData} from "../../redux/actions/cartActions.js";
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";
import {isNotEmptyObject} from "../../utils/commonUtils.js";
import {ssClientAuthFlagCookieKey} from "../../utils/constants.js";
import Cookies from "js-cookie"

const NavMenu = ({strings, history, replaceCartDataToUserCartData, brands, categories, sendCategoriesGetRequest, sendBrandsGetRequest, menuWhiteClass, sidebarMenu }) => {

  const isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)
  // const {
  //   getSSUserCart,
  //   userCartItems,
  //   getCartSuccess,
  //   getCartRequestPending,
  //   getCartFailurePayload,
  //   getCartFailure,
  // } = useGetUseCartHook()
  //
  // useEffect(() => {
  //   if( getCartFailure === true && getCartSuccess === false && getCartRequestPending === false && (userCartItems.length === 0) && isNotEmptyObject(getCartFailurePayload)){
  //     toast.error(getCartFailurePayload.message,{
  //       icon: getCartFailurePayload.message.toString().includes("Connection problem") ? <WifiOff size={30} color="#FF4343"/> : <ErrorCircle size={30} color="#FF4343"/> ,
  //       style:{
  //         marginBottom: "40px"
  //       }
  //     })
  //   }
  //   if( getCartSuccess === true ){
  //     if(userCartItems.code === 401){
  //       history.push("/login")
  //       replaceCartDataToUserCartData([])
  //     }
  //     else {
  //       replaceCartDataToUserCartData(userCartItems)
  //     }
  //   }
  // },[ getCartFailurePayload, getCartFailure, getCartRequestPending, getCartSuccess, userCartItems])
  //
  // useEffect(() => {
  //   if(isAuthenticated == true || isAuthenticated == "true")
  // })

  // useEffect(() => {
  //   sendCategoriesGetRequest({subModuleName: "category", doFilter: false})
  //   sendBrandsGetRequest({subModuleName: "brand", doFilter: false})
  // },[])
  return (
      <div
          className={` ${
              sidebarMenu
                  ? "sidebar-menu"
                  : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
          } `}
      >
        <nav>
          <ul>
            <li>
              <Link to={"/"}>
                Shop
              </Link>
            </li>
            {/* <li>
              <Link to={"/products"}>
                {" "}
                Discover
                {sidebarMenu ? (
                    <span>
                  <i className="fa fa-angle-right"></i>
                </span>
                ) : (
                    <i className="fa fa-angle-down" />
                )}
              </Link>
              <ul className="mega-menu">
                <li>
                  <ul>
                    <li className="mega-menu-title">
                      <Link to={"/shop-grid-standard"}>
                        Explore by Category
                      </Link>
                    </li>
                    {categories.map((category) => {
                      return (
                          <li>
                            <Link to={"/shop-grid-standard"}>
                              {category && category.categoryName}
                            </Link>
                          </li>
                      )
                    })}
                  </ul>
                </li>
                <li>
                  <ul>
                    <li className="mega-menu-title">
                      <Link to={"/product/1"}>
                        Explore by Brands
                      </Link>
                    </li>
                    {brands.map((brand) => {
                      return (
                          <li>
                            <Link to={"/shop-grid-standard"}>
                              {brand && brand.brandName}
                            </Link>
                          </li>
                      )
                    })}
                  </ul>
                </li>
                <li>
                  <ul>
                    <li className="mega-menu-img">
                      <Link to={"/shop-grid-standard"}>
                        <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/banner/banner-12.png"
                            }
                            alt=""
                        />
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
             */}
             <li>
              <Link to={"/products"}>
                Products
              </Link>
            </li>
            <li>
              <Link to={"/combos"}>
                Combos
              </Link>
            </li>
            <li>
              <Link to={"/about"}>
                About
                {/*{strings["about_us"]}*/}
              </Link>
            </li>
            <li>
              <Link to="/contact">
                Contact Us
                {/*{strings["contact_us"]}*/}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
  categories: PropTypes.array,
  brands: PropTypes.array,
  sendCategoriesGetRequest: PropTypes.func,
  sendBrandsGetRequest: PropTypes.func,
};


const mapStateToProps = state => ({
  categories: state.categories.productCategories,
  brands: state.brands.productBrands
});

const mapDispatchToProps = dispatch => ({
  sendCategoriesGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
  sendBrandsGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
  replaceCartDataToUserCartData: (data) => {dispatch(setUserCartData(data))},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(NavMenu))