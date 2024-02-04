import React from "react";
import './resSignUpHeader.css'

const ResSignUpHeader = ({text="business"}) => {
  return (
    <header className="res-signup-header border-bottom">
      <div className="d-flex align-items-center">
        <figure className="logo ms-3">
          <img
            src="../../../img/logo2.png"
            className="ms-3"
            width="70px"
            height="80px"
            alt="abc"
          />
          <figcaption>
            {/* <h2 className='ms-2'>HUNGRITO</h2> */}
            {/* <h5 className='ms-2 text-dark pt-1'>for business</h5> */}
          </figcaption>
        </figure>
        <div className="text-center w-100">
          <h4 className="text-dark">HungriTo for {text}</h4>
        </div>
      </div>
    </header>
  );
};

export default ResSignUpHeader;
