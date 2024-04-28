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

export const restuSignUpVerify = createAsyncThunk(
  "restuSignUpVerify",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/fisrt/signup`,
        { resEmail: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("isRestu", "true");
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resEmailVerify = createAsyncThunk(
  "resEmailVerify",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/restuemail/verify`,
        { otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("isRestu", "true");
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resMakePhoneOtp = createAsyncThunk(
  "resMakePhoneOtp",
  async ({ resPhone }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/resphone/makeotp`,
        { phone: resPhone.phone },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resVerifyPhoneOtp = createAsyncThunk(
  "resVerifyPhoneOtp",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/resphone/verify`,
        { otp },
        { withCredentials: true }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resOwnerMakePhoneOtp = createAsyncThunk(
  "resOwnerMakePhoneOtp",
  async ({ resOwnerPhone }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/resownerphone/makeotp`,
        { phone: resOwnerPhone.phone },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resOwnerVerifyPhoneOtp = createAsyncThunk(
  "resOwnerVerifyPhoneOtp",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/resownerphone/verify`,
        { otp },
        { withCredentials: true }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resSignUpFirstPage = createAsyncThunk(
  "resSignUpFirstPage",
  async ({ restu }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/primary/signup`,
        {
          resName: restu.resName,
          password: restu.password,
          resAddress: restu.resAddress,
          address: restu.resComplateAddress.address,
          country: restu.resComplateAddress.country,
          state: restu.resComplateAddress.state,
          city: restu.resComplateAddress.city,
          pincode: restu.resComplateAddress.pincode,
          latitude: restu.resComplateAddress.latitude,
          longitude: restu.resComplateAddress.longitude,
          resPhone: restu.resPhone,
          resOwnerPhone: restu.resOwnerPhone,
          resOwnerEmail: restu.resOwnerEmail,
          resOwnerName: restu.resOwnerName,
        },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resSignUpSecPage = createAsyncThunk(
  "resSignUpSecPage",
  async ({ restu }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/secondary/signup`,
        {
          resType: restu.resType,
          resCategory: restu.resCategory,
          resTime: restu.resTime,
          sun: restu.days.sun,
          mon: restu.days.mon,
          tues: restu.days.tues,
          wed: restu.days.wed,
          thurs: restu.days.thurs,
          fri: restu.days.fri,
          sat: restu.days.sat,
        },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resSignUpThirdPage = createAsyncThunk(
  "resSignUpThirdPage",
  async ({ restu }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/last/signup`,
        {
          img: restu.img,
          isOffer: restu.isOffer,
          offer: restu.offer,
        },
        { withCredentials: true }
      );
      // console.log(data);
      localStorage.removeItem("isRestu")
      toast.success(data?.message, tostOpstion)
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resLogin = createAsyncThunk(
  "resLogin",
  async ({ restu }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/login`,
        {
          email: restu.email,
          password: restu.password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("isRestu", "true");
      return data;
    } catch (error) {
      localStorage.removeItem("isRestu");
      toast.error(`${error?.response?.data?.message || "fail to login"}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resLogout = createAsyncThunk(
  "resLogout",
  async ({_}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/restaurant/logout`,
        { withCredentials: true }
      );
      toast.success("Logout Successfully", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      localStorage.removeItem("isRestu")
      return data;
    } catch (error) {
      toast.error(`${error?.response?.data?.message || "fail to login"}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const resLoad = createAsyncThunk(
  "resLoad",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/restaurant/me`, {
        withCredentials: true,
      });
      localStorage.setItem("isRestu", "true");
      return data;
    } catch (error) {
      localStorage.removeItem("isRestu");
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const getResNewOrders = createAsyncThunk(
  "getResNewOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/restaurant/neworders`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);
