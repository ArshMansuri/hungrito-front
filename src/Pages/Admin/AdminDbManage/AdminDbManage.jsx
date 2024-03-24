import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from '../../../Components/Loaders/Skeleton';
import axios from 'axios';
import './adminDbManage.css'

const BASE_URL = process.env.REACT_APP_BASE_URL;
const AdminDbManage = () => {

  const [delBoy, setDelBoy] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [ammount, setAmmount] = useState(undefined);
  const { dbId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        if (dbId) {
          const { data } = await axios.get(
            `${BASE_URL}/api/v1/admin/new/db/detail/${dbId}`,
            { withCredentials: true }
          );

          if (
            data !== undefined &&
            data?.success === true &&
            data?.delBoy !== undefined
          ) {
            setDelBoy(data?.delBoy);
          }
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    }
    fetchData();
  }, [dbId]);

  const receiveMoneyHendler = async()=>{
    try {
      setIsLoading(true);
      if (dbId && ammount !== undefined && ammount !== 0) {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/admin/receive/db/money/${dbId}`,
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
      if (dbId && ammount !== undefined && ammount !== 0) {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/admin/send/db/earn/money/${dbId}`,
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
    <div className="admin-db-manage-page">
    {isLoading && delBoy === undefined ? (
      <Skeleton />
    ) : (
      <>
        <div className="admin-res-total-money">
          <strong>Delivery Boy Name:</strong> {delBoy?.dbName || ""}
        </div>
        <div className="admin-res-total-money">
          <strong>Delivery Boy Phone:</strong> {delBoy?.dbPhone?.phone || ""}
        </div>
        <div className="admin-res-total-money">
          <strong>Delivery Boy Money:</strong> {delBoy.money}
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
  )
}

export default AdminDbManage