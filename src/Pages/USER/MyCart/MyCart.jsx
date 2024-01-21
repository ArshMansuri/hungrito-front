import React, { useState } from "react";
import "./myCart.css";
import FoodHeader from "../../../Components/FoodHeader/FoodHeader";
import MyCartBox from "../../../Components/MyCartBox/MyCartBox";
import FoodFooterNav from "../../../Components/FoodFooterNav/FoodFooterNav";

const MyCart = ({ isAuther, isLoading = true }) => {

    const [isApplyToken, setIsApplyToken] = useState(false)

  return (
    <div className="my-cart-page">
      <div className="food-page-header overflow-hidden w-100 overflow-visible shadow-sm position-fixed top-0 start-0 end-0">
        <FoodHeader isAuther={isAuther} isLoading={isLoading} />
      </div>

      <div className="container">
        <div className="row" style={{ marginTop: "85px" }}>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="my-cart-item-scrollbar">
              <MyCartBox />
              <MyCartBox />
              <MyCartBox />
              <MyCartBox />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-sm-5 mb-5">
            <div className="price-summary-box mt-3 p-3 mb-sm-5 mb-5">
              <div className="heading">
                <h4 className="text-dark text-center">Order Summary</h4>
              </div>
              <div>
                <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                    <span>MRP</span>
                    <span>₹600</span>
                </div>
                <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                    <span>Discounts</span>
                    <span className="text-danger">-₹50</span>
                </div>
                <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                    <span>Taxex & Charges</span>
                    <span>₹30</span>
                </div>
                <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                    <span>Delivery Charges</span>
                    <span>₹45</span>
                </div>
                <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                <span>
                <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckChecked"
                      onChange={()=>setIsApplyToken(!isApplyToken)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Apply Tokens
                    </label>
                  </div>
                  </span>
                  <span className={`text-danger ${isApplyToken ? 'd-block' : 'd-none'}`}>-₹22</span>
                </div>
                <h5 className="text-price text-dark d-flex justify-content-between my-2">
                    <span>Delivery Charges</span>
                    <span>₹603</span>
                </h5>
              </div>
              <hr />
              <button className="my-cart-btn">Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <div className="food-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
        <FoodFooterNav isAuther={isAuther} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default MyCart;
