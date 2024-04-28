import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
};

export const dbSignUpVerify = createAsyncThunk(
  "dbSignUpVerify",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/delboy/fisrt/signup`,
        { dbEmail: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("isDelBoy", "true");
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const dbEmailVerify = createAsyncThunk(
  "dbEmailVerify",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/delboy/dbemail/verify`,
        { otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("isDelBoy", "true");
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const dbMakePhoneOtp = createAsyncThunk(
  "dbMakePhoneOtp",
  async ({ dbPhone }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/delboy/dbphone/makeotp`,
        { phone: dbPhone.phone },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const dbVerifyPhoneOtp = createAsyncThunk(
  "dbVerifyPhoneOtp",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/delboy/dbphone/verify`,
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

export const dbSignUpFirstPage = createAsyncThunk(
  "dbSignUpFirstPage",
  async ({ delBoy }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/delboy/primary/signup`,
        {
          dbName: delBoy.dbName,
          password: delBoy.password,
          dbAddress: delBoy.dbAddress,
          address: delBoy.dbComplateAddress.address,
          country: delBoy.dbComplateAddress.country,
          state: delBoy.dbComplateAddress.state,
          city: delBoy.dbComplateAddress.city,
          pincode: delBoy.dbComplateAddress.pincode,
          latitude: delBoy.dbComplateAddress.latitude,
          longitude: delBoy.dbComplateAddress.longitude,
          dbPhone: delBoy.dbPhone,
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

export const dbSignUpSecondPage = createAsyncThunk(
  "dbSignUpSecondPage",
  async ({ delBoy }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/delboy/last/signup`,
        {
          dbImg: delBoy.dbImg,
          dbVehicleImg: delBoy.dbVehicleImg,
          dbLicenseImg: delBoy.dbLicenseImg,
        },
        { withCredentials: true }
      );
      // console.log(data);
      localStorage.removeItem("isDelBoy")
      toast.success(data?.message, tostOpstion)
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const dbLogin = createAsyncThunk(
  "resLogin",
  async ({ delBoy }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/delboy/login`,
        {
          phone: delBoy.phone,
          password: delBoy.password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("isDelBoy", "true");
      return data;
    } catch (error) {
      localStorage.removeItem("isDelBoy");
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

export const dbLogout = createAsyncThunk(
  "dbLogout",
  async ({_}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/delboy/logout`,
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
      localStorage.removeItem("isDelBoy")
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

export const dbLoad = createAsyncThunk(
  "dbLoad",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/delboy/me`, {
        withCredentials: true,
      });
      localStorage.setItem("isDelBoy", "true");
      return data;
    } catch (error) {
      localStorage.removeItem("isDelBoy");
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);

export const getDbNewOrders = createAsyncThunk(
  "getDbNewOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/delboy/neworders`,{
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to login");
    }
  }
);