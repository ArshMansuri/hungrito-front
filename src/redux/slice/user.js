import { createSlice } from "@reduxjs/toolkit";
import { addToCart, decreaseQutInCart, getMyCartDetail, getNearestRestus, getUserResFoods, increaseQutInCart, placeCodOrder, placeOnlineOrder, removeFromCart, userLoad, userLogin, userPhoneOtpVerify, userSignUp } from "../actions/user";

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

export const nearestRestuReduser = createSlice({
  name: "user",
  initialState: {isLoading: false},
  extraReducers: (builder) => {
    builder.addCase(getNearestRestus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNearestRestus.fulfilled, (state, action) => {
      state.restus = action.payload?.restus || [];
      state.isLoading = false;
    });
    builder.addCase(getNearestRestus.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });
  }
})

export const userResFoodsReduser = createSlice({
  name: "user",
  initialState: {isLoading: false},
  extraReducers: (builder) => {
    builder.addCase(getUserResFoods.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserResFoods.fulfilled, (state, action) => {
      state.foods = action.payload?.foods || [];
      state.resName = action?.payload?.resName || ""
      state.isLoading = false;
    });
    builder.addCase(getUserResFoods.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });
  }
})

export const myCartDetailReduser = createSlice({
  name: "user",
  initialState: {isLoading: false},
  reducers:{
    updateMyCartDetail(state,action){
      const {resId, foodId, foodPrice, foodQut} = action?.payload
      const resIndex = state.cart.restu.findIndex(obj=> obj.resId === resId)
      const foodIndex = state.cart.restu[resIndex].foods.findIndex(obj => obj.foodId === foodId)
      state.cart.total -= (foodPrice * foodQut)
      state.cart.restu[resIndex].foods.splice(foodIndex, 1)
    },
    incresseMyCartDetail(state,action){
      const {resId, foodId, foodPrice} = action?.payload
      const resIndex = state.cart.restu.findIndex(obj=> obj.resId._id === resId)
      const foodIndex = state.cart.restu[resIndex].foods.findIndex(obj => obj.foodId === foodId)
      state.cart.restu[resIndex].foods[foodIndex].subTotal += foodPrice
      state.cart.total += foodPrice 
    },
    decreaseMyCartDetail(state, action){
      const {resId, foodId, foodPrice,} = action?.payload
      const resIndex = state.cart.restu.findIndex(obj=> obj.resId._id === resId)
      const foodIndex = state.cart.restu[resIndex].foods.findIndex(obj => obj.foodId === foodId)
      state.cart.restu[resIndex].foods[foodIndex].subTotal -= foodPrice
      state.cart.total -= foodPrice
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyCartDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMyCartDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action?.payload?.cart || []
    });
    builder.addCase(getMyCartDetail.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });
  }
})
export const addToCartReduser = createSlice({
  name: "user",
  initialState: {isLoading: false},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action?.payload?.message
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });
  }
})

export const removeFromCartReduser = createSlice({
  name: "user",
  initialState: {isLoading: false},
  extraReducers: (builder) => {
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action?.payload?.message
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });
  }
})

export const increaseQutInCartReduser = createSlice({
  name: "user",
  initialState: {isLoading: false},
  extraReducers: (builder) => {
    builder.addCase(increaseQutInCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(increaseQutInCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action?.payload?.message
    });
    builder.addCase(increaseQutInCart.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });
  }
})

export const decreaseQutInCartReduser = createSlice({
  name: "user",
  initialState: {isLoading: false},
  extraReducers: (builder) => {
    builder.addCase(decreaseQutInCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(decreaseQutInCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action?.payload?.message
    });
    builder.addCase(decreaseQutInCart.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
    });
  }
})

export const placeCodOrderReduser = createSlice({
  name: "user",
  initialState: {isLoading: false, success: false},
  reducers:{
    makePlaceCodSuccessFalse(state){
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(placeCodOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(placeCodOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action?.payload?.message
      state.success = true
    });
    builder.addCase(placeCodOrder.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
      state.success = false
    });
  }
})

export const placeOnlineOrderReduser = createSlice({
  name: "user",
  initialState: {isLoading: false, success: false},
  reducers:{
    makePlaceOnlineSuccessFalse(state){
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(placeOnlineOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(placeOnlineOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action?.payload?.message
      state.success = true
    });
    builder.addCase(placeOnlineOrder.rejected, (state, action) => {
      state.message = action.payload?.message || action.payload;
      state.isLoading = false;
      state.success = false
    });
  }
})

export const {updateMyCartDetail, incresseMyCartDetail, decreaseMyCartDetail} = myCartDetailReduser.actions 
export const {makePlaceCodSuccessFalse} = placeCodOrderReduser.actions 
export const {makePlaceOnlineSuccessFalse} = placeOnlineOrderReduser.actions 