import React, { useState } from 'react'
import './dbHeader.css'
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline, IoArrowBack } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dbLogout } from '../../redux/actions/delBoy';

const DbHeader = ({
    isBack = false
}) => {

  const dispatch = useDispatch()

  const [showSetting, setShowSetting] = useState(false)

  const logOutHendler = async()=>{
    console.log("clickkkkk")
    dispatch(dbLogout({}))
  }
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
            <div className="icon-div p-2 mx-1 d-flex justify-content-center align-items-center">
              <IoIosNotificationsOutline size={21} color="#FF5B5B" />
            </div>
            <div className="icon-div p-2 mx-1 d-flex justify-content-center align-items-center" onClick={()=>setShowSetting(!showSetting)}>
              <IoSettingsOutline size={20} color="#FF5B5B" />
            </div>
            {
              showSetting &&
              <div className='position-absolute setting-popup mx-2'>
                  <span className="p-2 text-danger cursor-pointer" onClick={logOutHendler}>Logout</span>
              </div>
            }
          </div>
        </div>
    </div>
  )
}

export default DbHeader