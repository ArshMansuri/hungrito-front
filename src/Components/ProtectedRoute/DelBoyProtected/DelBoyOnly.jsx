import React, { useEffect, useState } from "react";
import DbLogin from "../../../Pages/DeliveryBoy/DbLogin/DbLogin";
import { Outlet } from "react-router-dom";
import DbBottemNav from "../../DbBottemNav/DbBottemNav";
import DbHeader from "../../DbHeader/DbHeader";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL
let dbLocation = null

const DelBoyOnly = ({ isDbAuther = undefined, isDbLoading = true }) => {

  const active = useSelector((state)=> state?.delBoy?.delBoy?.active || false)

  const [userLocation, setUserLocation] = useState(null);
  // const [error, setError] = useState(null);

  console.log(userLocation)
  useEffect(() => {
    let watchId;
    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
      dbLocation = { latitude, longitude }
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

  useEffect(()=>{
    const updateLocation = async() =>{
      console.log(active, dbLocation)
      try {
        if(active && dbLocation !== null && dbLocation?.latitude !== undefined && dbLocation?.longitude !== undefined){
          const {data} = await axios.post(`${BASE_URL}/api/v1/delboy/update/location`, {
            longitude: dbLocation.longitude,
            latitude: dbLocation.latitude
          }, {withCredentials: true})
          console.log(data)
        }
      } catch (error) {
       console.log(error) 
      }
    }
    updateLocation()
    const intervalId = setInterval(updateLocation, 120000)
    // const intervalId = setInterval(updateLocation, 1000)

    return () => clearInterval(intervalId)
  }, [active])

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
