import React from "react";
import Loader from "../../../Components/Loaders/Loader";
import "./resDashboard.css";
import TopFourCard from "../../../Components/ResDasBoard/TopFourCard/TopFourCard";

const ResDashboard = ({ isRestuAuther, isResLoading = true }) => {
  return (
    <>
      {isResLoading ? (
        <Loader />
      ) : (
        <div className="mx-2 res-dashboard-main">
          <h5 className="mx-2" style={{ color: "#464255", fontWeight: "400" }}>
            Dashboard
          </h5>
          <div className="top-four-card mt-3">
            <TopFourCard />
          </div>
          <div className="das-pie-and-order-chart">
            <div className="row">
              <div className="col-xl-6 col-12 d-flex justify-content-center mt-3">
                <div className="dash-pie-chart">
                  ahiya pie chart aavse
                </div>
              </div>
              <div className="col-xl-6 col-12 d-flex justify-content-center mt-3">
                <div className="dash-order-chart">
                ahiya order chart aavse
                </div>
              </div>
            </div>
          </div>
          <div className="revenue-and-customer-chart">
            <div className="row">
              <div className="col-xl-8 col-lg-6 col-12 d-flex justify-content-center mt-3">
                <div className="dash-revenue-chart">
                  ahiya revenue chart aavse
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-12 d-flex justify-content-center mt-3">
              <div className="dash-customer-chart">
              ahiya customer chart aavse
              </div>
              </div>
            </div>
          </div>

          <div className="temp" style={{height: "50vh"}}></div>
        </div>
      )}
    </>
  );
};

export default ResDashboard;
