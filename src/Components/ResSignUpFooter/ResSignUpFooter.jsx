import React from "react";
import "./resSignUpFooter.css";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResSignUpFooter = ({ goBack = false, onClickNext = () =>{}, onClickBack= ()=>{} }) => {

  const navigator = useNavigate()

  const nextFun = () =>{
    onClickNext()
  }

  const backFun = () =>{
    onClickBack()
    navigator(-1)
  }

  return (
    <>
      <div className="res-signup-footer-com  bg-white border-top">
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-center align-items-center">
              {goBack ? (
                <button className="btn-1 mt-2 mb-2 gap-2 d-flex align-items-center justify-content-center" onClick={backFun}>
                  <FaCaretLeft size={22} />
                  <span>Go Back</span>
                </button>
              ) : (
                <></>
              )}
              <div></div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-center align-items-center">
              <button className="btn-2 mt-2 mb-2 gap-2 d-flex align-items-center justify-content-center" onClick={nextFun}>
                <span>Next</span>
                <FaCaretRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResSignUpFooter;
