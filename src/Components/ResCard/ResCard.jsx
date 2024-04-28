import React from "react";
import "./resCard.css";
import { useNavigate } from "react-router-dom";

const ResCart = ({
  foodImg = "",
  resName = "",
  resCategory = "",
  resCity = "",
  resId
}) => {

  const navigator = useNavigate();

  return (
    <>
      <div className="cart-main mt-3 mx-4 my-3" style={{cursor: 'pointer'}} onClick={()=>navigator(`/user/res/${resId}`)}>
        <div className="cart-img ">
          <img className="shadow-sm" src={foodImg} alt="" srcSet="" />
        </div>
        <div className="card-text mx-3">
          <div className="d-flex flex-column ps-2">
            <div className="res-name">{resName}</div>
            <div className="food-category text-secondary">
              {resCategory.split("").length > 32 ? resCategory.split("").slice(0, 32).join("") + "..." : resCategory}
            </div>
            <div className="ras-city text-secondary">{resCity.split("").length > 32 ? resCity.split("").slice(0,32).join("") + "..." : resCity}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResCart;
