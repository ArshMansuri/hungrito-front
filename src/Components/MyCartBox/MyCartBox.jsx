import React from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import "./myCartBox.css";
import { MdDeleteForever } from "react-icons/md";

const MyCartBox = () => {
  return (
    <div className="my-cart-div d-flex px-2 my-3">
      <div className="img-div d-flex justify-content-center align-items-center">
        <img
          src="../tempimg/burger-png.png"
          alt=""
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            height: "auto",
            width: "auto",
          }}
        />
      </div>
      <div className="d-flex flex-column w-100 ps-3">
        <div className="remove-icon text-end">
          <MdDeleteForever size={18} color="grey" className="cursor-pointer" />
        </div>
        <div className="food-name">Burger</div>
        <div className="food-price text-secondary">₹120/item</div>
        <div className="sub-total-all-btns-div d-flex justify-content-between align-items-center">
          <div className="sub-total">₹600</div>
          <div className="cart-btn d-flex p-1 justify-content-between align-items-center">
            <button className="remove-icon cursor-pointer border-0 bg-transparent">
              <IoMdRemove />
            </button>
            <div className="px-2">{5}</div>
            <button className="add-icon cursor-pointer border-0 bg-transparent">
              <IoMdAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCartBox;
