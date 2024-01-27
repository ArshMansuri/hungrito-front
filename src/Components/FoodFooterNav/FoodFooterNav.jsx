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
import { useSelector } from "react-redux";

const FoodFooterNav = ({
  isAuther,
  isLoading = true,
  isGifImgShow = false,
}) => {
  const [tab, setTab] = useState(window.location.pathname);
  const profileImg = useSelector((state)=> state.user?.user?.profilImg || "https://res.cloudinary.com/dbirutg8t/image/upload/v1705764347/hungriTo/userAvatar/m0ozb0onaxl2lca6vcri.jpg")
  
  return (
    <div
      className="food-footer-com d-flex align-items-center justify-content-around"
      style={{ height: "66px" }}
    >
      <NavLink
        to={"/food"}
        className="d-flex flex-column justify-content-center align-items-center"
        onClick={() => setTab("/food")}
      >
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
      <NavLink
        className="d-flex flex-column justify-content-center align-items-center"
        onClick={() => setTab("/search")}
      >
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
          <NavLink
            className="d-flex flex-column justify-content-center align-items-end"
            onClick={() => setTab("/save")}
          >
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
          <NavLink
            to={"/my/cart"}
            className="d-flex flex-column justify-content-center align-items-center"
            onClick={() => setTab("/my/cart")}
          >
            <div
              className={`position-absolute top-0 ${
                isGifImgShow ? "d-block" : "d-none"
              }`}
            >
              <img src="../../img/add-card.gif" width={"30px"} alt="abc" />
            </div>
            <div className="foot-nav-icon">
              {tab === "/my/cart" ? (
                <IoCartSharp color="#ff6600" size={28} />
              ) : (
                <IoCartOutline color="black" size={28} />
              )}
            </div>
            <div
              className="foot-nav-text"
              style={{
                color: `${tab === "/my/cart" ? "#ff6600" : "black"}`,
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
        onClick={() => setTab("/profile")}
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

export default FoodFooterNav;
