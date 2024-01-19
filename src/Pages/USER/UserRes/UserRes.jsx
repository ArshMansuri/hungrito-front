import React, { useEffect } from "react";
import FoodHeader from "../../../Components/FoodHeader/FoodHeader";
import FoodFooterNav from "../../../Components/FoodFooterNav/FoodFooterNav";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import "./uesrRes.css";
import FoodCart from "../../../Components/FoodCart/FoodCart";
import {useDispatch, useSelector} from 'react-redux'
import { getUserResFoods } from "../../../redux/actions/user";
import { useParams } from "react-router-dom";
import Skeleton from "../../../Components/Loaders/Skeleton"

const dis = "00";
const unit = "km";

const UserRes = ({ isAuther, isLoading = true }) => {

  const dispatch = useDispatch()
  const params = useParams()

  const {foods, isLoading: isFoodsLoading} = useSelector((state)=> state.userResFoods)

  useEffect(()=>{
    if(params.resId){
      dispatch(getUserResFoods({resId: params.resId}))
    }
  }, [dispatch, params.resId])

  return (
    <div className="user-res-page">
      <div
        className="user-res-header overflow-hidden w-100 overflow-visible position-fixed top-0 start-0 end-0 shadow-sm"
        style={{ zIndex: "20" }}
      >
        <FoodHeader isAuther={isAuther} isLoading={isLoading} />
      </div>
      <div className="w-100" style={{ marginTop: "85px" }}>
        {
          foods === undefined && isFoodsLoading?
          <Skeleton count={20}/> : 
          <div className="row w-100 position-relative">
          <div className=" position-fixed start-0 col-xl-6 col-lg-6 col-md-6 col-sm-0 col-sm-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
            {
              foods !== undefined && foods.length > 0 ? 
              <div className="big-food-card d-flex justify-content-center align-items-center w-100">
              <div className="food-card py-3 px-4 m-3" style={{opacity: `${foods[0]?.isAvailable ?1 :0.5}`}}>
                <div className="food-card-top d-flex align-items-center justify-content-between">
                  <div className="left">{foods[0]?.foodWeight}</div>
                  <div className="right p-2 d-flex flex-column justify-content-center align-items-center rounded-circle g-0">
                    <div>{dis}</div>
                    <div>{unit}</div>
                  </div>
                </div>
                <div className="food-detail d-flex flex-column align-items-center justify-content-center">
                  <div className="img-div">
                    <img src={foods[0]?.foodImage?.publicUrl} alt="" />
                  </div>
                  <div className="food-card-text">
                    <div className="food-name text-center fs-4">
                      {foods[0]?.foodName.split("").length > 15
                        ? foods[0]?.foodName.split("").slice(0, 15).join("") + "..."
                        : foods[0]?.foodName}
                    </div>
                    <div className="food-discrtption text-center">
                      {foods[0]?.foodDescription.split("").length > 50
                        ? foods[0]?.foodDescription.split("").slice(0, 50).join("") + "..."
                        : foods[0]?.foodDescription}
                    </div>
                  </div>
                </div>
                <div className="food-card-btns d-flex justify-content-between align-items-center">
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
                    <div className="food-price px-2">₹{foods[0]?.foodPrice}</div>
                    <div className="cart-icon d-flex justify-content-center align-items-center px-2 p-1">
                      <IoCartOutline size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div> : <></>
            }

          </div>
          <div className="position-absolute end-0 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12 d-flex flex-wrap justify-content-xl-around justify-content-lg-around justify-content-md-center justify-content-sm-center justify-content-center">
            {
              foods !== undefined && foods.length > 1 ?
              foods.map((f,i)=>(
                i !== 0 ?
                <FoodCart
                  weight={f?.foodWeight}
                  img={f?.foodImage?.publicUrl}
                  name={f?.foodName}
                  text={f?.foodDescription}
                  price={f?.foodPrice}
                  isAvailable={f?.isAvailable}
                /> : <></>
              )) : <></>
            }
          </div>
        </div>
        }

      </div>
      <div className="user-res-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
        <FoodFooterNav isAuther={isAuther} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default UserRes;
