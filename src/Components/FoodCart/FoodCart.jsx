import React from "react";
import "./foodCart.css";
import { IoMdAdd, IoMdRemove} from "react-icons/io"; 
import { IoCartOutline } from "react-icons/io5";

const FoodCart = ({wait="", dis="", unit="", img="", name="", text="", price=""}) => {
  return (
    <div className="food-card py-3 px-4 m-3">
      <div className="food-card-top d-flex align-items-center justify-content-between">
        <div className="left">{wait}</div>
        <div className="right p-2 d-flex flex-column justify-content-center align-items-center rounded-circle g-0">
          <div>{dis}</div>
          <div>{unit}</div>
        </div>
      </div>
      <div className="food-detail d-flex flex-column align-items-center justify-content-center">
        <div className="img-div">
          <img src={img} alt=""  />
        </div>
        <div className="food-card-text">
          <div className="food-name text-center fs-4">{name}</div>
          <div className="food-discrtption text-center">
            {text.split(" ").length > 10
              ? text.split(" ").slice(0, 10).join(" ") + "..."
              : text}
          </div>
        </div>
      </div>
      <div className="food-card-btns d-flex justify-content-between align-items-center mt-2">
        <div className="left d-flex p-1 justify-content-between">
          <div className="add-icon">
            <IoMdRemove />
          </div>
          <div className="px-2">{0}</div>
          <div className="remove-icon">
            <IoMdAdd />
          </div>
        </div>
        <div className="right d-flex align-items-center p-1">
            <div className="food-price px-2">
                ₹{price}
            </div>
            <div className="cart-icon d-flex justify-content-center align-items-center px-2 p-1">
                <IoCartOutline size={20} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
