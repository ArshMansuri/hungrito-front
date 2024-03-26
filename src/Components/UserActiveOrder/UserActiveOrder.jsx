import React, { Fragment, useEffect, useRef, useState } from "react";
import "./userActiveOrder.css";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import icon from "leaflet/dist/images/marker-icon.png";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const UserActiveOrder = ({socket}) => {
  const [order, setOrder] = useState(undefined);
  const [isShowMap, setIsShowMap] = useState(false);
  const [dbLiveLocation, setDbLiveLocation] = useState();
  const [endLocation, setEndLocation] = useState();

  const mapRef = useRef(null);
  const marker = useRef(null);
  const markerEndPosition = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/user/my/order/active`,
          { withCredentials: true }
        );

        if (
          data !== undefined &&
          data?.success === true &&
          data?.order !== undefined
        ) {
          console.log(data.order);
          setOrder(data.order);
          setEndLocation({
            latitude: data?.order?.deliveryAddress?.latitude,
            longitude: data?.order?.deliveryAddress?.longitude,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("db-live-location", ({location})=>{
      setDbLiveLocation({ latitude: location?.latitude, longitude: location?.longitude });
    })
  }, []);


  useEffect(() => {
    if (
      isShowMap === true &&
      dbLiveLocation?.latitude !== undefined &&
      dbLiveLocation?.longitude !== null &&
      endLocation.latitude !== undefined &&
      endLocation.longitude !== null &&
      !mapRef.current
    ) {

      mapRef.current = L.map("map").setView(
        [dbLiveLocation.latitude, dbLiveLocation.longitude],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      if (routingControlRef.current) {
        routingControlRef?.current?.remove();
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(dbLiveLocation.latitude, dbLiveLocation.longitude),
          L.latLng(endLocation.latitude, endLocation.longitude),
        ],
        lineOptions: {
          styles: [{ color: "#007bff", weight: 5 }],
        },
        show: false,
        createMarker: function (i, wp) {
          return L.marker(wp.latLng, {
            icon: L.icon({ iconUrl: icon }),
          });
        },
        showAlternatives: false,
      }).addTo(mapRef.current);

      if (marker.current) {
        marker?.current?.remove();
      }

      if (markerEndPosition.current) {
        markerEndPosition?.current?.remove();
      }

      marker.current = L.marker(
        [dbLiveLocation.latitude, dbLiveLocation.longitude],
        { icon: L.icon({ iconUrl: icon }) }
      ).addTo(mapRef.current);
      markerEndPosition.current = L.marker(
        [endLocation.latitude, endLocation.longitude],
        { icon: L.icon({ iconUrl: icon }) }
      ).addTo(mapRef.current);
    }

  }, [isShowMap]);

  useEffect(() => {
    if (
      isShowMap === true &&
      dbLiveLocation?.latitude !== undefined &&
      dbLiveLocation?.longitude !== null 
    ) {
      if (routingControlRef.current) {
        routingControlRef?.current?.remove();
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(dbLiveLocation.latitude, dbLiveLocation.longitude),
          L.latLng(endLocation.latitude, endLocation.longitude),
        ],
        lineOptions: {
          styles: [{ color: "#007bff", weight: 5 }],
        },
        show: false,
        createMarker: function (i, wp) {
          return L.marker(wp.latLng, {
            icon: L.icon({ iconUrl: icon }),
          });
        },
        showAlternatives: false,
      }).addTo(mapRef.current);
    }
  }, [dbLiveLocation]);

  const cancelOrderHendelr = async()=>{
    if(order?.status !== "new") return
    try {
      const {data} = await axios.delete(`${BASE_URL}/api/v1/user/order/cancel/${order?._id}`, {withCredentials: true})
      console.log(data)
      if(data !== undefined && data?.success === true){
        console.log(data?.message)
        setOrder(undefined)
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error)
    }
  }

  return (
    <div className="user-new-order-com overflow-hidden w-100">
      {order !== undefined && order !== null ? (
        <>
          {isShowMap === false ? (
            <div className="new-orders-main d-flex flex-column justify-content-center">
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
                                        <tr
                                          key={f?.foodId?._id || String(index)}
                                        >
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
                  </div>

                  <div className="d-flex justify-content-around align-items-center">
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
                    <div>
                      {
                        order.status === "new" ?
                      <button
                        className="accept-order-btn new-order-btn mx-1 bg-danger"
                        onClick={cancelOrderHendelr}
                      >
                        Cancel Order
                      </button> : <></>
                      }
                      <button
                        className="accept-order-btn new-order-btn mx-1"
                        onClick={() => setIsShowMap(true)}
                      >
                        Show Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="hide-map-text d-flex justify-content-end">
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setIsShowMap(false)}
                >
                  Hide map
                </span>
              </div>
              <div>
                <div className="db-map-div">
                  {dbLiveLocation?.latitude !== undefined && (
                    <div
                      id="map"
                      className="map-for-hide-instruction"
                      style={{ height: "400px" }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default UserActiveOrder;
