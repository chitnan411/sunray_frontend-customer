import axios from "axios";
import Cookies from "js-cookie";
import * as PropTypes from "prop-types";
import React, {useEffect, useState} from 'react'
import {toast} from "react-hot-toast";
import {withRouter} from "react-router";
import {Button, Col, Row} from "reactstrap";
import homebanner from "../../assets/images/home-bg-banner.jpg"
import {signOutRequest} from "../../redux/actions/auth/ssLoginActions.js";
import {emptyCart} from "../../redux/actions/cartActions.js";
import {emptyUserCartRequest} from "../../redux/actions/ssCartActions.js";
import {apiRootUrl, ssClientAuthCookieKey,setUserDataCookieKey, ssClientAuthFlagCookieKey} from "../../utils/constants.js";
import noOrder from "../../assets/images/noOrders.svg"
import noImage from "../../assets/images/noImg_2.jpg"
import {UserDetail} from "@styled-icons/boxicons-solid/UserDetail"
import moment from "moment"


const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function SignleItemView({orderItem,isLastIndet}) {
  const[isViewMore,setViewMore] = useState(false)
  return(
      <div className="itemView">
        <div className="item-itemStatus">
          <div className="itemStatus">
            <div className="itemDetailsContainer">
              <div className="circleBackgroundIconWithStatus">
                <img src="https://constant.myntassets.com/mymyntra/assets/img/profile-myntra-credit.png"
                     style={{width: '25px'}}/>
              </div>
              <div className="itemDetails">
                <div className="itemTitle">
                                <span className="Text-Text">
                                  {capitalize(orderItem && orderItem.status)}
                                </span>
                </div>
                <div className="dateTime">
                  {moment(orderItem && orderItem.createdAt).format('LLLL')}
                </div>
                <div className="totalorder">
                  <>
                    <span className="font-weight-bolder"> Total: </span>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    }).format( Math.round(parseFloat(orderItem && orderItem.total)) )}
                  </>
                  <br/>
                  <>
                    <span className="font-weight-bolder"> Discount: </span>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    }).format( Math.round(orderItem && orderItem.discount))}
                  </>
                  <br/>
                  <>
                    <span className="font-weight-bolder"> Shipping: </span>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    }).format( Math.round(orderItem && orderItem.shipping))}
                  </>
                  <br/>
                  <>
                    <span className="font-weight-bolder"> Payable: </span>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    }).format( Math.round(parseFloat(orderItem && orderItem.subTotal) + parseFloat(orderItem && orderItem.shipping)))}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div >
          {
            (orderItem && orderItem.products) && (orderItem && orderItem.combos)
            && [...orderItem.products, ...orderItem.combos].map((item, index) => {
              return(
                  <div className="item-itemInfoList">
                    <div className="Product-imageAndDetails">
                      { "product" in item
                          ?
                          <div className="Product-thumbnail">
                            {(item && item.product && item.product.productImages && item.product.productImages && item.product.productImages.length)
                                ?
                                <img
                                    height={80}
                                    width={80}
                                    src={item.product.productImages[0] && item.product.productImages[0].original}
                                    alt={item.product.productName} style={{width: '80px'}}
                                />
                                :
                                <img src={noImage}
                                     height={80}
                                     width={80}
                                     alt={item.product.productName} style={{width: '80px'}}
                                />
                            }
                          </div>
                          :
                          <div className="Product-thumbnail">
                            {(item && item.combo && item.combo.comboImages && item.combo.comboImages && item.combo.comboImages.length)
                                ?
                                <img
                                    height={80}
                                    width={80}
                                    src={item.combo.comboImages[0] && item.combo.comboImages[0].original}
                                    alt={item.combo.comboName} style={{width: '80px'}}
                                />
                                :
                                <img height={80}
                                     width={80}
                                     src={noImage}
                                     alt={item.combo.comboName} style={{width: '80px'}}
                                />
                            }
                          </div>
                      }

                      <div className="Product-content">
                        <b>{item && item.combo && item.combo.comboName || item && item.product && item.product.productName}</b>
                        <div style={{fontSize: 14, lineHeight: 1, color: '#282c3f', marginTop: 4}}>
                          {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                          }).format( Math.round( item && item.offeredPrice))}
                          &nbsp;
                          X {item && item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
              )
            })
          }
        </div>
        <div>
          <div>
            <h4 className="ml-1 mt-4 mb-2 text-dark">
              <UserDetail className="mr-2" size={25}/>
              Billing Details </h4>
          </div>
          <div className="ml-28">
            <Row>
              <Col sm="3" className="text-left">
                <dd>Ordered By </dd>
              </Col>
              <Col sm="9">
                <dd>{orderItem.firstName}&nbsp;{orderItem.lastName}</dd>
              </Col>
            </Row>
            <Row>
              <Col sm="3" className="text-left">
                <dd>Phone </dd>
              </Col>
              <Col sm="9">
                <dd>{orderItem.phone}</dd>
              </Col>
            </Row>
            <Row>
              <Col sm="3" className="text-left">
                <dd>Address </dd>
              </Col>
              <Col sm="9">
                <dd>
                  {orderItem.streetAddress && orderItem.streetAddress.streetName}&nbsp;
                  {orderItem.streetAddress && orderItem.streetAddress.apartment}&nbsp;
                  {orderItem && orderItem.town}&nbsp;
                  {orderItem && orderItem.state}&nbsp;
                  {orderItem && orderItem.postCode}
                </dd>
              </Col>
            </Row>
          </div>
        </div>
        { !isLastIndet &&
          <hr/>
        }
      </div>
  )
}


