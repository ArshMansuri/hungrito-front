import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminLogin from "../../../Pages/Admin/AdminLogin/AdminLogin";
import AdminHeader from "../../AdminHeader/AdminHeader";
import './adminOnly.css'
import Loader from "../../Loaders/Loader";
import AdminSideBar from "../../AdminSideBar/AdminSideBar";

const AdminOnly = ({ isAdminAuther = undefined, isAdminLoading = true }) => {

    const [showSideBar, setShowSideBar] = useState(false);

    const navOpenClose = (e) => {
      setShowSideBar(!showSideBar);
    };
  
    const closeSideBar = (val) => {
      setShowSideBar(val);
    };

    if(isAdminLoading){
        return <Loader />
    }

  if (!isAdminLoading && isAdminAuther) {
    return (
      <div className="w-100 admin-only">
        <div className="row" style={{ width: "100%" }}>
          <div
            id="sidbar"
            className={`col-xl-2 col-lg-2 col-md-3  col-sm-0 col-0  d-xl-block d-lg-block d-md-block d-sm-block d-block  position-fixed top-0 ${
              showSideBar
                ? "col-sm-5 col-7 sidbar-animation"
                : "sidbar-animation-helper"
            } `}
            style={{ zIndex: "10" }}
          >
            <AdminSideBar closeSideBar={closeSideBar} />
          </div>
          <div
            className="col-xl-10  col-lg-10 col-md-9 col-sm-12 col-0 position-absolute end-0 top-0"
            style={{ backgroundColor: "rgb(135 117 104 / 6%)" }}
          >
            <div
              className="position-sticky top-0"
              style={{ backgroundColor: "#f8f7f6", zIndex: "120" }}
            >
              <AdminHeader navOpenClose={navOpenClose} />
            </div>
            <div className="mt-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdminLoading && !isAdminAuther) {
    return <AdminLogin />;
  }
};

export default AdminOnly;
