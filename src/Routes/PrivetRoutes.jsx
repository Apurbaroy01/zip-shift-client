import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Lottie from "lottie-react";
import animation from "../assets/Loading (1).json";



const PrivetRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full">
                <Lottie
                    animationData={animation}
                    loop
                    className="w-40 h-40"
                />
            </div>
        );
    }


    if (user) {
        return children;
    };


    return (
        <div>
            <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
        </div>
    );
};

export default PrivetRoutes;