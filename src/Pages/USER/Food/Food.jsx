import React, { useEffect } from "react";
import "./Food.css";
import FoodCart from "../../../Components/FoodCart/FoodCart";
import FoodHeader from "../../../Components/FoodHeader/FoodHeader";
import FoodFooterNav from "../../../Components/FoodFooterNav/FoodFooterNav";
import Filters from "../../../Components/Filters/Filters";

const Food = ({ isAuther, isLoading = true }) => {
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (document.getElementById("offsetHeight") !== null) {
        if (window.scrollY >= 65) {
          document
            .getElementById("offsetHeight")
            .classList.add("position-fixed");
        } else {
          document
            .getElementById("offsetHeight")
            .classList.remove("position-fixed");
        }
      }
    });
  }, []);

  return (
    <div className="food-page">
      <div className="food-page-header overflow-hidden w-100 overflow-visible">
        <FoodHeader isAuther={isAuther} isLoading={isLoading} />
      </div>
      <div
        id="offsetHeight"
        className="bg-white py-2 food-page-filters overflow-auto top-0 shadow-sm w-100"
      >
        <Filters />
      </div>
      <div className="container d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-wrap">
        <FoodCart
          wait="30 gm"
          dis="10"
          unit="km"
          img="../tempimg/burger-png.png"
          name="Burger"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolor neque voluptatum"
          price="80"
        />
        <FoodCart
          wait="120 gm"
          dis="14"
          unit="km"
          img="../tempimg/pizza-png.png"
          name="Pizza"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolor neque voluptatum"
          price="150"
        />
        <FoodCart
          wait="30 gm"
          dis="10"
          unit="km"
          img="../tempimg/burger-png.png"
          name="Burger"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolor neque voluptatum"
          price="80"
        />
      </div>
      <div className="food-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
        <FoodFooterNav isAuther={isAuther} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Food;
