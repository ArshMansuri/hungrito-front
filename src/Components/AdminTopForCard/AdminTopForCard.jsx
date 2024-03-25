import React from 'react'
import { RiFileList3Fill } from "react-icons/ri";
import { FaArrowUp, FaArrowDown, FaIndianRupeeSign } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa"
import './adminTopForCard.css'

const AdminTopForCard = ({cardDetail = {}}) => {
  return (
    <div className="admin-top-four-card-com">
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
                <h3>{cardDetail?.todayOrder?.count || 0}</h3>
              </div>
              <div className="dash-card-title" style={{ marginTop: "-2px" }}>
                Today's Order
              </div>
              <div className="das-card-percentage d-flex align-items-center">
                <div className="up-down-icon d-flex align-items-center mt-1">
                  {cardDetail?.todayOrder?.percentage >= 0 ? (
                    <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                      <FaArrowUp size={10} color="rgb(255, 91, 91)" />
                    </div>
                  ) : (
                    <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                      <FaArrowDown size={10} color="rgb(255, 91, 91)" />
                    </div>
                  )}
                  <div className="up-down-text mx-2">{cardDetail?.todayOrder?.percentage || 0}% (1 days)</div>
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
              <FaUserAlt size={30} color="rgb(255, 91, 91)" />
            </div>
          </div>
          <div className="w-75 px-2">
            <div className="d-flex flex-column justify-content-center">
              <div className="dash-card-number">
                <h3>{cardDetail?.todayUser?.count || 0}</h3>
              </div>
              <div className="dash-card-title" style={{ marginTop: "-2px" }}>
                Today's User
              </div>
              <div className="das-card-percentage d-flex align-items-center">
                <div className="up-down-icon d-flex align-items-center mt-1">
                  {cardDetail?.todayUser?.percentage >= 0  ? (
                    <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                      <FaArrowUp size={10} color="rgb(255, 91, 91)" />
                    </div>
                  ) : (
                    <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                      <FaArrowDown size={10} color="rgb(255, 91, 91)" />
                    </div>
                  )}
                  <div className="up-down-text mx-2">{cardDetail?.todayUser?.percentage || 0}% (1 days)</div>
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
                <h3>{cardDetail?.todayIncome?.count || 0}</h3>
              </div>
              <div className="dash-card-title" style={{ marginTop: "-2px" }}>
                Today's Income
              </div>
              <div className="das-card-percentage d-flex align-items-center">
                <div className="up-down-icon d-flex align-items-center mt-1">
                  {cardDetail?.todayIncome?.percentage >= 0  ? (
                    <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                      <FaArrowUp size={10} color="rgb(255, 91, 91)" />
                    </div>
                  ) : (
                    <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                      <FaArrowDown size={10} color="rgb(255, 91, 91)" />
                    </div>
                  )}
                  <div className="up-down-text mx-2">{cardDetail?.todayIncome?.percentage || 0}% (1 days)</div>
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
              <TbMoneybag size={32} color="rgb(255, 91, 91)" />
            </div>
          </div>
          <div className="w-75 px-2">
            <div className="d-flex flex-column justify-content-center">
              <div className="dash-card-number">
                <h3>{cardDetail?.thisMonthIncome?.count || 0}</h3>
              </div>
              <div className="dash-card-title" style={{ marginTop: "-2px" }}>
              Total Revenue
              </div>
              <div className="das-card-percentage d-flex align-items-center">
                <div className="up-down-icon d-flex align-items-center mt-1">
                  {cardDetail?.thisMonthIncome?.percentage >= 0  ? (
                    <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                      <FaArrowUp size={10} color="rgb(255, 91, 91)" />
                    </div>
                  ) : (
                    <div className="up-down p-0 d-flex justify-content-center align-items-center rounded-circle">
                      <FaArrowDown size={10} color="rgb(255, 91, 91)" />
                    </div>
                  )}
                  <div className="up-down-text mx-2">{cardDetail?.thisMonthIncome?.percentage || 0}% (30 year)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminTopForCard