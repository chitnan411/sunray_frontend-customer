(this["webpackJsonpflone-react"]=this["webpackJsonpflone-react"]||[]).push([[5],{531:function(e,t,n){"use strict";n.d(t,"f",(function(){return c})),n.d(t,"a",(function(){return o})),n.d(t,"e",(function(){return u})),n.d(t,"k",(function(){return i})),n.d(t,"i",(function(){return l})),n.d(t,"h",(function(){return s})),n.d(t,"b",(function(){return m})),n.d(t,"d",(function(){return d})),n.d(t,"c",(function(){return p})),n.d(t,"g",(function(){return b})),n.d(t,"j",(function(){return g})),n.d(t,"l",(function(){return y}));var r=n(20),a=n(160),c=function(e,t,n,r){var a=t?e.filter((function(e){return e.category.filter((function(e){return e===t}))[0]})):e;if(n&&"new"===n){var c=a.filter((function(e){return e.new}));return c.slice(0,r||c.length)}if(n&&"bestSeller"===n)return a.sort((function(e,t){return t.saleCount-e.saleCount})).slice(0,r||a.length);if(n&&"saleItems"===n){var o=a.filter((function(e){return e.discount&&e.discount>0}));return o.slice(0,r||o.length)}return a.slice(0,r||a.length)},o=function(e,t){return t&&t>0?e-e*(t/100):null},u=function(e,t,n,r){var a=e.filter((function(e){return e._id===t._id&&(!e.selectedProductColor||e.selectedProductColor===n)&&(!e.selectedProductSize||e.selectedProductSize===r)}))[0];return e.length>=1&&a?t.variation?e.filter((function(e){return e._id===t._id&&e.selectedProductColor===n&&e.selectedProductSize===r}))[0].quantity:e.filter((function(e){return t._id===e._id}))[0].quantity:0},i=function(e,t,n){var r=Object(a.h)(e),c=Object(a.h)(t);return"products"===n?r:"combos"===n?c:void 0},l=function(e,t,n){if(console.log("product state ==> sortType",t),console.log("product state ==> sortValue",n),e&&t&&n){if("category"===t)return n&&void 0!==n?(console.log("product state ==> categoryProductsFiltered From Function",e.filter((function(e){return e.parentCategory._id==n}))),e.filter((function(e){return e.parentCategory._id==n}))):(console.log("product state ==> categoryProductsAll",e),e);if("brand"===t)return n&&void 0!==n?(console.log("product state ==> brandProductsFiltered From Function",e.filter((function(e){return e.brand._id==n}))),e.filter((function(e){return e.brand._id==n}))):(console.log("product state ==> brandProductsAll",e),e);if("search"===t)return console.log(n,t,"sortValue, sortType sortValue, sortType sortValue, sortType "),n&&""!==t&&void 0!==n?e.filter((function(e){var t=e.productName.toLowerCase().startsWith(n.toLowerCase()),r=e.productName.toLowerCase().includes(n.toLowerCase());return t||(!t&&r?r:null)})):e;if("tag"===t)return e.filter((function(e){return e.tag.filter((function(e){return e===n}))[0]}));if("color"===t)return e.filter((function(e){return e.variation&&e.variation.filter((function(e){return e.color===n}))[0]}));if("size"===t)return e.filter((function(e){return e.variation&&e.variation.filter((function(e){return e.size.filter((function(e){return e.name===n}))[0]}))[0]}));if("filterSort"===t){var a=Object(r.a)(e);if("default"===n)return a;if("priceHighToLow"===n)return a.sort((function(e,t){return t.price-e.price}));if("priceLowToHigh"===n)return a.sort((function(e,t){return e.price-t.price}))}}return e},s=function(e,t,n){if(e&&t&&n){if("category"===t)return n&&void 0!==n?e.filter((function(e){return e.comboCategory._id==n})):e;if("search"===t)return console.log(n,t,"sortValue, sortType sortValue, sortType sortValue, sortType "),n&&""!==t&&void 0!==n?e.filter((function(e){var t=e.comboName.toLowerCase().startsWith(n.toLowerCase()),r=e.comboName.toLowerCase().includes(n.toLowerCase());return t||(!t&&r?r:null)})):e;if("filterSort"===t){var a=Object(r.a)(e);if("default"===n)return a;if("priceHighToLow"===n)return a.sort((function(e,t){return t.price-e.price}));if("priceLowToHigh"===n)return a.sort((function(e,t){return e.price-t.price}))}}return e},f=function(e){return e.filter((function(e,t,n){return t===n.indexOf(e)}))},m=function(e){var t=[];return e&&e.map((function(e){return e.category&&e.category.map((function(e){return t.push(e)}))})),f(t)},d=function(e){var t=[];return e&&e.map((function(e){return e.tag&&e.tag.map((function(e){return t.push(e)}))})),f(t)},p=function(e){var t=[];return e&&e.map((function(e){return e.variation&&e.variation.map((function(e){return t.push(e.color)}))})),f(t)},b=function(e){var t=[];return e&&e.map((function(e){return e.variation&&e.variation.map((function(e){return e.size.map((function(e){return t.push(e.name)}))}))})),f(t)},g=function(e){document.querySelectorAll(".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button").forEach((function(e){e.classList.remove("active")})),e.currentTarget.classList.add("active")},y=function(e){var t=document.querySelector("#product-filter-wrapper");t.classList.toggle("active"),t.style.height?t.style.height=null:t.style.height=t.scrollHeight+"px",e.currentTarget.classList.toggle("active")}},541:function(e,t,n){"use strict";n.d(t,"h",(function(){return a})),n.d(t,"j",(function(){return c})),n.d(t,"i",(function(){return o})),n.d(t,"a",(function(){return u})),n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return l})),n.d(t,"d",(function(){return s})),n.d(t,"f",(function(){return f})),n.d(t,"e",(function(){return m})),n.d(t,"k",(function(){return d})),n.d(t,"l",(function(){return p})),n.d(t,"m",(function(){return b})),n.d(t,"o",(function(){return g})),n.d(t,"n",(function(){return y})),n.d(t,"g",(function(){return v}));var r=n(3);function a(){return{type:r.P}}function c(e){return{type:r.R,payload:e}}function o(e){return{type:r.Q,payload:e}}function u(){return{type:r.a}}function i(e){return{type:r.c,payload:e}}function l(e){return{type:r.b,payload:e}}function s(){return{type:r.i}}function f(e){return{type:r.k,payload:e}}function m(e){return{type:r.j,payload:e}}function d(e){return{type:r.l,payload:e}}function p(e){return{type:r.Y,payload:e}}function b(){return{type:r.Z}}function g(e){return{type:r.bb,payload:e}}function y(e){return{type:r.ab,payload:e}}function v(){return{type:r.m}}},558:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(94),o=n(588),u=n.n(o);t.a=function(e){e.imageUrl;var t=e.logoClass,n=e.showLogo;return a.a.createElement("div",{className:"".concat(t||"")},a.a.createElement(c.b,{to:"/"},n?a.a.createElement("img",{alt:"",className:"d-lg-inline",src:u.a,height:35,width:35}):a.a.createElement("img",{alt:"",className:"d-none d-lg-inline",src:u.a,height:48,width:41}),a.a.createElement("span",{className:"ss_brand_title"},"SUNRAY")))}},571:function(e,t,n){"use strict";var r=n(59),a=n.n(r),c=n(95),o=n(60),u=n.n(o),i=n(42),l=n.n(i),s=n(165),f=n.n(s),m=n(43),d=n(119),p=n(26),b=n(160),g=n(586),y=n(581),v=n(3);function h(e){return{type:v.t,payload:e}}function E(e){return{type:v.s,payload:e}}function N(e){return{type:v.w,payload:e}}function j(e){return{type:v.v,payload:e}}var O=n(541);function C(e){return{type:v.U,payload:e}}function w(e){return{type:v.T,payload:e}}t.a=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r,c,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=function(){},c=function(){},o=function(){},"category"===e.subModuleName&&(r=function(){return n({type:v.u})},c=function(e){return n(N(e))},o=function(e){return n(j(e))}),"subcategory"===e.subModuleName&&(r=function(){return n({type:v.S})},c=function(e){return n(C(e))},o=function(e){return n(w(e))}),"brand"===e.subModuleName&&(r=function(){return n({type:v.r})},c=function(e){return n(h(e))},o=function(e){return n(E(e))}),"product"!==e.subModuleName&&"discount/productList"!==e.subModuleName&&"crazyDeal/existList"!==e.subModuleName||(r=function(){return n(Object(y.b)())},c=function(e){return n(Object(y.d)(e))},o=function(e){return n(Object(y.c)(e))}),"product"===e.subModuleName&&!0===e.isSingle&&(r=function(){return n(Object(y.e)())},c=function(e){return n(Object(y.g)(e))},o=function(e){return n(Object(y.f)(e))}),"comboCategory"===e.subModuleName&&(r=function(){return n(Object(g.e)())},c=function(e){return n(Object(g.g)(e))},o=function(e){return n(Object(g.f)(e))}),"combo"===e.subModuleName&&(r=function(){return n(Object(g.b)())},c=function(e){return n(Object(g.d)(e))},o=function(e){return n(Object(g.c)(e))}),"combo"===e.subModuleName&&!0===e.isSingle&&(r=function(){return n(Object(g.h)())},c=function(e){return n(Object(g.j)(e))},o=function(e){return n(Object(g.i)(e))}),"cart"===e.subModuleName&&(r=function(){return n(Object(O.h)())},c=function(e){return n(Object(O.j)(e))},o=function(e){return n(Object(O.i)(e))}),r(),t.next=15,u.a.get("".concat(p.a,"/v2/admin/").concat(e.subModuleName).concat(e.doFilter&&Object(b.e)(e.filters)?"?".concat(f.a.stringify(e.filters)):""),{withCredentials:!0,headers:{Authorization:"Bearer ".concat(l.a.get(p.c))}}).then((function(t){if(t.data){if(t.data.confirmation&&"There is no record"===t.data.confirmation.message)return c([]);if(t.data.card&&t.data.card.data)return"cart"===e.subModuleName?c(t.data.card.data.cartItems):c(t.data.card.data)}})).catch((function(e){if(e.toString().includes("Network Error")){return m.b.error("Can't connect to server",{style:{marginBottom:"40px"}}),o({code:503,message:"Network Error"})}if(e.response&&e.response.data){if(401===e.response.data.code&&(l.a.remove(p.d),l.a.remove(p.b),d.a.push("/login")),400===e.response.data.code)return o(e.response.data);if(409===e.response.data.code){var t={code:409,message:e.response.data.message};return o(t)}if(500===e.response.data.code){m.b.error("Internal Server Error",{style:{marginBottom:"40px"}});return o({code:500,message:"Internal Server Error"})}}}));case 15:return t.abrupt("return",t.sent);case 16:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},579:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"d",(function(){return c})),n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return u}));var r=n(3);function a(){return{type:r.db}}function c(){return{type:r.gb}}function o(e){return{type:r.fb,payload:e}}function u(e){return{type:r.eb,payload:e}}},581:function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"g",(function(){return c})),n.d(t,"f",(function(){return o})),n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return i})),n.d(t,"d",(function(){return l})),n.d(t,"c",(function(){return s}));var r=n(3);function a(){return{type:r.M}}function c(e){return{type:r.O,payload:e}}function o(e){return{type:r.N,payload:e}}function u(){return{type:r.e}}function i(){return{type:r.J}}function l(e){return{type:r.L,payload:e}}function s(e){return{type:r.K,payload:e}}},582:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(558),o=function(){return a.a.createElement("div",null,a.a.createElement(c.a,{showLogo:!0,imageUrl:"/assets/img/logo/sunray_logo.svg",logoClass:"logo"}))},u=n(94),i=n(73),l=Object(i.multilanguage)((function(e){e.strings;return a.a.createElement("nav",{className:"offcanvas-navigation",id:"offcanvas-navigation"},a.a.createElement("ul",null,a.a.createElement("li",{className:"menu-item-has-children"},a.a.createElement(u.b,{to:"/"},"Shop")),a.a.createElement("li",{className:"menu-item-has-children"},a.a.createElement(u.b,{to:"/products"},"Products")),a.a.createElement("li",null,a.a.createElement(u.b,{to:"/combos"},"Combos")),a.a.createElement("li",{className:"menu-item-has-children"},a.a.createElement(u.b,{to:"/about"},"About Us")),a.a.createElement("li",null,a.a.createElement(u.b,{to:"/contact"},"Contact Us"))))})),s=n(49),f=n(162),m=(Object(s.connect)((function(e){return{currency:e.currencyData}}),(function(e){return{setCurrency:function(t){e(Object(f.b)(t))}}}))(Object(i.multilanguage)((function(e){var t=e.currency,n=e.setCurrency,r=e.currentLanguageCode,c=e.dispatch,o=function(){document.querySelector("#offcanvas-mobile-menu").classList.remove("active")};return a.a.createElement("div",{className:"mobile-menu-middle"},a.a.createElement("div",{className:"lang-curr-style"},a.a.createElement("span",{className:"title mb-2"},"Choose Language "),a.a.createElement("select",{value:r,onChange:function(e){!function(e){var t=e.target.value;c(Object(i.changeLanguage)(t))}(e),o()}},a.a.createElement("option",{value:"en"},"English"),a.a.createElement("option",{value:"fn"},"French"),a.a.createElement("option",{value:"de"},"Germany"))),a.a.createElement("div",{className:"lang-curr-style"},a.a.createElement("span",{className:"title mb-2"},"Choose Currency"),a.a.createElement("select",{value:t.currencyName,onChange:function(e){!function(e){var t=e.target.value;n(t)}(e),o()}},a.a.createElement("option",{value:"USD"},"USD"),a.a.createElement("option",{value:"EUR"},"EUR"),a.a.createElement("option",{value:"GBP"},"GBP"))))}))),function(){return a.a.createElement("div",{className:"offcanvas-widget-area"},a.a.createElement("div",{className:"off-canvas-contact-widget"},a.a.createElement("div",{className:"header-contact-info"},a.a.createElement("ul",{className:"header-contact-info__list"},a.a.createElement("li",null,a.a.createElement("i",{className:"fa fa-phone"})," ",a.a.createElement("a",{href:"tel://+919725634911"},"+91 97256 34911")),a.a.createElement("li",null,a.a.createElement("i",{className:"fa fa-phone"})," ",a.a.createElement("a",{href:"tel://+919824089367"},"+91 98240 89367")),a.a.createElement("li",null,a.a.createElement("i",{className:"fa fa-envelope"})," ",a.a.createElement("a",{href:"mailto:info@yourdomain.com"},"info@sunraystationers.com"))))),a.a.createElement("div",{className:"off-canvas-widget-social"},a.a.createElement("a",{href:"https://instagram.com/sunray.stationers?igshid=lttzxenfps3z",title:"Instagram"},a.a.createElement("i",{className:"fa fa-instagram text-primary"})),a.a.createElement("a",{href:"https://www.facebook.com/sunray.stationers/",title:"Facebook"},a.a.createElement("i",{className:"fa fa-facebook text-primary"}))))});t.a=function(){Object(r.useEffect)((function(){for(var n=document.querySelector("#offcanvas-navigation"),r=n.querySelectorAll(".sub-menu"),a=n.querySelectorAll("a"),c=0;c<r.length;c++)r[c].insertAdjacentHTML("beforebegin","<span class='menu-expand'><i></i></span>");for(var o=n.querySelectorAll(".menu-expand"),u=o.length,i=0;i<u;i++)o[i].addEventListener("click",(function(t){e(t)}));for(var l=0;l<a.length;l++)a[l].addEventListener("click",(function(){t()}))}));var e=function(e){e.currentTarget.parentElement.classList.toggle("active")},t=function(){document.querySelector("#offcanvas-mobile-menu").classList.remove("active")};return a.a.createElement("div",{className:"offcanvas-mobile-menu",id:"offcanvas-mobile-menu"},a.a.createElement("button",{className:"offcanvas-menu-close",id:"mobile-menu-close-trigger",onClick:function(){return t()}},a.a.createElement("i",{className:"pe-7s-close"})),a.a.createElement("div",{className:"offcanvas-wrapper"},a.a.createElement("div",{className:"offcanvas-inner-content"},a.a.createElement(o,null),a.a.createElement(l,null),a.a.createElement(m,null))))}},583:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=(n(43),n(49)),o=n(94),u=n(9),i=(n(59),n(95),n(159),n(60),n(42)),l=n.n(i),s=(n(39),n(26));var f=n(47),m=n(571);n(160),t.a=Object(u.h)(Object(c.connect)((function(e){return{categories:e.categories.productCategories,brands:e.brands.productBrands}}),(function(e){return{sendCategoriesGetRequest:function(t){return e(Object(m.a)(t))},sendBrandsGetRequest:function(t){return e(Object(m.a)(t))},replaceCartDataToUserCartData:function(t){e(Object(f.o)(t))}}}))((function(e){e.strings,e.history,e.replaceCartDataToUserCartData,e.brands,e.categories,e.sendCategoriesGetRequest,e.sendBrandsGetRequest;var t=e.menuWhiteClass,n=e.sidebarMenu;l.a.get(s.d);return a.a.createElement("div",{className:" ".concat(n?"sidebar-menu":"main-menu ".concat(t||"")," ")},a.a.createElement("nav",null,a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement(o.b,{to:"/"},"Shop")),a.a.createElement("li",null,a.a.createElement(o.b,{to:"/products"},"Products")),a.a.createElement("li",null,a.a.createElement(o.b,{to:"/combos"},"Combos")),a.a.createElement("li",null,a.a.createElement(o.b,{to:"/about"},"About")),a.a.createElement("li",null,a.a.createElement(o.b,{to:"/contact"},"Contact Us")))))})))},584:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(94),o=n(9),u=n(49),i=n(42),l=n.n(i),s=n(26),f=n(59),m=n.n(f),d=n(1),p=n(95),b=n(161),g=n(531),y=n(587),v=n(160),h=Object(o.h)(Object(u.connect)(null,(function(e){return{sendDeleteUserCartItems:function(t){e(Object(y.a)(t))}}}))((function(e){var t=e.cartData,n=e.currency,o=e.deleteFromCart,u=e.sendDeleteUserCartItems,i=l.a.get(s.d),f=Object(b.useToasts)().addToast;return a.a.createElement("div",{className:"shopping-cart-content"},t&&t.length>0?a.a.createElement(r.Fragment,null,a.a.createElement("ul",null,t.map((function(e,t){var r=Object(g.a)(e.price,e.discount),l=(e.price*n.currencyRate).toFixed(2),s=(r*n.currencyRate).toFixed(2);return null!=r?s*e.quantity:l*e.quantity,a.a.createElement("li",{className:"single-shopping-cart",key:t},a.a.createElement("div",{className:"shopping-cart-img"},a.a.createElement(c.b,{to:"/product/"+e._id},e.productImages&&a.a.createElement("img",{alt:"",src:e.productImages[0].original,className:"img-fluid"}),e.comboImages&&a.a.createElement("img",{alt:"",src:e.comboImages[0].original,className:"img-fluid"}))),a.a.createElement("div",{className:"shopping-cart-title"},a.a.createElement("h4",null,a.a.createElement(c.b,{to:"/product/"+e._id},e.productName,e.comboName)),a.a.createElement("h6",null,"Qty: ",e.quantity),a.a.createElement("span",null,new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(Object(v.d)(e)))),a.a.createElement("div",{className:"shopping-cart-delete"},a.a.createElement("button",{onClick:Object(p.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(1!=i&&"true"!=i){t.next=5;break}return t.next=3,u({multiple:!1,data:Object(d.a)({},e)});case 3:t.next=6;break;case 5:o(e,f);case 6:case"end":return t.stop()}}),t)})))},a.a.createElement("i",{className:"fa fa-times-circle"}))))}))),a.a.createElement("div",{className:"shopping-cart-total"},a.a.createElement("h4",null,"Total :",a.a.createElement("span",{className:"shop-total"},n.currencySymbol+function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=0;return e.forEach((function(e){t+=Object(v.d)(e)*e.quantity})),Number(t).toFixed(2)}(t)))),a.a.createElement("div",{className:"shopping-cart-btn btn-hover text-center"},a.a.createElement(c.b,{className:"btn-ss-primary",to:"/cart"},"view cart"))):a.a.createElement("p",{className:"text-center"},"No items added to cart"))}))),E=n(47);t.a=Object(o.h)(Object(u.connect)((function(e){return{currency:e.currencyData,cartData:e.cartData,wishlistData:e.wishlistData,compareData:e.compareData}}),(function(e){return{deleteFromCart:function(t,n){e(Object(E.m)(t,n))}}}))((function(e){var t=e.currency,n=e.cartData,r=(e.wishlistData,e.compareData,e.deleteFromCart),o=e.iconWhiteClass,u=e.history;return a.a.createElement("div",{className:"header-right-wrap ".concat(o||"")},a.a.createElement("div",{className:"same-style account-setting d-sm-block d-lg-block"},a.a.createElement("button",{className:"account-setting-active",onClick:function(e){e.preventDefault();var t=l.a.get(s.d),n=l.a.get(s.b);t&&n?u.push("/my-account"):u.push("/login")}},a.a.createElement("i",{className:"pe-7s-user ss-header-icon"})),a.a.createElement("div",{className:"account-dropdown"},a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement(c.b,{to:"/login"},"Login")),a.a.createElement("li",null,a.a.createElement(c.b,{to:"/login"},"Register")),a.a.createElement("li",null,a.a.createElement(c.b,{to:"/my-account"},"my account"))))),a.a.createElement("div",{className:"same-style cart-wrap d-none d-lg-block"},n&&n.length>0?a.a.createElement("button",{className:"icon-cart",onClick:function(e){return function(e){e.currentTarget.nextSibling.classList.toggle("active")}(e)}},a.a.createElement("i",{className:"pe-7s-shopbag ss-header-icon"}),a.a.createElement("span",{className:"count-style"},n&&n.length?n.length:0)):a.a.createElement("button",{className:"icon-cart",onClick:function(){u.push("/cart")}},a.a.createElement("i",{className:"pe-7s-shopbag ss-header-icon"}),a.a.createElement("span",{className:"count-style"},n&&n.length?n.length:0)),n&&n.length>0&&a.a.createElement(h,{cartData:n,currency:t,deleteFromCart:r})),a.a.createElement("div",{className:"same-style cart-wrap d-block d-lg-none"},a.a.createElement(c.b,{className:"icon-cart",to:"/cart"},a.a.createElement("i",{className:"pe-7s-shopbag"}),a.a.createElement("span",{className:"count-style"},n&&n.length?n.length:0))),a.a.createElement("div",{className:"same-style mobile-off-canvas d-block d-lg-none"},a.a.createElement("button",{className:"mobile-aside-button",onClick:function(){document.querySelector("#offcanvas-mobile-menu").classList.add("active")}},a.a.createElement("i",{className:"pe-7s-menu"}))))})))},586:function(e,t,n){"use strict";n.d(t,"h",(function(){return a})),n.d(t,"j",(function(){return c})),n.d(t,"i",(function(){return o})),n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return i})),n.d(t,"d",(function(){return l})),n.d(t,"c",(function(){return s})),n.d(t,"e",(function(){return f})),n.d(t,"g",(function(){return m})),n.d(t,"f",(function(){return d}));var r=n(3);function a(){return{type:r.D}}function c(e){return{type:r.F,payload:e}}function o(e){return{type:r.E,payload:e}}function u(){return{type:r.d}}function i(){return{type:r.x}}function l(e){return{type:r.z,payload:e}}function s(e){return{type:r.y,payload:e}}function f(){return{type:r.A}}function m(e){return{type:r.C,payload:e}}function d(e){return{type:r.B,payload:e}}},587:function(e,t,n){"use strict";var r=n(59),a=n.n(r),c=n(1),o=n(95),u=n(60),i=n.n(u),l=n(42),s=n.n(l),f=n(43),m=n(26),d=n(579),p=n(47),b=n(541);t.a=function(e){return function(){var t=Object(o.a)(a.a.mark((function t(n){var r,u,l,g,y;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=function(){},u=function(){},l=function(){},g={},y=e.data,!1===e.multiple&&(r=function(){return n(Object(b.d)())},u=function(e){return n(Object(b.f)(e))},l=function(e){return n(Object(b.e)(e))},"productName"in y&&(g={product:y._id}),"comboName"in y&&(g={combo:y._id})),!0===e.multiple&&(r=function(){return n(Object(b.m)())},u=function(e){return n(Object(b.o)(e))},l=function(e){return n(Object(b.n)(e))},g={all:!0}),n(r()),t.next=10,i.a.delete("".concat(m.a,"/v2/admin/cart"),{withCredentials:!0,headers:{Authorization:"Bearer ".concat(s.a.get(m.c))},data:Object(c.a)({},g)}).then(function(){var t=Object(o.a)(a.a.mark((function t(r){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r.data){t.next=16;break}if(!r.data.confirmation){t.next=16;break}if(!r.data.confirmation.message){t.next=16;break}if(200!==r.data.confirmation.statusCode){t.next=16;break}if(!1!==e.multiple){t.next=10;break}return t.next=7,n(Object(p.m)(y,void 0));case 7:return t.next=9,n(Object(b.k)(e));case 9:return t.abrupt("return",n(u(r.data.confirmation)));case 10:if(!0!==e.multiple){t.next=16;break}return t.next=13,n(Object(p.l)(void 0));case 13:return t.next=15,n(Object(b.g)());case 15:return t.abrupt("return",n(u(r.data.confirmation)));case 16:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(e){if(e.toString().includes("Network Error")){return n(l({code:503,message:"Network Error"}))}if(e.response&&e.response.data){if(401===e.response.data.code&&(s.a.remove(m.c),s.a.set(m.d,!1),n(Object(b.g)()),n(Object(p.n)()),localStorage.removeItem("couponData"),n(Object(d.d)()),f.b.error("Session Expired! Try again.",{style:{marginBottom:"40px"}})),400===e.response.data.code)return n(l(e.response.data));if(409===e.response.data.code)return n(l(e.response.data))}}));case 10:return t.abrupt("return",t.sent);case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},588:function(e,t,n){e.exports=n.p+"static/media/sunray_logo.2728e9a5.svg"}}]);
//# sourceMappingURL=5.ddd12dde.chunk.js.map