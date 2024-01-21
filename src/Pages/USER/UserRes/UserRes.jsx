import React, { useEffect, useState } from "react";
import FoodHeader from "../../../Components/FoodHeader/FoodHeader";
import FoodFooterNav from "../../../Components/FoodFooterNav/FoodFooterNav";
import "./uesrRes.css";
import FoodCart from "../../../Components/FoodCart/FoodCart";
import { useDispatch, useSelector } from "react-redux";
import { getUserResFoods } from "../../../redux/actions/user";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loaders/Loader";
import UserFoodBigCard from "../../../Components/UserFoodBigCard/UserFoodBigCard"

const UserRes = ({ isAuther, isLoading = true }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const {
    foods,
    isLoading: isFoodsLoading,
    resName,
  } = useSelector((state) => state.userResFoods);

  const [isAddCardImgShow, setIsAddCardImgshow] = useState(false)

  useEffect(() => {
    if (params.resId) {
      dispatch(getUserResFoods({ resId: params.resId }));
    }
  }, [dispatch, params.resId]);

  const addImgShowFun = () =>{
    setIsAddCardImgshow(true)
  }

  useEffect(()=>{
    if(isAddCardImgShow){
      setTimeout(function() {
        setIsAddCardImgshow(false)
      }, 2000);
    }
  }, [isAddCardImgShow])

  return (
    <div className="user-res-page">
      <div
        className="user-res-header overflow-hidden w-100 overflow-visible position-fixed top-0 start-0 end-0 shadow-sm"
        style={{ zIndex: "20" }}
      >
        <FoodHeader isAuther={isAuther} isLoading={isLoading} isGifImgShow={isAddCardImgShow} />
      </div>
      <div className="w-100" style={{ marginTop: "85px" }}>
        {foods === undefined && isFoodsLoading ? (
          <Loader />
        ) : (
          <div className="row w-100 position-relative">
            <div className=" position-fixed start-0 col-xl-6 col-lg-6 col-md-6 col-sm-0 col-sm-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
              {foods !== undefined && foods.length > 0 ? (
                  <UserFoodBigCard
                    key={foods[0]?._id}
                    foodId={foods[0]?._id}
                    weight={foods[0]?.foodWeight}
                    img={foods[0]?.foodImage?.publicUrl}
                    name={foods[0]?.foodName}
                    text={foods[0]?.foodDescription}
                    price={foods[0]?.foodPrice}
                    isAvailable={foods[0]?.isAvailable}
                    isAuther={isAuther}
                    resId={params?.resId}
                    resName={resName}
                    addImgShowFun={addImgShowFun}
                  />
              ) : (
                <></>
              )}
            </div>
            <div className="position-absolute end-0 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12 d-flex flex-wrap justify-content-xl-around justify-content-lg-around justify-content-md-center justify-content-sm-center justify-content-center">
              <div className="dis-xl-non d-lg-none d-md-none d-sm-block d-block">
                {foods !== undefined && foods?.length > 0 ? (
                  <FoodCart
                    key={foods[0]?._id}
                    foodId={foods[0]?._id}
                    weight={foods[0]?.foodWeight}
                    img={foods[0]?.foodImage?.publicUrl}
                    name={foods[0]?.foodName}
                    text={foods[0]?.foodDescription}
                    price={foods[0]?.foodPrice}
                    isAvailable={foods[0]?.isAvailable}
                    isAuther={isAuther}
                    resId={params?.resId}
                    resName={resName}
                    addImgShowFun={addImgShowFun}
                  />
                ) : (
                  <></>
                )}
              </div>
              {foods !== undefined && foods.length > 1 ? (
                foods.map((f, i) =>
                  i !== 0 ? (
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
                      resId={params?.resId}
                      resName={resName}
                      addImgShowFun={addImgShowFun}
                    />
                  ) : null
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="user-res-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
        <FoodFooterNav isAuther={isAuther} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default UserRes;
