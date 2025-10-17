import Loading from '../../../components/Loading';
import useUserRole from '../../../Hook/useUserRole';
import ForbiddenPage from '../../Forbidden/ForbiddenPage';
import AdminDashboard from './AdminDashboard';
import RiderDashboard from './RiderDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if (role === 'user') {
        return <UserDashboard></UserDashboard>
    }
    else if (role === 'rider') {
        return  <RiderDashboard></RiderDashboard>
    }
    else if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <ForbiddenPage></ForbiddenPage>
    }

};

export default DashboardHome;