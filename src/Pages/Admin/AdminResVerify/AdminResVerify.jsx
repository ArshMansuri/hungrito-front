import React, { useEffect, useState } from "react";
import "./adminResVerify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "../../../Components/Loaders/Skeleton";
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

const AdminResVerify = () => {
  const [restu, setRestu] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
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

  console.log(restu);

  const acceptResHendler = async () => {
    try {
      if (resId) {
        setIsLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/admin/new/restu/accept/${resId}`,
          { withCredentials: true }
        );
        console.log(data);
        if (data !== undefined && data?.success === true) {
          // show toast
          toast.success("Accept Restaurant Request");
          return navigate(-1);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing Went Wrong");
      setIsLoading(false);
    }
  };

  const rejectResHendler = async () => {
    try {
      if (resId) {
        setIsLoading(true);
        const { data } = await axios.delete(
          `${BASE_URL}/api/v1/admin/new/restu/reject/${resId}`,
          { withCredentials: true }
        );
        console.log(data);
        if (data !== undefined && data?.success === true) {
          toast.success("Reject Restaurant Request");
          return navigate(-1);
        }
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Somthing Went Wrong");
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-res-verify-page">
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Restaurant Details</h2>
              <hr />
              <div>
                <strong>Restaurant Name:</strong> {restu?.resName || ""}
              </div>
              <div>
                <strong>Restaurant Owner Name:</strong>{" "}
                {restu?.resOwnerName || ""}
              </div>
              <div>
                <strong>Contact Number:</strong> {restu?.resPhone?.phone || ""}
              </div>
              <div>
                <strong>Restaurant Address:</strong> {restu?.resAddress || ""}
              </div>
              <div>
                <strong>Restaurant City:</strong>{" "}
                {restu?.resCompletAddress?.city || ""}
              </div>
            </div>
          </div>
          <div className=" d-flex justify-content-start mt-3">
            <div className="d-grid gap-2 w-50">
              <button
                className="btn text-white border-0 accept-btn"
                type="button"
                style={{ backgroundColor: "#ff6600" }}
                onClick={acceptResHendler}
              >
                Accept
              </button>
              <button
                className="btn btn-danger border-0"
                type="button"
                onClick={rejectResHendler}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResVerify;
