import React, { useState } from "react";
import './userOtp.css'
import OTPInput from "otp-input-react";
import { IoMdClose } from "react-icons/io";

const UserOtp = ({onClickClose = ()=>{}, onOtpSubmit = ()=>{}, sendOn="", successUrl="/"}) => {

  const [otp, setOtp] = useState("");

  const setModalClose = ()=>{
    onClickClose(false)
  }

  const otpSubmitHandler = () =>{
    onOtpSubmit(otp)
  }

  return (
    <>
      <div className='user-otp-verify d-flex justify-content-center align-items-center'>
            <div className="conatiner main bg-white">
                <div className="close-icon d-flex justify-content-end pe-3" onClick={setModalClose} >
                    <IoMdClose size={24} />
                </div>
                <div className="mt-3">
                    <h3 className="text-dark text-center mt-1">Verification Code</h3>
                    <p className="text-center text-secondary mt-3">Please enter verification code send</p>
                    <p className="text-center text-secondary pt-1">to <span className="text-dark"> {sendOn} </span> </p>
                    <div className="d-flex justify-content-center mt-5">
                        <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={4} otpType="number" disabled={false} maxTime={false} />
                    </div>
                    <p className="text-center text-secondary mt-5 pe-3">Didn't receive on OTP?</p>
                    <div className="text-center mt-2 text-decoration-underline">
                        Resend OTP?
                    </div>
                    <div className="text-center mt-5">
                        <button className="otp-btn" onClick={otpSubmitHandler}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default UserOtp;
