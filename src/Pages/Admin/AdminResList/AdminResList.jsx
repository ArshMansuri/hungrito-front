import React, { useCallback, useEffect, useState } from "react";
import "./adminResList.css";
import axios from "axios";
import Skeleton from "../../../Components/Loaders/Skeleton";
import Table from "../../../Components/Table/Table";
import { NavLink } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const columns = [
  {
    Headers: "Name",
    accessor: "resName",
  },
  {
    Headers: "Money",
    accessor: "money",
  },
  {
    Headers: "City",
    accessor: "city",
  },
  {
    Headers: "Active",
    accessor: "active",
    disableSortBy: true,
  },
  {
    Headers: "Action",
    accessor: "manage",
    disableSortBy: true,
  },
];

const AdminResList = () => {
  const [restus, setRestus] = useState(undefined);
  const [row, setRow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/admin/restu/list`,
          { withCredentials: true }
        );

        if (
          data !== undefined &&
          data.success === true &&
          data?.restus !== undefined
        ) {
          setRestus(data.restus);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (restus !== undefined) {
      setRow(
        restus?.map((r, i) => ({
          resName: r?.resName,
          money: r?.money,
          city: r?.resCompletAddress?.city,
          active: (
            <div className="form-check d-flex justify-content-center">
              <input
                className="form-check-input table-check-input"
                type="checkbox"
                value={r?.active}
                id="flexCheckChecked"
                checked={r?.active}
                onChange={() => {
                  activeInActiveResHendler(r?._id);
                }}
              />
            </div>
          ),
          manage: (
            <NavLink
              className="text-dark action-nav"
              to={`/admin/res/manage/${r?._id}`}
            >
              <button>Manage</button>
            </NavLink>
          ),
        }))
      );
    }
  }, [restus]);

  async function activeInActiveResHendler(resId) {
    try {
      const resIndex = restus.findIndex(
        (obj) => obj._id.toString() === resId.toString()
      );
      setRestus((p) => {
        const updateData = [...p];
        updateData[resIndex].active = !restus[resIndex].active;
        return updateData;
      });
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/admin/res/active/inactive/${resId}`,
        { withCredentials: true }
      );

      if (data !== undefined && data?.success === true) {
        // show toast
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="admin-res-list-page">
      <div className="food-list-table">
        {(restus !== undefined && row !== undefined) || !isLoading ? (
          <Table data={row} columns={columns} />
        ) : (
          <Skeleton count={10} />
        )}
      </div>
    </div>
  );
};

export default AdminResList;
