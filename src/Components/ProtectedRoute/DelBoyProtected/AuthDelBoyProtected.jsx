import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import Loader from '../../Loaders/Loader'

const AuthDelBoyProtected = ({isDbAuther=undefined, isDbLoading=true}) => {

    const dbEmail = useSelector((state)=> state?.delBoy?.delBoy?.dbEmail?.email || false)
    const dbEmailVerify = useSelector((state)=> state?.delBoy?.delBoy?.dbEmail?.isVerify || false)
    const params = useParams()

    if(isDbAuther === undefined){
        return <Loader />
    }

    if(!isDbLoading && isDbAuther){
        return <Navigate to={"/db/dashboard"} />
    }

    if(!isDbLoading && !isDbAuther && window.location.pathname === '/db/login'){
        return <Outlet />
    }

    if(!isDbLoading && !isDbAuther && (dbEmail === undefined || dbEmail !== params?.email) && (dbEmailVerify === false || dbEmailVerify === undefined)){
        return <Navigate to={"/db/verify"} />
    }
    
    if(!isDbAuther){
        return <Outlet />   
    }

}

export default AuthDelBoyProtected