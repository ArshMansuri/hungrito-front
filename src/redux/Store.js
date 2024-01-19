import {configureStore} from "@reduxjs/toolkit"
import { nearestRestuReduser, userReduser, userResFoodsReduser } from "./slice/user"
import { restuReduser } from "./slice/restaurant"
import { createFoodReduser, deleteResFoodReduser, getResFoodListReduser, getResSingleFoodReduser, updateResFoodReduser, updateResFoodisAvailableReduser } from "./slice/food"


const store = configureStore({
    reducer:{
        user: userReduser.reducer,
        nearestRestus: nearestRestuReduser.reducer,
        userResFoods: userResFoodsReduser.reducer,
        restu: restuReduser.reducer,
        createFood: createFoodReduser.reducer,
        resFoodList: getResFoodListReduser.reducer,
        resSingleFood: getResSingleFoodReduser.reducer,
        resFoodUpdate: updateResFoodReduser.reducer,
        resFoodUpdateIsAvailable: updateResFoodisAvailableReduser.reducer,
        resFoodDelete: deleteResFoodReduser.reducer
    }
})

export default store