import { createSlice } from "@reduxjs/toolkit";
import { createFood, deleteResFood, getResFoodList, getResSingleFood, updateResFood, updateResFoodIsAvailable } from "../actions/food";

const initialState = {
    isLoading: false,
}

export const createFoodReduser = createSlice({
    name: 'createFood',
    initialState: initialState,
    reducers:{
        makeCreateFoodSuccessFalse(state){
            state.success = false
        }
    },
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
    reducers:{
        foodListIsAvailableUpdate(state,action){
            const index = state.foodList.findIndex(obj=> obj._id === action.payload.foodId)
            state.foodList[index].isAvailable = action.payload.value
        }
    },
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
export const getResSingleFoodReduser = createSlice({
    name: 'resSingleFood',
    initialState: initialState,
    extraReducers: (builder)=>{
        builder.addCase(getResSingleFood.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(getResSingleFood.fulfilled, (state, action)=>{
            state.isLoading = false
            state.food = action.payload?.food
            state.success = true
        })
        builder.addCase(getResSingleFood.rejected, (state, action)=>{
            state.isLoading = false
            state.message = action.payload?.message || action.payload
            state.success = false
        })
    }
})
export const updateResFoodReduser = createSlice({
    name: 'resFoodUpdate',
    initialState: initialState,
    reducers:{
        makeSuccessFalse(state){
            state.success = false
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(updateResFood.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(updateResFood.fulfilled, (state, action)=>{
            state.isLoading = false
            state.success = true
            state.message = action?.payload?.message
        })
        builder.addCase(updateResFood.rejected, (state, action)=>{
            state.isLoading = false
            state.message = action.payload?.message || action.payload
            state.success = false
        })
    }
})
export const updateResFoodisAvailableReduser = createSlice({
    name: 'resFoodUpdateisAvailable',
    initialState: initialState,
    extraReducers: (builder)=>{
        builder.addCase(updateResFoodIsAvailable.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(updateResFoodIsAvailable.fulfilled, (state, action)=>{
            state.isLoading = false
            state.success = true
            state.message = action?.payload?.message
        })
        builder.addCase(updateResFoodIsAvailable.rejected, (state, action)=>{
            state.isLoading = false
            state.message = action.payload?.message || action.payload
            state.success = false
        })
    }
})

export const deleteResFoodReduser = createSlice({
    name: 'deleteResFoodReduser',
    initialState: initialState,
    reducers:{
        makeDeleteSuccessFalse(state){
            state.success = false
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(deleteResFood.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(deleteResFood.fulfilled, (state, action)=>{
            state.isLoading = false
            state.success = true
            state.message = action?.payload?.message
        })
        builder.addCase(deleteResFood.rejected, (state, action)=>{
            state.isLoading = false
            state.message = action.payload?.message || action.payload
            state.success = false
        })
    }
})

export const {makeCreateFoodSuccessFalse} = createFoodReduser.actions
export const {makeSuccessFalse} = updateResFoodReduser.actions
export const {foodListIsAvailableUpdate} = getResFoodListReduser.actions
export const {makeDeleteSuccessFalse} = deleteResFoodReduser.actions