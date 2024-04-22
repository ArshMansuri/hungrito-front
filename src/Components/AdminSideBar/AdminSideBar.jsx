import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CiCircleList, CiFileOn, CiWallet } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import {IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineDeliveryDining, MdMoneyOffCsred } from "react-icons/md";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { MdOutlineEditNotifications } from "react-icons/md";
import "./adminSideBar.css";

const AdminSideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState(window.location.pathname);

  useEffect(()=>{
    const pathSegments = tab.split("/")
    const mainTab = pathSegments[2] + "/" + pathSegments[3]
    if(mainTab === "res/manage"){
      setTab("/admin/res/list")
    } else if(mainTab === "db/manage"){
      setTab("/admin/db/list")
    } else if(mainTab === "res/verify"){
      setTab("/admin/new/res/list")
    } else if(mainTab === "db/verify"){
      setTab("/admin/new/db/list")
    }
  }, [tab])

  return (
    <div className="admin-sidebar-com ">
      <div
        className="d-xl-none d-lg-none d-md-none d-sm-block d-block text-end p-3"
        style={{ backgroundColor: "rgb(248, 247, 246)" }}
      >
        <IoMdClose size={22} color="#FF5B5B" />
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="app-logo d-flex align-items-center my-2">
          <div className="logo-div mx-1">
            <img src="../img/logo2.png" height="60px" width="50px" alt="" />
          </div>
          <h4 className="app-name">HUNGRITO</h4>
        </div>
        <div className="navs w-100">
          <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={"/admin/dashboard"} className="w-75" onClick={()=>setTab("/admin/dashboard")}>
              <button
                className={`${
                  tab === "/admin/dashboard" ? "nav-btn-active" : "nav-btn"
                } w-100 py-1 px-2 border-0 d-flex align-items-center`}
              >
                <span className="nav-icon">
                  <AiOutlineHome size={18} />
                </span>
                <span className="mt-1 ps-2">Dashboard</span>
              </button>
            </NavLink>
          </div>
          <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={"/admin/res/list"} className="w-75" onClick={()=>setTab("/admin/res/list")}>
              <button
                className={`${
                  tab === "/admin/res/list" ? "nav-btn-active" : "nav-btn"
                } w-100 py-1 px-2 border-0 d-flex align-items-center`}
              >
                <span className="nav-icon">
                  <CiCircleList size={18} />
                </span>
                <span className="mt-1 ps-2">Restaurant List</span>
              </button>
            </NavLink>
          </div>
          <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={"/admin/new/res/list"} className="w-75" onClick={()=>setTab("/admin/new/res/list")}>
              <button
                className={`${
                  tab === "/admin/new/res/list" ? "nav-btn-active" : "nav-btn"
                } w-100 py-1 px-2 border-0 d-flex align-items-center`}
              >
                <span className="nav-icon">
                  <IoRestaurantOutline size={18} />
                </span>
                <span className="mt-1 ps-2">New Restaurant</span>
              </button>
            </NavLink>
          </div>
          <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={"/admin/db/list"} className="w-75" onClick={()=>setTab("/admin/db/list")}>
              <button
                className={`${
                  tab === "/admin/db/list" ? "nav-btn-active" : "nav-btn"
                } w-100 py-1 px-2 border-0 d-flex align-items-center`}
              >
                <span className="nav-icon">
                  <CiCircleList size={18} />
                </span>
                <span className="mt-1 ps-2">Delivery Boy List</span>
              </button>
            </NavLink>
          </div>
          <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={'/admin/new/db/list'} className="w-75" onClick={()=> setTab('/admin/new/db/list')}>
              <button
                className={`${
                  tab === '/admin/new/db/list' ? "nav-btn-active" : "nav-btn"
                } w-100 py-1 px-2 border-0 d-flex align-items-center`}
              >
                <span className="nav-icon">
                  <MdOutlineDeliveryDining size={18} />
                </span>
                <span className="mt-1 ps-2">New Delivery Boy</span>
              </button>
            </NavLink>
          </div>
          <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={'/admin/user/list'} className="w-75" onClick={()=> setTab('/admin/user/list')}>
              <button
                className={`${
                  tab === '/admin/user/list' ? "nav-btn-active" : "nav-btn"
                } w-100 py-1 px-2 border-0 d-flex align-items-center`}
              >
                <span className="nav-icon">
                  <PiUsersThreeDuotone size={18} />
                </span>
                <span className="mt-1 ps-2">User List</span>
              </button>
            </NavLink>
          </div>
          <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={'/admin/return/payment/list'} className="w-75" onClick={()=> setTab('/admin/return/payment/list')}>
              <button
                className={`${
                  tab === '/admin/return/payment/list' ? "nav-btn-active" : "nav-btn"
                } w-100 py-1 px-2 border-0 d-flex align-items-center`}
              >
                <span className="nav-icon">
                  <MdMoneyOffCsred size={16} />
                </span>
                <span className="mt-1 ps-2">Return Payment</span>
              </button>
            </NavLink>
          </div>
          <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={'/admin/send/notification'} className="w-75" onClick={()=> setTab('/admin/send/notification')}>
              <button
                className={`${
                  tab === '/admin/send/notification' ? "nav-btn-active" : "nav-btn"
                } w-100 py-1 px-2 border-0 d-flex align-items-center`}
              >
                <span className="nav-icon">
                  <MdOutlineEditNotifications size={16} />
                </span>
                <span className="mt-1 ps-2">Send Notification</span>
              </button>
            </NavLink>
          </div>
          <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={"/res/wallet"} className="w-75">
              <button
                className={`${
                  tab === "wallet" ? "nav-btn-active" : "nav-btn"
                } w-100 py-1 px-2 border-0 d-flex align-items-center`}
              >
                <span className="nav-icon">
                  <CiWallet size={18} />
                </span>
                <span className="mt-1 ps-2">Wallet</span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
