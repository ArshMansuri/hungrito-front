import React, { useEffect, useState } from "react";
import Loader from "../../../Components/Loaders/Loader";
import "./resDashboard.css";
import TopFourCard from "../../../Components/ResDasBoard/TopFourCard/TopFourCard";
import ResPieChart from "../../../Components/ResCharts/ResPieChart/ResPieChart";
import ResAreaChart from "../../../Components/ResCharts/ResAreaChart/ResAreaChart";
import ResLineChart from "../../../Components/ResCharts/ResLineChart/ResLineChart";
import ResVerticalChart from "../../../Components/ResCharts/ResVerticalChart/ResVerticalChart";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ResDashboard = ({ isRestuAuther, isResLoading = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [topFourCard, setTopFourCard] = useState(undefined);
  const [pieChart, setPieChart] = useState(undefined);
  const [areaChart, setAreaChart] = useState(undefined);
  const [thisYearLineChart, setThisYearLineChart] = useState(undefined);
  const [lastYearLineChart, setLastYearLineChart] = useState(undefined);
  const [weekRevenue, setWeekrevenue] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/restaurant/deshboard/charts`,
          { withCredentials: true }
        );
        if (data !== undefined && data?.success === true) {
          setTopFourCard(data?.topFourCart);
          setPieChart(data?.pieChart);
          setAreaChart(data?.areaChart);
          setThisYearLineChart(data?.thisYearRevenue);
          setLastYearLineChart(data?.lastYearRevenue);
          setWeekrevenue(data?.weekRevenueChart);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isResLoading && isLoading ? (
        <Loader />
      ) : (
        <div className="mx-2 res-dashboard-main">
          <h5 className="mx-2" style={{ color: "#464255", fontWeight: "400" }}>
            Dashboard
          </h5>
          <div className="top-four-card mt-3">
            <TopFourCard cardDetail={topFourCard} />
          </div>
          <div className="das-pie-and-order-chart">
            <div className="row">
              <div className="col-xl-6 col-12 d-flex justify-content-center mt-3">
                <div className="dash-pie-chart px-4 py-2">
                  <div className="dash-chart-header">Food Detail</div>
                  <div className="row h-100 py-3">
                    <div className="col-4">
                      <ResPieChart
                        title="Veg"
                        value={[
                          pieChart?.vegFood?.percentage || 0,
                          100 - (pieChart?.vegFood?.percentage || 0),
                        ]}
                      />
                    </div>
                    <div className="col-4">
                      <ResPieChart
                        title="Non Veg"
                        value={[
                          pieChart?.nonVegFood?.percentage || 0,
                          100 - (pieChart?.nonVegFood?.percentage || 0),
                        ]}
                        bg={["#00B074", "rgba(0, 176, 116, 0.15)"]}
                      />
                    </div>
                    <div className="col-4">
                      <ResPieChart
                        title="Available"
                        value={[
                          pieChart?.avilableFood?.percentage || 0,
                          100 - (pieChart?.avilableFood?.percentage || 0),
                        ]}
                        bg={["#2D9CDB", "rgba(45, 156, 219, 0.15)"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-12 d-flex justify-content-center mt-3">
                <div className="dash-order-chart  px-4 py-2">
                  <div className="dash-chart-header">Order Detail</div>
                  <div className="order-chart w-100 d-flex justify-content-center">
                    <ResAreaChart
                      value={areaChart}
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
                  <div className="dash-chart-header">Month Revenue</div>
                  <div className="revenue-chart w-100 d-flex justify-content-center">
                    <ResLineChart
                      dataset={[
                        {
                          label: "2022",
                          data: lastYearLineChart,
                          borderColor: "#2D9CDB",
                          backgroundColor: "#2D9CDB",
                        },
                        {
                          label: "2023",
                          data: thisYearLineChart,
                          borderColor: "rgb(255, 91, 91)",
                          backgroundColor: "rgb(255, 91, 91)",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-12 d-flex justify-content-center mt-3">
                <div className="dash-customer-chart px-4 py-2">
                  <div className="dash-chart-header">Week Revenue</div>
                  <div className="customer-chart w-100 d-flex justify-content-center h-75 align-items-center">
                    <ResVerticalChart value={weekRevenue} />
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
