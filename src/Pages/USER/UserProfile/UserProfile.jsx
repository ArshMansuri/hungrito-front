import React, { useState } from 'react'
import './userProfile.css'
import UserHistoryOrder from '../../../Components/UserHistoryOrder/UserHistoryOrder';
import UserActiveOrder from '../../../Components/UserActiveOrder/UserActiveOrder';
import { useDispatch, useSelector } from 'react-redux';
import FoodFooterNav from '../../../Components/FoodFooterNav/FoodFooterNav';
import { IoSettingsOutline } from "react-icons/io5";
import { userLogout } from '../../../redux/actions/user';

const UserProfile = ({socket, isAuther, isLoading=true}) => {

  const dispatch = useDispatch()

  const user = useSelector((state)=> state?.user?.user)

  const [activeScree, setActiveScreen] = useState("history");
  const [showSetting, setShowSetting] = useState(false)

  const logOutHendler = async()=>{
    dispatch(userLogout({}))
  }

  return (
    <div className='user-profile-page'>
    <div className='d-flex justify-content-center'>
        <div className="container w-50 center-div mtt-xl-2 mt-lg-2 mt-md-0 mt-sm-0 mt-0">
            <div className=" d-flex justify-content-between mt-4">
                <div className='profile-pic-detail-div d-flex align-content-center'>
                <div className='profile-pic-div'>
                    <img height="70px" width="70px" src={user?.profilImg} alt="" className='rounded-circle' />
                </div>
                <div className='ms-4 mt-1 profile-text'>
                    <div className="username ps-2">
                        {user?.username}
                    </div>
                    <div className="token ps-2">
                        Token <span>{user?.token}</span>
                    </div>
                </div>
                </div>
                <div className='cursor-pointer position-relative' onClick={()=>setShowSetting(!showSetting)}> 
                    <IoSettingsOutline color='#ff6600' size={22} /> 
                    {
                showSetting &&
                <div className="position-absolute setting-popup">
                  <span className="p-2 text-white cursor-pointer" onClick={logOutHendler}>Logout</span>
                </div>
              }
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
                    <UserActiveOrder socket={socket} />
                }
            </div>
        </div>
    </div>
    <div className="food-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
        <FoodFooterNav isAuther={isAuther} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default UserProfile