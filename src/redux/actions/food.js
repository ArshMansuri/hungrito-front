import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://hungritobackend.onrender.com"
// const BASE_URL = "http://localhost:6010";

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

export const createFood = createAsyncThunk(
  "crateFood",
  async ({ food }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/restaurant/food/create`,
        {
          foodName: food?.foodName,
          img: food?.img,
          foodPrice: food?.foodPrice,
          foodType: food?.foodType,
          foodCategory: food?.foodCategory,
          foodDescription: food?.foodDescription,
          foodWeight: food?.foodWeight,
          foodOffer: food?.foodOffer,
        },
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      toast.error(
        `${error?.response?.data?.message || "fail to create food"}`,
        tostOpstion
      );
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to create food");
    }
  }
);

export const getResFoodList = createAsyncThunk(
  "getResFoodList",
  async (_, { rejectWithValue }) => {
    try {
        const {data} = await axios.get( `${BASE_URL}/api/v1/restaurant/food/list`, {withCredentials: true})
        return data
    } catch (error) {
      toast.error(
        `${error?.response?.data?.message || "fail to get food list"}`,
        tostOpstion
      );
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get food list");
    }
  }
);

export const getResSingleFood = createAsyncThunk(
  "getResSingleFood",
  async ({foodId}, { rejectWithValue }) => {
    try {
        const {data} = await axios.get( `${BASE_URL}/api/v1/restaurant/food/${foodId}`, {withCredentials: true})
        return data
    } catch (error) {
      toast.error(
        `${error?.response?.status !== 500 ? error?.response?.data?.message : "fail to get food detail"}`,
        tostOpstion
      );
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get food list");
    }
  }
);

export const updateResFood = createAsyncThunk(
  "updateResFood",
  async ({food}, { rejectWithValue }) => {
    try {
        const {data} = await axios.put( `${BASE_URL}/api/v1/restaurant/food/update/${food.foodId}`, 
        {
          foodName: food?.foodName,
          img: food?.img,
          foodPrice: food?.foodPrice,
          foodType: food?.foodType,
          foodCategory: food?.foodCategory,
          foodDescription: food?.foodDescription,
          foodWeight: food?.foodWeight,
          foodOffer: food?.foodOffer,
        },
        {withCredentials: true})
        toast.success(data.message, tostOpstion)
        return data
    } catch (error) {
      toast.error(
        `${error?.response?.status !== 500 ? error?.response?.data?.message : "fail to get food detail"}`,
        tostOpstion
      );
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get food list");
    }
  }
);

export const updateResFoodIsAvailable = createAsyncThunk(
  "updateResFoodIsAvailable",
  async ({food}, { rejectWithValue }) => {
    try {
        const {data} = await axios.put( `${BASE_URL}/api/v1/restaurant/food/update/isAvalilable/${food.foodId}`, 
        {
          isAvailable: food?.isAvailable
        },
        {withCredentials: true})
        toast.success(data.message, tostOpstion)
        return data
    } catch (error) {
      toast.error(
        `${error?.response?.status !== 500 ? error?.response?.data?.message : "fail to get food detail"}`,
        tostOpstion
      );
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get food list");
    }
  }
);
export const deleteResFood = createAsyncThunk(
  "deleteResFood",
  async ({foodId}, { rejectWithValue }) => {
    try {
        const {data} = await axios.delete( `${BASE_URL}/api/v1/restaurant/food/delete/${foodId}`,
        {withCredentials: true})
        console.log(data)
        toast.success(data.message, tostOpstion)
        return data
    } catch (error) {
      toast.error(
        `${error?.response?.status !== 500 ? error?.response?.data?.message : "fail to get food detail"}`,
        tostOpstion
      );
      console.log("catch error", error);
      return rejectWithValue(error.response?.data || "fail to get food list");
    }
  }
);
