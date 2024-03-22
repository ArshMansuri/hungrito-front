import { createSlice } from "@reduxjs/toolkit";
import { adminLoad, adminLogin } from "../actions/admin";

const initialState = {
    isAdminAuther: false,
    isLoading: false
}

export const adminReduser = createSlice({
    name: "admin",
    initialState: initialState,
    extraReducers: (builder) => {
      // ================ Restaurant Login   ================
      builder.addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdminAuther = true;
        state.admin = action.payload.admin;
      });
      builder.addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message || action.payload;
        state.success = false;
      });

      // ================ Restaurant Load   ================
      builder.addCase(adminLoad.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(adminLoad.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdminAuther = true;
        state.admin = action.payload?.admin;
      });
      builder.addCase(adminLoad.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message || action.payload;
        state.success = false;
      });
    },
  });