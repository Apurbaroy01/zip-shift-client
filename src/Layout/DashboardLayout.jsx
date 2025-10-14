import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ProfastLogo from '../Page/Share/ProfastLogo/ProfastLogo';
import { FaHome, FaBox, FaMoneyBillWave, FaTruck, FaUserEdit, FaUserClock, FaUserCheck, FaUserShield, FaMotorcycle, FaTasks, FaCheckCircle } from "react-icons/fa";
import useUserRole from '../Hook/useUserRole';

const DashboardLayout = () => {

    const { role, roleLoading } = useUserRole();
    console.log(role)

    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
         ${isActive ? 'bg-blue-100 font-semibold text-blue-700' : 'hover:bg-gray-200'}`;

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Page content here */}
                <div className="drawer">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col ">
                        {/* Navbar */}
                        <div className="navbar bg-base-300 w-full lg:hidden">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block h-6 w-6 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                    </svg>
                                </label>
                            </div>

                        </div>
                        {/* Page content here */}
                        <Outlet></Outlet>
                    </div>

                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <ProfastLogo></ProfastLogo>


                    <div className="flex flex-col mt-6 space-y-2">
                        <NavLink to="/" className={linkClasses}>
                            <FaHome /> Home
                        </NavLink>

                        <NavLink to="/dashboard/myParcel" className={linkClasses}>
                            <FaBox /> My Parcels
                        </NavLink>

                        <NavLink to="/dashboard/paymentHistory" className={linkClasses}>
                            <FaMoneyBillWave /> Payment History
                        </NavLink>

                        <NavLink to="/dashboard/tracking" className={linkClasses}>
                            <FaTruck /> Track a Package
                        </NavLink>

                        <NavLink to="/dashboard/profile" className={linkClasses}>
                            <FaUserEdit /> Update Profile
                        </NavLink>

                        {/* riders link */}
                        {!roleLoading && role === "rider" &&
                            <>
                                <NavLink to="/dashboard/panding-deliveries" className={linkClasses}>
                                    <FaTasks /> pending Deliveries
                                </NavLink>
                                <NavLink to="/dashboard/panding-deliveries" className={linkClasses}>
                                    <FaCheckCircle /> Completed Deliveries
                                </NavLink>
                            </>
                        }

                        {/* Admin link */}
                        {!roleLoading && role === "admin" &&
                            <>
                                <NavLink to="/dashboard/assign-rider" className={linkClasses}>
                                    <FaMotorcycle /> Assign Rider
                                </NavLink>
                                <NavLink to="/dashboard/active-riders" className={linkClasses}>
                                    <FaUserCheck /> Active Riders
                                </NavLink>
                                <NavLink to="/dashboard/panding-riders" className={linkClasses}>
                                    <FaUserClock /> panding Riders
                                </NavLink>

                                {/* admin routes */}
                                <NavLink to="/dashboard/makeAdmin" className={linkClasses}>
                                    <FaUserShield /> Make Admin
                                </NavLink>
                            </>
                        }
                    </div>




                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;