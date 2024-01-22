
import React, { useState } from "react";
import './UserFoodBigCard.css'
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/user";


const UserFoodBigCard = ({
  foodId,
  weight = "00 gm",
  dis = "00",
  unit = "km",
  img = "../../tempimg/burger-png.png",
  name = "Food Name",
  text = "",
  price = "000",
  isAvailable = false,
  isAuther = false,
  resId,
  resName = "",
  addImgShowFun=()=>{}
}) => {

  const navigator = useNavigate()
  const dispatch = useDispatch()
  const [qut, setQut] = useState(0)

  const addToCartHandler = ()=>{
    if(!isAuther){
      return navigator('/login')
    }

    if(qut < 1){
      // toster
      return
    }

    const foodInfo = {
      resId, foodId, resName, 
      foodName: name,
      foodPrice: price,
      foodQut: qut,
      foodImg: img
    }
    dispatch(addToCart({foodInfo}))
    addImgShowFun()
    setQut(0)
  }

  const qutPlusHandler = () =>{
    if(qut < 10){
      setQut(qut+1)
    }
  }

  const qutLessHandler = () =>{
    if(qut > 0){
      setQut(qut-1)
    }
  }
  return (
    <div className="big-food-card d-flex justify-content-center align-items-center w-100">

    <div
      className="food-card py-3 px-4 m-3"
      style={{ opacity: `${isAvailable ? 1 : 0.5}` }}
    >
      <div className="food-card-top d-flex align-items-center justify-content-between">
        <div className="left">{weight}</div>
        <div className="right p-2 d-flex flex-column justify-content-center align-items-center rounded-circle g-0">
          <div>{dis}</div>
          <div>{unit}</div>
        </div>
      </div>
      <div className="food-detail d-flex flex-column align-items-center justify-content-center">
        <div className="img-div">
          <img src={img} alt="" />
        </div>
        <div className="food-card-text">
          <div className="food-name text-center fs-4">
            {name.split("").length > 15
              ? name.split("").slice(0, 15).join("") + "..."
              : name}
          </div>
          <div className="food-discrtption text-center">
            {text.split("").length > 50
              ? text.split("").slice(0, 50).join("") +
                "..."
              : text}
          </div>
        </div>
      </div>
      <div className="food-card-btns d-flex justify-content-between align-items-center">
        <div className="left d-flex p-1 justify-content-between">
          <button
            className="add-icon cursor-pointer border-0 bg-transparent"
            disabled={!isAvailable}
            onClick={qutLessHandler}
          >
            <IoMdRemove />
          </button>
          <div className="px-2">{qut}</div>
          <button
            className="remove-icon cursor-pointer border-0 bg-transparent"
            disabled={!isAvailable}
            onClick={qutPlusHandler}
          >
            <IoMdAdd />
          </button>
        </div>
        <div className="right d-flex align-items-center p-1">
          <div className="food-price px-2">₹{price}</div>
          <button
            className="cart-icon d-flex justify-content-center align-items-center px-2 p-1 cursor-pointer border-0"
            disabled={!isAvailable}
            onClick={addToCartHandler}
          >
            <IoCartOutline size={20} />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserFoodBigCard;
