import React from "react";
import "./resCard.css";

const ResCart = ({
  foodImg,
  foodOffer = 0,
  resName,
  resCategory,
  resCity,
}) => {
  return (
    <>
      <div className="cart-main mt-3 mx-4">
        <div className="cart-img ">
          <img className="shadow-sm" src={foodImg} alt="" srcSet="" />
          <div className="cart-offer">
            <p className="text-white fs-5 fw-bold">
              {foodOffer !== 0 ? foodOffer : ""}
            </p>
          </div>
        </div>
        <div className="card-text">
          <div className="d-flex flex-column ps-2">
            <div className="res-name fw-bold">{resName}</div>
            <div className="food-create-address text-secondary">
              {resCategory.split("").length > 20 ? resCategory.split("").slice(0, 20).join("") + "..." : resCategory}
            </div>
            <div className="ras-city text-secondary">{resCity.split("").length > 20 ? resCity.split("").slice(0,20).join("") + "..." : resCity}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResCart;
