import React, { useEffect, useState } from 'react'
import './adminNewDbList.css'
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
    Headers: "Action",
    accessor: "view",
    disableSortBy: true,
  },
];

const AdminNewDbList = () => {
    const [delBoys, setDelBoys] = useState(undefined);
    const [row, setRow] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
          setIsLoading(true);
          try {
            const { data } = await axios.get(
              `${BASE_URL}/api/v1/admin/new/db/list`,
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
              view: (
                <NavLink
                  className="text-dark action-nav"
                  to={`/admin/db/verify/${r?._id}`}
                >
                  <button>View</button>
                </NavLink>
              ),
            }))
          );
        }
      }, [delBoys]);

  return (
    <div className="admin-new-db-list-page">
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

export default AdminNewDbList