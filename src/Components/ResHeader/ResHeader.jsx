import React, { useState } from "react";
import "./resHeader.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { resLogout } from "../../redux/actions/restaurant";

const ResHeader = ({ navOpenClose = () => {} }) => {

  const dispatch = useDispatch()

  const resName = useSelector((state)=> state?.restu?.restu?.resName || "")
  const resOwnerName = useSelector((state)=> state?.restu?.restu?.resOwnerName || "")

  const [showSetting, setShowSetting] = useState(false)

  const OnClickHamBurger = () => {
    navOpenClose();
  };

  const logOutHendler = async()=>{
    dispatch(resLogout({}))
  }
  return (
    <div className="res-header-com py-2">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div
            className="ham-burger-icon d-xl-none d-lg-none d-md-none d-sm-block d-block mx-1"
            onClick={OnClickHamBurger}
          >
            <RxHamburgerMenu size={22} color="#000" />
          </div>
          <h5 className="res-name p-0 m-0 pt-1 ms-2 text-capitalize">{resName}</h5>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <div className="res-header-icons d-flex align-items-center me-3">
            <div className="icon-div p-2 mx-1 d-flex justify-content-center align-items-center">
              <IoIosNotificationsOutline size={21} color="#FF5B5B" />
            </div>
            <div className="icon-div cursor-pointer position-relative p-2 mx-1 d-flex justify-content-center align-items-center" onClick={()=>setShowSetting(!showSetting)}>
              <IoSettingsOutline size={20} color="#FF5B5B" />
              {
                showSetting &&
                <div className="position-absolute setting-popup">
                  <span className="p-2 text-danger cursor-pointer" onClick={logOutHendler}>Logout</span>
                </div>
              }
            </div>
          </div>
          <div
            className="res-profile-div align-items-center justify-content-end"
            style={{ display: "contents" }}
          >
            <span className="me-2 border-start ps-2 border-1 border-secondary text-capitalize">
            {resOwnerName}
            </span>
            <NavLink to={'/res/profile'} style={{ display: "contents" }}>
              <img
                src="https://res.cloudinary.com/dbirutg8t/image/upload/v1703695278/avatars/nngtjttismr9mlly0uvk.jpg"
                alt=""
                width="34px"
                className="rounded-circle"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResHeader;
