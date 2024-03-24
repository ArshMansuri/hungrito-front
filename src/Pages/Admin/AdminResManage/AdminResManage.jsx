import React, { useEffect, useState } from "react";
import "./adminResManage.css";
import Skeleton from "../../../Components/Loaders/Skeleton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const AdminResManage = () => {
  
  const [restu, setRestu] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [ammount, setAmmount] = useState(undefined);
  const { resId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (resId) {
          const { data } = await axios.get(
            `${BASE_URL}/api/v1/admin/new/restu/detail/${resId}`,
            { withCredentials: true }
          );

          if (
            data !== undefined &&
            data?.success === true &&
            data?.restu !== undefined
          ) {
            setRestu(data?.restu);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [resId]);

  const receiveMoneyHendler = async()=>{
    try {
      setIsLoading(true);
      if (resId && ammount !== undefined && ammount !== 0) {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/admin/receive/res/money/${resId}`,
          {ammount},
          {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          }
        );

        if (
          data !== undefined &&
          data?.success === true
        ) {
          console.log(data?.message)
          return navigate(-1)
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  const sendMoneyHendler = async()=>{
    try {
      setIsLoading(true);
      if (resId && ammount !== undefined && ammount !== 0) {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/admin/send/res/earn/money/${resId}`,
          {ammount},
          {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          }
        );

        if (
          data !== undefined &&
          data?.success === true 
        ) {
          console.log(data?.message)
          return navigate(-1)
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="admin-res-manage-page">
      {isLoading && restu === undefined ? (
        <Skeleton />
      ) : (
        <>
          <div className="admin-res-total-money">
            <strong>Restaurant Name:</strong> {restu?.resName || ""}
          </div>
          <div>
            <strong>Restaurant Owner Name:</strong> {restu?.resOwnerName || ""}
          </div>
          <div className="admin-res-total-money">
            <strong>Restaurant Phone:</strong> {restu?.resPhone?.phone || ""}
          </div>
          <div className="admin-res-total-money">
            <strong>Restaurant Money:</strong> {restu.money}
          </div>
          <div className="mt-3">
            <input type="number" name="" id="" placeholder="Enter Ammount" onChange={(e)=>setAmmount(e.target.value)} />
          </div>
          <div className=" d-flex justify-content-start mt-3">
            <div className="d-grid gap-2 w-50">
              <button
                className="btn text-white border-0 accept-btn"
                type="button"
                style={{ backgroundColor: "#ff6600" }}
                onClick={receiveMoneyHendler}
              >
                Receive
              </button>
              <button className="btn btn-danger border-0" type="button" onClick={sendMoneyHendler}>
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminResManage;
