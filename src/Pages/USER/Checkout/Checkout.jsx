import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./checkout.css";
import FoodHeader from "../../../Components/FoodHeader/FoodHeader";
import { useDispatch, useSelector } from "react-redux";
import { placeOnlineOrder } from "../../../redux/actions/user";
import Skeleton from "../../../Components/Loaders/Skeleton";
import { makePlaceOnlineSuccessFalse } from "../../../redux/slice/user";

const tostOpstion = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const stripePromise = loadStripe(
  "pk_test_51Oc0CJSAzYrH8yGDQBV7U81W1nUxggDwLGfuEzwtUGbbrT0FOA7fz44QufA6FJxQbYa73jRrCxqOhGs2TesKg78T00MRlkdYvr"
);

const Checkout = ({ isAuther, isLoading = true }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const paymentToken = location.state?.paymentToken || undefined;
  const deliveryAddress = location.state?.deliveryAddress || undefined;
  const isApplyToken = location.state?.isApplyToken || false;
  const deliveryCharg = location.state?.deliveryCharg || undefined;
console.log(paymentToken, deliveryAddress, isApplyToken, deliveryCharg)
  useEffect(() => {
    if (
      !paymentToken ||
      !deliveryAddress ||
      isApplyToken === undefined ||
      !deliveryCharg
    ) {
      toast.error("Somthing went wrong", tostOpstion);
      return navigate("/my/cart");
    }
  }, [navigate, paymentToken, deliveryCharg, isApplyToken, deliveryAddress]);


  const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { success } = useSelector((state) => state.placeOnlineOrder);

    const [isProcessing, setIsProcessing] = useState();

    useEffect(() => {
      if (success) {
        dispatch(makePlaceOnlineSuccessFalse());
        return navigate("/");
      }
    }, [success, dispatch]);

    const onlineOrderHendler = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) {
        return toast.error("Somthing went wrong", tostOpstion);
      }

      setIsProcessing(true);
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required"
      });



      if (error) {
        console.log(error);
        setIsProcessing(false);
        return toast.error(
          error?.message || "Somthing went wrong",
          tostOpstion
        );
      }

      if (paymentIntent.status === "succeeded") {
        if (
          deliveryAddress.lat === null ||
          deliveryAddress.lon === null ||
          deliveryAddress.doorFlat === "" ||
          deliveryAddress.landMark === "" ||
          deliveryCharg === undefined
        ) {
          setIsProcessing(false);
          return toast.error("Enter Location Details", tostOpstion);
        }
        const orderInfo = {
          deliveryAddress,
          isApplyToken,
          deliveryCharg,
          paymentToken
        };
        dispatch(placeOnlineOrder({ orderInfo }));
        setIsProcessing(false)
      }
    };
    return (
      <div className="form--checkout-container">
        <form onSubmit={onlineOrderHendler} className="d-flex flex-column ">
          <PaymentElement />
          <button type="submit" disabled={isProcessing} className="mt-4">
            {isProcessing ? "Pocessing..." : "Pay"}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <div className="food-page-header overflow-hidden w-100 overflow-visible shadow-sm position-fixed top-0 start-0 end-0">
        <FoodHeader isAuther={isAuther} isLoading={isLoading} />
      </div>
      <div style={{ marginTop: "95px" }}>
        {paymentToken ? (
          <Elements
            options={{
              clientSecret: paymentToken,
            }}
            stripe={stripePromise}
          >
            <CheckOutForm />
          </Elements>
        ) : (
          <Skeleton count={20} />
        )}
      </div>
    </div>
  );
};

export default Checkout;
