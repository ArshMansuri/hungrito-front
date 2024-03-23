import React, { useEffect, useState } from 'react'
import './AdminDbList.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Table from '../../../Components/Table/Table';
import Skeleton from '../../../Components/Loaders/Skeleton';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const columns = [
  {
    Headers: "Image",
    accessor: "image",
    disableSortBy: true,
  },
  {
    Headers: "Name",
    accessor: "dbName",
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
    Headers: "Banned",
    accessor: "isBanned",
    disableSortBy: true,
  },
  {
    Headers: "Action",
    accessor: "manage",
    disableSortBy: true,
  },
];

const AdminDbList = () => {

    const [delBoys, setDelBoys] = useState(undefined);
    const [row, setRow] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
          setIsLoading(true);
          try {
            const { data } = await axios.get(
              `${BASE_URL}/api/v1/admin/db/list`,
              { withCredentials: true }
            );
    
            if (
              data !== undefined &&
              data.success === true &&
              data?.delBoys !== undefined
            ) {
              setDelBoys(data.delBoys);
            }
          } catch (error) {
            console.log(error);
          }
          setIsLoading(false);
        }
        fetchData();
      }, []);

      useEffect(() => {
        if (delBoys !== undefined) {
          setRow(
            delBoys?.map((r, i) => ({
              image: (
                <img src={r?.dbImage?.publicUrl} alt="" srcset="" width="65px" className='rounded-circle' />
              ),
              dbName: r?.dbName,
              money: r?.money,
              city: r?.dbCompletAddress?.city,
              isBanned: (
                <div className="form-check d-flex justify-content-center">
                  <input
                    className="form-check-input table-check-input"
                    type="checkbox"
                    value={r?.isBanned}
                    id="flexCheckChecked"
                    checked={r?.isBanned}
                    onChange={() => {
                        bannedUnBannedHendler(r?._id);
                    }}
                  />
                </div>
              ),
              manage: (
                <NavLink
                  className="text-dark action-nav"
                  to={`admin/res/manage/${r?._id}`}
                >
                  <button>Manage</button>
                </NavLink>
              ),
            }))
          );
        }
      }, [delBoys]);

      async function bannedUnBannedHendler(dbId) {
        try {
            console.log(dbId)
          const dbIndex = delBoys.findIndex(
            (obj) => obj._id.toString() === dbId.toString()
          );
          setDelBoys((p) => {
            const updateData = [...p];
            updateData[dbIndex].isBanned = !delBoys[dbIndex].isBanned;
            return updateData;
          });
          const { data } = await axios.get(
            `${BASE_URL}/api/v1/admin/db/banned/unbanned/${dbId}`,
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
    <div className="admin-db-list-page">
    <div className="food-list-table">
      {(delBoys !== undefined && row !== undefined) || !isLoading ? (
        <Table data={row} columns={columns} />
      ) : (
        <Skeleton count={10} />
      )}
    </div>
  </div>
  )
}

export default AdminDbList