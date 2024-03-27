import { createSlice } from "@reduxjs/toolkit";
import {
  dbEmailVerify,
  dbLoad,
  dbLogin,
  dbLogout,
  dbMakePhoneOtp,
  dbSignUpFirstPage,
  dbSignUpSecondPage,
  dbSignUpVerify,
  dbVerifyPhoneOtp,
  getDbNewOrders,
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
    dbImg: {},
    dbVehicleImg: {},
    dbLicenseImg: {},
  },
  activeOrdId: null
};

export const delBoyReduser = createSlice({
  name: "restu",
  initialState: initialState,
  reducers: {
    removeDbName(state) {
      state.delBoy.dbName = "";
    },
    addActiveOrdUserId(state,action){
      console.log(action?.payload)
      state.activeOrdId = action?.payload || null
    },
    removeActiveOrdUserId(state){
      state.activeOrdId = null
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
      state.delBoy.dbPhone.isShowModal = false;
    });
    builder.addCase(dbMakePhoneOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delBoy.dbPhone = action.payload?.delBoy || {};
      state.delBoy.dbPhone.isShowModal = true;
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(dbMakePhoneOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.delBoy.dbPhone.isShowModal = false;
      state.success = false;
    });

    // ================ delivery boy Phone Otp verify   ================
    builder.addCase(dbVerifyPhoneOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbVerifyPhoneOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delBoy.dbPhone.isVerify = true;
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

    // ================ delivery boy Second SignUp Page   ================
    builder.addCase(dbSignUpSecondPage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbSignUpSecondPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delBoy.dbImg = action.payload?.delBoy?.dbImage;
      state.delBoy.dbVehicleImg = action.payload?.delBoy?.dbVehicleImage;
      state.delBoy.dbLicenseImg = action.payload?.delBoy?.dbLicenseImage;
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
      state.activeOrdId = action.payload?.userId || null;
    });
    builder.addCase(dbLoad.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ delivery boy Login   ================
    builder.addCase(dbLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDbAuther = true;
      state.delBoy = action.payload.delBoy;
    });
    builder.addCase(dbLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ delivery boy Logout   ================
    builder.addCase(dbLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dbLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDbAuther = false;
      state.delBoy = initialState;
    });
    builder.addCase(dbLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });
  },
});

export const getDbNewOrdersReduser = createSlice({
  name: "createFood",
  initialState: {
    isLoading: false
  },
  reducers: {
    // makeCreateFoodSuccessFalse(state) {
    //   state.success = false;
    // },
    dbRemoveOrder(state){
      state.orders = undefined
    },
    addDbNewOrder(state, action){
      if(action.payload !== undefined){
        console.log(action.payload)
        state.orders = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    // ================ Restaurant get new orders   ================
    builder.addCase(getDbNewOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDbNewOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload?.orders || [];
    });
    builder.addCase(getDbNewOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });
  },
});

export const { removeDbName, addActiveOrdUserId, removeActiveOrdUserId } = delBoyReduser.actions;
export const { addDbNewOrder, dbRemoveOrder } = getDbNewOrdersReduser.actions;
