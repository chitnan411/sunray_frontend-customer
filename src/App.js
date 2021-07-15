import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import {
  SSAuthenticatedRoute,
  SSUnAuthenticatedRoute,
} from "./components/HOC/ssUserAuthRoutes.js";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { renderToast } from "./utils/renderToast.js";

// home pages
const HomeFashion = lazy(() => import("./pages/home/ssHome.js"));
const BrandsList = lazy(() => import("./pages/brands/ssBrandList.js"));
const CombosGridLayout = lazy(() => import("./pages/combos/ssComboList.js"));
const ProductGridLayout = lazy(() => import("./pages/products/ssProductList"));

const HomeFashionTwo = lazy(() => import("./pages/home/HomeFashionTwo"));
const HomeFashionThree = lazy(() => import("./pages/home/HomeFashionThree"));
const HomeFashionFour = lazy(() => import("./pages/home/HomeFashionFour"));
const HomeFashionFive = lazy(() => import("./pages/home/HomeFashionFive"));
const HomeFashionSix = lazy(() => import("./pages/home/HomeFashionSix"));
const HomeFashionSeven = lazy(() => import("./pages/home/HomeFashionSeven"));
const HomeKidsFashion = lazy(() => import("./pages/home/HomeKidsFashion"));
const HomeCosmetics = lazy(() => import("./pages/home/HomeCosmetics"));
const HomeFurniture = lazy(() => import("./pages/home/HomeFurniture"));
const HomeFurnitureTwo = lazy(() => import("./pages/home/HomeFurnitureTwo"));
const HomeFurnitureThree = lazy(() =>
  import("./pages/home/HomeFurnitureThree")
);
const HomeElectronics = lazy(() => import("./pages/home/HomeElectronics"));
const HomeElectronicsTwo = lazy(() =>
  import("./pages/home/HomeElectronicsTwo")
);
const HomeBookStore = lazy(() => import("./pages/home/HomeBookStore"));
const HomePlants = lazy(() => import("./pages/home/HomePlants"));
const HomeFlowerShop = lazy(() => import("./pages/home/HomeFlowerShop"));
const HomeOrganicFood = lazy(() => import("./pages/home/HomeOrganicFood"));
const HomeOrganicFoodTwo = lazy(() =>
  import("./pages/home/HomeOrganicFoodTwo")
);
const HomeOnepageScroll = lazy(() => import("./pages/home/HomeOnepageScroll"));
const HomeGridBanner = lazy(() => import("./pages/home/HomeGridBanner"));
const HomeAutoParts = lazy(() => import("./pages/home/HomeAutoParts"));
const HomeCakeShop = lazy(() => import("./pages/home/HomeCakeShop"));
const HomeHandmade = lazy(() => import("./pages/home/HomeHandmade"));
const HomePetFood = lazy(() => import("./pages/home/HomePetFood"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = lazy(() =>
  import("./pages/shop/ShopGridRightSidebar")
);
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const Combo = lazy(() => import("./pages/shop-product/Combo.js"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() =>
    import("./pages/blog/BlogDetailsStandard")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Terms = lazy(() => import("./pages/other/terms"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/my-account/index.js"));
// const MyAccountOrder = lazy(() => import("./pages/my-account/UserAccountOrders.js"));
const Login = lazy(() => import("./pages/other/login/ssLogin.js"));
const GuestCheckout = lazy(() => import("./pages/other/guestCheckout.js"))
const Register = lazy(() => import("./pages/other/register/ssRegister.js"));
const ForgotPassword = lazy(() => import("./pages/other/forgotPassword/ssForgotPassword.js"));
const CreatePassword = lazy(() => import("./pages/other/createPassword/ssCreatePassword.js"));
const LoginCheckout = lazy(() => import("./pages/other/LoginCheckout.js"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <div>
        {renderToast()}
        </div>
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div id="circle2" />
                </div>
              }
            >
              <Switch>
                <Route exact path={"/"} component={HomeFashion} />

                <Route exact path={"/combos"} component={CombosGridLayout} />

                <Route
                  path={"/combos/:comboCategoryId"}
                  component={CombosGridLayout}
                />

                <Route exact path={"/products"} component={ProductGridLayout} />

                <Route
                  path={"/products/:categoryId"}
                  component={ProductGridLayout}
                />

                <Route
                  path={"/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />

                <Route
                  path={"/combo/:id"}
                  render={(routeProps) => (
                    <Combo {...routeProps} key={routeProps.match.params.id} />
                  )}
                />

                <Route exact path={"/brands"} component={BrandsList} />

                <SSUnAuthenticatedRoute path={"/login"} component={Login} />

                <SSUnAuthenticatedRoute path={"/checkout-as-guest"} component={GuestCheckout}/>

                <SSAuthenticatedRoute
                  path={"/my-account/"}
                  component={MyAccount}
                />

                {/*<SSAuthenticatedRoute*/}
                {/*  path={"/my-account/orders"}*/}
                {/*  component={MyAccountOrder}*/}
                {/*/>*/}

                <SSUnAuthenticatedRoute
                  path={"/create-account"}
                  component={Register}
                />

                <SSUnAuthenticatedRoute
                  path={"/forgot-password"}
                  component={ForgotPassword}
                />

                <SSUnAuthenticatedRoute
                  path={"/create-password"}
                  component={CreatePassword}
                />

                <Route exact path={"/about"} component={About} />

                <Route exact path={"/contact"} component={Contact} />

                <Route exact path={"/terms-of-sale"} component={Terms} />

                <Route path={"/login-guest-check"} component={LoginCheckout} />
                <Route path={"/cart"} component={Cart} />
                <Route path={"/checkout"} component={Checkout} />

                <Route exact path={"/not-found"} component={NotFound} />
                
                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
