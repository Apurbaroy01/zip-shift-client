
import { Navigate } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useUserRole from '../Hook/useUserRole';

const RiderRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();


    if (loading || roleLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-semibold">Loading....</p>
            </div>
        );
    }


    if (!user || role !== 'rider') {
        return <Navigate to="/forbidden" />;
    };

    return children;
};

export default RiderRoutes;