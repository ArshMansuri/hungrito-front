import React, { useState } from "react";
import "./resSideBar.css";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CiCircleList, CiFileOn, CiWallet } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { HiOutlineUsers, HiOutlinePencilSquare } from "react-icons/hi2";
import { TbDeviceAnalytics } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";

const ResSideBar = ({closeSideBar=()=>{}}) => {

    const [tab, setTab] = useState(window.location.pathname)

  return (
    <div className="res-sidebar-com ">
      <div className="d-xl-none d-lg-none d-md-none d-sm-block d-block text-end p-3" style={{backgroundColor: 'rgb(248, 247, 246)'}}>
        <IoMdClose size={22} color="#FF5B5B" onClick={()=>closeSideBar(false)}/>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="app-logo d-flex align-items-center my-2">
          <div className="logo-div mx-1">
            <img src="../img/logo2.png" height="60px" width="50px" alt="" />
          </div>
          <h4 className="app-name">
            HUNGRITO
          </h4>
        </div>
        <div className="navs w-100">
            <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={'/res/dashboard'} className='w-75' onClick={()=>setTab('/res/dashboard')}>
                <button className={`${tab === '/res/dashboard' ? 'nav-btn-active': 'nav-btn'} w-100 py-1 px-2 border-0 d-flex align-items-center`}>
                    <span className="nav-icon">
                        <AiOutlineHome size={18} />
                    </span>
                    <span className="mt-1 ps-2">
                        Dashboard
                    </span>
                </button>
            </NavLink>
            </div>
            <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink to={'/res/order/list'} className='w-75' onClick={()=>setTab('/res/order/list')}>
                <button className={`${tab === '/res/order/list' ? 'nav-btn-active': 'nav-btn'} w-100 py-1 px-2 border-0 d-flex align-items-center`}>
                    <span className="nav-icon">
                        <CiCircleList size={18} />
                    </span>
                    <span className="mt-1 ps-2">
                        Order List
                    </span>
                </button>
            </NavLink>
            </div>
            <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink className='w-75'>
                <button className={`${tab === '/res/order/lis' ? 'nav-btn-active': 'nav-btn'} w-100 py-1 px-2 border-0 d-flex align-items-center`}>
                    <span className="nav-icon">
                        <CiFileOn size={18} />
                    </span>
                    <span className="mt-1 ps-2">
                        Order Detail
                    </span>
                </button>
            </NavLink>
            </div>
            <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink className='w-75'>
                <button className={`${tab === '/res/order/lis' ? 'nav-btn-active': 'nav-btn'} w-100 py-1 px-2 border-0 d-flex align-items-center`}>
                    <span className="nav-icon">
                        <HiOutlineUsers size={18} />
                    </span>
                    <span className="mt-1 ps-2">
                        Customer
                    </span>
                </button>
            </NavLink>
            </div>
            <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink className='w-75'>
                <button className={`${tab === '/res/order/lis' ? 'nav-btn-active': 'nav-btn'} w-100 py-1 px-2 border-0 d-flex align-items-center`}>
                    <span className="nav-icon">
                        <TbDeviceAnalytics size={18} />
                    </span>
                    <span className="mt-1 ps-2">
                    Analytics

                    </span>
                </button>
            </NavLink>
            </div>
            <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink className='w-75'>
                <button className={`${tab === '/res/order/lis' ? 'nav-btn-active': 'nav-btn'} w-100 py-1 px-2 border-0 d-flex align-items-center`}>
                    <span className="nav-icon">
                        <IoFastFoodOutline size={18} />
                    </span>
                    <span className="mt-1 ps-2">
                        Foods
                    </span>
                </button>
            </NavLink>
            </div>
            <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink className='w-75'>
                <button className={`${tab === '/res/order/lis' ? 'nav-btn-active': 'nav-btn'} w-100 py-1 px-2 border-0 d-flex align-items-center`}>
                    <span className="nav-icon">
                        <HiOutlinePencilSquare size={18} />
                    </span>
                    <span className="mt-1 ps-2">
                        Food Detail
                    </span>
                </button>
            </NavLink>
            </div>
            <div className="w-100 d-flex justify-content-center w-100 my-3">
            <NavLink className='w-75'>
                <button className={`${tab === '/res/order/lis' ? 'nav-btn-active': 'nav-btn'} w-100 py-1 px-2 border-0 d-flex align-items-center`}>
                    <span className="nav-icon">
                        <CiWallet size={18} />
                    </span>
                    <span className="mt-1 ps-2">
                        Wallat
                    </span>
                </button>
            </NavLink>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ResSideBar;
