import axios from "axios";
import Cookies from "js-cookie";
import {history} from "./history.js"
// import // snackbarUtils from "../feedback/notiStackConfig.tsx";
import {apiRootUrl, ssClientAuthFlagCookieKey, setUserDataCookieKey, ssClientAuthCookieKey} from "./constants.js";

export const validateEmail = email => {
  const emailRegex = /^(([^<>()\]\\.,;:\s@“]+(\.[^<>()\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
};


export const validatePhone = phone => {
  const phoneNumber = phone.replace( /\s+/g, "" );
  if (phoneNumber.length > 9)
  {
    const phoneRegex =  /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]\d{2}-?\d{4}$/ ;
    return phoneRegex.test(phoneNumber);
  }
  else {
    return false;
  }
};

export const validatePassword = password => {
  // const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
  const passwordRegex = /^(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{7,15}$/
  return passwordRegex.test(String(password))
};


export const convertDate = (str) => {
  let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
  return [day,mnth,date.getFullYear() ].join("/");
}

export const convertDate2 = (str) => {
  let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(),mnth,day ].join("-");
}


export const isObjectEmpty = (requestedObject) => {
  if(requestedObject == undefined || !requestedObject || requestedObject == null){
    return true
  }
  else if(Object.keys(requestedObject).length === 0){
    return true
  }
  else {
    return false
  }
  // return ;
}

export const isNotEmptyObject = (requestedObject) => {
  if(requestedObject == undefined || requestedObject == '' || requestedObject == null){
    return false
  }
  else if(Object.keys(requestedObject).length === 0){
    return false
  }
  else if(Object.keys(requestedObject).length !== 0){
    return true
  }
  else {
    return false
  }
}

export const isArrayEmpty = (requestedArray) => {
  return requestedArray && requestedArray.length === 0 || requestedArray === null
}

export const isNotEmptyArray = (requestedArray) => {
  if (requestedArray && requestedArray.length !== 0 || requestedArray !== null){
    return true
  }
  else {
    return false
  }
}



export const minMax = (min,max,value) => {
  return !(value.length < min || value.length > max);
};


export const minMaxNumbers = (min,max,value) => {
  if(parseInt(value) <= min || parseInt(value) > max){
    return false
  }
  else {
    return true
  }
};


export const maxNumber = (max,value) => {
  return parseInt(value) <= max;
};


export const justStrings = (value) => {
  const justStringRegex = /^[a-zA-Z_ ]+$/;
  return justStringRegex.test(String(value));
};

export const filterObject = (requestedObject) => {
  Object.entries(requestedObject).forEach(([key, value]) => {
    if(requestedObject[key] === "" || requestedObject[key] == null || requestedObject[key] === undefined || requestedObject[key].length <= 0){
      delete requestedObject[key]
    }
  });
  return requestedObject
};

export const rename = ( ( {_id: value, categoryName: label, ...rest} ) => ( {value, label, ...rest} ) )

export const renameObjectKey = (requestedObject, nameKey) => {
  console.log("================================================================================================")
  console.log(requestedObject, "requestedObject for rename requestedObject for rename requestedObject for rename requestedObject for rename ")
  console.log("================================================================================================")
  const rename = (({_id: value, [nameKey]: label, ...rest}) => ({value, label, ...rest}))
  rename(requestedObject)
  return rename(requestedObject)
}


export const renameArrayOfBrandImages = (requestedArray) => {
  if(requestedArray.length > 0){
    const rename = (({fileName: name, original: preview, ...rest}) => ({name, preview, ...rest}))
    return requestedArray.map((requestedObject, index) => {
      return rename(requestedObject)
    })
  }
  else{
    return []
  }
}


export const restoreChangesOfArrayOfBrandImages = (requestedArray) => {
  if(requestedArray.length > 0){
    const rename = (({name: fileName, preview : original , ...rest}) => ({fileName, original, ...rest}))
    return requestedArray.map((requestedObject, index) => {
      return rename(requestedObject)
    })
  }
  else{
    return []
  }
}


// export const renameParentCategory = async (requestedObject) => {
//   await return Object.entries(requestedObject).forEach(([key, value]) => {
//     const tempObject = {}
//     tempObject["value"] = requestedObject["_id"]
//     tempObject["label"] = requestedObject["categoryName"]
//     console.log(tempObject,"tempObject tempObject tempObject tempObject tempObject tempObject tempObject tempObject ")
//     return tempObject
//   });
// }


export const matchOption = (parentCategoryOptions, parentCategory) => {
  let hasFound = false;
  for(let i = 0; i < parentCategoryOptions.length; i++) {
    if (parentCategoryOptions[i].value == parentCategory.value) {
      hasFound = true;
      break;
    }
  }
  return hasFound
  // let hasOption = false
  // parentCategoryOptions.map((parentCategoryOption, index) => {
  //   if(parentCategoryOption.value == parentCategory.value){
  //     hasOption = true
  //   }
  // })
  // return hasOption
}



export const emailAvailability = async (email) => {
  const emailAttemptResponse = await axios.post(
      `${apiRootUrl}/v1/auth/exist`,{
        email : email
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
  ).then(function (response) {
    console.log("response response",response)
    if(response){
      if (response.data.confirmation.message === "you are able to login")
      {
        return true
      }
      else {
        return false
      }
    }else {
      return false
    }
  }).catch(function (error) {
    return false;
  });
  return emailAttemptResponse
}


export const emailAvailabilityForNewUser = async (email) => {
  const registerEmailAttemptResponse = await axios.post(
      `${apiRootUrl}/v1/auth/verify-email`,{
        email : email
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      }
  ).then(function (response) {
    console.log("response response",response)
    if(response){
      if (response.data.confirmation.message === "you are able to register")
      {
        return true
      }
      else {
        return false
      }
    }else {
      return false
    }
  }).catch(function (error) {
    return false;
  });
  return registerEmailAttemptResponse
}


export const checkFieldAvailability = async (apiEndPoint,fieldValueKey,fieldValue,formType,fieldIdKey='',fieldId='') => {
  if(formType === 'create'){
    const fieldAttemptResponse = await axios.post(
        `${apiRootUrl}${apiEndPoint}`,{
          [fieldValueKey] : fieldValue
        }, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`
          },
          withCredentials: true,
        }).then(function (response) {
      console.log("response response",response)
      if(response){
        if(response.data){
          if(response.data.confirmation){
            return response.data.confirmation.statusCode === 200;
          }
        }
      }else {
        return false
      }
    }).catch(function (error) {
      if(error.response){
        if(error.response.data){
          if(error.response.data.code === 401){
            // snackbarUtils.error("Session expired. Sign In again.")
            Cookies.remove(ssClientAuthFlagCookieKey)
            Cookies.remove(setUserDataCookieKey)
            history.push('/')
          }
          if(error.response.data.code === 409){
            return false
            // // snackbarUtils.error("record already exists ")
          }
        }
      }
      // return false;
    });
    return fieldAttemptResponse
  }else {
    const fieldAttemptResponseWithId = await axios.post(
        `${apiRootUrl}${apiEndPoint}`,{
          [fieldIdKey]: fieldId,
          [fieldValueKey] : fieldValue
        }, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`
          },
          withCredentials: true,
        }).then(function (response) {
      console.log("response response",response)
      if(response){
        if(response.data){
          if(response.data.confirmation){
            return response.data.confirmation.statusCode === 200;
          }
        }
      }else {
        return false
      }
    }).catch(function (error) {
      if(error.response){
        if(error.response.data){
          if(error.response.data.code === 401){
            // snackbarUtils.error("Session expired. Sign In again.")
            Cookies.remove(ssClientAuthFlagCookieKey)
            Cookies.remove(setUserDataCookieKey)
            history.push('/')
          }
          if(error.response.data.code === 409){
            return false
            // // snackbarUtils.error("record already exists ")
          }
        }
      }
      // return false;
    });
    return fieldAttemptResponseWithId
  }
}

export const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {

    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}



// export const emailAvailability = async (email) => {
//
//     const respo = await axios.post(
//         `${apiRootUrl}/v1/auth/exist`,{
//             email : email
//         },
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json'
//             },
//         }
//     ).then(function (response) {
//         console.log("response response",response)
//         if(response){
//             // console.log(response.data.confirmation.message == "This email isn't associated with an account. Please try a different email")
//             if(response.data.confirmation.message == "you are able to login")
//             {
//                 return true
//             }
//             else {
//                 return false
//             }
//         }else {
//             return false
//         }
//     }).catch(function (error) {
//         return false;
//     });
//     return respo;
// }


// export const emailAvailability = async (email) => {
//
//
//     await setTimeout(() => {
//         console.log(email)
//         console.log("returned falsereturned falsereturned falsereturned false")
//         return false
//     }, 3000)
//
//   // await axios.post(
//   //   `${apiRootUrl}/v1/auth/exist`,{
//   //     email : trim(email)
//   //   },
//   //   {
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       Accept: 'application/json'
//   //     },
//   //   }
//   // ).then(function (response) {
//   //   console.log("response response",response)
//   //   if(response){
//   //       console.log(response.data.confirmation.message == "This email isn't associated with an account. Please try a different email")
//   //       if(response.data.confirmation.message == "This email isn't associated with an account. Please try a different email")
//   //       {
//   //           return false;
//   //           console.log("inside first false")
//   //       }
//   //       else {
//   //           console.log("inside first true false")
//   //           return false
//   //       }
//   //   }else {
//   //       console.log("inside second false")
//   //       return false
//   //   }
//   // }).catch(function (error) {
//   //   console.log("inside third false")
//   //   return false;
//   // });
// };




export const getPrice = (product) => {
  let price = 0;
  // console.log("offer condition =>",product._id, new Date(product.offerStartDate).getTime() <= new Date().getTime() )
  if (( (product && product.crazyDealPrice) && new Date(product && product.crazyDealStartDate).getTime() <= new Date().getTime()) && new Date(product && product.crazyDealExpiryDate).getTime() >= new Date().getTime())
  {
    price = product.crazyDealPrice;
  }
  else if ( (product && product.offeredPrice) && ( new Date(product && product.offerStartDate).getTime() <= new Date().getTime() ) && ( new Date(product && product.offerExpiryDate).getTime() >= new Date().getTime() ) )
  {
    price = product.offeredPrice;
  }
  else{
    price = product.price;
  }
  return parseFloat(price);
};


export const getPercentageCount = (product) => {
  if(product) {
    let offerPrice = (product && product.offeredPrice) || (product && product.crazyDealPrice)
    let originalPrice = product && product.price
    let diffrence = parseFloat(originalPrice) - parseFloat(offerPrice)
    let percentageCount = (diffrence / parseFloat(originalPrice) ) * 100
    return Math.round(percentageCount)
  }
}


export const calcTotalPrice = (data = []) => {
  let total = 0;
  data.forEach((cartItem) => {
    total += (getPrice(cartItem)) * cartItem.quantity;
  });
  return Number(total).toFixed(2);
};

