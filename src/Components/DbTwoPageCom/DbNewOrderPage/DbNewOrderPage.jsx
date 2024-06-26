import React, { useEffect } from "react";
import "./dbNewOrderPage.css";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addDbNewOrder, dbRemoveOrder } from "../../../redux/slice/delBoy";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const DbNewOrderPage = ({socket, changeActiveScreenFun =() =>{}}) => {
  
  const dispatch = useDispatch()

  const order = useSelector((state) => state.dbNewOrders.orders);

  useEffect(()=>{
    socket.on("new-order-add-in-delboy", ({newOrder})=>{
      if(newOrder !== undefined){
        dispatch(addDbNewOrder(newOrder))
      }
    })
  }, [])

  const acceptOrderHendlar = async (ordId)=> {
    try {

      const {data} = await axios.get(`${BASE_URL}/api/v1//delBoy/accept/${ordId}`, {withCredentials: true})
      if(data !== undefined && data.success === true){
        console.log(data.message)
        dispatch(dbRemoveOrder())
        changeActiveScreenFun("activeOrder")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="db-new-order-page">
      <div className="d-flex flex-column align-items-center">
          {
            order !== undefined && order?.orders !== undefined ?
            <div className="new-order-div my-3 p-3">
              <div className="res-address-main">
                <div className="res-address-head text-secondary">
                  Restaurant Address
                </div>
                <div className="res-all-addresses">
                  {order?.orders?.restu !== undefined &&
                  order?.orders?.restu?.length > 0
                    ? order?.orders?.restu?.map((r) => (
                        <div className="address-icon d-flex my-2">
                          <div className="icon">
                            <FaLocationDot color="#ff6600" size={22} />
                          </div>
                          <div className="address-text mx-2">
                            {r?.resId?.resAddress}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div className="res-address-main mt-2">
                <div className="res-address-head text-secondary">
                  Customer Address
                </div>
                <div className="res-all-addresses">
                  <div className="address-icon d-flex my-2">
                    <div className="icon">
                      <FaLocationDot color="#ff6600" size={22} />
                    </div>
                    {order?.deliveryAddress !== undefined &&
                    order?.deliveryAddress?.doorFlat !== undefined &&
                    order?.deliveryAddress?.landMark !== undefined ? (
                      <div className="address-text mx-2">
                        {order?.deliveryAddress.doorFlat +
                          ", " +
                          order?.deliveryAddress.landMark}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <hr className="bg-secondary" />
              <div className="new-order-bottem">
                <div className="row align-items-center">
                  <div className="col-md-5 col-sm-5 col-12 mb-md-0 mb-sm-0 mb-2">
                    <div>
                      <span className="text-secondary">Approx:</span>
                      <span className="ms-1">5 km</span>
                    </div>
                    {
                        order?.orders !== undefined && order?.orders?.deliveryCharg !== undefined ?
                        <div>
                        <span className="text-secondary">Delivery charge:</span>
                        <span className="ms-1">{order?.orders?.deliveryCharg} ₹</span>
                      </div>
                        :null
                    }

                  </div>
                  <div className="col-md-7 col-sm-7 col-12 d-flex justify-content-center">
                    <div className="mx-2">
                      <button className="accept-order-btn new-order-btn" onClick={()=>acceptOrderHendlar(order?._id)}>
                        ACCEPT
                      </button>
                    </div>
                    <div className="mx-2">
                      {/* <button className="reject-order-btn new-order-btn">
                        REJECT
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div> : <></>
          }
      </div>
    </div>
  );
};

export default DbNewOrderPage;
