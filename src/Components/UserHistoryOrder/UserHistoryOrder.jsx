import React, { Fragment, useEffect, useState } from "react";
import "./userHistoryOrder.css";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const UserHistoryOrder = () => {
  const [orders, setOrders] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/user/my/order/history`,
          { withCredentials: true }
        );
        if (data !== undefined && data?.orders !== undefined) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div className="user-new-order-com overflow-hidden">
      {orders !== undefined && orders?.length > 0
        ? orders.map((order, index) => (
            <div className="new-orders-main d-flex flex-column justify-content-center" key={String(index)}>
              <div className="new-order-div p-3 my-3">
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
                          {order?.orders !== undefined &&
                          order.orders?.restu !== undefined &&
                          order.orders?.restu?.length > 0
                            ? order.orders.restu.map((r) => (
                                <Fragment key={r?.resId}>
                                  {r?.foods !== undefined && r.foods.length > 0
                                    ? r.foods.map((f, index) => (
                                        <tr key={f?.foodId?._id || String(index)}>
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
                                    : null}
                                </Fragment>
                              ))
                            : null}
                          <tr>
                            <td colSpan={3}>Totel</td>
                            <td colSpan={3}>{order?.orders?.total}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      Status:
                      <span className="ms-1">
                        {order?.status === "new" ? (
                          <span> Not Accepted </span>
                        ) : order?.status === "res accept" ? (
                          <span> Accepted </span>
                        ) : (
                          order?.status
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default UserHistoryOrder;
