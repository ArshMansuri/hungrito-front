import {configureStore} from "@reduxjs/toolkit"
import { userReduser } from "./slice/user"
import { restuReduser } from "./slice/restaurant"
import { createFoodReduser, getResFoodListReduser, getResSingleFoodReduser, updateResFoodReduser, updateResFoodisAvailableReduser } from "./slice/food"


const store = configureStore({
    reducer:{
        user: userReduser.reducer,
        restu: restuReduser.reducer,
        createFood: createFoodReduser.reducer,
        resFoodList: getResFoodListReduser.reducer,
        resSingleFood: getResSingleFoodReduser.reducer,
        resFoodUpdate: updateResFoodReduser.reducer,
        resFoodUpdateIsAvailable: updateResFoodisAvailableReduser.reducer
    }
})

export default store