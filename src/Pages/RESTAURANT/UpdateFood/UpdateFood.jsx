import React, { useEffect, useState } from "react";
import "./updateFood.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FoodCart from "../../../Components/FoodCart/FoodCart";
import { deleteResFood, getResSingleFood, updateResFood } from "../../../redux/actions/food";
import Loader from "../../../Components/Loaders/Loader";
import Skeleton from "../../../Components/Loaders/Skeleton";
import {makeDeleteSuccessFalse, makeSuccessFalse } from "../../../redux/slice/food";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UpdateFood = ({ isRestuAuther, isResLoading }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const params = useParams();

  const { isLoading, food } = useSelector((state) => state.resSingleFood);
  const { isLoading: isSubmitLoading, success } = useSelector((state) => state.resFoodUpdate);
  const { isLoading: isDeleteLoading, success: isDeleteSuccess } = useSelector((state) => state.resFoodDelete);

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
  const [foodChangeDetail, setFoodChangeDetail] = useState({
    foodId: params.id,
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
    dispatch(getResSingleFood({ foodId: params.id }));
    fetchData();
  }, [dispatch,params.id]);

  useEffect(() => {
    if (food) {
      setFooDetail((p)=> ({
        ...p,
        foodName: food.foodName,
        img: food.foodImage.publicUrl,
        foodPrice: food.foodPrice,
        foodType: food.foodType,
        foodDescription: food.foodDescription,
        foodCategory: food.foodCategory,
        foodWeight: food.foodWeight,
        foodOffer: {
          isOffer: food.foodOffer.isOffer,
          offer: food.foodOffer.offer,
        },
      }))
      setFoodChangeDetail((p)=> ({
        ...p,
        foodOffer: food.foodOffer
      }))
    }
  }, [food]);

  useEffect(()=>{
    if(success){
      dispatch(makeSuccessFalse())
      return navigator('/res/food/list')
    }
  }, [success, navigator, dispatch])

  useEffect(()=>{
    if(isDeleteSuccess){
      dispatch(makeDeleteSuccessFalse())
      return navigator('/res/food/list')
    }
  }, [isDeleteSuccess, navigator, dispatch])

  

  const imgChangeHendlar = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    if (!file) return;
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setFooDetail((p)=>({ ...p, img: Reader.result }));
        setFoodChangeDetail((p)=>({ ...p, img: Reader.result }));
      }
    };
  };

  const updateFoodHendlar = async (e) => {
    e.preventDefault();
    dispatch(updateResFood({food:foodChangeDetail}));
  };

  const deleteFoodhendlar = ()=>{
    dispatch(deleteResFood({foodId: params.id}))
  }

  return (
    <>
      {isResLoading ? (
        <Loader />
      ) : (
        <div className="food-manage-page">
          {isLoading || isSubmitLoading || isDeleteLoading ? (
            <Skeleton />
          ) : (
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-5">
                <form
                  className="d-flex flex-column align-items-center"
                  onSubmit={updateFoodHendlar}
                >
                  <input
                    type="file"
                    className="w-50 px-2 my-2 input"
                    name=""
                    id=""
                    onChange={imgChangeHendlar}
                  />
                  <input
                    type="text"
                    className="w-50 px-2 my-2 input"
                    placeholder="Enter Food Name"
                    value={foodDetail.foodName}
                    onChange={(e) => {
                      setFooDetail({ ...foodDetail, foodName: e.target.value });
                      setFoodChangeDetail({
                        ...foodChangeDetail,
                        foodName: e.target.value,
                      });
                    }}
                    required
                  />
                  <input
                    type="text"
                    className="w-50 px-2 my-2 input"
                    placeholder="Enter Food Price"
                    value={foodDetail.foodPrice}
                    onChange={(e) => {
                      setFooDetail({
                        ...foodDetail,
                        foodPrice: e.target.value,
                      });
                      setFoodChangeDetail({
                        ...foodChangeDetail,
                        foodPrice: e.target.value,
                      });
                    }}
                    required
                  />
                  <input
                    type="text"
                    className="w-50 px-2 my-2 input"
                    placeholder="Enter Food Discription"
                    value={foodDetail.foodDescription}
                    onChange={(e) => {
                      setFooDetail({
                        ...foodDetail,
                        foodDescription: e.target.value,
                      });
                      setFoodChangeDetail({
                        ...foodChangeDetail,
                        foodDescription: e.target.value,
                      });
                    }}
                    required
                  />
                  <input
                    type="text"
                    className="w-50 px-2 my-2 input"
                    placeholder="Enter Food weight"
                    value={foodDetail.foodWeight}
                    onChange={(e) => {
                      setFooDetail({
                        ...foodDetail,
                        foodWeight: e.target.value,
                      });
                      setFoodChangeDetail({
                        ...foodChangeDetail,
                        foodWeight: e.target.value,
                      });
                    }}
                    required
                  />
                  <select
                    className="form-select w-50 px-2 my-2"
                    aria-label="Default select example"
                    value={foodDetail.foodCategory}
                    onChange={(e) => {
                      setFooDetail({
                        ...foodDetail,
                        foodCategory: e.target.value,
                      });
                      setFoodChangeDetail({
                        ...foodChangeDetail,
                        foodCategory: e.target.value,
                      });
                    }}
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
                        onChange={(e) => {
                          setFooDetail({
                            ...foodDetail,
                            foodType: e.target.value,
                          });
                          setFoodChangeDetail({
                            ...foodChangeDetail,
                            foodType: e.target.value,
                          });
                        }}
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
                        onChange={(e) => {
                          setFooDetail({
                            ...foodDetail,
                            foodType: e.target.value,
                          });
                          setFoodChangeDetail({
                            ...foodChangeDetail,
                            foodType: e.target.value,
                          });
                        }}
                        checked={
                          foodDetail.foodType === "Non Veg" ? true : false
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
                        onChange={(e) => {
                          setFooDetail({
                            ...foodDetail,
                            foodOffer: {
                              foodOffer: "",
                              isOffer: !foodDetail.foodOffer.isOffer,
                            },
                          });
                          setFoodChangeDetail({
                            ...foodChangeDetail,
                            foodOffer: {
                              foodOffer: "",
                              isOffer: !foodDetail.foodOffer.isOffer,
                            },
                          });
                        }}
                        checked={foodDetail.foodOffer.isOffer}
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
                      onChange={(e) => {
                        setFooDetail({
                          ...foodDetail,
                          foodOffer: {
                            ...foodDetail.foodOffer,
                            offer: e.target.value,
                          },
                        });
                        setFoodChangeDetail({
                          ...foodChangeDetail,
                          foodOffer: {
                            ...foodDetail.foodOffer,
                            offer: e.target.value,
                          },
                        });
                      }}
                      required
                    />
                  )}
                  <button type="submit" className="my-2 update-btn">
                    Update
                  </button>
                  <button type="button" className="my-2 update-btn delet-btn" onClick={deleteFoodhendlar}>
                    Delete
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
                    isRestu={true}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateFood;
