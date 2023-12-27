import {configureStore} from "@reduxjs/toolkit"
import { userReduser } from "./slice/user"
import { restuReduser } from "./slice/restaurant"


const store = configureStore({
    reducer:{
        user: userReduser.reducer,
        restu: restuReduser.reducer
    }
})

export default store