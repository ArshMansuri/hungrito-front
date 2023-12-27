import React, { useState } from "react";
import "./resLogin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { BiHide, BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resLogin } from "../../../redux/actions/restaurant";
import Loader from "../../../Components/Loaders/Loader";

const ResLogin = ({ isRestuAuther, isResLoading }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const passShowHideHandler = (e) => {
    setShowPass(!showPass);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter All Filds", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    const restu = { email, password };
    dispatch(resLogin({ restu }));
  };

  return (
    <>
      {isResLoading ? (
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
                        <h2 className="text-white">Login</h2>
                      </div>
                      <form onSubmit={loginHandler} className="text-white">
                        <div className="email-controle d-flex flex-column mt-3">
                          <label htmlFor="email" className="pb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            placeholder="abcd@gmail.com"
                            className="text-secondary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="password-controle d-flex flex-column mt-3 position-relative">
                          <label htmlFor="password" className="pb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="text-secondary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div
                            className="position-absolute pass-icon end-0 bottom-0"
                            onClick={passShowHideHandler}
                          >
                            {showPass ? <BiShow /> : <BiHide />}
                          </div>
                        </div>
                        <NavLink className="forgate-pass d-flex justify-content-end">
                          <span>Forgoat Password?</span>
                        </NavLink>
                        <button type="submit" className="mt-3">
                          Sign In
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
                          <NavLink to={"/res/verify"} className="fw-bold">
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

export default ResLogin;
