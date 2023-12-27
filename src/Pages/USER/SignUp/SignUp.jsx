import React, { useCallback, useEffect, useRef, useState } from "react";
import "../Login/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";
import { BiSolidImageAdd } from "react-icons/bi";
import "./signUp.css";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/cropImage";
import UserOtp from "../../../Components/UserOtpVerify/UserOtp";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { userPhoneOtpVerify, userSignUp } from "../../../redux/actions/user";
import Loader from "../../../Components/Loaders/Loader";

const SignUp = ({ isAuther, isLoading = true }) => {
  const navigator = useNavigate();
  const inputRef = useRef();
  const dispatch = useDispatch();

  const success = useSelector((state) => state.user?.success);
  const phoneNum = useSelector((state) => state.user?.user?.phone);

  const [showPass, setShowPass] = useState(false);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(
    "https://res.cloudinary.com/dbirutg8t/image/upload/v1678454395/avatars/profilejpg3_a4zrkh.jpg"
  );
  const [isOtpModalShow, setIsOtpModalShow] = useState(false);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  function onModlaClose(value) {
    setIsOtpModalShow(value);
  }

  useEffect(() => {
    if (success === true) {
      setIsOtpModalShow(true);
    }
  }, [success]);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
    setImage(null);
  }, [croppedAreaPixels, rotation, image]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const triggerImagePopup = () => {
    inputRef.current.click();
  };

  const signupHendler = (e) => {
    e.preventDefault();
    if (username !== "" && phone !== "" && pass !== "") {
      dispatch(userSignUp({ username, phone, pass, croppedImage }));
    }
  };

  const onOtpSubmit = (otp) => {
    otp = Number.parseInt(otp);
    dispatch(userPhoneOtpVerify({ phoneNum, otp }));
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {image !== null ? (
            <>
              <div className="bg-danger">
                <Cropper
                  image={image}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <button
                onClick={showCroppedImage}
                className="btn crop-btn position-absolute text-white"
              >
                Next
              </button>
            </>
          ) : (
            <div className="login-page position-relative">
              <div className="set-bg-color d-flex align-items-center justify-content-center">
                <div className="login-center position-relative w-75">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-0 col-0">
                      <div className="container d-xl-block d-lg-block d-md-block d-sm-none d-none d-block">
                        <div className="logo position-absolute">
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
                            <h2 className="text-white">Sign Up</h2>
                          </div>
                          <form
                            action="#"
                            className="text-white"
                            onSubmit={signupHendler}
                          >
                            <div className="img-controle position-relative d-flex flex-column align-items-center mt-3">
                              <input
                                type="file"
                                className="d-none"
                                onChange={imageHandler}
                                ref={inputRef}
                              />
                              <img
                                src={croppedImage}
                                alt=""
                                width="26%"
                                className="d-inline"
                              />
                              <div
                                className="img-add-icon position-absolute"
                                onClick={triggerImagePopup}
                              >
                                <BiSolidImageAdd size={24} color="white" />
                              </div>
                            </div>

                            <div className="username-controle d-flex flex-column mt-3">
                              <label htmlFor="username" className="pb-1">
                                Name
                              </label>
                              <input
                                type="text"
                                id="username"
                                placeholder="Abcd"
                                className="text-secondary"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                            </div>
                            <div className="phone-controle d-flex flex-column mt-3">
                              <label htmlFor="phone" className="pb-1">
                                Phone
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                placeholder="0123456789"
                                className="text-secondary"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>
                            <div className="password-controle d-flex flex-column mt-3 position-relative">
                              <label htmlFor="password" className="pb-1">
                                Password
                              </label>
                              <input
                                type={`${
                                  showPass === true ? "text" : "password"
                                }`}
                                id="password"
                                placeholder="Password"
                                className="text-secondary "
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                              />
                              <div
                                className="position-absolute pass-icon end-0 bottom-0"
                                onClick={() => setShowPass(!showPass)}
                              >
                                {showPass ? <BiShow /> : <BiHide />}
                              </div>
                            </div>
                            <button type="submit" className="mt-4">
                              Sign Up
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
                              Hvae an account yet?{" "}
                              <NavLink to="/login" className="fw-bold">
                                Login for free
                              </NavLink>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {isOtpModalShow ? (
                  <div className="position-absolute w-100 user-otp-modal bottom-0">
                    <UserOtp
                      onClickClose={onModlaClose}
                      onOtpSubmit={onOtpSubmit}
                      sendOn={phone}
                      successUrl="/"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SignUp;
