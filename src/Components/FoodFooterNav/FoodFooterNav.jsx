import React, { useState } from "react";
import "./foodFooterNave.css";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import {
  IoCartOutline,
  IoCartSharp,
  IoBagHandle,
  IoBagHandleOutline,
} from "react-icons/io5";

const FoodFooterNav = ({ isAuther, isLoading = true }) => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div
      className="food-footer-com d-flex align-items-center justify-content-around"
      style={{ height: "66px" }}
    >
      <NavLink to={'/food'} className="d-flex flex-column justify-content-center align-items-center" onClick={()=>setTab("/food")}>
        <div className="foot-nav-icon">
          {tab === "/food" ? (
            <AiFillHome color="#ff6600" size={28} />
          ) : (
            <AiOutlineHome color="black" size={28} />
          )}
        </div>
        <div
          className="foot-nav-text"
          style={{
            color: `${tab === "/food" ? "#ff6600" : "black"}`,
            fontSize: "13px",
          }}
        >
          Home
        </div>
      </NavLink>
      <NavLink className="d-flex flex-column justify-content-center align-items-center" onClick={()=>setTab("/search")}>
        <div className="foot-nav-icon">
          {tab === "/search" ? (
            <BiSearch color="#ff6600" size={28} />
          ) : (
            <BiSearch color="black" size={28} />
          )}
        </div>
        <div
          className="foot-nav-text"
          style={{
            color: `${tab === "/search" ? "#ff6600" : "black"}`,
            fontSize: "13px",
          }}
        >
          Search
        </div>
      </NavLink>
      {isAuther === true ? (
        <>
          <NavLink className="d-flex flex-column justify-content-center align-items-end" onClick={()=>setTab("/save")}>
            <div className="foot-nav-icon">
              {tab === "/save" ? (
                <IoBagHandle color="#ff6600" size={28} />
              ) : (
                <IoBagHandleOutline color="black" size={28} />
              )}
            </div>
            <div
              className="foot-nav-text"
              style={{
                color: `${tab === "/save" ? "#ff6600" : "black"}`,
                fontSize: "13px",
              }}
            >
              Save
            </div>
          </NavLink>
          <NavLink className="d-flex flex-column justify-content-center align-items-center" onClick={()=>setTab("/cart")}>
            <div className="foot-nav-icon">
              {tab === "/cart" ? (
                <IoCartSharp color="#ff6600" size={28} />
              ) : (
                <IoCartOutline color="black" size={28} />
              )}
            </div>
            <div
              className="foot-nav-text"
              style={{
                color: `${tab === "/cart" ? "#ff6600" : "black"}`,
                fontSize: "13px",
              }}
            >
              Cart
            </div>
          </NavLink>
        </>
      ) : (
        <></>
      )}

      <div
        className="d-flex flex-column justify-content-center align-items-center img-nave"
        style={{ width: "38px", paddingBottom: "3px" }}
        onClick={()=>setTab("/profile")}
      >
        <div className="foot-nav-icon img-div w-75">
          <img
            src="https://res.cloudinary.com/dbirutg8t/image/upload/v1678454395/avatars/profilejpg3_a4zrkh.jpg"
            width="100%"
            alt=""
            srcSet=""
            className="rounded-circle p-1"
            style={{ border: `${tab === '/profile' ?"1px solid #ff6600" :"1px solid black"}` }}
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

export default FoodFooterNav;
