import React, { useEffect, useState } from "react";
import "./home.css";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { MdGpsFixed } from "react-icons/md";
import axios from "axios";
import Loader from "../../../Components/Loaders/Loader";
import { IoMdClose } from "react-icons/io";

const Home = ({ isAuther, isLoading = true }) => {
  const [locatioShow, setLoactionShow] = useState(false);
  const [locInput, setLocInput] = useState("");
  const [citys, setCitys] = useState([]);
  const [mobileNavShow, setMobileNavShow] = useState(false);

  const MAP_API = process.env.REACT_APP_TOM_TOM_API_KEY;
 

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

  // {/* =============== user click on location div from location popup =============== */}
  const onSetLocation = async (e) => {
    let index = e.currentTarget.id;
    setLocInput(citys[index].address || "");
    setLoactionShow(false);
    if (citys[index].lat !== 0 && citys[index].lan !== undefined)
      localStorage.setItem("city", JSON.stringify(citys[index]));
  };

  const onClickCurrentLocation = async()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (p) => {
          const { latitude, longitude } = p?.coords;
          try {
            const apiUrl = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${MAP_API}`;
            const res = await axios.get(apiUrl);
            const data = res.data;
            if (data && data.addresses && data.addresses.length > 0) {
              const address = data.addresses[0].address;
              const city = {
                address: address?.freeformAddress || "",
                subText:
                  address?.countrySubdivisionName + " " + address?.country,
                lat: latitude,
                lan: longitude,
              };
              localStorage.setItem("city", JSON.stringify(city));
              setLocInput(city?.address)
            } else {
              console.error("No address information found.");
            }
          } catch (error) {
            console.log(error);
            console.error(
              "Error fetching data from TomTom API:",
              error.message
            );
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
  }


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div
            style={{ backgroundImage: 'url("../img/landing-back3.jpg")' }}
            className="home-page"
          >
            <div className="home-content">
              {/* =============== home navbar ================= */}
              <nav className="">
                <div className="row">
                  <div className="left-nav-home col-3">
                    <img
                      src="../img/logo2.png"
                      alt=""
                      height="80px"
                      width="70px"
                      className="ms-3"
                    />
                  </div>
                  <div className="right-nav-home col-xl-8 col-lg-8 col-sm-9 col-9">
                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex d-none justify-content-end align-items-center pe-xl-5 pe-lg-5 pe-md-5 pe-sm-2 pe-0 h-100">
                      <NavLink to="/db/login"> Delivery Boyy </NavLink>
                      <NavLink to="/res/login"> Restaurant </NavLink>
                      {isAuther ? (
                        <></>
                      ) : (
                        <>
                          <NavLink to="/login"> Login </NavLink>
                          <NavLink to="/signup"> Sign Up </NavLink>
                        </>
                      )}
                    </div>

                    <div className="d-xl-none d-lg-none d-md-none d-sm-none d-flex justify-content-end align-items-center h-100 me-3">
                      <RxHamburgerMenu
                        color="#ff6600"
                        size={30}
                        onClick={() => setMobileNavShow(true)}
                      />
                    </div>
                    {/* =============== Mobile Nav Slider ================= */}
                    <div
                      className={`position-fixed h-100 top-0 mobile-nav ${
                        mobileNavShow ? "mobile-nav-transition" : ""
                      }`}
                    >
                      <div className="mobile-nav-close text-end m-2">
                        <IoMdClose
                          size={35}
                          color="white"
                          onClick={() => setMobileNavShow(false)}
                        />
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        {!isAuther && (
                          <>
                            <div className="mobile-nav-link-div my-2">
                              <NavLink to="/login"> Login </NavLink>
                            </div>
                            <div className="mobile-nav-link-div my-2">
                              <NavLink to="/signup"> Sign Up </NavLink>
                            </div>
                          </>
                        )}
                        <div className="mobile-nav-link-div my-2">
                          <NavLink to="/res/login">Restaurant</NavLink>
                        </div>
                        <div className="mobile-nav-link-div my-2">
                          <NavLink to="/db/login"> Delivery Boy </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>

              {/* =============== home mian-content */}
              <div className="container-fluid w-100">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center left-home">
                      <h2 className="text-white">
                        Savor Every Bite, Anywhere!
                      </h2>
                      <p className="landing-text mt-3 text-center w-75">
                        Indulge in a symphony of flavors, effortlessly brought
                        to your door. Explore, order, and savor – your culinary
                        journey starts here.
                      </p>
                      <div className="w-50 bg-white mt-3 p-1 location-box d-flex align-items-center position-relative">
                        <FaLocationDot
                          className="location-icon"
                          color="#ff6600"
                          size={22}
                        />
                        <input
                          type="text"
                          placeholder="Ahmedabad"
                          className="location-input ms-1 "
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
                          <div className="w-100 position-absolute bg-white location-popup">
                            <div className="gps-location d-flex align-items-start ms-2 mt-2" onClick={onClickCurrentLocation}>
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
                      <div className="mt-4">
                        <NavLink to="/food" className="">
                          <button className="ms-2 me-2 mb-3">Order Now</button>
                        </NavLink>
                        <NavLink to={`${isAuther ? "/my/cart" : "/login"}`} className="">
                          <button className="ms-2 ms-2 se-btn">
                            Goto Cart
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-0 col-0">
                    <div className="landing-img d-xl-flex d-lg-flex d-md-flex d-sm-none d-none d-flex justify-content-end">
                      <img
                        src="../img/landing.png"
                        alt=""
                        srcSet=""
                        height="560px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =============== Service Cart =============== */}
          <div className="container-fluid p-0 mt-4 home-second d-flex flex-column align-items-center position-relative">
            <h3 className="text-center text-dark fw-bold">Watch It Works</h3>
            <div className="main row w-75 mt-4">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center">
                <div className="bg-white service-cart d-flex flex-column align-items-center ">
                  <img
                    src="../img/first-service.png"
                    alt=""
                    srcSet=""
                    height="200px"
                  />
                  <div className="d-flex flex-column align-items-center mt-4">
                    <h6 className="text-dark"> Chooses Your Meal </h6>
                    <span className="text-secondary service-second-text mt-3">
                      20+ menus to chose from
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center">
                <div className="bg-white service-cart d-flex flex-column align-items-center mt-5">
                  <img
                    src="../img/second-service.png"
                    alt=""
                    srcSet=""
                    height="160px"
                  />
                  <div className="d-flex flex-column align-items-center mt-5">
                    <h6 className="text-dark"> We Deliver it To You </h6>
                    <span className="text-secondary service-second-text mt-3">
                      Chooses your location for delivery
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center ">
                <div className="bg-white service-cart d-flex flex-column  align-items-center mt-xl-0 mt-lg-0 mt-md-0 mt-sm-5 mt-5">
                  <img
                    src="../img/third-service.png"
                    alt=""
                    srcSet=""
                    height="160px"
                  />
                  <div className="d-flex flex-column align-items-center mt-5">
                    <h6 className="text-dark"> Coock & Enjoy </h6>
                    <span className="text-secondary service-second-text mt-3">
                      Eat your freshly cooked meal
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <dir className="w-100 position-absolute curv-svg">
              <svg
                className="w-100 position-relative"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#f6f6f6"
                  fillOpacity="1"
                  d="M0,64L120,101.3C240,139,480,213,720,213.3C960,213,1200,139,1320,101.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                ></path>
              </svg>
            </dir>
            <div className="mb-5 curv-bg position-absolute"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
