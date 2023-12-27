import { createSlice } from "@reduxjs/toolkit";
import { userLoad, userLogin, userPhoneOtpVerify, userSignUp } from "../actions/user";

const initialState = {
  isAuther: false,
  isLoading: false,
  role:"user"
};
export const userReduser = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    // ==================user Login ===============
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isAuther = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });

    // ==================user SignUp ===============
    builder.addCase(userSignUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.success = true
    });
    builder.addCase(userSignUp.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });

    // ==================user Phone OTP Verify ===============
    builder.addCase(userPhoneOtpVerify.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userPhoneOtpVerify.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isLoading = false;
      state.isAuther = true;
      state.message = action.payload.message
    });
    builder.addCase(userPhoneOtpVerify.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });

    // ==================user load ===============
    builder.addCase(userLoad.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLoad.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuther = true;
      state.user = action.payload.user;
    });
    builder.addCase(userLoad.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });
  },
});
