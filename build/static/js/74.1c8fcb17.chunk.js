(this["webpackJsonpflone-react"]=this["webpackJsonpflone-react"]||[]).push([[74],{1001:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,a):{};r.get||r.set?Object.defineProperty(t,a,r):t[a]=e[a]}return t.default=e,t}(a(0)),n=l(a(16)),c=l(a(39)),o=a(1036);function l(e){return e&&e.__esModule?e:{default:e}}function i(e){return(i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return!t||"object"!==i(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p,b,v,E=function(e){function t(){return s(this,t),m(this,d(t).apply(this,arguments))}var a,n,l;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,e),a=t,(n=[{key:"componentDidMount",value:function(){this.temporaryElement=document.createElement("div"),this.handleChildrens()}},{key:"componentDidUpdate",value:function(e){e.children!==this.props.children&&this.handleChildrens()}},{key:"componentWillUnmount",value:function(){this.temporaryElement&&c.default.unmountComponentAtNode(this.temporaryElement)}},{key:"extractChildren",value:function(){var e=this.context.extract,t=this.props.children;t&&e&&e(t)}},{key:"handleChildrens",value:function(){var e=this,t=this.props.children;if(!this.context.extract&&t){var a=r.default.createElement("div",{className:"react-head-temp"},t);c.default.render(a,this.temporaryElement,(function(){var t=e.temporaryElement.innerHTML;if(e.lastChildStr!==t){e.lastChildStr=t;var a=e.temporaryElement.querySelector(".react-head-temp");if(null!==a){var r=Array.prototype.slice.call(a.children),n=document.head,c=n.innerHTML;(r=(r=r.filter((function(e){return-1===c.indexOf(e.outerHTML)}))).map((function(e){return e.cloneNode(!0)}))).forEach((function(e){var t=e.tagName.toLowerCase();if("title"===t){var a=(0,o.getDuplicateTitle)();a&&(0,o.removeChild)(n,a)}else if("meta"===t){var r=(0,o.getDuplicateMeta)(e);r&&(0,o.removeChild)(n,r)}else if("link"===t&&"canonical"===e.rel){var c=(0,o.getDuplicateCanonical)(e);c&&(0,o.removeChild)(n,c)}})),(0,o.appendChild)(document.head,r)}}}))}}},{key:"render",value:function(){return this.extractChildren(),null}}])&&u(a.prototype,n),l&&u(a,l),t}(r.Component);p=E,b="contextTypes",v={extract:n.default.func},b in p?Object.defineProperty(p,b,{value:v,enumerable:!0,configurable:!0,writable:!0}):p[b]=v;var y=E;t.default=y,e.exports=t.default},1004:function(e,t,a){"use strict";var r=a(0),n=a.n(r),c=a(831);t.a=function(e){var t=e.spaceTopClass,a=e.spaceBottomClass,r=e.subscribeBtnClass;return n.a.createElement("div",{className:"subscribe-area-3 ".concat(t||""," ").concat(a||""," ")},n.a.createElement("div",{className:"container-fluid"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-xl-5 col-lg-7 col-md-10 ml-auto mr-auto"},n.a.createElement("div",{className:"subscribe-style-3 text-center"},n.a.createElement("h2",null,"Subscribe "),n.a.createElement("p",null,"Subscribe to our newsletter to receive news on update"),n.a.createElement(c.a,{mailchimpUrl:"//devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&id=05d85f18ef",spaceTopClass:"mt-35",subscribeBtnClass:r}))))))}},1035:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,n=a(0),c=(r=a(16))&&r.__esModule?r:{default:r};function o(e){return(o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return!t||"object"!==o(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e){function t(){return l(this,t),s(this,u(t).apply(this,arguments))}var a,r,c;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,e),a=t,(r=[{key:"getChildContext",value:function(){return{extract:this.props.extract}}},{key:"render",value:function(){return n.Children.only(this.props.children)}}])&&i(a.prototype,r),c&&i(a,c),t}(n.Component);!function(e,t,a){t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a}(d,"childContextTypes",{extract:c.default.func});var f=d;t.default=f,e.exports=t.default},1036:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.filterAndArrangeTags=function(e){var t=null,a=null,r=[],o=[];return e.forEach((function(e){var n=e.type,c=e.props;"title"===n?t=e:"link"===n&&"canonical"===c.rel?a=e:"meta"===n?r.push(e):o.push(e)})),[t].concat(function(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(function(e){var t={};c.forEach((function(e){t[e]=[]}));for(var a=[],r=function(r){var o=e[r],l=o.props.id;(l?!t.id[l]:0===n.filter((function(e){var a=o.props[e],r=t[e][a];return r&&!r.props.id})).length)&&(a.unshift(o),c.forEach((function(e){var a=o.props[e];a&&(t[e][a]=o)})))},o=e.length-1;o>=0;o--)r(o);return a}(r)),[a],o)},t.getDuplicateTitle=function(){return document.head.querySelectorAll("title")},t.getDuplicateCanonical=function(){return document.head.querySelectorAll('link[rel="canonical"]')},t.getDuplicateMeta=function(e){var t=document.head,a=e.id;if(a)return a&&t.querySelector("#".concat(a));return r.reduce((function(a,r){var n,c=e.getAttribute(r);return c?a.concat((n=t.querySelectorAll("[".concat(r,' = "').concat(c,'"]')),(n=Array.prototype.slice.call(n||[])).filter((function(e){return!e.id})))):a}),[])},t.appendChild=function(e,t){void 0===t.length&&(t=[t]);for(var a=document.createDocumentFragment(),r=0,n=t.length;r<n;r++)a.appendChild(t[r]);e.appendChild(a)},t.removeChild=function(e,t){void 0===t.length&&(t=[t]);for(var a=0,r=t.length;a<r;a++)e.removeChild(t[a])};var r=["property","name","itemprop"],n=r.concat(["itemProp"]),c=n.concat(["id"])},1037:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,a):{};r.get||r.set?Object.defineProperty(t,a,r):t[a]=e[a]}return t.default=e,t}(a(0)),n=o(a(16)),c=o(a(1001));function o(e){return e&&e.__esModule?e:{default:e}}function l(e){return(l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f,p,b,v=function(e){function t(){return i(this,t),u(this,m(t).apply(this,arguments))}var a,n,o;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,e),a=t,(n=[{key:"render",value:function(){return r.default.createElement(c.default,null,r.default.createElement("title",null,this.props.title))}}])&&s(a.prototype,n),o&&s(a,o),t}(r.Component);f=v,p="propTypes",b={title:n.default.string},p in f?Object.defineProperty(f,p,{value:b,enumerable:!0,configurable:!0,writable:!0}):f[p]=b;var E=v;t.default=E,e.exports=t.default},1046:function(e){e.exports=JSON.parse('[{"id":1,"title":"Your safety is our first priority","image":"https://i.ibb.co/KDnK1NZ/front-view-male-student-red-t-shirt-wearing-backpack-black-sterile-mask-holding-copybook-files-blue.jpg","url":"/products"},{"id":2,"subtitle":"Back to School","text":"From fun to everything","image":"https://flone.reactdemo.hasthemes.com/assets/img/slider/slider-24.jpg","url":"/products"},{"id":3,"title":"Your safety is our first priority","image":"https://i.ibb.co/FXLcwVd/stationery-art-items-copy-space-canvas.jpg","url":"/products"},{"id":4,"title":"Your safety is our first priority","subtitle":"Back to School","image":"https://i.ibb.co/nr0B02w/flat-lay-desk-calendar-with-blue-office-accessories.jpg","url":"/contact"}]')},1051:function(e,t,a){"use strict";var r=a(159),n=a(0),c=a.n(n),o=a(94),l=a(769);t.a=function(e){var t=e.backgroundColorClass,a=e.copyrightColorClass,i=e.spaceLeftClass,s=e.spaceRightClass,u=e.footerTopBackgroundColorClass,m=e.footerTopSpaceTopClass,d=e.footerTopSpaceBottomClass,f=e.footerLogo,p=Object(n.useState)(0),b=Object(r.a)(p,2),v=b[0],E=b[1],y=Object(n.useState)(0),h=Object(r.a)(y,2),g=h[0],O=h[1];Object(n.useEffect)((function(){return O(100),window.addEventListener("scroll",w),function(){window.removeEventListener("scroll",w)}}),[]);var w=function(){E(window.scrollY)};return c.a.createElement("footer",{className:"footer-area ".concat(t||""," ").concat(i||""," ").concat(s||"")},c.a.createElement("div",{className:"footer-top text-center ".concat(u||""," ").concat(m||"","  ").concat(d||"")},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"footer-logo"},c.a.createElement(o.b,{to:""},c.a.createElement("img",{alt:"",src:""+"".concat(f||"/assets/img/logo/logo.png")}))),c.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim"),c.a.createElement("div",{className:"footer-social"},c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement("a",{href:"//www.facebook.com"},c.a.createElement("i",{className:"fa fa-facebook text-primary"}))),c.a.createElement("li",null,c.a.createElement("a",{href:"//www.dribbble.com"},c.a.createElement("i",{className:"fa fa-dribbble"}))),c.a.createElement("li",null,c.a.createElement("a",{href:"//www.pinterest.com"},c.a.createElement("i",{className:"fa fa-pinterest-p"}))),c.a.createElement("li",null,c.a.createElement("a",{href:"//www.twitter.com"},c.a.createElement("i",{className:"fa fa-twitter"}))),c.a.createElement("li",null,c.a.createElement("a",{href:"//www.linkedin.com"},c.a.createElement("i",{className:"fa fa-linkedin"}))))))),c.a.createElement("div",{className:"footer-bottom text-center"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"copyright-2 ".concat(a||"")},c.a.createElement("p",null,"\xa9 2020"," ",c.a.createElement("a",{href:"//www.hasthemes.com",rel:"noopener noreferrer",target:"_blank"},"Flone"),". All Rights Reserved.")))),c.a.createElement("button",{className:"scroll-top ".concat(v>g?"show":""),onClick:function(){l.animateScroll.scrollToTop()}},c.a.createElement("i",{className:"fa fa-angle-double-up"})))}},1057:function(e,t,a){"use strict";var r=a(0),n=a.n(r),c=a(569),o=a.n(c),l=a(1046),i=a(94),s=function(e){var t=e.data,a=(e.key,e.sliderClass);return n.a.createElement("div",{className:"slider-height-4 d-flex align-items-center bg-img ".concat(a||""),style:{backgroundImage:"url(".concat(t.image,")")}},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-xl-12 col-lg-12 col-md-12 col-12"},n.a.createElement("div",{className:"slider-content-5 slider-animated-1 ".concat(3===t.id||1===t.id||4===t.id?"text-center":"text-left")},1===t.id?n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",{className:"animated font-weight-bolder"},"Your Safety is Our First Priority"),n.a.createElement("div",{className:"slider-btn-5 btn-hover text-center"},n.a.createElement(i.b,{className:"animated ",to:""+t.url},"ORDER NOW"))):3===t.id?n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",{className:"animated font-weight-bolder text-dark"},"Get Best Rates for Artist Stationery"),n.a.createElement("div",{className:"slider-btn-5 btn-hover text-center"},n.a.createElement(i.b,{className:"animated btn-ss-dark-bg",to:""+t.url},"SHOP NOW"))):4===t.id?n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",{className:"animated font-weight-bolder text-dark"},"For Office Supplies and Bulk Inquiries"),n.a.createElement("div",{className:"slider-btn-5 btn-hover text-center"},n.a.createElement(i.b,{className:"animated btn-ss-dark-bg",to:""+t.url},"SHOP NOW"))):n.a.createElement(n.a.Fragment,null,t.title&&n.a.createElement("h3",{className:"animated"},t.title),t.subtitle&&n.a.createElement("h1",{className:"animated font-weight-bolder"},t.subtitle),n.a.createElement("p",{className:"animated"},t.text),n.a.createElement("div",{className:"slider-btn-5 btn-hover"},n.a.createElement(i.b,{className:"animated",to:""+t.url},"SHOP NOW"))))))))};t.a=function(){var e={effect:"fade",loop:!0,speed:1e3,autoplay:{delay:5e3,disableOnInteraction:!1},watchSlidesVisibility:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},renderPrevButton:function(){return n.a.createElement("button",{className:"swiper-button-prev ht-swiper-button-nav"},n.a.createElement("i",{className:"pe-7s-angle-left"}))},renderNextButton:function(){return n.a.createElement("button",{className:"swiper-button-next ht-swiper-button-nav"},n.a.createElement("i",{className:"pe-7s-angle-right"}))}};return n.a.createElement("div",{className:"slider-area"},n.a.createElement("div",{className:"slider-active-2 nav-style-2"},n.a.createElement(o.a,e,l&&l.map((function(e,t){return n.a.createElement(s,{data:e,key:e.id,sliderClass:"swiper-slide"})})))))}},1249:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(767),o=a.n(c),l=a(159),i=a(94),s=a(583),u=a(584),m=a(582),d=function(){var e=Object(r.useState)(0),t=Object(l.a)(e,2),a=t[0],c=t[1],o=Object(r.useState)(0),d=Object(l.a)(o,2),f=d[0],p=d[1];Object(r.useEffect)((function(){var e=document.querySelector(".sticky-bar");return p(e.offsetTop),window.addEventListener("scroll",b),function(){window.removeEventListener("scroll",b)}}),[]);var b=function(){c(window.scrollY)};return n.a.createElement("header",{className:"header-area sticky-bar header-padding-3 header-res-padding clearfix transparent-bar ".concat(a>f?"stick":"")},n.a.createElement("div",{className:"container-fluid"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-xl-5 col-lg-6 d-none d-lg-block"},n.a.createElement(s.a,{menuWhiteClass:"menu-white"})),n.a.createElement("div",{className:"col-xl-2 col-lg-2 col-md-6 col-4"},n.a.createElement("div",{className:"logo text-center logo-hm5"},n.a.createElement(i.b,{className:"sticky-none",to:"/"},n.a.createElement("img",{alt:"",src:"assets/img/logo/logo-2.png"})),n.a.createElement(i.b,{className:"sticky-block",to:"/"},n.a.createElement("img",{alt:"",src:"assets/img/logo/logo.png"})))),n.a.createElement("div",{className:"col-xl-5 col-lg-4 col-md-6 col-8"},n.a.createElement(u.a,{iconWhiteClass:"header-right-wrap-white"}))),n.a.createElement(m.a,null)))},f=a(1051),p=function(e){var t=e.children;return n.a.createElement("div",{className:"wrapper"},n.a.createElement(d,null),t,n.a.createElement(f.a,{backgroundColorClass:"bg-black",footerTopBackgroundColorClass:"bg-black",footerTopSpaceTopClass:"pt-80",spaceBottomClass:"pb-25",footerLogo:"/assets/img/logo/logo-2.png"}))},b=a(1057),v=a(1004),E=a(49),y=a(531),h=a(161),g=a(643),O=function(e){var t=e.product,a=e.currency,c=e.addToCart,o=e.addToWishlist,s=e.addToCompare,u=e.cartItem,m=e.wishlistItem,d=e.compareItem,f=e.sliderClassName,p=e.spaceBottomClass,b=Object(r.useState)(!1),v=Object(l.a)(b,2),E=v[0],O=v[1],w=Object(h.useToasts)().addToast,N=Object(y.a)(t.price,t.discount),j=+(t.price*a.currencyRate).toFixed(2),C=+(N*a.currencyRate).toFixed(2);return n.a.createElement(r.Fragment,null,n.a.createElement("div",{className:"col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 ".concat(f||"")},n.a.createElement("div",{className:"product-wrap-3 scroll-zoom ".concat(p||"")},n.a.createElement("div",{className:"product-img"},n.a.createElement(i.b,{to:"/product/"+t.id},n.a.createElement("img",{className:"default-img",src:""+t.image[0],alt:""})),t.discount||t.new?n.a.createElement("div",{className:"product-img-badges"},t.discount?n.a.createElement("span",{className:"pink"},"-",t.discount,"%"):"",t.new?n.a.createElement("span",{className:"purple"},"New"):""):"",n.a.createElement("div",{className:"product-content-3-wrap"},n.a.createElement("div",{className:"product-content-3"},n.a.createElement("div",{className:"product-title"},n.a.createElement("h3",null,n.a.createElement(i.b,{to:"/product/"+t.id},t.name))),n.a.createElement("div",{className:"price-3"},null!==N?n.a.createElement(r.Fragment,null,n.a.createElement("span",null,a.currencySymbol+C)," ",n.a.createElement("span",{className:"old"},a.currencySymbol+j)):n.a.createElement("span",null,a.currencySymbol+j," ")),n.a.createElement("div",{className:"product-action-3"},n.a.createElement("div",{className:"pro-same-action pro-wishlist"},n.a.createElement("button",{className:void 0!==m?"active":"",disabled:void 0!==m,title:void 0!==m?"Added to wishlist":"Add to wishlist",onClick:function(){return o(t,w)}},n.a.createElement("i",{className:"fa fa-heart-o"}))),n.a.createElement("div",{className:"pro-same-action pro-cart"},t.affiliateLink?n.a.createElement("a",{href:t.affiliateLink,rel:"noopener noreferrer",target:"_blank",title:"Buy now"}," ",n.a.createElement("i",{className:"fa fa-shopping-cart"})," "):t.variation&&t.variation.length>=1?n.a.createElement(i.b,{to:"".concat("","/product/").concat(t.id),title:"Select options"},n.a.createElement("i",{class:"fa fa-cog"})):t.stock&&t.stock>0?n.a.createElement("button",{onClick:function(){return c(t,w)},className:void 0!==u&&u.quantity>0?"active":"",disabled:void 0!==u&&u.quantity>0,title:void 0!==u?"Added to cart":"Add to cart"}," ",n.a.createElement("i",{className:"fa fa-shopping-cart"})," "):n.a.createElement("button",{disabled:!0,className:"active",title:"Out of stock"},n.a.createElement("i",{className:"fa fa-shopping-cart"}))),n.a.createElement("div",{className:"pro-same-action pro-compare"},n.a.createElement("button",{className:void 0!==d?"active":"",disabled:void 0!==d,title:void 0!==d?"Added to compare":"Add to compare",onClick:function(){return s(t,w)}},n.a.createElement("i",{className:"fa fa-retweet"}))),n.a.createElement("div",{className:"pro-same-action pro-quickview"},n.a.createElement("button",{onClick:function(){return O(!0)},title:"Quick View"},n.a.createElement("i",{className:"fa fa-eye"}))))))))),n.a.createElement(g.a,{show:E,onHide:function(){return O(!1)},product:t,currency:a,discountedprice:N,finalproductprice:j,finaldiscountedprice:C,cartitem:u,wishlistitem:m,compareitem:d,addtocart:c,addtowishlist:o,addtocompare:s,addtoast:w}))},w=a(47),N=a(98),j=a(120),C=Object(E.connect)((function(e,t){return{products:Object(y.f)(e.productData.products,t.category,t.type,t.limit),currency:e.currencyData,cartItems:e.cartData,wishlistItems:e.wishlistData,compareItems:e.compareData}}),(function(e){return{addToCart:function(t,a,r,n,c){e(Object(w.i)(t,a,r,n,c))},addToWishlist:function(t,a){e(Object(N.d)(t,a))},addToCompare:function(t,a){e(Object(j.c)(t,a))}}}))((function(e){var t=e.products,a=e.currency,c=e.addToCart,o=e.addToWishlist,l=e.addToCompare,i=e.cartItems,s=e.wishlistItems,u=e.compareItems,m=e.sliderClassName,d=e.spaceBottomClass;return n.a.createElement(r.Fragment,null,t.map((function(e){return n.a.createElement(O,{sliderClassName:m,spaceBottomClass:d,product:e,currency:a,addToCart:c,addToWishlist:o,addToCompare:l,cartItem:i.filter((function(t){return t._id===e._id}))[0],wishlistItem:s.filter((function(t){return t._id===e._id}))[0],compareItem:u.filter((function(t){return t._id===e._id}))[0],key:e._id})})))})),k=function(e){var t=e.spaceTopClass,a=e.spaceBottomClass,r=e.category;return n.a.createElement("div",{className:"product-area hm5-section-padding ".concat(t||"","  ").concat(a||"")},n.a.createElement("div",{className:"container-fluid"},n.a.createElement("div",{className:"row"},n.a.createElement(C,{category:r,limit:12,spaceBottomClass:"mb-20"}))))};t.default=function(){return n.a.createElement(r.Fragment,null,n.a.createElement(o.a,null,n.a.createElement("title",null,"Flone | Fashion Home"),n.a.createElement("meta",{name:"description",content:"Fashion home of flone react minimalist eCommerce template."})),n.a.createElement(p,null,n.a.createElement(b.a,null),n.a.createElement(k,{spaceTopClass:"pt-100",spaceBottomClass:"pb-100",category:"accessories"}),n.a.createElement(v.a,{spaceBottomClass:"pb-100"})))}},580:function(e,t,a){"use strict";a.d(t,"a",(function(){return y}));var r=a(59),n=a.n(r),c=a(1),o=a(95),l=a(159),i=a(60),s=a.n(i),u=a(42),m=a.n(u),d=a(0),f=a(39),p=(a(43),a(49)),b=a(47),v=a(541),E=a(26);a(119);function y(){var e=Object(d.useState)(!1),t=Object(l.a)(e,2),a=t[0],r=t[1],i=Object(d.useState)(!1),u=Object(l.a)(i,2),y=u[0],h=u[1],g=Object(d.useState)(!1),O=Object(l.a)(g,2),w=O[0],N=O[1],j=Object(d.useState)({}),C=Object(l.a)(j,2),k=C[0],S=C[1],x=Object(d.useState)({}),T=Object(l.a)(x,2),_=T[0],P=T[1],I=Object(d.useState)(),D=Object(l.a)(I,2),F=D[0],B=D[1],A=Object(p.useDispatch)(),q=Object(d.useRef)(!1);return Object(d.useEffect)((function(){return function(){q.current=!0}}),[]),{addItemToCart:Object(d.useCallback)(function(){var e=Object(o.a)(n.a.mark((function e(t,a){var o;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return B(t._id),Object(f.unstable_batchedUpdates)((function(){r(!0),N(!1),h(!1),S({}),P({})})),o={},"productName"in t&&(o={product:t._id,quantity:a}),"comboName"in t&&(o={combo:t._id,quantity:a}),e.next=7,s.a.post("".concat(E.a,"/v2/admin/cart"),Object(c.a)({},o),{withCredentials:!0,headers:{Authorization:"Bearer ".concat(m.a.get(E.c))}}).then((function(e){if(e.data&&e.data.confirmation&&e.data.confirmation.message&&200===e.data.confirmation.statusCode){var a=Object(c.a)({id:t._id},e.data.confirmation);Object(f.unstable_batchedUpdates)((function(){r(!1),h(!0),N(!1),P(Object(c.a)({},a)),S({})}))}})).catch((function(e){if(e.toString().includes("Network Error")){var t={code:503,message:"Connection problem! try again later."};Object(f.unstable_batchedUpdates)((function(){!q.current&&r(!1),!q.current&&N(!0),!q.current&&h(!1),!q.current&&S(t),!q.current&&P({})}))}else e.response&&e.response.data&&(401===e.response.data.code&&(m.a.remove(E.c),m.a.set(E.d,!1),A(Object(v.g)()),A(Object(b.n)()),localStorage.removeItem("couponData"),Object(f.unstable_batchedUpdates)((function(){r(!1),h(!0),N(!1),P(e.response.data),S({})}))),400===e.response.data.code&&Object(f.unstable_batchedUpdates)((function(){!q.current&&r(!1),!q.current&&N(!0),!q.current&&h(!1),!q.current&&S(e.response.data),!q.current&&P({})})))}));case 7:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),[a,y,w,_,k]),payloadItemId:F,addToCartRequestPending:a,addToCartSuccess:y,addToCartFailure:w,addToCartSuccessPayload:_,addToCartFailurePayload:k}}},634:function(e,t,a){"use strict";var r=a(0),n=a.n(r);t.a=function(e){for(var t=e.ratingValue,a=[],c=0;c<5;c++)a.push(n.a.createElement("i",{className:"fa fa-star-o",key:c}));if(t&&t>0)for(var o=0;o<=t-1;o++)a[o]=n.a.createElement("i",{className:"fa fa-star-o yellow",key:o});return n.a.createElement(r.Fragment,null,a)}},643:function(e,t,a){"use strict";var r=a(59),n=a.n(r),c=a(95),o=a(159),l=a(574),i=a(578),s=a(652),u=a(42),m=a.n(u),d=a(0),f=a.n(d),p=a(43),b=a(569),v=a.n(b),E=a(9),y=a(580),h=a(531),g=a(794),O=(a(655),a(160)),w=a(26),N=(a(634),a(49)),j=a(575),C=a(649),k=a(648),S=a.n(k),x=a(647),T=a(660),_=a(661),P=a(662),I=a(651);t.a=Object(E.h)(Object(N.connect)((function(e){return{cartitems:e.cartData}}),null)((function(e){var t=e.product,a=m.a.get(w.d),r=Object(y.a)(),u=r.addItemToCart,b=r.addToCartFailurePayload,E=r.addToCartFailure,N=r.addToCartRequestPending,k=r.addToCartSuccess,D=r.addToCartSuccessPayload;Object(d.useEffect)((function(){!0===E&&!1===k&&!1===N&&Object(O.f)(D)&&Object(O.e)(b)&&p.b.error(b.message,{icon:b.message.toString().includes("Connection problem")?f.a.createElement(l.a,{size:30,color:"#FF4343"}):f.a.createElement(i.a,{size:30,color:"#FF4343"}),style:{marginBottom:"40px"}}),!1===E&&!0===k&&!1===N&&Object(O.e)(D)&&Object(O.f)(b)&&(401===D.code?(e.history.push("/login"),X(t,!1,!0,Z)):X(t,!0,!0,Z))}),[u,b,E,N,k,D]);var F=Object(d.useState)(null),B=Object(o.a)(F,2),A=B[0],q=B[1],M=Object(d.useState)(null),z=Object(o.a)(M,2),L=z[0],R=(z[1],Object(d.useState)(t.variation?t.variation[0].color:"")),H=Object(o.a)(R,2),U=H[0],W=(H[1],Object(d.useState)(t.variation?t.variation[0].size[0].name:"")),Y=Object(o.a)(W,2),V=Y[0],J=(Y[1],Object(d.useState)(t.quantity)),K=Object(o.a)(J,2),G=(K[0],K[1],Object(d.useState)(1)),Q=Object(o.a)(G,2),X=(Q[0],Q[1],e.wishlistitem,e.compareitem,e.addtocart),Z=(e.addtowishlist,e.addtocompare,e.addtoast),$=e.cartitems,ee=Object(d.useState)({}),te=Object(o.a)(ee,2),ae=te[0],re=te[1],ne=(Object(h.e)($,t,U,V),!1),ce=!1;Object(d.useEffect)((function(){null!==A&&A.controller&&null!==L&&L.controller&&(A.controller.control=L,L.controller.control=A)}),[A,L]),Object(d.useEffect)((function(){re($.filter((function(e){return e._id===t._id}))[0])}),[$]);var oe={getSwiper:q,spaceBetween:10,loopedSlides:4,pagination:{el:".swiper-pagination",clickable:!0},loop:!0};return f.a.createElement(d.Fragment,null,f.a.createElement(g.a,{show:e.show,onHide:e.onHide,className:"product-quickview-modal-wrapper"},f.a.createElement(g.a.Header,{closeButton:!0}),f.a.createElement("div",{className:"modal-body"},f.a.createElement("div",{className:"row"},f.a.createElement("div",{className:"col-md-5 col-sm-12 col-xs-12"},f.a.createElement("div",{className:"product-large-image-wrapper"},t.productImages&&t.productImages.length>1?f.a.createElement(v.a,oe,t.productImages&&t.productImages.length&&t.productImages.map((function(e,t){return f.a.createElement("div",{key:t},f.a.createElement("div",{className:"single-image"},f.a.createElement("img",{src:e.original,className:"img-fluid",alt:e.fileName})))}))):f.a.createElement("img",{src:t&&t.productImages&&t.productImages[0].original,className:"img-fluid w-100",alt:t&&t.productImages&&t.productImages[0].fileName}))),f.a.createElement("div",{className:"col-md-7 col-sm-12 col-xs-12"},f.a.createElement("div",{className:"product-details-content quickview-content"},f.a.createElement("h2",null,t.productName),parseInt(t.quantity)<=0&&f.a.createElement("div",{className:"mt-1"},f.a.createElement("span",{style:{fontSize:"12px !important",color:"red",fontWeight:"bolder",marginTop:"31px !important"}},"OUT OF STOCK")),f.a.createElement("div",{className:"product-details-price"},f.a.createElement(d.Fragment,null,f.a.createElement("span",null,new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(function(e){var t=0;return e&&e.crazyDealPrice&&new Date(e&&e.crazyDealStartDate).getTime()<=(new Date).getTime()&&new Date(e&&e.crazyDealExpiryDate).getTime()>=(new Date).getTime()?(t=e.crazyDealPrice,ce=!0):e&&e.offeredPrice&&new Date(e&&e.offerStartDate).getTime()<=(new Date).getTime()&&new Date(e&&e.offerExpiryDate).getTime()>=(new Date).getTime()?(t=e.offeredPrice,ne=!0):(t=e.price,ce=!1,ne=!1),t}(t)))," ",(ne||ce)&&f.a.createElement(f.a.Fragment,null,f.a.createElement("span",{className:"old"},new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(t.price)),f.a.createElement("span",{className:"text-discount-percentage"},"(",Object(O.c)(t),"% OFF)")))),f.a.createElement("div",null,f.a.createElement("span",{className:"font-weight-bold"},"Brand : "),f.a.createElement("span",null,t.brand&&t.brand.brandName)),f.a.createElement("div",{className:"pro-details-list"},f.a.createElement("div",{dangerouslySetInnerHTML:{__html:Object(C.a)(Object(j.convertFromRaw)(JSON.parse(S.a.decode(t.highLights))))}})),f.a.createElement("div",null,f.a.createElement("span",null,"* ",t.refundable?"Easy return is available.":"No refund or returns is availble."),f.a.createElement("br",null),f.a.createElement("span",null,"* ",t.cancelAvailable?"Order cancellation is available.":"Order cancellation is not available.")),f.a.createElement("hr",null),f.a.createElement("div",{className:"pro-details-size-color"},f.a.createElement("div",{className:"pro-details-color-wrap"},f.a.createElement("div",{className:"pro-details-color-content"},f.a.createElement(x.a,{className:"m-2 text-dark",size:20}),f.a.createElement(T.a,{className:"m-2 text-dark",size:20}),f.a.createElement(_.a,{className:"m-2 text-dark",size:20}),f.a.createElement(P.a,{className:"m-2 text-dark",size:20})))),f.a.createElement("div",{className:"pro-details-quality"},f.a.createElement("div",{className:"pro-details-cart btn-hover w-50"},t.quantity&&t.quantity>0?f.a.createElement("button",{className:"w-100 ".concat(!1===E&&!1===k&&!0===N&&Object(O.f)(D)&&Object(O.f)(b)?"cursor-na":""),onClick:Object(c.a)(n.a.mark((function r(){return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!(void 0!==ae&&ae.quantity>0)){r.next=4;break}e.history.push("/cart"),r.next=10;break;case 4:if("true"!=a&&1!=a){r.next=9;break}return r.next=7,u(t,1);case 7:r.next=10;break;case 9:X(t,!1,!0,Z);case 10:case"end":return r.stop()}}),r)})))}," ",!1===E&&!1===k&&!0===N&&Object(O.f)(D)&&Object(O.f)(b)?f.a.createElement("div",{id:"ss-sm-spinner"}):void 0!==ae&&ae.quantity>0?f.a.createElement(f.a.Fragment,null,"Go to cart ",f.a.createElement(I.a,{className:"ml-2 mb-1",size:20})):f.a.createElement(f.a.Fragment,null,f.a.createElement(s.a,{className:"mr-2 mb-1",size:20})," Add to cart")," "):f.a.createElement("button",{disabled:!0,className:"w-100"},"Out of Stock")))))))))})))},655:function(e,t,a){"use strict";var r=a(59),n=a.n(r),c=a(1),o=a(95),l=a(60),i=a.n(l),s=a(42),u=a.n(s),m=a(26),d=a(541);t.a=function(e){return function(){var t=Object(o.a)(n.a.mark((function t(a){return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(Object(d.a)()),t.next=3,i.a.post("".concat(m.a,"/v2/admin/cart"),Object(c.a)({},e),{withCredentials:!0,headers:{Authorization:"Bearer ".concat(u.a.get(m.c))}}).then((function(e){if(e.data&&e.data.confirmation&&e.data.confirmation.message&&200===e.data.confirmation.statusCode)return a(Object(d.c)(e.data.confirmation))})).catch((function(t){if(t.toString().includes("Network Error")){return a(Object(d.b)({code:503,message:"Network Error"}))}if(t.response&&t.response.data){if(401===t.response.data.code&&(u.a.remove(m.c),u.a.set(m.d,!1)),400===t.response.data.code)return a(Object(d.b)(t.response.data));if(409===t.response.data.code&&"Record already exist"===t.response.data.message){var r={code:409,message:"".concat(e.categoryName," is already exists.")};return a(Object(d.b)(r))}}}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},767:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"MetaTagsContext",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"MetaTags",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"ReactTitle",{enumerable:!0,get:function(){return c.default}}),t.default=void 0;var r=o(a(1035)),n=o(a(1001)),c=o(a(1037));function o(e){return e&&e.__esModule?e:{default:e}}var l=n.default;t.default=l},831:function(e,t,a){"use strict";var r=a(0),n=a.n(r),c=a(762),o=function(e){var t,a=e.status,r=e.message,c=e.onValidated,o=e.spaceTopClass,l=e.subscribeBtnClass;return n.a.createElement("div",{className:"subscribe-form-3 ".concat(o||"")},n.a.createElement("div",{className:"mc-form"},n.a.createElement("div",null,n.a.createElement("input",{className:"email",ref:function(e){return t=e},type:"email",placeholder:"Youe Email Addres",required:!0})),"sending"===a&&n.a.createElement("div",{style:{color:"#3498db",fontSize:"12px"}},"sending..."),"error"===a&&n.a.createElement("div",{style:{color:"#e74c3c",fontSize:"12px"},dangerouslySetInnerHTML:{__html:r}}),"success"===a&&n.a.createElement("div",{style:{color:"#2ecc71",fontSize:"12px"},dangerouslySetInnerHTML:{__html:r}}),n.a.createElement("div",{className:"clear-3 ".concat(l||"")},n.a.createElement("button",{className:"button",onClick:function(){t&&t.value.indexOf("@")>-1&&c({EMAIL:t.value}),t.value=""}},"SUBSCRIBE"))))};t.a=function(e){var t=e.mailchimpUrl,a=e.spaceTopClass,r=e.subscribeBtnClass;return n.a.createElement("div",null,n.a.createElement(c.a,{url:t,render:function(e){var t=e.subscribe,c=e.status,l=e.message;return n.a.createElement(o,{status:c,message:l,onValidated:function(e){return t(e)},spaceTopClass:a,subscribeBtnClass:r})}}))}}}]);
//# sourceMappingURL=74.1c8fcb17.chunk.js.map