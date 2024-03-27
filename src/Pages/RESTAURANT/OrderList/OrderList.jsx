import React, { useEffect, useState } from "react";
import "./orderList.css";
import Table from "../../../Components/Table/Table";
import Loader from "../../../Components/Loaders/Loader";
import axios from "axios";
import { NavLink } from "react-router-dom";



const columns = [
  {
    Headers: "Username",
    accessor: "username",
  },
  {
    Headers: "Token No",
    accessor: "orderTokne",
  },
  {
    Headers: "Ammount",
    accessor: "resSubTotal",
  },
  {
    Headers: "Payment Mod",
    accessor: "payMode",
  },
  {
    Headers: "Manage",
    accessor: "manage",
  }
];

const BASE_URL = process.env.REACT_APP_BASE_URL;
const OrderList = ({isRestuAuther, isResLoading}) => {

  const [isOrderLoading, setIsOrderLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [orders, setOrders] = useState(undefined)
  const [row, setRow] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      try {
        const {data} = await axios.get(`${BASE_URL}/api/v1/restaurant/order/list`, {withCredentials: true})

        if(data !== undefined && data?.success === true && data?.orders !== undefined){
          setOrders(data?.orders)
        } else{
          setIsError(true)
        }
        setIsOrderLoading(false)
      } catch (error) {
        console.log(error)
        setIsError(true)
        setIsOrderLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(()=>{
    if(orders !== undefined && orders !== null){
      setRow(
        orders?.map((o,i)=>({
          username: o?.username || "",
          orderTokne: o?.orderTokne || 0,
          resSubTotal: o?.resSubTotal || 0,
          payMode: o?.payMode || "",
          manage: (
              o.isView === true ?
              "Pennding"
            // <NavLink
            //   className="text-dark action-nav"
            //   to={`/res/active/order/${o?._id}`}
            // >
            //   <button>View</button>
            // </NavLink> 
            : "Delivered"
          )
        }))
      )
    }
  }, [orders])
 
  return (
    <>
    {
      isResLoading ? <Loader  /> :
    <div className="order-list-table">
      <Table data={row} columns={columns} />
    </div>
    }
    {
      isError && orders === undefined ? <h2>Somthing Went Wrong! Please Refres Page</h2> : <></>
    }
    </>
  );
};

export default OrderList;
