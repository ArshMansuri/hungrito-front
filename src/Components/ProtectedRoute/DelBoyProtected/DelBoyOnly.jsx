import React from "react";
import DbLogin from "../../../Pages/DeliveryBoy/DbLogin/DbLogin";
import { Outlet } from "react-router-dom";
import DbBottemNav from "../../DbBottemNav/DbBottemNav";
import DbHeader from "../../DbHeader/DbHeader";

const DelBoyOnly = ({ isDbAuther = undefined, isDbLoading = true }) => {
  if (!isDbLoading && isDbAuther && isDbAuther !== undefined) {
    return (
      <>
        <div className="d-xl-block d-lg-block d-md-none d-sm-none d-none">
          Not Allow
        </div>
        <div className="d-xl-none d-lg-none d-md-block d-sm-block d-block">
          <div
            className="position-sticky top-0"
            style={{backgroundColor: 'white', zIndex: "120" }}
          >
            <DbHeader isBack={false} />
          </div>
          <div style={{ minHeight: "95vh", backgroundColor: "#f8f7f6", overflow: 'hidden' }}>
            <Outlet />
          </div>
          <div className="food-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
            <DbBottemNav isDbAuther={isDbAuther} isDbLoading={isDbLoading} />
          </div>
        </div>
      </>
    );
  }

  if (!isDbLoading && !isDbAuther) {
    return <DbLogin />;
  }
};

export default DelBoyOnly;
