import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const adminLogin = createAsyncThunk(
    "adminLogin",
    async ({ admin }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/admin/login`,
          {
            email: admin.email,
            password: admin.password,
          },
          { withCredentials: true }
        );
        localStorage.setItem("isAdmin", "true");
        console.log(data)
        return data;
      } catch (error) {
        localStorage.removeItem("isAdmin");
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

  export const adminLoad = createAsyncThunk(
    "adminLoad",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/admin/me`, {
          withCredentials: true,
        });
        localStorage.setItem("isAdmin", "true");
        console.log(data)
        return data;
      } catch (error) {
        localStorage.removeItem("isAdmin");
        console.log("catch error", error);
        return rejectWithValue(error.response?.data || "fail to login");
      }
    }
  );