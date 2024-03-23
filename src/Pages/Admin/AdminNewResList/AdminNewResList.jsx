import React, { useEffect, useState } from 'react'
import './adminNewResList.css'
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
    Headers: "Action",
    accessor: "view",
    disableSortBy: true,
  },
];
const AdminNewResList = () => {
  const [restus, setRestus] = useState(undefined);
  const [row, setRow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/admin/new/restu/list`,
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
          view: (
            <NavLink
              className="text-dark action-nav"
              to={`/admin/res/verify/${r?._id}`}
            >
              <button>View</button>
            </NavLink>
          ),
        }))
      );
    }
  }, [restus]);


  return (
    <div className="admin-new-res-list-page">
      <div className="food-list-table">
        {(restus !== undefined && row !== undefined) || !isLoading ? (
          <Table data={row} columns={columns} />
        ) : (
          <Skeleton count={10} />
        )}
      </div>
    </div>
  );
}

export default AdminNewResList