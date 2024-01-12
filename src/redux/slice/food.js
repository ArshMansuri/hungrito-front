import { createSlice } from "@reduxjs/toolkit";
import { createFood, getResFoodList } from "../actions/food";

const initialState = {
    isLoading: false,
}

export const createFoodReduser = createSlice({
    name: 'createFood',
    initialState: initialState,
    extraReducers: (builder)=>{
        builder.addCase(createFood.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(createFood.fulfilled, (state, action)=>{
            state.isLoading = false
            state.message = action.payload?.message
            state.success = true
        })
        builder.addCase(createFood.rejected, (state, action)=>{
            state.isLoading = false
            state.message = action.payload?.message || action.payload
            state.success = false
        })
    }
})

export const getResFoodListReduser = createSlice({
    name: 'resFoodList',
    initialState: initialState,
    extraReducers: (builder)=>{
        builder.addCase(getResFoodList.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(getResFoodList.fulfilled, (state, action)=>{
            state.isLoading = false
            state.foodList = action.payload?.foods
            state.success = true
        })
        builder.addCase(getResFoodList.rejected, (state, action)=>{
            state.isLoading = false
            state.message = action.payload?.message || action.payload
            state.success = false
        })
    }
})