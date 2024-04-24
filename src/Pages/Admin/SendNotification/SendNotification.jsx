import React, { useState } from 'react'
import './sendNotification.css'
import axios from "axios"
import { toast } from "react-toastify";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

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

const SendNotification = () => {

  const [tital, setTital] = useState()
  const [body, setBody] = useState()

  const sendNotificationHendler = async()=>{
    try {
      if(tital && body){
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/admin/send/user/notification`,
          { tital, body },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if(data !== undefined && data.success === true){
          toast.success("Notification Send Successfully");
        }
      } else {
        toast.error("Enter All Detail");
      }
    } catch (error) {
      toast.error("Somthing Went Wrong");
      console.log(error)
    }
  }

  return (
    <div className='admin-send-user-notification-page'>
      <div className='d-flex justify-content-center'>
      <div className="notification-preview">
        <div className="priview-top d-flex justify-content-between text-white">
          <div className="left d-flex align-items-center">
            <div className="img-div">
              <img src="../../img/chrome.png" alt="" width={"20px"}  />
            </div>
            <div className="chrom-name ms-2">
              Google Chrome
            </div>
          </div>
          <div className="right d-flex align-content-center">
            <div className='me-3'>
              <HiOutlineDotsHorizontal size={18} />
            </div>
            <div>
              <IoMdClose size={18} />
            </div>
          </div>
        </div>
        <div className="notification-body text-white mt-3">
          <div className="tital">
            {
              tital ? tital : "Notification Tital"
            }
          </div>
          <div className="body">
            {
              body ? body : "Notification Body"
            }
          </div>
        </div>
        <div className="web-app-name text-white mt-2 fw-light">
          hungrito-food.web.app
        </div>
      </div>
      </div>
      <div className='input-group d-flex flex-column align-items-center mt-3'>
        <div className="tital-input-div">
          <input type="text" placeholder='Enter Notification Tital' onChange={(e)=>setTital(e.target.value)} />
        </div>
        <div className="tital-input-div mt-2">
          <textarea rows={3} placeholder='Enter Notification Body' onChange={(e)=>setBody(e.target.value)} />
        </div>
        <div>
        <button onClick={sendNotificationHendler}>Send Notification</button>
        </div>
      </div>
    </div>
  )
}

export default SendNotification