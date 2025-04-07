import React, { useEffect, useState } from "react";
import FoodHeader from "../../../Components/FoodHeader/FoodHeader";
import "./search.css";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchDishNearestRestus,
  getSearchNearestRestus,
} from "../../../redux/actions/user";
import FoodCart from "../../../Components/FoodCart/FoodCart";
import ResCart from "../../../Components/ResCard/ResCard";
import FoodFooterNav from "../../../Components/FoodFooterNav/FoodFooterNav";

const Search = ({ isAuther, isLoading = true }) => {
  const dispatch = useDispatch();
  const { restus, isLoading: isNearestResLoading } = useSelector(
    (state) => state.nearestSearchRestus
  );
  const { foods, isLoading: isNearestFoodLoading } = useSelector(
    (state) => state.nearestSearchDishRestus
  );

  const [userLocation, setUserLocation] = useState(
    JSON.parse(localStorage.getItem("city"))
  );
  const [activeBtn, setActiveBtn] = useState("dish");
  const [search, setSearch] = useState("");

  const newUserLoaction = (value) => {
    setUserLocation(value);
  };

  useEffect(() => {
    if (search !== "") {
      const location = {
        longitude: userLocation?.lan || 72.591759,
        latitude: userLocation?.lat || 23.01451,
      };
      if (activeBtn === "dish") {
        dispatch(getSearchDishNearestRestus({ location, search }));
      } else if (activeBtn === "res") {
        dispatch(getSearchNearestRestus({ location, search }));
      }
    }
  }, [activeBtn, search]);

  return (
    <div className="search-page">
      <div className="food-page-header overflow-hidden w-100 overflow-visible shadow-sm">
        <FoodHeader
          isAuther={isAuther}
          isLoading={isLoading}
          setFun={newUserLoaction}
        />
      </div>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="search-input-div">
            <div className="d-flex align-items-center">
              <div className="search-icon py-2">
                <BiSearch size={20} color="#ff6600" />
              </div>
              <input
                type="text"
                placeholder="Search......"
                className="ms-2 text-secondary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="res-dish-btn-div mt-2 d-flex justify-content-center">
          <div className="res-btn-div">
            <button
              className={`mx-1 ${activeBtn === "res" ? "active-btn" : ""}`}
              onClick={() => setActiveBtn("res")}
            >
              Restaurant
            </button>
            <button
              className={`mx-1  ${activeBtn === "dish" ? "active-btn" : ""}`}
              onClick={() => setActiveBtn("dish")}
            >
              Dishes
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {activeBtn === "dish" ? (
          <div className="d-flex flex-wrap justify-content-center">
            {foods !== undefined && foods.length > 0 ? (
              foods.map((f, i) => (
                <FoodCart
                  key={f?._id}
                  foodId={f?._id}
                  weight={f?.foodWeight}
                  img={f?.foodImage?.publicUrl}
                  name={f?.foodName}
                  text={f?.foodDescription}
                  price={f?.foodPrice}
                  isAvailable={f?.isAvailable}
                  isAuther={isAuther}
                  resId={f?.foodRestaurant}
                  resName={"resName"}
                  //   addImgShowFun={addImgShowFun}
                  //   saveFood={saveFood}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="d-flex flex-wrap justify-content-center">
            {restus !== undefined && restus.length > 0 ? (
              restus.map((data, index) => {
                return (
                  <ResCart
                    key={index}
                    foodImg={data?.resFoodImage?.publicUrl || ""}
                    foodOffer={data?.resOffer?.offer || ""}
                    resName={data?.resName || ""}
                    resCategory={
                      data?.resCategory.length > 1
                        ? data.resCategory[0]?.type +
                          ", " +
                          data?.resCategory[1]?.type
                        : data?.resCategory[0]?.type || ""
                    }
                    resCity={data?.resAddress}
                    resId={data?._id}
                  />
                );
              })
            ) : (
              <div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="food-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
        <FoodFooterNav isAuther={isAuther} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Search;
