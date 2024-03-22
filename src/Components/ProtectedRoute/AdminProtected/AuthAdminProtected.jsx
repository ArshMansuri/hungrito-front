import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import Loader from "../../Loaders/Loader";

const AuthAdminProtected = ({
    isAdminAuther = undefined,
    isAdminLoading = true
}) => {

    if(isAdminAuther === undefined){
        return <Loader />
    }

    if(!isAdminLoading && isAdminAuther ){
        return <Navigate to={"/admin/dashboard"} />;
    }

    if(!isAdminAuther && !isAdminAuther){
        return <Outlet />
    }
}

export default AuthAdminProtected