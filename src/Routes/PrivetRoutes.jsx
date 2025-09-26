import { Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";



const PrivetRoutes = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        <p>loading........</p>
    };


    if (user) {
        return children;
    };


    return (
        <div>
            <Navigate to="/login"></Navigate>
        </div>
    );
};

export default PrivetRoutes;