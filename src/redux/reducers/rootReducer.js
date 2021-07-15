import {ssCartReducers} from "./cart";
import {ssSingleCombo} from "./combo/ssSingleComboReducer.js";
import currencyReducer from "./currencyReducer";
import {ssSingleProduct} from "./product/ssSingleProductReducer.js";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import {ssFeaturedProductList} from "./products/ssFeaturedProductsReducer.js";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import authReducer from "./auth/index.js"
import {ssCategoryList} from "./categories/ssCategoriesReducer.js"
import {ssSubCategoryList} from "./subCategories/ssSubCategoriesReducer.js"
import {ssBrandList} from "./brands/ssBrandsReducer.js"
import {ssProductList} from "./products/ssProductsReducer.js"
import {ssComboList} from "./combos/ssCombosReducer.js"
import {ssComboCategoriesList} from "./comboCategories/ssComboCategoriesReducer.js"


const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  auth: authReducer,
  categories: ssCategoryList,
  subCategories: ssSubCategoryList,
  brands: ssBrandList,
  products: ssProductList,
  combos: ssComboList,
  ssCart: ssCartReducers,
  comboCategories: ssComboCategoriesList,
  singleProduct: ssSingleProduct,
  singleCombo: ssSingleCombo,
  featuredProducts: ssFeaturedProductList,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
});

export default rootReducer;
