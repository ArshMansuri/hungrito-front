import React, { useEffect, useState } from "react";
import "../../RESTAURANT/ResLogin/resLogin.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";
import Loader from "../../../Components/Loaders/Loader";
import { toast } from "react-toastify";
import axios from "axios";

const tostOpstion = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const BASE_URL = process.env.REACT_APP_BASE_URL;
const DbResetPassByLink = ({ isDbAuther, isDbLoading = true }) => {
  const navigator = useNavigate();
  const { forgotPassToken } = useParams();

  const [pass, setPass] = useState();

  useEffect(() => {
    if (!forgotPassToken) {
      return navigator("/");
    }

    async function fetchData() {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/delBoy/reset/pass/link/verify`,
          { forgotPassToken: forgotPassToken, },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        toast.error("Somthing Went Wrong");
        console.log(error);
        navigator("/")
      }
    }
    fetchData()
  }, []);

  const changePassHendler = async () => {
    if (pass !== undefined && pass.length >= 6) {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/delBoy/reset/pass/bylink`,
          { forgotPassToken: forgotPassToken, password: pass },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (data !== undefined && data.success === true) {
          toast.success(`Password Chnage Successfully`);
          navigator("/db/login");
        }
      } catch (error) {
        toast.error("Somthing Went Wrong");
        console.log(error);
      }
    } else {
      toast.error("Enter Minimum 8 Letter Password");
    }
  };

  return (
    <>
      {isDbLoading ? (
        <Loader />
      ) : (
        <div className="login-page">
          <div className="set-bg-color d-flex align-items-center justify-content-center">
            <div className="login-center w-75 position-relative">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-0 col-0">
                  <div className="container d-xl-block d-lg-block d-md-block d-sm-none d-none d-block  ">
                    <div className="logo  position-absolute">
                      <img
                        src="../img/logo2.png"
                        alt=""
                        height="70px"
                        width="60px"
                        onClick={() => navigator("/")}
                      />
                    </div>
                    <div className="login-img mt-5">
                      <img
                        src="../img/login.png"
                        className="mt-4 ms-4"
                        alt=""
                        width="100%"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-10 col-11 ">
                  <div className="d-flex flex-column justify-content-center align-items-center h-100 me-xl-4 me-lg-4 me-md-4 me-sm-0 me-0">
                    <div className="login-controls position-relative d-flex flex-column justify-content-center align-items-center">
                      <div className="text-center">
                        <div className="position-absolute start-0 ps-2 d-xl-none d-lg-none d-md-none d-sm-block d-block">
                          <IoArrowBack
                            color="white"
                            size={25}
                            onClick={() => navigator(-1)}
                          />
                        </div>
                        <h2 className="text-white">Forgot Password</h2>
                      </div>
                      <form action="#" className="text-white">
                        <div className="email-controle d-flex flex-column mt-3">
                          <label htmlFor="email" className="pb-1">
                            Password
                          </label>
                          <input
                            type="text"
                            id="email"
                            placeholder="0123456789"
                            className="text-secondary"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                          />
                        </div>
                        <NavLink
                          to={"/db/login"}
                          className="forgate-pass d-flex justify-content-end"
                        >
                          <span>Back to login</span>
                        </NavLink>
                        <button
                          type="button"
                          onClick={changePassHendler}
                          className="mt-3"
                        >
                          Chnage Password
                        </button>
                      </form>
                      <div className="w-100 d-flex flex-column align-items-center mt-3">
                        <div className="text-white other-login-text">
                          Or continue with
                        </div>
                        <div className="social-logins d-flex justify-content-center w-100 mt-3">
                          <div className="google-icon s-icon d-flex justify-content-center align-items-center">
                            <FcGoogle />
                          </div>
                          <div className="google-icon s-icon d-flex justify-content-center align-items-center">
                            <BsGithub />
                          </div>
                          <div className="google-icon s-icon d-flex justify-content-center align-items-center">
                            <SiFacebook />
                          </div>
                        </div>
                        <div className="text-white dont-have-account-text mt-3">
                          Don't hvae an account yet?{" "}
                          <NavLink to="/signup" className="fw-bold">
                            Register for free
                          </NavLink>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DbResetPassByLink;
