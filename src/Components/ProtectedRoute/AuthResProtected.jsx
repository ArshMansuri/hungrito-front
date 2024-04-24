import React from 'react'
import Loader from '../Loaders/Loader'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthResProtected = ({isRestuAuther=undefined, isResLoading=true}) => {
    const resEmail = useSelector((state)=> state?.restu?.restu?.resEmail?.email || false)
    const resEmailVerify = useSelector((state)=> state?.restu?.restu?.resEmail?.isVerify || false)
    const params = useParams()

    if(isRestuAuther === undefined){
        return <Loader />
    }

    if(!isResLoading && isRestuAuther){
        return <Navigate to={"/res/dashboard"} />
    }

    if(!isResLoading && !isRestuAuther && window.location.pathname === '/res/login'){
        return <Outlet />
    }
    if(!isResLoading && !isRestuAuther && window.location.pathname === '/res/forgot/password'){
        return <Outlet />
    }
    if(!isResLoading && !isRestuAuther && window.location.pathname.includes("/res/reset/password/link/")){
        return <Outlet />
    }

    if(!isResLoading && !isRestuAuther && (resEmail === undefined || resEmail !== params?.email) && (resEmailVerify === false || resEmailVerify === undefined)){
        return <Navigate to={"/res/verify"} />
    }

    if(!isRestuAuther){
        return <Outlet />   
    }
}

export default AuthResProtected