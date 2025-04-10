import { createSlice } from "@reduxjs/toolkit";
import {
  getResNewOrders,
  resEmailVerify,
  resLoad,
  resLogin,
  resLogout,
  resMakePhoneOtp,
  resOwnerMakePhoneOtp,
  resOwnerVerifyPhoneOtp,
  resSignUpFirstPage,
  resSignUpSecPage,
  resSignUpThirdPage,
  resVerifyPhoneOtp,
  restuSignUpVerify,
} from "../actions/restaurant";

const initialState = {
  isRestuAuther: false,
  isLoading: false,
  role: "restu",
  restu: {
    resName: "",
    password: "",
    resAddress: "",
    resCompletAddress: {},
    resPhone: {},
    resEmail: {},
    resOwnerPhone: {},
    resOwnerName: "",
    resOwnerEmail: {},
    resType: [],
    resCategory: [],
    resTime: [{}],
    resOpenDays: {},
    resFoodImage: {},
    resOffer: {},
  },
};

export const restuReduser = createSlice({
  name: "restu",
  initialState: initialState,
  reducers: {
    removeResName(state) {
      state.restu.resName = "";
    },
    removeResType(state) {
      state.restu.resType = [];
    },
  },
  extraReducers: (builder) => {
    // ================ Restaurant first email register  ================
    builder.addCase(restuSignUpVerify.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(restuSignUpVerify.fulfilled, (state, action) => {
      state.isLoading = false;
      state.restu.resEmail = action.payload?.restu?.resEmail;
      state.success = true;
    });
    builder.addCase(restuSignUpVerify.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant first email verify  ================
    builder.addCase(resEmailVerify.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resEmailVerify.fulfilled, (state, action) => {
      state.isLoading = false;
      state.restu.resEmail.isVerify = true;
      state.success = true;
      state.message = action.payload.message;
    });
    builder.addCase(resEmailVerify.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant make Phone Otp   ================
    builder.addCase(resMakePhoneOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resMakePhoneOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.restu.resPhone = action.payload?.restu || "";
      // state.restu.resPhone.isVerify = false
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(resMakePhoneOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant Phone Otp verify   ================
    builder.addCase(resVerifyPhoneOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resVerifyPhoneOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.restu.resPhone.isVerify = true;
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(resVerifyPhoneOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant make owner Phone Otp   ================
    builder.addCase(resOwnerMakePhoneOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resOwnerMakePhoneOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.restu.resOwnerPhone = action.payload?.restu || "";
      // state.restu.resPhone.isVerify = false
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(resOwnerMakePhoneOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant owner Phone Otp verify   ================
    builder.addCase(resOwnerVerifyPhoneOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resOwnerVerifyPhoneOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.restu.resOwnerPhone.isVerify = true;
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(resOwnerVerifyPhoneOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant First SignUp Page   ================
    builder.addCase(resSignUpFirstPage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resSignUpFirstPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.restu.resName = action.payload?.restu?.resName;
      state.restu.resAddress = action.payload?.restu?.resAddress;
      state.restu.resCompletAddress = action.payload?.restu?.resCompletAddress;
      state.restu.resOwnerName = action.payload?.restu?.resOwnerName;
      state.restu.resOwnerEmail = action.payload?.restu?.resOwnerEmail;
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(resSignUpFirstPage.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant Second SignUp Page   ================
    builder.addCase(resSignUpSecPage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resSignUpSecPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.restu.resType = action.payload?.restu?.resType;
      state.restu.resCategory = action.payload?.restu?.resCategory;
      state.restu.resTime = action.payload?.restu?.resTime;
      state.restu.resOpenDays = action.payload?.restu?.resOpenDays;
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(resSignUpSecPage.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant Third SignUp Page   ================
    builder.addCase(resSignUpThirdPage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resSignUpThirdPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.restu.resFoodImage = action.payload?.restu?.resFoodImage;
      state.restu.resOffer = action.payload?.restu?.resOffer;
      state.success = true;
      state.message = action.payload?.message || action.payload;
    });
    builder.addCase(resSignUpThirdPage.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant Load   ================
    builder.addCase(resLoad.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resLoad.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRestuAuther = action.payload?.restu?.isVerify || false;
      state.restu = action.payload.restu;
    });
    builder.addCase(resLoad.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant Login   ================
    builder.addCase(resLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRestuAuther = true;
      state.restu = action.payload.restu;
    });
    builder.addCase(resLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });

    // ================ Restaurant Logout   ================
    builder.addCase(resLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRestuAuther = false;
      state.restu = initialState;
    });
    builder.addCase(resLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      // state.success = false;
    });
  },
});

export const getResNewOrdersReduser = createSlice({
  name: "createFood",
  initialState: {
    isLoading: false,
  },
  reducers: {
    // makeCreateFoodSuccessFalse(state) {
    //   state.success = false;
    // },
    resRemoveOrder(state, action) {
      const ordIndex = state.orders.findIndex(
        (obj) => obj._id.toString() === action.payload.toString()
      );
      if (ordIndex !== -1) {
        state.orders.splice(ordIndex, 1);
      }
    },
    addResNewOrder(state, action) {
      if (action.payload !== undefined) {
        console.log(action.payload);
        state.orders.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    // ================ Restaurant get new orders   ================
    builder.addCase(getResNewOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getResNewOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload?.orders || [];
    });
    builder.addCase(getResNewOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || action.payload;
      state.success = false;
    });
  },
});

export const { removeResName, removeResType } = restuReduser.actions;
export const { resRemoveOrder, addResNewOrder } =
  getResNewOrdersReduser.actions;
