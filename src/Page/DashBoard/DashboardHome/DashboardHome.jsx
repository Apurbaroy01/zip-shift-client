
import useUserRole from '../../../Hook/useUserRole';
import ForbiddenPage from '../../Forbidden/ForbiddenPage';
import AdminDashboard from './AdminDashboard';
import RiderDashboard from './RiderDashboard';
import UserDashboard from './UserDashboard';
import animation from "../../../assets/Loading (1).json"
import Lottie from 'lottie-react';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
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


    if (role === 'user') {
        return <UserDashboard></UserDashboard>
    }
    else if (role === 'rider') {
        return <RiderDashboard></RiderDashboard>
    }
    else if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <ForbiddenPage></ForbiddenPage>
    }

};

export default DashboardHome;