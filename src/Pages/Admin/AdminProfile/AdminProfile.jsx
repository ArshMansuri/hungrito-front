import React from "react";
import "./adminProfile.css";
import { useSelector } from "react-redux";
import Skeleton from "../../../Components/Loaders/Skeleton";

const AdminProfile = () => {
  const adminName = useSelector((state) => state?.admin?.admin?.username || "");
  const adminMoney = useSelector(
    (state) => state?.admin?.admin?.money || false
  );

  return (
    <div className="admin-profile-page">
      {adminMoney === undefined && adminName === undefined ? (
        <Skeleton />
      ) : (
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="img-div">
              <img
                src="https://res.cloudinary.com/dbirutg8t/image/upload/v1705764347/hungriTo/userAvatar/m0ozb0onaxl2lca6vcri.jpg"
                width="130px"
                className="rounded-circle"
                alt=""
              />
            </div>
            <div className="ms-4 profile-text">
              <div className="username my-1">{adminName}</div>
              {adminMoney && (
                <div className="token my-1">
                  Money:<span> {adminMoney}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
