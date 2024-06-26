import {configureStore} from "@reduxjs/toolkit"
import { addToCartReduser, decreaseQutInCartReduser, getMySaveFoodsReduser, increaseQutInCartReduser, myCartDetailReduser, nearestRestuReduser, nearestSearchDishRestuReduser, nearestSearchRestuReduser, placeCodOrderReduser, placeOnlineOrderReduser, removeFromCartReduser, userReduser, userResFoodsReduser } from "./slice/user"
import { getResNewOrdersReduser, restuReduser } from "./slice/restaurant"
import { createFoodReduser, deleteResFoodReduser, getResFoodListReduser, getResSingleFoodReduser, updateResFoodReduser, updateResFoodisAvailableReduser } from "./slice/food"
import { delBoyReduser, getDbNewOrdersReduser } from "./slice/delBoy"
import { adminReduser } from "./slice/admin"


const store = configureStore({
    reducer:{
        user: userReduser.reducer,
        nearestRestus: nearestRestuReduser.reducer,
        nearestSearchRestus: nearestSearchRestuReduser.reducer,
        nearestSearchDishRestus: nearestSearchDishRestuReduser.reducer,
        userResFoods: userResFoodsReduser.reducer,
        myCartDetail: myCartDetailReduser.reducer,
        addToCart: addToCartReduser.reducer,
        removeFromCart: removeFromCartReduser.reducer,
        increaseQutInCart: increaseQutInCartReduser.reducer,
        decreaseQutInCart: decreaseQutInCartReduser.reducer,
        placeCodOrder: placeCodOrderReduser.reducer,
        placeOnlineOrder: placeOnlineOrderReduser.reducer,
        userSaveFoods: getMySaveFoodsReduser.reducer,
        restu: restuReduser.reducer,
        createFood: createFoodReduser.reducer,
        resFoodList: getResFoodListReduser.reducer,
        resSingleFood: getResSingleFoodReduser.reducer,
        resFoodUpdate: updateResFoodReduser.reducer,
        resFoodUpdateIsAvailable: updateResFoodisAvailableReduser.reducer,
        resFoodDelete: deleteResFoodReduser.reducer,
        resNewOrders: getResNewOrdersReduser.reducer,
        delBoy: delBoyReduser.reducer,
        dbNewOrders: getDbNewOrdersReduser.reducer,
        admin: adminReduser.reducer
    }
})

export default store