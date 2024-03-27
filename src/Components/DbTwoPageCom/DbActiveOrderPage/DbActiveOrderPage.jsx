import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "./dbActiveOrderPage.css";
import "leaflet/dist/leaflet.css";
import iconImg2 from "./img/delivery-boy-bick-icon.png";
import L from "leaflet";
import "leaflet-routing-machine";
import icon from "leaflet/dist/images/marker-icon.png";
import { useDispatch } from "react-redux";
import { addActiveOrdUserId, removeActiveOrdUserId } from "../../../redux/slice/delBoy";
import { toast } from "react-toastify";

const tostOpstion = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
const BASE_URL = process.env.REACT_APP_BASE_URL;

const DbActiveOrderPage = ({ dbLocation, temp, changeActiveScreenFun =() =>{}, socket }) => {
  const [order, setOrder] = useState(undefined);
  const [isShowMap, setIsShowMap] = useState(false);
  const [dbLiveLocation, setDbLiveLocation] = useState(null);
  const [endLocation, setEndLocation] = useState();
  const [isPickOrDeliver, setIsPickOrDeliver] = useState("pick");

  const mapRef = useRef(null);
  const marker = useRef(null);
  const markerEndPosition = useRef(null);
  const routingControlRef = useRef(null);

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/delBoy/active/order`,
          { withCredentials: true }
        );

        if (
          data !== undefined &&
          data?.success === true &&
          data?.order !== undefined
        ) {
          setOrder(data.order);
          console.log(data.order);
          dispatch(addActiveOrdUserId(data?.order?.userId))
          let isResCompalet = true;
          for (let i = 0; i < data.order?.orders?.restu.length; i++) {
            if (data.order?.orders?.restu[i].resStatus === "pending") {
              setEndLocation({
                latitude:
                  data.order.orders.restu[i].resId?.resLatLong?.coordinates[1],
                longitude:
                  data.order.orders.restu[i].resId?.resLatLong?.coordinates[0],
              });
              isResCompalet = false;
            }
          }

          if (isResCompalet) {
            setEndLocation({
              latitude: data?.order?.deliveryAddress?.latitude,
              longitude: data?.order?.deliveryAddress?.longitude,
            });
            setIsPickOrDeliver("deliver");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  console.log(dbLiveLocation, "hmmm");

  useEffect(() => {
    if (navigator.geolocation) {
      function fetchLocation() {
        console.log("hiiii");
        navigator.geolocation.getCurrentPosition(
          async (p) => {
            const { latitude, longitude } = p?.coords;
            setDbLiveLocation({ latitude: latitude, longitude: longitude });
          },
          (err) => {
            console.log(err.message);
          }
        );
      }
      var intervalID = setInterval(fetchLocation, 2000);
    }

    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    if (
      isShowMap === true &&
      dbLiveLocation?.latitude !== undefined &&
      dbLiveLocation?.longitude !== null
    ) {
      // if (mapRef.current) {
      //   mapRef?.current?.remove();
      // }

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
      console.log(endLocation, "endlocationnnnnn");
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

    if( dbLiveLocation?.latitude !== undefined &&
      dbLiveLocation?.longitude !== null && order !== null && order !== undefined){
        socket.emit("db-live-loc-for-user", {location: dbLiveLocation, userId: order?.userId})
      }

  }, [dbLiveLocation, endLocation]);



  const pickUpHendler = async () => {
    if (order) {
      for (let i = 0; i < order?.orders?.restu.length; i++) {
        if (order?.orders?.restu[i].resStatus === "pending") {
          try {
            const { data } = await axios.post(
              `${BASE_URL}/api/v1/delBoy/active/order/update/res/status`,
              { ordId: order._id, resId: order?.orders?.restu[i].resId._id },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            console.log(data);
            if (data !== undefined && data.success === true) {
             
              async function fetchData() {
                try {
                  const { data } = await axios.get(
                    `${BASE_URL}/api/v1/delBoy/active/order`,
                    { withCredentials: true }
                  );
          
                  if (
                    data !== undefined &&
                    data?.success === true &&
                    data?.order !== undefined
                  ) {
                    setOrder(data.order);
                    let isResCompalet = true;
                    for (let i = 0; i < data.order?.orders?.restu.length; i++) {
                      if (data.order?.orders?.restu[i].resStatus === "pending") {
                        setEndLocation({
                          latitude:
                            data.order.orders.restu[i].resId?.resLatLong?.coordinates[1],
                          longitude:
                            data.order.orders.restu[i].resId?.resLatLong?.coordinates[0],
                        });
                        isResCompalet = false;
                      }
                    }
          
                    if (isResCompalet) {
                      setEndLocation({
                        latitude: data?.order?.deliveryAddress?.latitude,
                        longitude: data?.order?.deliveryAddress?.longitude,
                      });
                      setIsPickOrDeliver("deliver");
                    }
                  }
                } catch (error) {
                  console.log(error);
                }
              }
              fetchData()
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  };

  const mapHideShowHendler = () => {
    if (isShowMap) {
      if (mapRef.current) {
        mapRef?.current?.remove();
      }
      setIsShowMap(false);
    } else {
      if(dbLiveLocation?.latitude !== undefined && dbLiveLocation?.longitude !== null && endLocation.latitude !== undefined && endLocation.longitude !== null){
        setIsShowMap(true);
      }
    }
  };

  const deliverdOrderHendler = async()=>{
    try {
      const {data} = await axios(`${BASE_URL}/api/v1/delBoy/active/order/delivered/${order?._id}`, {withCredentials: true})
      if(data !== undefined && data?.success === true){
        setOrder(undefined)
        setEndLocation(undefined)
        dispatch(removeActiveOrdUserId())
        toast.success("Order Delivered Succeccfully", tostOpstion)
        changeActiveScreenFun("newOrder")
      }
    } catch (error) {
      toast.error("Somthing Went Wrong", tostOpstion)
      console.log(error)
    }
  }

  return (
    <div className="db-active-order-com">
      <div className="map-hide-show-btn d-flex justify-content-end">
        <span className="mx-2 mt-2 text-primary" onClick={mapHideShowHendler}>
          {isShowMap ? "Hide map" : "Show map"}
        </span>
      </div>
      <div className="acive-order-main">
        {isShowMap === false ? (
          <div className="d-flex justify-content-center">
            {order !== undefined ? (
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
                      <div>
                        <span className="text-secondary">Delivery charge:</span>
                        <span className="ms-1">
                          {order?.orders?.deliveryCharg} ₹
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">Token No:</span>
                        <span className="ms-1">{order?.OrderTokne}</span>
                      </div>
                      <div>
                        <span className="text-secondary">Ammount:</span>
                        <span className="ms-1">
                          {Math.floor(order?.orders?.total)}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">Payment:</span>
                        <span className="ms-1">{order?.payMode}</span>
                      </div>
                    </div>
                    <div className="col-md-7 col-sm-7 col-12 d-flex justify-content-center">
                      <div className="mx-2">
                        <button className="accept-order-btn new-order-btn">
                          CALL
                        </button>
                      </div>
                      <div className="mx-2">
                        {isPickOrDeliver === "pick" ? (
                          <button
                            className="reject-order-btn new-order-btn"
                            onClick={pickUpHendler}
                          >
                            PICK UP
                          </button>
                        ) : (
                          <button
                            className="reject-order-btn new-order-btn"
                            onClick={deliverdOrderHendler}
                          >
                            Deliverd
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default DbActiveOrderPage;
