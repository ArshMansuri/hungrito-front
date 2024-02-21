import React from 'react'
import './dbHeader.css'
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline, IoArrowBack } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const DbHeader = ({
    isBack = false
}) => {
  return (
    <div className="db-header-com py-2">
        <div className="d-flex justify-content-between align-items-center">
        <div className="app-name d-flex align-items-center ms-1">
            {
                isBack &&
                <div> 
                    <IoArrowBack size={20} color="#FF5B5B" />
                </div>
            }
            <h5 className="p-0 m-0 pt-1 ms-2">HUNGRITO</h5>
        </div>
        <div className="db-header-icons d-flex align-items-center me-1">
            <NavLink to={"/"} className="icon-div p-2 mx-1 d-flex justify-content-center align-items-center">
              <IoIosNotificationsOutline size={21} color="#FF5B5B" />
            </NavLink>
            <NavLink to={"/"} className="icon-div p-2 mx-1 d-flex justify-content-center align-items-center">
              <IoSettingsOutline size={20} color="#FF5B5B" />
            </NavLink>
          </div>
        </div>
    </div>
  )
}

export default DbHeader