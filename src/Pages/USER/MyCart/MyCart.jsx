import React, { useEffect, useRef, useState } from "react";
import "./myCart.css";
import FoodHeader from "../../../Components/FoodHeader/FoodHeader";
import MyCartBox from "../../../Components/MyCartBox/MyCartBox";
import Skeleton from "../../../Components/Loaders/Skeleton";
import FoodFooterNav from "../../../Components/FoodFooterNav/FoodFooterNav";
import { useDispatch, useSelector } from "react-redux";
import { getMyCartDetail, placeCodOrder } from "../../../redux/actions/user";
import { makePlaceCodSuccessFalse } from "../../../redux/slice/user";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { toast } from "react-toastify";
import axios from "axios";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

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

const MyCart = ({ isAuther, isLoading = true, socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  const { isLoading: isCardLoading } = useSelector(
    (state) => state?.myCartDetail
  );

  const restu = useSelector((state) => state?.myCartDetail?.cart?.restu);
  const total = useSelector((state) => state?.myCartDetail?.cart?.total);
  const { token } = useSelector((state) => state.user.user);
  const { success } = useSelector((state) => state.placeCodOrder);

  const [isApplyToken, setIsApplyToken] = useState(false);
  const [subTotal, setSubTotal] = useState(undefined);
  const [mrp, setMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [deliveryCharg, setDeliveryCharg] = useState(0);
  const [showLoactionPopUp, setShowLoactionPopUp] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    lat: null,
    lon: null,
    doorFlat: "",
    landMark: "",
  });
  const [km, setKm] = useState(0);

  useEffect(() => {
    dispatch(getMyCartDetail({}));
  }, [dispatch]);

  useEffect(() => {
    if (total !== undefined) {
      setMrp(total);
      setDiscount(0);
      setTax(Math.round(total * 0.18));
      setDeliveryCharg(Math.round(km * 10));
      if (isApplyToken) {
        if(token < 50){
          setSubTotal(total - token + total * 0.18 + Math.round(km * 10));
        } else {
          setSubTotal(total - 50 + total * 0.18 + Math.round(km * 10));
        }
      } else {
        setSubTotal(total - 0 + total * 0.18 + Math.round(km * 10));
      }
    }
  }, [total, isApplyToken, token, km]);

  useEffect(() => {
    if (success) {
      dispatch(makePlaceCodSuccessFalse());
      return navigate("/");
    }
  }, [success, navigate, dispatch]);

  useEffect(() => {

    if (map.current) {
      map.current.off();
      map.current.remove();
      map.current = null;
    }

    if (mapContainer.current && !map.current) {
      map.current = L.map(mapContainer.current).setView(
        [23.03108310471535, 72.5736169583829],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map.current);

      const tempLatLong = JSON.parse(localStorage.getItem("city"));
      if (tempLatLong.lat !== undefined && tempLatLong.lan !== undefined) {
        map.current.flyTo([tempLatLong.lat, tempLatLong.lan], 15);
      }

      if (deliveryAddress.lat !== null && deliveryAddress.lon !== null) {
        if (marker.current) {
          map.current.removeLayer(marker.current);
        }

        marker.current = L.marker([
          deliveryAddress.lat,
          deliveryAddress.lon,
        ]).addTo(map.current);
      }

      map.current.on("click", async (event) => {
        const { lat, lng } = event.latlng;

        if (marker.current) {
          map.current.removeLayer(marker.current);
        }

        marker.current = L.marker([lat, lng]).addTo(map.current);

        setDeliveryAddress((p) => ({ ...p, lat: lat, lon: lng }));
      });
    }
    return () => {
      if (map.current) {
        map.current.off();
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapContainer, map, marker, showLoactionPopUp]);

  const applayTokenHandler = () => {
    if (isApplyToken) {
      setSubTotal(subTotal + 25);
    } else {
      setSubTotal(subTotal - 25);
    }
    setIsApplyToken(!isApplyToken);
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return parseFloat(distance.toFixed(2));
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const saveLocationHendler = () => {
    if (
      deliveryAddress.lat === null ||
      deliveryAddress.lon === null ||
      deliveryAddress.doorFlat === "" ||
      deliveryAddress.landMark === ""
    ) {
      return toast.error("Enter Location Details", tostOpstion);
    }
    if (restu === undefined || restu?.length <= 0) {
      return toast.error("Somthing went wrong", tostOpstion);
    }

    let distance = 0;
    if (restu.length > 1) {
      for (let i = 0; i < restu.length - 1; i++) {
        const tempDis = calculateDistance(
          restu[i].resId.resLatLong.coordinates[1],
          restu[i].resId.resLatLong.coordinates[0],
          restu[i + 1].resId.resLatLong.coordinates[1],
          restu[i + 1].resId.resLatLong.coordinates[0]
        );
        distance += tempDis;
      }
    }
    const userDistance = calculateDistance(
      restu[restu.length - 1].resId.resLatLong.coordinates[1],
      restu[restu.length - 1].resId.resLatLong.coordinates[0],
      deliveryAddress.lat,
      deliveryAddress.lon
    );
    distance += userDistance;
    if (distance > 16) {
      return toast.error(
        "We don't provide service on your location",
        tostOpstion
      );
    }
    setKm(parseFloat(distance.toFixed(2)));
    console.log(parseFloat(distance.toFixed(2)));
    setDeliveryCharg(Math.round(parseFloat(distance.toFixed(2)) * 10));
    setShowLoactionPopUp(false);
  };

  const codHendler = () => {
    if (
      deliveryAddress.lat === null ||
      deliveryAddress.lon === null ||
      deliveryAddress.doorFlat === "" ||
      deliveryAddress.landMark === "" ||
      deliveryCharg === undefined
    ) {
      return toast.error("Enter Location Details", tostOpstion);
    }
    const orderInfo = {
      deliveryAddress,
      isApplyToken,
      deliveryCharg,
      socket
    };
    dispatch(placeCodOrder({ orderInfo }));
  };

  const makeClientSecret = async() => {
    if (
      deliveryAddress.lat === null ||
      deliveryAddress.lon === null ||
      deliveryAddress.doorFlat === "" ||
      deliveryAddress.landMark === "" ||
      deliveryCharg === undefined
    ) {
      return toast.error("Enter Location Details", tostOpstion);
    }
    if(!subTotal || subTotal === 0){
      return toast.error("Somthing want wrong", tostOpstion);
    }
   try {
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/payment/create`, {
      amount: Math.round(subTotal)
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    return navigate('/user/checkout',{state:{paymentToken: data.paymentToken, deliveryAddress, isApplyToken:isApplyToken, deliveryCharg}});
   } catch (error) {
    console.log("catch error", error);
    toast.error(`${error?.response?.data?.message || "fail to login"}`,tostOpstion);
   }
  };

  return (
    <div className="my-cart-page">
      <div className="food-page-header overflow-hidden w-100 overflow-visible shadow-sm position-fixed top-0 start-0 end-0">
        <FoodHeader isAuther={isAuther} isLoading={isLoading} />
      </div>
      {isLoading || isCardLoading ? (
        <div style={{ marginTop: "85px" }}>
          <Skeleton />
        </div>
      ) : (
        <>
          {total === 0 ? (
            <div style={{ marginTop: "85px" }}>Not Have Any Food</div>
          ) : (
            <>
              <div className="container">
                <div className="row" style={{ marginTop: "85px" }}>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="my-cart-item-scrollbar">
                      {restu !== undefined && restu?.length > 0
                        ? restu?.map((r, i) => (
                            <div
                              key={r?._id}
                              className="ms-xl-1 ms-lg-1 ms-md-1 ms-sm-0 ms-0"
                            >
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
                                    resId={r?.resId._id}
                                  />
                                ))}
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-sm-5 mb-5">
                    <div className="price-summary-box mt-3 p-3 mb-2">
                      <div
                        className="d-flex justify-content-between align-items-center cursor-pointer"
                        onClick={() => setShowLoactionPopUp(true)}
                      >
                        <span>Set Dilivery Location</span>
                        <span className="mb-1">
                          <FaLocationDot color="#ff6600" size={22} />
                        </span>
                      </div>
                    </div>
                    <div className="price-summary-box mt-3 p-3 mb-sm-5 mb-5">
                      <div className="heading">
                        <h4 className="text-dark text-center">Order Summary</h4>
                      </div>
                      {subTotal !== undefined && (
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
                      )}
                      <hr />
                      <button
                        className="my-cart-btn cod-btn"
                        onClick={codHendler}
                      >
                        COD
                      </button>
                      <button
                        className="my-cart-btn mt-2"
                        onClick={makeClientSecret}
                      >
                        Online
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {showLoactionPopUp && (
        <div className="position-absolute w-100 top-0 d-flex justify-content-center py-2">
          <div
            className="cart-location-popup bg-white"
            style={{ marginTop: "85px" }}
          >
            <div className="close-icon d-flex justify-content-end pe-3 pt-2">
              <IoMdClose
                size={24}
                className="cursor-pointer"
                onClick={() => setShowLoactionPopUp(false)}
              />
            </div>
            <div
              className="cart-map-container w-100 mt-1"
              style={{ height: "300px", overflow: "hidden" }}
            >
              <div
                ref={mapContainer}
                style={{
                  width: "100%",
                  height: "300px",
                  // zIndex: `${citys.length > 0 ? "-10" : 0}`,
                }}
              />
            </div>
            <div className="cart-location-input-container d-flex justify-content-center align-items-center flex-column m-2">
              <input
                type="text"
                placeholder="Door / Flat no"
                className="border w-100 input my-1"
                value={deliveryAddress.doorFlat}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...deliveryAddress,
                    doorFlat: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Landmark"
                className="border w-100 input my-1"
                value={deliveryAddress.landMark}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...deliveryAddress,
                    landMark: e.target.value,
                  })
                }
              />
              <button
                className="my-cart-btn mt-1"
                onClick={saveLocationHendler}
              >
                Save Location
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="food-footer-page d-xl-none d-lg-none d-md-none d-sm-block d-block position-fixed bottom-0 start-0 end-0 bg-white shadow-lg">
        <FoodFooterNav isAuther={isAuther} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default MyCart;
