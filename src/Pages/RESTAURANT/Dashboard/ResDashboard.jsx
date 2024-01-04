import React from "react";
import Loader from "../../../Components/Loaders/Loader";
import "./resDashboard.css";
import TopFourCard from "../../../Components/ResDasBoard/TopFourCard/TopFourCard";
import ResPieChart from "../../../Components/ResCharts/ResPieChart/ResPieChart";
import ResAreaChart from "../../../Components/ResCharts/ResAreaChart/ResAreaChart";
import ResLineChart from "../../../Components/ResCharts/ResLineChart/ResLineChart";
import ResVerticalChart from "../../../Components/ResCharts/ResVerticalChart/ResVerticalChart";

const ResDashboard = ({ isRestuAuther, isResLoading = true }) => {
  console.log();
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
                <div className="dash-pie-chart px-4 py-2">
                  <div className="dash-chart-header">Pie Chart</div>
                  <div className="row h-100 py-3">
                    <div className="col-4">
                      <ResPieChart title="Total Order" value={[81, 19]} />
                    </div>
                    <div className="col-4">
                      <ResPieChart
                        title="Customer Growth"
                        value={[22, 78]}
                        bg={["#00B074", "rgba(0, 176, 116, 0.15)"]}
                      />
                    </div>
                    <div className="col-4">
                      <ResPieChart
                        title="Total Revenue"
                        value={[62, 38]}
                        bg={["#2D9CDB", "rgba(45, 156, 219, 0.15)"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-12 d-flex justify-content-center mt-3">
                <div className="dash-order-chart  px-4 py-2">
                  <div className="dash-chart-header">Chart Order</div>
                  <div className="order-chart w-100 d-flex justify-content-center">
                    <ResAreaChart
                      value={[
                        100, 150, 350, 200, 60, 230, 120, 200, 350, 400, 300,
                        250,
                      ]}
                      borCol={"rgb(53, 162, 235)"}
                      bg={"rgba(53, 162, 235, 0.5)"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="revenue-and-customer-chart">
            <div className="row">
              <div className="col-xl-8 col-lg-6 col-12 d-flex justify-content-center mt-3">
                <div className="dash-revenue-chart px-4 py-2">
                  <div className="dash-chart-header">Total Revenue</div>
                  <div className="revenue-chart w-100 d-flex justify-content-center">
                    <ResLineChart />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-12 d-flex justify-content-center mt-3">
                <div className="dash-customer-chart px-4 py-2">
                  <div className="dash-chart-header">Customer Map</div>
                  <div className="customer-chart w-100 d-flex justify-content-center h-75 align-items-center">
                    <ResVerticalChart />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="temp" style={{ height: "50vh" }}></div>
        </div>
      )}
    </>
  );
};

export default ResDashboard;
