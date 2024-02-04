import React, { useEffect, useState } from 'react'
import Loader from '../../../../Components/Loaders/Loader'
import { useNavigate, NavLink } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";
import UserOtp from '../../../../Components/UserOtpVerify/UserOtp';
import { useDispatch, useSelector } from 'react-redux';
import '../../../RESTAURANT/ResLogin/resLogin.css'

const DbFirstVerify = ({isDbLoading=false}) => {
    const navigator = useNavigate()
    const dispatch = useDispatch()
  
    const [email, setEmail] = useState("")
    const [isOtpModalShow, setIsOtpModalShow] = useState(false)
  
    // useEffect(()=>{
    //   if(success === true){
    //     setIsOtpModalShow(true)
    //   }
    // }, [success])
  
    // useEffect(()=>{
    //   if(isEmailVerify === true){
    //     navigator(`/res/signup/${resEmail}`)
    //   }
    // }, [isEmailVerify, resEmail, navigator])
  
    function onModlaClose(value){
      setIsOtpModalShow(value)
    }
  
    const onSendOtp = () =>{
      if(email !== ""){
        // dispatch(restuSignUpVerify({email}))
      }
    }
  
    const onOtpSubmit = (otp) =>{
      otp = Number.parseInt(otp)
    //   dispatch(resEmailVerify({otp}))
    }
  return (
    <>
    {
      isDbLoading ? <Loader /> :
      <div className="login-page">
        <div className="set-bg-color d-flex align-items-center justify-content-center">
          <div className="login-center w-75 position-relative">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-0 col-0">
                <div className="container d-xl-block d-lg-block d-md-block d-sm-none d-none d-block  ">
                  <div className="logo  position-absolute">
                    <img src="../img/logo2.png"  alt="" height="70px" width="60px" onClick={()=>navigator("/")}/>
                  </div>
                  <div className="login-img mt-5">
                    <img src="../img/login.png" className='mt-4 ms-4' alt="" width="100%" />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-10 col-11 ">
                <div className="d-flex flex-column justify-content-center align-items-center h-100 me-xl-4 me-lg-4 me-md-4 me-sm-0 me-0">
                  <div className="login-controls position-relative d-flex flex-column justify-content-center align-items-center">
                  <div className="text-center">
                      <div className="position-absolute start-0 ps-2 d-xl-none d-lg-none d-md-none d-sm-block d-block">
                        <IoArrowBack color="white" size={25} onClick={()=>navigator(-1)} />
                      </div>
                      <h2 className="text-white">Sign Up</h2>
                    </div>
                    <form action="#" className='text-white'>
                      <div className="email-controle d-flex flex-column mt-3">
                        <label htmlFor="email" className='pb-1'>Email</label>
                        <input type="email" id='email' placeholder='abcd@gmail.com' className='text-secondary' value={email} onChange={(e)=>setEmail(e.target.value)} />
                      </div>
                      <button type="button" className='mt-3' onClick={onSendOtp}>
                        Send OTP
                      </button>
                    </form>
                    <div className='w-100 d-flex flex-column align-items-center mt-3'>
                        <div className='text-white other-login-text'>Or continue with</div>
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
                        <div className="text-white dont-have-account-text mt-3">hvae an account yet? <NavLink to="/db/login" className='fw-bold'>Login</NavLink> </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
              isOtpModalShow ? 
              <div className="position-absolute w-100 user-otp-modal bottom-0">
                <UserOtp onClickClose={onModlaClose} onOtpSubmit={onOtpSubmit} sendOn={email} />
              </div> : <></>
          }
        </div>
      </div>
    }
    </>
  )
}

export default DbFirstVerify