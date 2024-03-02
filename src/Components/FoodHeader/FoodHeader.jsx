import React, { useEffect, useState } from "react";
import "./foodHeader.css";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidUpArrow, BiSolidDownArrow, BiSearch } from "react-icons/bi";
import axios from "axios";
import { MdGpsFixed } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoCartOutline, IoBagHandle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const MAP_API = "Hah9iiWdUd7fEtqmHB2sgS64Io0qoSmW";

const FoodHeader = ({
  isAuther,
  isLoading = true,
  setFun = () => {},
  isGifImgShow = false,
}) => {
  const [locatioShow, setLoactionShow] = useState(false);
  const [locInput, setLocInput] = useState("");
  const [citys, setCitys] = useState([]);
  const [tab, setTab] = useState(window.location.pathname);

  useEffect(() => {
    let city = localStorage.getItem("city");
    if (city) {
      city = JSON.parse(city);
      setLocInput(city.address);
    }
  }, []);

  // {/* =============== Suggest Location in popup =============== */}
  const userLaoctionHendler = async (e) => {
    try {
      setLocInput(e.target.value);
      if (e.target.value.trim().length > 2) {
        const url = `https://api.tomtom.com/search/2/search/${e.target.value.trim()}.json?key=${MAP_API}&countrySet=IN&limit=5`;
        const data = await axios.get(url);
        setCitys([]);
        let temCitys = [];
        for (let i = 0; i < data?.data?.results?.length; i++) {
          const newCity = {
            address: data?.data?.results[i]?.address?.freeformAddress || "",
            subText:
              data?.data?.results[i]?.address?.countrySubdivisionName +
              " " +
              data?.data?.results[i]?.address?.country,
            lat: data?.data?.results[i]?.position?.lat || 0,
            lan: data?.data?.results[i]?.position?.lon || 0,
          };
          temCitys.push(newCity);
        }
        setCitys(temCitys);
      }
    } catch (error) {
      console.log(error);
      setLoactionShow(false);
    }
  };

  const onSetLocation = async (e) => {
    let index = e.currentTarget.id;
    setLocInput(citys[index].address || "");
    setLoactionShow(false);
    if (citys[index].lat !== 0 && citys[index].lan !== undefined)
      localStorage.setItem("city", JSON.stringify(citys[index]));
    setFun(citys[index]);
  };

  return (
    <header className="bg-white food-header-com">
      <div className="row w-100">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
          <div className="d-flex align-items-center sm-width">
            <div className="logo ms-xl-5 ms-lg-5 ms-md-5 ms-sm-1 ms-1">
              <img
                src="../../img/logo2.png"
                alt=""
                height="80px"
                width="70px"
                className="ms-3"
              />
            </div>
            <div className="address position-relative bg-white w-50  ms-xl-5 ms-lg-5 ms-md-5 ms-sm-1 ms-1">
              <div className="d-flex align-items-center">
                <FaLocationDot
                  className="location-icon"
                  color="#ff6600"
                  size={22}
                />
                <input
                  type="text"
                  placeholder="Ahmedabad"
                  className="location-input ms-1 bg-transparent"
                  onFocus={() => setLoactionShow(true)}
                  value={locInput}
                  onChange={userLaoctionHendler}
                />
                <div className="location-up-down d-flex justify-content-end">
                  {locatioShow ? (
                    <div>
                      <BiSolidUpArrow
                        size={20}
                        onClick={() => setLoactionShow(false)}
                      />
                    </div>
                  ) : (
                    <div>
                      <BiSolidDownArrow
                        size={20}
                        onClick={() => setLoactionShow(true)}
                      />
                    </div>
                  )}
                </div>

                {/* =============== Location Pop Up =============== */}
                {locatioShow ? (
                  <div className="w-100 position-absolute start-0 bg-white shadow-lg location-popup">
                    <div className="gps-location d-flex align-items-start ms-2 mt-2">
                      <MdGpsFixed className="mt-1" color="#ff6600" />
                      <div className="ms-2">
                        <div className="gps-direct-text">
                          Detect cuurent loaction
                        </div>
                        <div className="text-secondary using-gps-text">
                          Using GPS
                        </div>
                      </div>
                    </div>
                    <hr className="bg-secondary" />
                    <div>
                      {citys.length > 0 && citys !== undefined ? (
                        citys.map((c, index) => {
                          return (
                            <div
                              key={String(index)}
                              id={index}
                              className="position-relative cursor-pointer"
                              onClick={onSetLocation}
                            >
                              <div className="ms-4">
                                <div>{c.address}</div>
                                <div>{c.subText}</div>
                              </div>
                              <hr className="bg-secondary" />
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-0 col-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
          <div className="h-100">
            {isAuther === true ? (
              <div className="h-100">
                <div className="d-flex align-items-center justify-content-end h-100 me-xl-5 me-lg-5 me-md-1 m-0 for-log-user">
                  <div className="mx-xl-4 mx-lg-4 mx-md-3 mx-4">
                    <NavLink
                      to={"/search"}
                      className="text-dark d-flex align-items-center"
                    >
                      <BiSearch size={20} className="mt-1" />
                      <span className="ms-1 mt-1">Search</span>
                    </NavLink>
                  </div>
                  <div className="mx-xl-4 mx-lg-4 mx-md-3 mx-4">
                    <NavLink
                      to={"/save"}
                      className="text-dark d-flex align-items-center"
                      onClick={()=>setTab('/save')}
                    >
                      <IoBagHandle
                       size={20}
                       color={`${tab === "/save" ? "#ff6600" : "black"}`}
                       />
                      <span className="ms-1 mt-1"  style={{
                          color: `${tab === "/save" ? "#ff6600" : "black"}`,
                        }}>Save</span>
                    </NavLink>
                  </div>
                  <div className="mx-xl-4 mx-lg-4 mx-md-3 mx-4 mt-1">
                    <div
                      className={`position-absolute top-0 ${
                        isGifImgShow ? "d-block" : "d-none"
                      }`}
                    >
                      <img
                        src="../../img/add-card.gif"
                        width={"30px"}
                        alt="abc"
                      />
                    </div>
                    <NavLink
                      to={"/my/cart"}
                      className="text-dark d-flex align-items-center"
                      onClick={()=>setTab('/my/cart')}
                    >
                      <IoCartOutline
                        size={20}
                        color={`${tab === "/my/cart" ? "#ff6600" : "black"}`}
                      />
                      <span
                        className="ms-1 mt-1"
                        style={{
                          color: `${tab === "/my/cart" ? "#ff6600" : "black"}`,
                        }}
                      >
                        {" "}
                        Cart{" "}
                      </span>
                    </NavLink>
                  </div>
                  <div className="mx-xl-4 mx-lg-4 mx-md-3 mx-4 mt-1">
                    <NavLink
                      to={"/save"}
                      className="text-dark d-flex align-items-center"
                    >
                      <CgProfile size={20} />
                      <span className="ms-1 mt-1">Profile</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="h-100">
                  <div className="d-flex align-items-center justify-content-end for-not-log-user h-100">
                    <div className="mx-xl-4 mx-lg-4 mx-md-3 mx-4">
                      <NavLink
                        to={"/search"}
                        className="text-dark d-flex align-items-center"
                      >
                        <BiSearch size={20} className="mt-1" />
                        <span className="ms-1 mt-1">Search</span>
                      </NavLink>
                    </div>
                    <NavLink to="/login" className="mx-2">
                      <button>Login</button>
                    </NavLink>
                    <NavLink to="/signup" className="mx-2">
                      <button>Sign up</button>
                    </NavLink>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default FoodHeader;
