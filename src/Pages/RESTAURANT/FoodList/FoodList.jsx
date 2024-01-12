import React, { useEffect, useState } from "react";
import "./foodList.css";
import Table from "../../../Components/Table/Table";
import Loader from "../../../Components/Loaders/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getResFoodList } from "../../../redux/actions/food";
import Skeleton from "../../../Components/Loaders/Skeleton";
import { NavLink } from "react-router-dom";

const columns = [
  {
    Headers: "Image",
    accessor: "foodImage",
  },
  {
    Headers: "Name",
    accessor: "foodName",
  },
  {
    Headers: "Price",
    accessor: "foodPrice",
  },
  {
    Headers: "Weight",
    accessor: "foodWeight",
  },
  {
    Headers: "Type",
    accessor: "foodType",
  },
  {
    Headers: "Avilable",
    accessor: "isAvilable",
  },
  {
    Headers: "Action",
    accessor: "manage",
  },
];

const FoodList = ({ isRestuAuther, isResLoading }) => {
  const dispatch = useDispatch();
  const { foodList, isLoading } = useSelector((state) => state.resFoodList);
  const [row, setRow] = useState([]);

  useEffect(() => {
    dispatch(getResFoodList());
  }, [dispatch]);

  useEffect(() => {
    if (foodList) {
      setRow(
        foodList.map((f, i) => ({
          foodName: f.foodName,
          foodPrice: f.foodPrice,
          foodWeight: f.foodWeight,
          foodType: f.foodType,
          isAvilable: (
            <div className="form-check d-flex justify-content-center">
              {" "}
              <input
                className="form-check-input"
                type="checkbox"
                value={f.isAvilable}
                id="flexCheckChecked"
                checked={f.isAvilable}
                onChange={()=>{}}
              />
            </div>
          ),
          manage: (
            <NavLink
              className="text-dark action-nav"
              to={`/food/manage/${f._id}`}
            >
              <button>Manage</button>
            </NavLink>
          ),
          foodImage: <img  style={{maxHeight: "100%", maxWidth: '100%', height: 'auto', width: "auto"}} alt="" src={f.foodImage.publicUrl} />
        }))
      );
    }
  }, [foodList]);

  return (
    <>
      {isResLoading ? (
        <Loader />
      ) : (
        <div className="food-list-table">
          {(foodList !== undefined && row !== undefined) || !isLoading ? (
            <Table
              data={row}
              columns={columns}
              isAdd={true}
              url="/res/food/create"
            />
          ) : (
            <Skeleton count={10} />
          )}
        </div>
      )}
    </>
  );
};

export default FoodList;
