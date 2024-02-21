import React from "react";
import { RiFileList3Fill } from "react-icons/ri";
import { FaArrowUp, FaArrowDown, FaIndianRupeeSign } from "react-icons/fa6";
import "../../../Components/ResDasBoard/TopFourCard/topFourCard.css";
import "./dbHome.css";
import ResPieChart from "../../../Components/ResCharts/ResPieChart/ResPieChart";
import ResAreaChart from "../../../Components/ResCharts/ResAreaChart/ResAreaChart";
const DbHome = () => {
  return (
    <div className="db-home">
      <div className="top-four-card-com mt-3">
        <div className="row dash-cards">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-center">
            <div className="d-flex align-items-center dash-card m-2">
              <div className="w-25 d-flex align-items-center justify-content-end mx-3">
                <div className="dash-card-icon rounded-circle d-flex justify-content-center align-items-center">
                  <RiFileList3Fill size={35} color="rgb(255, 91, 91)" />
                </div>
              </div>
              <div className="w-75 px-2">
                <div className="d-flex flex-column justify-content-center">
                  <div className="dash-card-number">
                    <h3>75</h3>
                  </div>
                  <div
                    className="dash-card-title"
                    style={{ marginTop: "-2px" }}
                  >
                    Today's Order
                  </div>
                  <div className="das-card-percentage d-flex align-items-center">
                    <div className="up-down-icon d-flex align-items-center mt-1">
                      {true ? (
                        <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                          <FaArrowUp size={10} color="rgb(255, 91, 91)" />
                        </div>
                      ) : (
                        <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                          <FaArrowDown size={10} color="rgb(255, 91, 91)" />
                        </div>
                      )}
                      <div className="up-down-text mx-2">4% (30 days)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-center">
            <div className="d-flex align-items-center dash-card m-2">
              <div className="w-25 d-flex align-items-center justify-content-end mx-3">
                <div className="dash-card-icon rounded-circle d-flex justify-content-center align-items-center">
                  <FaIndianRupeeSign size={30} color="rgb(255, 91, 91)" />
                </div>
              </div>
              <div className="w-75 px-2">
                <div className="d-flex flex-column justify-content-center">
                  <div className="dash-card-number">
                    <h3>3540</h3>
                  </div>
                  <div
                    className="dash-card-title"
                    style={{ marginTop: "-2px" }}
                  >
                    Today's Income
                  </div>
                  <div className="das-card-percentage d-flex align-items-center">
                    <div className="up-down-icon d-flex align-items-center mt-1">
                      {true ? (
                        <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                          <FaArrowUp size={10} color="rgb(255, 91, 91)" />
                        </div>
                      ) : (
                        <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                          <FaArrowDown size={10} color="rgb(255, 91, 91)" />
                        </div>
                      )}
                      <div className="up-down-text mx-2">4% (30 days)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="db-pie-chart d-flex justify-content-center mt-3">
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
      <div className="db-order-chart d-flex justify-content-center mt-3">
        <div className="dash-order-chart  px-4 py-2">
          <div className="dash-chart-header">Chart Order</div>
          <div className="order-chart w-100 d-flex justify-content-center">
            <ResAreaChart
              value={[
                100, 150, 350, 200, 60, 230, 120, 200, 350, 400, 300, 250,
              ]}
              borCol={"rgb(53, 162, 235)"}
              bg={"rgba(53, 162, 235, 0.5)"}
            />
          </div>
        </div>
      </div>

      <div className="temp" style={{ height: "50vh" }}></div>
    </div>
  );
};

export default DbHome;
