import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import useAuth from '../../../Hook/useAuth';
import { LuLogOut } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import icon from "../../../assets/icon.png";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => console.log("SignOut SuccessFully"))
            .catch((error) => console.log(error.message));
    };

    const navItems = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `font-medium ${isActive ? 'text-primary border-b-2 border-primary' : ''}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/covarage"
                    className={({ isActive }) =>
                        `font-medium ${isActive ? 'text-primary border-b-2 border-primary' : ''}`
                    }
                >
                    Covarage
                </NavLink>
            </li>

            {user && (
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `font-medium ${isActive ? 'text-primary border-b-2 border-primary' : ''}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}

            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `font-medium ${isActive ? 'text-primary border-b-2 border-primary' : ''}`
                    }
                >
                    About
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-4 md:px-8">
            {/* Navbar Start */}
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navItems}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" >
                    <ProfastLogo /> 
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4">
                    {navItems}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL || icon} alt="User Avatar" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link to="/dashboard/profile" className="flex items-center gap-2">
                                    <FaUserCircle /> Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/profile" className="flex items-center gap-2">
                                    <FaUserCircle /> Settings
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="btn btn-primary btn-block flex items-center justify-center gap-2"
                                >
                                    <LuLogOut /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="btn btn-primary">LogIn</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
