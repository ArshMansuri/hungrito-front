import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// const BASE_URL = "https://hungritobackend.onrender.com"
const BASE_URL = "http://localhost:6010";

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
