import React from 'react'
import Loader from '../../../Components/Loaders/Loader'
import { useSelector } from 'react-redux'
import './resProfile.css'

const ResProfile = ({isAuther, isResLoading=true}) => {

    const profileImg = useSelector(
        (state) =>
          state?.restu?.restu?.resFoodImage?.publicUrl ||
          "https://res.cloudinary.com/dbirutg8t/image/upload/v1705764347/hungriTo/userAvatar/m0ozb0onaxl2lca6vcri.jpg"
      );
    const resName = useSelector((state)=> state?.restu?.restu?.resName || "")
    const resMoney = useSelector((state)=> state?.restu?.restu?.money || 0)

  return (
    <div className="res-profile-page">
    {isResLoading ? (
      <Loader />
    ) : (
      <div className="profile-pic-detail-div d-flex  m-2 align-items-center">
        <div className="profile-pic-div">
          <img
            height="70px"
            width="70px"
            src={profileImg}
            alt=""
            className="rounded-circle"
          />
        </div>
        <div className="ms-4 profile-text">
          <div className="username text-capitalize">{resName}</div>
          <div className="token">
            Money <span>{Number(resMoney).toFixed(0)}</span>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default ResProfile