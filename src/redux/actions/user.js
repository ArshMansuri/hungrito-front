import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// const BASE_URL = "https://hungritobackend.onrender.com"
// const BASE_URL = "http://localhost:6010"

const BASE_URL = process.env.REACT_APP_BASE_URL;

const tostOpstion = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
}

export const userLogin = createAsyncThunk(
  "userLogin",
  async ({ phone, pass }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        { phone, password: pass },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("isUser", "true");
      return data;
    } catch (error) {
      console.log("catch error", error);
      toast.error(`${error?.response?.data?.message || "fail to login"}`,tostOpstion);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const userSignUp = createAsyncThunk(
  "userSignUp",
  async ({ username, croppedImage, phone, pass }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/signUp`,
        { username, phone, password: pass, img: croppedImage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      toast.error(`${error?.response?.data?.message || "fail to login"}`, tostOpstion);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const userPhoneOtpVerify = createAsyncThunk(
  "userPhoneOtpVerify",
  async ({ phoneNum, otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/signUp/verify`,
        { phone: phoneNum, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("isUser", "true");
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const userLoad = createAsyncThunk(
  "userLoad",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/user/me`, {
        withCredentials: true,
      });
      localStorage.setItem("isUser", "true");
      return data;
    } catch (error) {
      localStorage.removeItem("isUser");
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const getNearestRestus = createAsyncThunk(
  "getNearestRestus",
  async ({ location, category, price, veg }, { rejectWithValue }) => {
    try {
      console.log(category)
      console.log(price)
      console.log(veg)
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/nearestrestu`,
        { longitude: location.longitude, latitude: location.latitude, category: category?.name, price: price?.name, veg: veg?.access},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const getSearchNearestRestus = createAsyncThunk(
  "getSearchNearestRestus",
  async ({ location, search }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/nearestrestu/search/res`,
        { longitude: location.longitude, latitude: location.latitude, search},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const getSearchDishNearestRestus = createAsyncThunk(
  "getSearchDishNearestRestus",
  async ({ location, search }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/nearestrestu/search/dish`,
        { longitude: location.longitude, latitude: location.latitude, search},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const getUserResFoods = createAsyncThunk(
  "getUserResFoods",
  async ({ resId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/user/rest/foods/${resId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const getMyCartDetail = createAsyncThunk(
  "getMyCartDetail",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/user/my/cart`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ foodInfo }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/addtocart`,
        { 
            resId: foodInfo?.resId, 
            foodId: foodInfo?.foodId,
            resName: foodInfo?.resName,
            foodName: foodInfo?.foodName,
            foodPrice: foodInfo?.foodPrice,
            foodQut: foodInfo?.foodQut,
            foodImg: foodInfo?.foodImg
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message, tostOpstion)
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async ({ foodInfo }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/user/removefromcart`,
        { 
            resId: foodInfo?.resId, 
            foodId: foodInfo?.foodId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message, tostOpstion)
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const increaseQutInCart = createAsyncThunk(
  "increaseQutInCart",
  async ({ foodInfo }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/user/update/cart`,
        { 
            resId: foodInfo?.resId, 
            foodId: foodInfo?.foodId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message, tostOpstion)
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const decreaseQutInCart = createAsyncThunk(
  "decreaseQutInCart",
  async ({ foodInfo }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/user/remove/cart`,
        { 
            resId: foodInfo?.resId, 
            foodId: foodInfo?.foodId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data)
      toast.success(data.message, tostOpstion)
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const placeCodOrder = createAsyncThunk(
  "placeCodOrder",
  async ({ orderInfo }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/order/create/cod`,
        { 
            isToken: orderInfo.isApplyToken,
            deliveryCharg: orderInfo.deliveryCharg,
            deliveryAddress: orderInfo.deliveryAddress
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data)
      if(data.success === true && data.orderId !== undefined){
        orderInfo.socket.emit("new-order-from-user", {orderId: data.orderId})
      }
      toast.success(data.message, tostOpstion)
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const placeOnlineOrder = createAsyncThunk(
  "placeOnlineOrder",
  async ({ orderInfo }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/order/create/online`,
        { 
            isToken: orderInfo.isApplyToken,
            deliveryCharg: orderInfo.deliveryCharg,
            deliveryAddress: orderInfo.deliveryAddress,
            paymentToken: orderInfo.paymentToken,
            paymentId: orderInfo.paymentId,
            paymentMethodId: orderInfo.paymentMethodId
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data)
      toast.success(data.message, tostOpstion)
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

export const getMySaveFoods = createAsyncThunk(
  "getMySaveFoods",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/user/my/save`, {withCredentials: true});
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get data");
    }
  }
);

