import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Loader from '../Loaders/Loader'

const AuthProtected = ({isAuther, isLoading=true}) => {
  if(isAuther === undefined){
    return <Loader />
  }

  if(!isLoading && isAuther){
    return <Navigate to={"/"} />
  }

  if(!isAuther){
    return <Outlet isAuther={isAuther} isLoading={isLoading} />
  }
}

export default AuthProtected