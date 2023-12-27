import React from 'react'
import {Outlet} from 'react-router-dom'
import Loader from '../Loaders/Loader'
 
const ProtectedRoute = ({isAuther, isLoading=true}) => {
    if(isAuther === undefined){
        return <Loader />
    }

    if(!isLoading && isAuther){
        return <Outlet />
    }

    // if(!isLoading && !isAuther && isAuther !== undefined){
    //     return <Navigate to={"/"} />
    // }

}

export default ProtectedRoute