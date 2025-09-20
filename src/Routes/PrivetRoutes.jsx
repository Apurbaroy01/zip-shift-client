import { Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { Children } from "react";


const PrivetRoutes = ({Children}) => {
    const {user, loading}=useAuth();

    if(loading){
        <p>loading........</p>
    };


    if(!user){
        Navigate('/')
    };


    return Children;
};

export default PrivetRoutes;