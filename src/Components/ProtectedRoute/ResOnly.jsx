import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ResLogin from "../../Pages/RESTAURANT/ResLogin/ResLogin";
import ResSideBar from "../ResSideBar/ResSideBar";
import ResHeader from "../ResHeader/ResHeader";
import "./resOnly.css";

const ResOnly = ({ isRestuAuther = undefined, isResLoading = true }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const navOpenClose = (e) => {
    setShowSideBar(!showSideBar);
  };

  const closeSideBar = (val) => {
    setShowSideBar();
  };

  if (!isResLoading && isRestuAuther && isRestuAuther !== undefined) {
    return (
      <div className="w-100 res-only">
        <div className="row" style={{ width: "100%"}}>
          <div
            id="sidbar"
            className={`col-xl-2 col-lg-2 col-md-3  col-sm-0 col-0  d-xl-block d-lg-block d-md-block d-sm-block d-block  position-fixed top-0 ${
              showSideBar
                ? "col-sm-5 col-7 sidbar-animation"
                : "sidbar-animation-helper"
            } `}
            style={{ zIndex: "10" }}
          >
            <ResSideBar closeSideBar={closeSideBar} />
          </div>
          <div
            className="col-xl-10  col-lg-10 col-md-9 col-sm-12 col-0 position-absolute end-0 top-0"
            style={{ backgroundColor: "rgb(135 117 104 / 6%)" }}
          >
            <div className="position-sticky top-0" style={{backgroundColor: "#f8f7f6", zIndex: '120'}}>
              <ResHeader navOpenClose={navOpenClose} />
            </div>
            <div className="mt-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isResLoading && !isRestuAuther && isRestuAuther !== undefined) {
    // return <Loader />
    return (
      <ResLogin isRestuAuther={isRestuAuther} isResLoading={isResLoading} />
    );
  }
};

export default ResOnly;
