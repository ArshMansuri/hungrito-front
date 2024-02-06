import { createSlice } from "@reduxjs/toolkit";
import {
  dbEmailVerify,
  dbLoad,
  dbMakePhoneOtp,
  dbSignUpFirstPage,
  dbSignUpSecondPage,
  dbSignUpVerify,
  dbVerifyPhoneOtp,
} from "../actions/delBoy";

const initialState = {
  isDbAuther: false,
  isLoading: false,
  role: "delBoy",
  delBoy: {
    dbName: "",
    password: "",
    dbAddress: "",
    dbCompletAddress: {},
    dbPhone: {},
    dbEmail: {},
    resOwnerPhone: {},
  },
};

export const delBoyReduser = createSlice({
  name: "restu",
  initialState: initialState,
  reducers:{
    removeDbName(state){
        state.delBoy.dbName = ""
    }
  },
  extraReducers: (builder) => {
    // ================ delivery boy first email register  ================
    builder.addCase(dbSignUpVerify.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbSignUpVerify.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delBoy.dbEmail = action.payload?.delBoy?.dbEmail;
      state.success = true;
    });
    builder.addCase(dbSignUpVerify.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ delivery boy first email verify  ================
    builder.addCase(dbEmailVerify.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbEmailVerify.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delBoy.dbEmail.isVerify = true;
      state.success = true;
      state.message = action.payload.message;
    });
    builder.addCase(dbEmailVerify.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ delivery boy make Phone Otp   ================
    builder.addCase(dbMakePhoneOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbMakePhoneOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delBoy.dbPhone = action.payload?.delBoy || {};
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(dbMakePhoneOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ delivery boy Phone Otp verify   ================
    builder.addCase(dbVerifyPhoneOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbVerifyPhoneOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delBoy.dbPhone={isVerify: true}
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(dbVerifyPhoneOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ delivery boy First SignUp Page   ================
    builder.addCase(dbSignUpFirstPage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbSignUpFirstPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delBoy.dbName = action.payload?.delBoy?.dbName;
      state.delBoy.dbAddress = action.payload?.delBoy?.dbAddress;
      state.delBoy.dbCompletAddress = action.payload?.delBoy?.dbCompletAddress;
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(dbSignUpFirstPage.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ delivery boy Third SignUp Page   ================
    builder.addCase(dbSignUpSecondPage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbSignUpSecondPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delBoy.dbImg = action.payload?.delBoy?.dbImg;
      state.delBoy.dbVehicleImg = action.payload?.delBoy?.dbVehicleImg;
      state.delBoy.dbLicenseImg = action.payload?.delBoy?.dbLicenseImg;
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(dbSignUpSecondPage.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ delivery boy Load   ================
    builder.addCase(dbLoad.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbLoad.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDbAuther = action.payload?.delBoy?.isVerify || false;
      state.delBoy = action.payload.delBoy;
    });
    builder.addCase(dbLoad.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });
  },
});

export const {removeDbName} = delBoyReduser.actions
