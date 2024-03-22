import React, { useState } from 'react'
import './userProfile.css'
import UserHistoryOrder from '../../../Components/UserHistoryOrder/UserHistoryOrder';
import UserActiveOrder from '../../../Components/UserActiveOrder/UserActiveOrder';
import { useSelector } from 'react-redux';

const UserProfile = () => {

  const user = useSelector((state)=> state?.user?.user)


  const [activeScree, setActiveScreen] = useState("history");

  return (
    <div className='user-profile-page'>
    <div className='d-flex justify-content-center'>
        <div className="container w-50 center-div mtt-xl-2 mt-lg-2 mt-md-0 mt-sm-0 mt-0">
            <div className="profile-pic-detail-div d-flex  mt-4 align-items-center">
                <div className='profile-pic-div'>
                    <img height="70px" width="70px" src={user?.profilImg} alt="" className='rounded-circle' />
                </div>
                <div className='ms-4 profile-text'>
                    <div className="username">
                        {user?.username}
                    </div>
                    <div className="token">
                        Token <span>{user?.token}</span>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className={`col-6 py-3 d-flex justify-content-center cursor-pointer ${activeScree === 'history' ? 'active-screen' : 'inactive-screen'}`}
                  onClick={() => setActiveScreen("history")}
                >
                    History
                </div>
                <div className={`col-6 py-3 d-flex justify-content-center cursor-pointer ${activeScree === 'activeOrder' ? 'active-screen' : 'inactive-screen'}`}
                    onClick={() => setActiveScreen("activeOrder")}
                >
                    Active Order
                </div>
            </div>
            <div className='mt-3 d-flex justify-content-center'>
                {
                    activeScree === "history" ?
                    <UserHistoryOrder /> :
                    <UserActiveOrder />
                }
            </div>
        </div>
    </div>
    </div>
  )
}

export default UserProfile