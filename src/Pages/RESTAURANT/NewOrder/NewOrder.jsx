import React, { useEffect } from "react";
import "./newOrder.css";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getResNewOrders } from "../../../redux/actions/restaurant";
import axios from "axios";
import {
  addResNewOrder,
  resRemoveOrder,
} from "../../../redux/slice/restaurant";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const NewOrder = ({ socket }) => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.resNewOrders?.orders);

  useEffect(() => {
    dispatch(getResNewOrders());
  }, []);

  useEffect(() => {
    socket.on("new-order-add-in-res", ({ sendOrders }) => {
      console.log(JSON.parse(sendOrders));
      dispatch(addResNewOrder(JSON.parse(sendOrders)));
    });

    return () => {
      socket.off();
    };
  }, []);

  const resAcceptOrderHendler = async (ordId) => {
    try {
      if (ordId !== undefined) {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/restaurant/accept/${ordId}`,
          { withCredentials: true }
        );
        if (data.success === true) {
          dispatch(resRemoveOrder(ordId));
          toast.success(data?.message);
          if (data?.sendDelBoyLiveOrd) {
            socket.emit("new-order-from-restu", { ordId });
          }
        } else {
          toast.error(data?.message || "Somthing Went Wrong");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Somthing Went Wrong");
      console.log(error);
    }
  };

  const resRejectOrderHendler = async (ordId) => {
    try {
      if (ordId !== undefined) {
        const { data } = await axios.delete(
          `${BASE_URL}/api/v1/restaurant/reject/${ordId}`,
          { withCredentials: true }
        );
        if (data.success === true) {
          dispatch(resRemoveOrder(ordId));
          toast.success("Order Rejected");
        } else {
          toast.error(data?.message || "Somthing Went Wrong");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Somthing Went Wrong");
      console.log(error?.response?.data?.message || error);
    }
  };

  return (
    <div className="neworder-page mx-2">
      <h5 className="mx-2" style={{ color: "#464255", fontWeight: "400" }}>
        New Orders
      </h5>
      {orders !== undefined && orders?.length > 0 ? (
        <div className="new-orders-main d-flex flex-column justify-content-center">
          {orders.map((ord) => {
            return (
              <div className="new-order-div p-3 my-3">
                <div className="user-address-main">
                  <div className="user-address-head text-secondary">
                    Customer Address
                  </div>
                  <div className="user-address">
                    <div className="address-icon d-flex my-2">
                      <div className="icon">
                        <FaLocationDot color="#ff6600" size={22} />
                      </div>
                      {ord?.deliveryAddress?.doorFlat &&
                      ord?.deliveryAddress.landMark ? (
                        <div className="address-text mx-2 text-capitalize">
                          {ord.deliveryAddress.doorFlat +
                            ", " +
                            ord.deliveryAddress.landMark}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="user-food-detail-main">
                  <div className="user-food-detail-head text-secondary">
                    Food Details
                  </div>
                  <div className="overflow-scroll scroll-d-none">
                    <div
                      className="table-responsive mt-2"
                      style={{ width: "max-content" }}
                    >
                      <table
                        className="table table-bordered align-middle text-center table-striped table-hover"
                        id="dataTable"
                        width="100%"
                        cellSpacing="0"
                      >
                        <thead className="text-secondary">
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Weight</th>
                            <th>Qut</th>
                            <th>Sub Totel</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ord?.orders?.restu !== undefined &&
                            ord?.orders?.restu?.length > 0 &&
                            ord?.orders?.restu.map((res) => {
                              return (
                                <>
                                  {res?.foods !== undefined &&
                                  res?.foods.length > 0 ? (
                                    res.foods.map((f) => (
                                      <tr>
                                        <td>
                                          <img
                                            src={f.foodImg}
                                            alt=""
                                            style={{
                                              maxHeight: "100%",
                                              maxWidth: "100%",
                                              height: "auto",
                                              width: "auto",
                                            }}
                                          />
                                        </td>
                                        <td>{f?.foodName}</td>
                                        <td>{f?.foodPrice}</td>
                                        <td>{f?.foodId?.foodWeight}</td>
                                        <td>{f?.foodQut}</td>
                                        <td>{f?.subTotal}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <></>
                                  )}
                                  <tr>
                                    <td colSpan={3}>Totel</td>
                                    <td colSpan={3}>{res?.resSubTotal}</td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <hr className="bg-secondary" />
                <div className="new-order-bottem">
                  <div className="row align-items-center gy-2">
                    <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                      <span className="text-secondary ms-sm-2 ms-2">
                        Order By:
                      </span>
                      {ord?.userId?.username !== undefined ? (
                        <span className="ms-1 text-capitalize">
                          {ord?.userId?.username}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 d-flex justify-content-start">
                      <div className="mx-1">
                        <button
                          className="accept-order-btn new-order-btn"
                          onClick={() => resAcceptOrderHendler(ord._id)}
                        >
                          ACCEPT
                        </button>
                      </div>
                      <div className="mx-1">
                        {
                          ord.status === "new" ?
                          <button
                          className="reject-order-btn new-order-btn"
                          onClick={() => resRejectOrderHendler(ord._id)}
                          >
                          REJECT
                        </button> : <></>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h4>Not Have New Order</h4>
      )}
    </div>
  );
};

export default NewOrder;
