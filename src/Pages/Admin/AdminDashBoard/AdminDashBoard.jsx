import React, { useEffect, useState } from 'react'
import './adminDashBoard.css'
import ResPieChart from '../../../Components/ResCharts/ResPieChart/ResPieChart'
import ResAreaChart from '../../../Components/ResCharts/ResAreaChart/ResAreaChart'
import ResLineChart from '../../../Components/ResCharts/ResLineChart/ResLineChart'
import ResVerticalChart from '../../../Components/ResCharts/ResVerticalChart/ResVerticalChart'
import Loader from '../../../Components/Loaders/Loader'
import AdminTopForCard from '../../../Components/AdminTopForCard/AdminTopForCard'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL;
const AdminDashBoard = ({isAdminLoading = true }) => {

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
          `${BASE_URL}/api/v1/admin/deshboard/charts`,
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

  console.log(pieChart)

  return (
    <>
    {isAdminLoading ? (
      <Loader />
    ) : (
      <div className="mx-2 admin-dashboard-main">
        <h5 className="mx-2" style={{ color: "#464255", fontWeight: "400" }}>
          Dashboard
        </h5>
        <div className="top-four-card mt-3">
          <AdminTopForCard cardDetail={topFourCard} />
        </div>
        <div className="das-pie-and-order-chart">
          <div className="row">
            <div className="col-xl-6 col-12 d-flex justify-content-center mt-3">
              <div className="dash-pie-chart px-4 py-2">
                <div className="dash-chart-header">App Users</div>
                <div className="row h-100 py-3">
                  <div className="col-4">
                    <ResPieChart title="Customer" value={[pieChart?.totalUser?.percentage || 0, 100 - (pieChart?.totalUser?.percentage || 0)]} />
                  </div>
                  <div className="col-4">
                    <ResPieChart
                      title="Restaurant"
                      value={[pieChart?.totalRes?.percentage || 0, 100 - (pieChart?.totalRes?.percentage || 0)]}
                      bg={["#00B074", "rgba(0, 176, 116, 0.15)"]}
                    />
                  </div>
                  <div className="col-4">
                    <ResPieChart
                      title="Delivery Boy"
                      value={[pieChart?.totalDb?.percentage || 0, 100 - (pieChart?.totalDb?.percentage || 0)]}
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
                    value={areaChart !== undefined ? areaChart :[
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
                <div className="dash-chart-header">Customer Map</div>
                <div className="customer-chart w-100 d-flex justify-content-center h-75 align-items-center">
                  <ResVerticalChart value={weekRevenue}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="temp" style={{ height: "50vh" }}></div>
      </div>
    )}
  </>
  )
}

export default AdminDashBoard