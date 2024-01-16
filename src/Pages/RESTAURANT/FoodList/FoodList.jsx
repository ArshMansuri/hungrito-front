import React, { useCallback, useEffect, useState } from "react";
import "./foodList.css";
import Table from "../../../Components/Table/Table";
import Loader from "../../../Components/Loaders/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getResFoodList,
  updateResFoodIsAvailable,
} from "../../../redux/actions/food";
import Skeleton from "../../../Components/Loaders/Skeleton";
import { NavLink } from "react-router-dom";
import { foodListIsAvailableUpdate } from "../../../redux/slice/food";

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
    Headers: "Available",
    accessor: "isAvailable",
  },
  {
    Headers: "Weight",
    accessor: "foodWeight",
  },
  {
    Headers: "Category",
    accessor: "foodCategory",
  },
  {
    Headers: "Type",
    accessor: "foodType",
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

  const isAvailablehendlar = useCallback(
    (value, foodId) => {
      dispatch(foodListIsAvailableUpdate({ foodId, value }));
      dispatch(
        updateResFoodIsAvailable({ food: { foodId, isAvailable: value } })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (foodList) {
      setRow(
        foodList.map((f, i) => ({
          foodName: f.foodName,
          foodPrice: f.foodPrice,
          foodWeight: f.foodWeight,
          foodCategory: f.foodCategory?.type || "NONE",
          foodType: f.foodType,
          isAvailable: (
            <div className="form-check d-flex justify-content-center">
              <input
                className="form-check-input table-check-input"
                type="checkbox"
                value={f.isAvailable}
                id="flexCheckChecked"
                checked={f.isAvailable}
                onChange={() => isAvailablehendlar(!f.isAvailable, f._id)}
              />
            </div>
          ),
          manage: (
            <NavLink
              className="text-dark action-nav"
              to={`/res/food/manage/${f._id}`}
            >
              <button>Manage</button>
            </NavLink>
          ),
          foodImage: (
            <img
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                height: "auto",
                width: "auto",
              }}
              alt=""
              src={f.foodImage.publicUrl}
            />
          ),
        }))
      );
    }
  }, [foodList, isAvailablehendlar]);

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
