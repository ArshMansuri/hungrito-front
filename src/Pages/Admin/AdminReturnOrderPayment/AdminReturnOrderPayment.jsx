import React, { useEffect, useState } from "react";
import "./adminReturnOrderPayment.css";
import Table from "../../../Components/Table/Table";
import Skeleton from "../../../Components/Loaders/Skeleton";
import axios from "axios";
import { toast } from "react-toastify";

const tostOpstion = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

const columns = [
  {
    Headers: "Image",
    accessor: "image",
    disableSortBy: true,
  },
  {
    Headers: "Username",
    accessor: "username",
  },
  {
    Headers: "Phone",
    accessor: "phone",
  },
  {
    Headers: "Money",
    accessor: "total",
  },
  {
    Headers: "Token",
    accessor: "tokenNo",
  },
  {
    Headers: "Action",
    accessor: "manage",
    disableSortBy: true,
  },
];

const AdminReturnOrderPayment = () => {
  const [orders, setOrders] = useState(undefined);
  const [row, setRow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/admin/return/payment/order/list`,
          { withCredentials: true }
        );

        if (
          data !== undefined &&
          data.success === true &&
          data?.orders !== undefined
        ) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (orders !== undefined) {
      setRow(
        orders?.map((r, i) => ({
          image: (
            <img
              src={r?.userId?.profilImg}
              alt=""
              width="65px"
              className="rounded-circle"
            />
          ),
          username: r?.userId?.username,
          phone: r?.userId?.phone?.phone,
          total: r?.orders?.total,
          tokenNo: r?.OrderTokne,
          manage: (
            <button
              className="text-white action-nav"
              onClick={() => returnPaymentHendler(r?._id)}
            >
              Pay Back
            </button>
          ),
        }))
      );
    }
  }, [orders]);

  async function returnPaymentHendler(ordId) {
    console.log(ordId)
    try {
      const {data} = await axios.post(
        `${BASE_URL}/api/v1/admin/return/user/payment`,
        { ordId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if(data !== undefined && data.success === true){
        toast.success("Payment Return Successfully");
        let tempOrder = [...orders]
        const ordIndex = tempOrder.findIndex(obj=>obj._id.toString() == ordId.toString())
        console.log(ordIndex)
        if(ordIndex !== -1){
            tempOrder.splice(ordIndex, 1)
            setOrders([...tempOrder])
        }
      }

    } catch (error) {
      toast.error("Somthing Went Wrong");
      console.log(error);
    }
  }

  return (
    <div className="admin-return-payment-order-list-page">
      <div className="food-list-table">
        {(orders !== undefined && row !== undefined) || !isLoading ? (
          <Table data={row} columns={columns} />
        ) : (
          <Skeleton count={10} />
        )}
      </div>
    </div>
  );
};

export default AdminReturnOrderPayment;
