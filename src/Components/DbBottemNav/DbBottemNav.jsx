import React, { useState } from "react";
import "./dbBottemNav.css";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { IoIosList, IoIosListBox } from "react-icons/io";
import { MdOutlineDeliveryDining, MdDeliveryDining } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DbBottemNav = ({}) => {
  const navigate = useNavigate();

  const [tab, setTab] = useState(window.location.pathname);

  const profileImg = useSelector(
    (state) =>
      state?.delBoy?.delBoy?.dbImage?.publicUrl ||
      "https://res.cloudinary.com/dbirutg8t/image/upload/v1705764347/hungriTo/userAvatar/m0ozb0onaxl2lca6vcri.jpg"
  );

  const onClickProfile = () => {
    setTab("/db/profile");
    return navigate("/db/profile");
  };
  return (
    <div
      className="food-footer-com db-footer-nave-com d-flex align-items-center justify-content-around"
      style={{ height: "66px" }}
    >
      <NavLink
        to={"/db/dashboard"}
        className="d-flex flex-column justify-content-center align-items-center"
        onClick={() => setTab("/db/dashboard")}
      >
        <div className="foot-nav-icon">
          {tab === "/db/dashboard" ? (
            <AiFillHome color="#ff6600" size={28} />
          ) : (
            <AiOutlineHome color="black" size={28} />
          )}
        </div>
        <div
          className="foot-nav-text"
          style={{
            color: `${tab === "/db/dashboard" ? "#ff6600" : "black"}`,
            fontSize: "13px",
          }}
        >
          Home
        </div>
      </NavLink>
      <NavLink
        to={"/db/order"}
        className="d-flex flex-column justify-content-center align-items-center"
        onClick={() => setTab("/db/order")}
      >
        <div className="foot-nav-icon">
          {tab === "/db/order" ? (
            <MdDeliveryDining color="#ff6600" size={32} />
          ) : (
            <MdOutlineDeliveryDining color="black" size={32} />
          )}
        </div>
        <div
          className="foot-nav-text"
          style={{
            color: `${tab === "/db/order" ? "#ff6600" : "black"}`,
            fontSize: "13px",
          }}
        >
          Order
        </div>
      </NavLink>
      <div
        className="d-flex flex-column justify-content-center align-items-center img-nave"
        style={{ width: "38px", paddingBottom: "3px" }}
        onClick={onClickProfile}
      >
        <div
          className="foot-nav-icon img-div rounded-circle d-flex justify-content-center align-items-center"
          style={{
            border: `${
              tab === "/db/profile" ? "1px solid #ff6600" : "1px solid black"
            }`,
            padding: "2px"
          }}
        >
          <img
            src={profileImg}
            width="100%"
            alt=""
            srcSet=""
            className="rounded-circle"
          />
        </div>
        <div
          className="foot-nav-text"
          style={{
            color: `${tab === "/db/profile" ? "#ff6600" : "black"}`,
            fontSize: "13px",
          }}
        >
          Profile
        </div>
      </div>
    </div>
  );
};

export default DbBottemNav;
