import React, { useEffect, useState } from "react";
import { RiFileList3Fill } from "react-icons/ri";
import { FaArrowUp, FaArrowDown, FaIndianRupeeSign } from "react-icons/fa6";
import "../../../Components/ResDasBoard/TopFourCard/topFourCard.css";
import "./dbHome.css";
import ResPieChart from "../../../Components/ResCharts/ResPieChart/ResPieChart";
import ResAreaChart from "../../../Components/ResCharts/ResAreaChart/ResAreaChart";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DbHome = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [topTwoCard, setTopTwoCard] = useState(undefined)
  const [pieChart, setPieChart] = useState(undefined)
  const [areaChart, setAreaChart] = useState(undefined)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/delBoy/deshboard/charts`,
          { withCredentials: true }
        );
        if (data !== undefined && data?.success === true) {
          setTopTwoCard(data?.topTwoCart);
          setPieChart(data?.pieChart);
          setAreaChart(data?.areaChart);
          // setThisYearLineChart(data?.thisYearRevenue);
          // setLastYearLineChart(data?.lastYearRevenue);
          // setWeekrevenue(data?.weekRevenueChart);
          // setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, []);


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
                    <h3>{topTwoCard?.todayOrder?.count || 0}</h3>
                  </div>
                  <div
                    className="dash-card-title"
                    style={{ marginTop: "-2px" }}
                  >
                    Today's Order
                  </div>
                  <div className="das-card-percentage d-flex align-items-center">
                    <div className="up-down-icon d-flex align-items-center mt-1">
                      {topTwoCard?.todayOrder?.percentage >= 0  ? (
                        <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                          <FaArrowUp size={10} color="rgb(255, 91, 91)" />
                        </div>
                      ) : (
                        <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                          <FaArrowDown size={10} color="rgb(255, 91, 91)" />
                        </div>
                      )}
                      <div className="up-down-text mx-2">{topTwoCard?.todayOrder?.percentage || 0}% (1 days)</div>
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
                    <h3>{topTwoCard?.todayIncome?.count || 0}</h3>
                  </div>
                  <div
                    className="dash-card-title"
                    style={{ marginTop: "-2px" }}
                  >
                    Today's Income
                  </div>
                  <div className="das-card-percentage d-flex align-items-center">
                    <div className="up-down-icon d-flex align-items-center mt-1">
                      {topTwoCard?.todayIncome?.percentage >= 0 ? (
                        <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                          <FaArrowUp size={10} color="rgb(255, 91, 91)" />
                        </div>
                      ) : (
                        <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                          <FaArrowDown size={10} color="rgb(255, 91, 91)" />
                        </div>
                      )}
                      <div className="up-down-text mx-2">{topTwoCard?.todayIncome?.percentage || 0}% (1 days)</div>
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
          <div className="dash-chart-header">Order Detail</div>
          <div className="row h-100 py-3">
            <div className="col-4">
              <ResPieChart title="Cod" value={[pieChart?.totalCodOrder?.percentage || 0, 100- (pieChart?.totalCodOrder?.percentage || 0)]} />
            </div>
            <div className="col-4">
              <ResPieChart
                title="Online"
                value={[pieChart?.totalOnlineOrder?.percentage || 0, 100- (pieChart?.totalOnlineOrder?.percentage || 0)]}
                bg={["#00B074", "rgba(0, 176, 116, 0.15)"]}
              />
            </div>
            <div className="col-4">
              <ResPieChart
                title="Accepted"
                value={[pieChart?.totalAcceptOrder?.percentage || 0, 100- (pieChart?.totalAcceptOrder?.percentage || 0)]}
                bg={["#2D9CDB", "rgba(45, 156, 219, 0.15)"]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="db-order-chart d-flex justify-content-center mt-3">
        <div className="dash-order-chart  px-4 py-2">
          <div className="dash-chart-header">Weekly Order</div>
          <div className="order-chart w-100 d-flex justify-content-center">
            <ResAreaChart
              value={areaChart !== undefined ? areaChart : [
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
