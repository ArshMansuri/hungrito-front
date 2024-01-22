import React, { useEffect, useState } from "react";
import "./myCart.css";
import FoodHeader from "../../../Components/FoodHeader/FoodHeader";
import MyCartBox from "../../../Components/MyCartBox/MyCartBox";
import Skeleton from "../../../Components/Loaders/Skeleton";
import FoodFooterNav from "../../../Components/FoodFooterNav/FoodFooterNav";
import { useDispatch, useSelector } from "react-redux";
import { getMyCartDetail } from "../../../redux/actions/user";

const token = 25

const MyCart = ({ isAuther, isLoading = true }) => {
  const dispatch = useDispatch();
  const { isLoading: isCardLoading } = useSelector(
    (state) => state?.myCartDetail
  );

  const restu = useSelector((state)=> state?.myCartDetail?.cart?.restu)

  const total = useSelector((state)=> state?.myCartDetail?.cart?.total)
  
  const [isApplyToken, setIsApplyToken] = useState(false);
  const [subTotal, setSubTotal] = useState(undefined);
  const [mrp, setMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [deliveryCharg, setDeliveryCharg] = useState(0);

  useEffect(() => {
    dispatch(getMyCartDetail());
  }, [dispatch]);

  useEffect(()=>{
    if(total !== undefined){
      setMrp(total)
      setDiscount(0)
      setTax(Math.round(total * 0.18))
      setDeliveryCharg(45)
      if(isApplyToken){
        setSubTotal((total - token + (total * 0.18) + 45))
      } else{
        setSubTotal((total - 0 + (total * 0.18) + 45))
      }
    }
  }, [total, isApplyToken])

  const applayTokenHandler = () =>{
    if(isApplyToken){
      setSubTotal(subTotal + 25)
    } else {
      setSubTotal(subTotal - 25)
    }
    setIsApplyToken(!isApplyToken)
  }

  return (
    <div className="my-cart-page">
      <div className="food-page-header overflow-hidden w-100 overflow-visible shadow-sm position-fixed top-0 start-0 end-0">
        <FoodHeader isAuther={isAuther} isLoading={isLoading} />
      </div>
      {isLoading || isCardLoading ? (
        <div style={{ marginTop: "85px" }}>
          {" "}
          <Skeleton />{" "}
        </div>
      ) : (
        <>
        {
          total === 0 ? 
          <div style={{ marginTop: "85px" }}>Not Have Any Food</div> :
          <>
          <div className="container">
            <div className="row" style={{ marginTop: "85px" }}>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="my-cart-item-scrollbar">
                  {restu !== undefined && restu?.length > 0 ?
                    restu?.map((r, i) => (
                      <div key={r?.resId} className="ms-xl-1 ms-lg-1 ms-md-1 ms-sm-0 ms-0">
                        {r?.foods?.length > 0 &&
                          r?.foods?.map((f, j) => (
                            <MyCartBox
                              key={f?.foodId}
                              img={f?.foodImg}
                              name={f?.foodName}
                              price={f?.foodPrice}
                              subtotal={f?.subTotal}
                              qut={f?.foodQut}
                              foodId={f?.foodId}
                              resId={r?.resId}
                            />
                          ))}
                      </div>
                    )): null}
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-sm-5 mb-5">
                <div className="price-summary-box mt-3 p-3 mb-sm-5 mb-5">
                  <div className="heading">
                    <h4 className="text-dark text-center">Order Summary</h4>
                  </div>
                  {
                  subTotal !== undefined &&
                  <div>
                    <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                      <span>MRP</span>
                      <span>₹{mrp}</span>
                    </div>
                    <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                      <span>Discounts</span>
                      <span className="text-danger">-₹{discount}</span>
                    </div>
                    <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                      <span>Taxex & Charges</span>
                      <span>₹{tax}</span>
                    </div>
                    <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                      <span>Delivery Charges</span>
                      <span>₹{deliveryCharg}</span>
                    </div>
                    <div className="text-price text-secondary d-flex justify-content-between align-items-center my-2">
                      <span>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckChecked"
                            onChange={() => applayTokenHandler()}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            Apply Tokens
                          </label>
                        </div>
                      </span>
                      <span
                        className={`text-danger ${
                          isApplyToken ? "d-block" : "d-none"
                        }`}
                      >
                        -₹{token}
                      </span>
                    </div>
                    <h5 className="text-price text-dark d-flex justify-content-between my-2">
                      <span>Total Amount</span>
                      <span>₹{Math.round(subTotal)}</span>
                    </h5>
                  </div>
                  }
                  <hr />
                  <button className="my-cart-btn">Checkout</button>
                </div>
              </div>
            </div>
          </div>
         
          </>
        }
         
        </>
      )}
        <div className="food-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
            <FoodFooterNav isAuther={isAuther} isLoading={isLoading}  />
          </div>
    </div>
  );
};

export default MyCart;
