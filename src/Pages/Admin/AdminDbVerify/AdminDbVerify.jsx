import React, { useEffect, useState } from "react";
import "./adminDbVerify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
const AdminDbVerify = () => {
  const [delBoy, setDelBoy] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { dbId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [dbId]);

  console.log(delBoy);

  const acceptDbHendler = async () => {
    try {
      if (dbId) {
        setIsLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/admin/new/db/accept/${dbId}`,
          { withCredentials: true }
        );
        console.log(data);
        if (data !== undefined && data?.success === true) {
          toast.success("Accept Delivery Request");
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

  const rejectDbHendler = async () => {
    try {
      if (dbId) {
        setIsLoading(true);
        const { data } = await axios.delete(
          `${BASE_URL}/api/v1/admin/new/db/reject/${dbId}`,
          { withCredentials: true }
        );
        console.log(data);
        if (data !== undefined && data?.success === true) {
          toast.success("Reject Delivery Boy Request");
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
    <div className="admin-db-verify-page">
      {isLoading && delBoy !== undefined ? (
        <Skeleton />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Delivery Boy Details</h2>
              <hr />
              <div>
                <strong>Delivery Boy Name:</strong> {delBoy?.dbName || ""}
              </div>
              <div>
                <strong>Contact Number:</strong> {delBoy?.dbPhone?.phone || ""}
              </div>
              <div>
                <strong>Delivery Boy Address:</strong> {delBoy?.dbAddress || ""}
              </div>
              <div>
                <strong>Delivery Boy City:</strong>{" "}
                {delBoy?.dbCompletAddress?.city || ""}
              </div>
            </div>
          </div>
          <div className="image-container d-flex">
            <div className="img-div">
              <strong>Delivery Boy Image:</strong>{" "}
              <img
                src={delBoy?.dbImage?.publicUrl}
                // width="100%"
                alt=""
                className="db-img"
              />
            </div>
            <div className="img-div">
              <strong>Delivery Boy Vihical Image:</strong>{" "}
              <img
                src={delBoy?.dbVihicalImage?.publicUrl}
                // width="100%"
                alt=""
                className="db-img"
              />
            </div>
            <div className="img-div">
              <strong>Delivery Boy License Image:</strong>{" "}
              <img
                src={delBoy?.dbLicenseImage?.publicUrl}
                // width="100%"
                alt=""
                className="db-img"
              />
            </div>
          </div>
          <div className=" d-flex justify-content-start mt-3">
            <div className="d-grid gap-2 w-50">
              <button
                className="btn text-white border-0 accept-btn"
                type="button"
                style={{ backgroundColor: "#ff6600" }}
                onClick={acceptDbHendler}
              >
                Accept
              </button>
              <button
                className="btn btn-danger border-0"
                type="button"
                onClick={rejectDbHendler}
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

export default AdminDbVerify;
