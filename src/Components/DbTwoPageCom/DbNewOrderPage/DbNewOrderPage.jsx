import React from "react";
import "./dbNewOrderPage.css";
import { FaLocationDot } from "react-icons/fa6";

const DbNewOrderPage = () => {
  return (
    <div className="db-new-order-page">
      <div className="d-flex flex-column align-items-center">
        <div className="new-order-div my-3 p-3">
            <div className="res-address-main">
                <div className="res-address-head text-secondary">
                    Restaurant Address
                </div>
                <div className="res-all-addresses">
                    <div className="address-icon d-flex my-2">
                        <div className="icon">
                            <FaLocationDot color="#ff6600" size={22}/>
                        </div>
                        <div className="address-text mx-2">
                            Adarsh Super Market, Bhakti nagar road, Adajn, Surat
                        </div>
                    </div>
                    <div className="address-icon d-flex my-1">
                        <div className="icon">
                            <FaLocationDot color="#ff6600" size={22}/>
                        </div>
                        <div className="address-text mx-2">
                            Adhar Super Market, Abc nagar road, Adajn, Surat
                        </div>
                    </div>
                </div>
            </div>
            <div className="res-address-main mt-2">
                <div className="res-address-head text-secondary">
                    Customer Address
                </div>
                <div className="res-all-addresses">
                    <div className="address-icon d-flex my-2">
                        <div className="icon">
                            <FaLocationDot color="#ff6600" size={22}/>
                        </div>
                        <div className="address-text mx-2">
                            A-58, Valam nagar Soc.., varchh a, Surat
                        </div>
                    </div>
                </div>
            </div>
            <hr className="bg-secondary" />
            <div className="new-order-bottem">
                <div className="row align-items-center">
                    <div className="col-5">
                        <span className="text-secondary">Approx:</span>
                        <span className="ms-1">5 km</span>
                    </div>
                    <div className="col-7 d-flex justify-content-between">
                        <div className="mx-1">
                            <button className="accept-order-btn new-order-btn">ACCEPT</button>
                        </div>
                        <div className="mx-1">
                            <button className="reject-order-btn new-order-btn">REJECT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DbNewOrderPage;
