// get products
import {shuffleArray} from "../utils/commonUtils.js";

export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        product => product.category.filter(single => single === category)[0]
      )
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter(single => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
      single => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};




export const getSSProducts = (products, category, type, limit) => {
  const finalProducts = category
      ? products.filter(
          product => product.category.filter(single => single === category)[0]
      )
      : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter(single => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
        .sort((a, b) => {
          return b.saleCount - a.saleCount;
        })
        .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
        single => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};


// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {

  let productInCart = cartItems.filter(
    single =>
      single._id === product._id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];




  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        single =>
          single._id === product._id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter(single => product._id === single._id)[0].quantity;
    }
  } else {
    return 0;
  }


};


export const ssGetRelatedItems = (products, combos, type) => {
  let relatedProductsArray = shuffleArray(products)
  let relatedCombosArray = shuffleArray(combos)
  if(type === "products") {
    return relatedProductsArray
  }
  if(type === "combos") {
    return relatedCombosArray
  }
}


//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  console.log("product state ==> sortType",sortType)
  console.log("product state ==> sortValue",sortValue)
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      if(!sortValue || sortValue === undefined ){
        console.log("product state ==> categoryProductsAll",products)
        return products
      }
      else {
        console.log("product state ==> categoryProductsFiltered From Function",products.filter(product => product.parentCategory._id == sortValue))
        return products.filter(product => product.parentCategory._id == sortValue)
      }
    }

    if (sortType === "brand") {
      if(!sortValue || sortValue === undefined ){
        console.log("product state ==> brandProductsAll",products)
        return products
      }
      else {
        console.log("product state ==> brandProductsFiltered From Function",products.filter(product => product.brand._id == sortValue))
        return  products.filter(product => product.brand._id == sortValue)
      }
    }

    if (sortType === "search") {

      console.log(sortValue, sortType, "sortValue, sortType sortValue, sortType sortValue, sortType ")

      if(!sortValue || sortType === "" || sortValue === undefined ){
        return products
      }
      else {

        return products.filter(product => {
          let startsWithCondition = product.productName.toLowerCase().startsWith(sortValue.toLowerCase())
          let includesCondition = product.productName.toLowerCase().includes(sortValue.toLowerCase())

          if (startsWithCondition) {
            return startsWithCondition
          } else if (!startsWithCondition && includesCondition) {
            return includesCondition
          } else return null
        })
      }
    }

    if (sortType === "tag") {
      return products.filter(
        product => product.tag.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(single => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(
            single => single.size.filter(single => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};




//get products based on category
export const getSortedCombos = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      if(!sortValue || sortValue === undefined ){
        return products
      }
      else {
        return  products.filter(product => product.comboCategory._id == sortValue)
      }
    }

    if (sortType === "search") {

      console.log(sortValue, sortType, "sortValue, sortType sortValue, sortType sortValue, sortType ")

      if(!sortValue || sortType === "" || sortValue === undefined ){
        return products
      }
      else {

        return products.filter(product => {
          let startsWithCondition = product.comboName.toLowerCase().startsWith(sortValue.toLowerCase())
          let includesCondition = product.comboName.toLowerCase().includes(sortValue.toLowerCase())

          if (startsWithCondition) {
            return startsWithCondition
          } else if (!startsWithCondition && includesCondition) {
            return includesCondition
          } else return null
        })
      }
    }

    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};






// get individual element
const getIndividualItemArray = array => {
  let individualItemArray = array.filter(function(v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = products => {
  let productCategories = [];
  products &&
    products.map(product => {
      return (
        product.category &&
        product.category.map(single => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = products => {
  let productTags = [];
  products &&
    products.map(product => {
      return (
        product.tag &&
        product.tag.map(single => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = products => {
  let productColors = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return productColors.push(single.color);
        })
      );
    });
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = products => {
  let productSizes = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return single.size.map(single => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = product => {
  let productSizes = [];
  product.variation &&
    product.variation.map(singleVariation => {
      return (
        singleVariation.size &&
        singleVariation.size.map(singleSize => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = e => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
