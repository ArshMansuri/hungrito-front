import React, { useEffect, useState } from "react";
import "./createFood.css";
import FoodCart from "../../../Components/FoodCart/FoodCart";
import { useDispatch, useSelector } from "react-redux";
import { createFood } from "../../../redux/actions/food";
import axios from "axios";
import Loader from "../../../Components/Loaders/Loader";
import { useNavigate } from "react-router-dom";
import { makeCreateFoodSuccessFalse } from "../../../redux/slice/food";

// const BASE_URL = "https://hungritobackend.onrender.com";
const BASE_URL = "http://localhost:6010";

const CreateFood = ({ isRestuAuther, isResLoading }) => {
  const dispatch = useDispatch();
  const {isLoading, success} = useSelector((state)=> state.createFood)
  const navigator = useNavigate();

  const [categories, setCategories] = useState([]);
  const [foodDetail, setFooDetail] = useState({
    foodName: "",
    img: "",
    foodPrice: "",
    foodType: "Veg",
    foodDescription: "",
    foodCategory: "",
    foodWeight: "",
    foodOffer: {
      isOffer: false,
      offer: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(
          `${BASE_URL}/api/v1/restaurant/categories`,
          { withCredentials: true }
        );
        setCategories(data.data.categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(()=>{
    if(success){
      dispatch(makeCreateFoodSuccessFalse())
      return navigator('/res/food/list')
    }
  }, [success, navigator, dispatch])

  const imgChangeHendlar = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    if (!file) return;
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setFooDetail({ ...foodDetail, img: Reader.result });
      }
    };
  };

  const createFoodHendlar = async (e) => {
    e.preventDefault();
    dispatch(createFood({ food: foodDetail }));
  };

  return (
    <>
      {isResLoading || isLoading ? (
        <Loader />
      ) : (
        <div className="create-food-page">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-5">
              <form
                className="d-flex flex-column align-items-center"
                onSubmit={createFoodHendlar}
              >
                <input
                  type="file"
                  className="w-50 px-2 my-2 input"
                  name=""
                  id=""
                  onChange={imgChangeHendlar}
                  required
                />
                <input
                  type="text"
                  className="w-50 px-2 my-2 input"
                  placeholder="Enter Food Name"
                  value={foodDetail.foodName}
                  onChange={(e) =>
                    setFooDetail({ ...foodDetail, foodName: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="w-50 px-2 my-2 input"
                  placeholder="Enter Food Price"
                  value={foodDetail.foodPrice}
                  onChange={(e) =>
                    setFooDetail({ ...foodDetail, foodPrice: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="w-50 px-2 my-2 input"
                  placeholder="Enter Food Discription"
                  value={foodDetail.foodDescription}
                  onChange={(e) =>
                    setFooDetail({
                      ...foodDetail,
                      foodDescription: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="text"
                  className="w-50 px-2 my-2 input"
                  placeholder="Enter Food weight"
                  value={foodDetail.foodWeight}
                  onChange={(e) =>
                    setFooDetail({ ...foodDetail, foodWeight: e.target.value })
                  }
                  required
                />
                <select
                  className="form-select w-50 px-2 my-2"
                  aria-label="Default select example"
                  value={foodDetail.foodCategory}
                  onChange={(e) =>
                    setFooDetail({
                      ...foodDetail,
                      foodCategory: e.target.value,
                    })
                  }
                  required
                >
                  <option>Select Category</option>
                  {categories !== undefined && categories?.length > 0 ? (
                    categories.map((c, i) => (
                      <option key={c._id} value={c._id}>
                        {c.type}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
                <div className="d-flex w-50 input my-2">
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="Veg"
                      onChange={(e) =>
                        setFooDetail({
                          ...foodDetail,
                          foodType: e.target.value,
                        })
                      }
                      checked={foodDetail.foodType === "Veg" ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Veg
                    </label>
                  </div>
                  <div className="form-check mx-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="Non Veg"
                      onChange={(e) =>
                        setFooDetail({
                          ...foodDetail,
                          foodType: e.target.value,
                        })
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Non Veg
                    </label>
                  </div>
                </div>
                <div className="w-50 input">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={foodDetail.foodOffer.isOffer}
                      id="flexCheckChecked"
                      onChange={(e) =>
                        setFooDetail({
                          ...foodDetail,
                          foodOffer: {
                            foodOffer: "",
                            isOffer: !foodDetail.foodOffer.isOffer,
                          },
                        })
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Have Offer ?
                    </label>
                  </div>
                </div>
                {foodDetail.foodOffer.isOffer && (
                  <input
                    type="text"
                    className="w-50 px-2 my-2 input"
                    placeholder="Enter Offer"
                    value={foodDetail.foodOffer.offer}
                    onChange={(e) =>
                      setFooDetail({
                        ...foodDetail,
                        foodOffer: {
                          ...foodDetail.foodOffer,
                          offer: e.target.value,
                        },
                      })
                    }
                    required
                  />
                )}
                <button type="submit" className="submit-btn my-2">
                  Submit
                </button>
              </form>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
              <div className="d-flex flex-column align-items-xl-start align-items-lg-start align-items-md-start align-items-sm-center align-items-center">
                <div
                  className="ms-xl-3 ms-lg-3 ms-md-3 ms-sm-0 ms-0 text-center mt-sm-3 mt-4"
                  style={{ minWidth: "250px", fontSize: "26px" }}
                >
                  Preview
                </div>
                <FoodCart
                  img={
                    foodDetail.img !== ""
                      ? foodDetail.img
                      : "../../tempimg/burger-png.png"
                  }
                  name={
                    foodDetail.foodName !== ""
                      ? foodDetail.foodName
                      : "Food Name"
                  }
                  price={
                    foodDetail.foodPrice !== "" ? foodDetail.foodPrice : "000"
                  }
                  text={
                    foodDetail.foodDescription !== ""
                      ? foodDetail.foodDescription
                      : "Your food description"
                  }
                  weight={
                    foodDetail.foodWeight !== ""
                      ? foodDetail.foodWeight
                      : "00 gm"
                  }
                  isAvailable={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateFood;
