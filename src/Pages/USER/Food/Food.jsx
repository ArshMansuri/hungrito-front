import React, { useEffect } from "react";
import "./Food.css";
import FoodCart from "../../../Components/FoodCart/FoodCart";
import FoodHeader from "../../../Components/FoodHeader/FoodHeader";
import FoodFooterNav from "../../../Components/FoodFooterNav/FoodFooterNav";
import Filters from "../../../Components/Filters/Filters";
import { BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Food = ({ isAuther, isLoading = true }) => {
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (document.getElementById("offsetHeight") !== null) {
        if (window.scrollY >= 65) {
          document
            .getElementById("offsetHeight")
            .classList.add("position-fixed");
          document.getElementById("searchBox").classList.remove('d-none')
          document.getElementById("searchBox").classList.add('d-flex')
        } else {
          document
            .getElementById("offsetHeight")
            .classList.remove("position-fixed");
            document.getElementById("searchBox").classList.remove('d-flex')
            document.getElementById("searchBox").classList.add('d-none')
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
        className="bg-white py-2 food-page-filters overflow-hidden top-0 shadow-sm w-100"
      >
        <div className="row">
          <div className="filter-scroll col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 overflow-scroll">
            <Filters />
          </div>
          <div className="filter-scroll col-xl-4 col-lg-4 col-md-4 col-sm-0 col-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <div id="searchBox" className="d-none align-items-center h-100 w-100 justify-content-end pe-4">
            <NavLink to={'/search'} className="search-box-food d-flex align-items-center w-75 py-3 px-2 text-secondary">
              <BiSearch size={20} />
              <span className="ms-1">Search food</span>
            </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-wrap">
        <FoodCart
          wait="30 gm"
          dis="10"
          unit="km"
          img="../tempimg/burger-png.png"
          name="Burger"
          text="Lorem ipsum dolor sit amet consectetur Debitis dolor neque voluptatum"
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
