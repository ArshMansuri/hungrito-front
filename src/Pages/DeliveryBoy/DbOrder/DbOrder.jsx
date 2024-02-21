import React, { useState } from "react";
import "./dbOrder.css";
import DbNewOrderPage from "../../../Components/DbTwoPageCom/DbNewOrderPage/DbNewOrderPage";
import DbActiveOrderPage from "../../../Components/DbTwoPageCom/DbActiveOrderPage/DbActiveOrderPage";

const DbOrder = () => {
  const [activeScree, setActiveScreen] = useState("newOrder");

  return (
    <div className="db-order-page">
      <div className="position-fixed start-0 end-0" style={{top: "50px", backgroundColor: "#f8f7f6", zIndex: "10"}}>
        <div className="top-available-header d-flex justify-content-end mt-3">
          <div className="available-text-icon d-flex align-items-center">
            <span className="me-2 availabe-text">Are you available ?</span>
            <div class="form-check form-switch d-flex align-items-center">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
        </div>
        <div className="db-order-tow-part">
          <div className="row">
            <div
              className={`col-6 py-3 d-flex justify-content-center ${
                activeScree === "newOrder" ? "active-screen" : "inactive-screen"
              }`}
              onClick={() => setActiveScreen("newOrder")}
            >
              <span>New Order</span>
            </div>
            <div
              className={`col-6 py-3 d-flex justify-content-center ${
                activeScree === "activeOrder"
                  ? "active-screen"
                  : "inactive-screen"
              }`}
              onClick={() => setActiveScreen("activeOrder")}
            >
              <span>Active Order</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{marginTop: "98px"}}>
        {activeScree === "newOrder" ? (
          <DbNewOrderPage />
        ) : (
          <DbActiveOrderPage />
        )}
      </div>
    </div>
  );
};

export default DbOrder;
