import React, { useState } from "react";
import "./resWallet.css";
import ResReceiveMoney from "../../../Components/ResWalletTwoScreen/ResReceiveMoney/ResReceiveMoney";
import SendMoney from "../../../Components/ResWalletTwoScreen/SendMoney/SendMoney";

const ResWallet = () => {
  const [activeScree, setActiveScreen] = useState("receive");

  return (
    <div className="res-wallet-page">
      <div className="db-order-tow-part">
        <div className="row">
          <div
            className={`col-6 py-3 d-flex justify-content-center ${
              activeScree === "receive" ? "active-screen" : "inactive-screen"
            }`}
            onClick={() => setActiveScreen("receive")}
          >
            <span className="cursor-pointer">Receive</span>
          </div>
          <div
            className={`col-6 py-3 d-flex justify-content-center ${
              activeScree === "send"
                ? "active-screen"
                : "inactive-screen"
            }`}
            onClick={() => setActiveScreen("send")}
          >
            <span className="cursor-pointer">Send</span>
          </div>
        </div>
      </div>

      <div style={{marginTop: "40px"}}>
        {activeScree === "receive" ? (
          <ResReceiveMoney />
        ) : (
          <SendMoney />
        )}
      </div>
    </div>
  );
};

export default ResWallet;
