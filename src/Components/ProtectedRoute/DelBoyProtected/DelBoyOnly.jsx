import React, { useEffect, useState } from "react";
import DbLogin from "../../../Pages/DeliveryBoy/DbLogin/DbLogin";
import { NavLink, Outlet } from "react-router-dom";
import DbBottemNav from "../../DbBottemNav/DbBottemNav";
import DbHeader from "../../DbHeader/DbHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import "./delBoyOnly.css";
import { IoMdClose } from "react-icons/io";

const BASE_URL = process.env.REACT_APP_BASE_URL;
let dbLocation = null;

const DelBoyOnly = ({ isDbAuther = undefined, isDbLoading = true, socket }) => {
  const active = useSelector((state) => state?.delBoy?.delBoy?.active || false);

  const [userLocation, setUserLocation] = useState(null);
  const [isDbNewOrderAvailbale, setIsDbNewOrderAvailable] = useState(false);
  // const [sound, setSound] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    let watchId;
    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
      dbLocation = { latitude, longitude };
    };

    const errorHandler = (error) => {
      // setError(error.message);
    };

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        successHandler,
        errorHandler
      );
    } else {
      // setError("Geolocation is not available.");
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    const updateLocation = async () => {
      try {
        if (
          active &&
          dbLocation !== null &&
          dbLocation?.latitude !== undefined &&
          dbLocation?.longitude !== undefined
        ) {
          const { data } = await axios.post(
            `${BASE_URL}/api/v1/delboy/update/location`,
            {
              longitude: dbLocation.longitude,
              latitude: dbLocation.latitude,
            },
            { withCredentials: true }
          );
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateLocation();
    const intervalId = setInterval(updateLocation, 120000);
    // const intervalId = setInterval(updateLocation, 1000)

    return () => clearInterval(intervalId);
  }, [active]);


useEffect(() => {
    socket.on(
      "new-order-notification-for-delboy",
      ({ isNewOrderAvailable }) => {
        setIsDbNewOrderAvailable(true);
      }
    );
    
  }, []);

  if (!isDbLoading && isDbAuther && isDbAuther !== undefined) {
    return (
      <>
        <div className="d-xl-block d-lg-block d-md-none d-sm-none d-none">
          Not Allow
        </div>
        <div className="d-xl-none d-lg-none d-md-block d-sm-block d-block">
          <div
            className="position-sticky top-0"
            style={{ backgroundColor: "white", zIndex: "120" }}
          >
            <DbHeader isBack={false} />
          </div>
          <div
            style={{
              minHeight: "95vh",
              backgroundColor: "#f8f7f6",
              overflow: "hidden",
            }}
          >
            <Outlet />
          </div>
          {isDbNewOrderAvailbale && (
            <div className="new-order-notification position-fixed start-0 end-0 bg-white mx-3 pb-2">
              <div className="text-end me-2 my-2">
                <IoMdClose
                  size={20}
                  onClick={() => setIsDbNewOrderAvailable(false)}
                />
              </div>
              <div className="d-flex justify-content-between m-2">
                <div>New Order Available</div>
                <div onClick={() => setIsDbNewOrderAvailable(false)}>
                  <NavLink to={"/db/order"} style={{ color: "#ff6600" }}>
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          )}

          <div className="food-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
            <DbBottemNav isDbAuther={isDbAuther} isDbLoading={isDbLoading} />
          </div>
        </div>
      </>
    );
  }

  if (!isDbLoading && !isDbAuther) {
    return <DbLogin />;
  }
};

export default DelBoyOnly;
