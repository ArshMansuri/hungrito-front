import React, { useState } from "react";
import "./dbBottemNav.css";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { IoIosList, IoIosListBox } from "react-icons/io";
import { MdOutlineDeliveryDining, MdDeliveryDining } from "react-icons/md";

const DbBottemNav = () => {
    const [tab, setTab] = useState(window.location.pathname);
    const profileImg = "https://res.cloudinary.com/dbirutg8t/image/upload/v1705764347/hungriTo/userAvatar/m0ozb0onaxl2lca6vcri.jpg"

  return (
    <div
      className="food-footer-com d-flex align-items-center justify-content-around"
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
        onClick={() => setTab("/db/profile")}
      >
        <div className="foot-nav-icon img-div w-75">
          <img
            src={profileImg}
            width="100%"
            alt=""
            srcSet=""
            className="rounded-circle"
            style={{
              border: `${
                tab === "/profile" ? "1px solid #ff6600" : "1px solid black"
              }`,
              padding: "2px"
            }}
          />
        </div>
        <div
          className="foot-nav-text"
          style={{
            color: `${tab === "/profile" ? "#ff6600" : "black"}`,
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