export function UserAccountOrders(props) {
  let {location, history} = props;
  const [orderItems,setOrderItems] = useState([])

  const AuthUser = JSON.parse(Cookies.get(setUserDataCookieKey))

  async function sendGerOrderRequest(dispatch){
    return await axios.get(`${apiRootUrl}/v2/admin/order?customerId=${AuthUser && AuthUser.id}`,{withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
        .then((response) => {
          if(response.data){
            if(response.data.confirmation){
              if(response.data.confirmation.message){
                if (response.data.confirmation.statusCode === 200) {
                  console.log(response.data.card.data,"response.data.card.data response.data.card.data response.data.card.data response.data.card.data response.data.card.dataresponse.data.card.dataresponse.data.card.data")
                  setOrderItems(response.data.card.data)
                }
              }
            }
          }
        })
        .catch( (error) => {
          if(error.toString().includes('Network Error')){
            const errorData = {code: 503, message: "Connection problem! try again later."}
          }else {
            if(error.response) {
              if (error.response.data) {
                if(error.response.data.code === 401){
                  Cookies.remove(ssClientAuthCookieKey)
                  Cookies.set(ssClientAuthFlagCookieKey, false)
                  dispatch(emptyUserCartRequest())
                  dispatch(emptyCart())
                  localStorage.removeItem("couponData")
                  dispatch(signOutRequest())

                  toast.error(`Session Expired! Try again.`,{
                    style:{
                      marginBottom: "40px"
                    }
                  })

                }
                if(error.response.data.code === 400){

                  toast.error(`Something went wrong! Please try again later.`,{
                    style:{
                      marginBottom: "40px"
                    }
                  })

                }
              }
            }
          }
        })
  }

  useEffect(() => {
    sendGerOrderRequest()
  },[])

  return (

      <div className="page-listBackground">
        { orderItems && orderItems.length > 0
            ?
            orderItems.map((orderItem, index) => {
              return(
                  <div >
                    <SignleItemView isLastIndet={orderItems.length === index + 1} orderItem={orderItem}/>
                  </div>
              )
            })
            :
            <>
              <div  className="no-order w-100 text-center">
                <img height={150} width={150} src={noOrder} />
                <h4 className="text-dark text-center font-weight-bolder">You have no orders.</h4>
                <p>This is where you manage all your orders.</p>
                <Button className="btn-ss-dark-bg" onClick={() => history.push("/products")}>Shop Now </Button>
              </div>
            </>
        }

      </div>
  )
}

UserAccountOrders.propTypes = {location: PropTypes.any}


export default withRouter(UserAccountOrders)
