import React, { useEffect, useState } from 'react'
import './adminUserList.css'
import Table from '../../../Components/Table/Table';
import Skeleton from '../../../Components/Loaders/Skeleton';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

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
    Headers: "Email",
    accessor: "email",
  },
  {
    Headers: "Verify",
    accessor: "isVerify",
    disableSortBy: true,
  },
  {
    Headers: "Token",
    accessor: "token",
  },
  // {
  //   Headers: "City",
  //   accessor: "city",
  // },
  {
    Headers: "Action",
    accessor: "manage",
    disableSortBy: true,
  },
];

const AdminUserList = () => {

    
    const [users, setUsers] = useState(undefined);
    const [row, setRow] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
          setIsLoading(true);
          try {
            const { data } = await axios.get(
              `${BASE_URL}/api/v1/admin/user/list`,
              { withCredentials: true }
            );
    
            if (
              data !== undefined &&
              data.success === true &&
              data?.users !== undefined
            ) {
                setUsers(data.users);
            }
          } catch (error) {
            console.log(error);
          }
          setIsLoading(false);
        }
        fetchData();
      }, []);

      useEffect(() => {
        if (users !== undefined) {
          setRow(
            users?.map((r, i) => ({
              image: (
                <img src={r?.profilImg} alt=""  width="65px" className='rounded-circle' />
              ),
              username: r?.username,
              phone: r?.phone?.phone,
              email: r?.email,
              // city: r?.address?.city,
              token: r?.token,
              isVerify: (
                <div className="form-check d-flex justify-content-center">
                  <input
                    className="form-check-input table-check-input"
                    type="checkbox"
                    value={r?.verify}
                    id="flexCheckChecked"
                    checked={r?.verify}
                    onChange={() => {
                        bannedUnBannedHendler(r?._id);
                    }}
                  />
                </div>
              ),
              manage: (
                <NavLink
                  className="text-dark action-nav"
                  to={`/admin/user/manage/${r?._id}`}
                >
                  <button>Manage</button>
                </NavLink>
              ),
            }))
          );
        }
      }, [users]);

      console.log(users)

      async function bannedUnBannedHendler(dbId) {
      }


  return (
    <div className="admin-user-list-page">
    <div className="food-list-table">
      {(users !== undefined && row !== undefined) || !isLoading ? (
        <Table data={row} columns={columns} />
      ) : (
        <Skeleton count={10} />
      )}
    </div>
  </div>
  )
}

export default AdminUserList