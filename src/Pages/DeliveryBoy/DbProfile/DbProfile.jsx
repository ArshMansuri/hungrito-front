import React from "react";
import "./dbProfile.css";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loaders/Loader";

const DbProfile = ({ isDbLoading = true }) => {
  const profileImg = useSelector(
    (state) =>
      state?.delBoy?.delBoy?.dbImage?.publicUrl ||
      "https://res.cloudinary.com/dbirutg8t/image/upload/v1705764347/hungriTo/userAvatar/m0ozb0onaxl2lca6vcri.jpg"
  );

  const dbName = useSelector((state) => state?.delBoy?.delBoy?.dbName || "");

  return (
    <div className="db-profile-page">
      {isDbLoading ? (
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
            <div className="username text-capitalize">{dbName}</div>
            <div className="token">
              Money <span>{1000}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DbProfile;
