import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import useAuth from '../../../Hook/useAuth';
import { LuLogOut } from "react-icons/lu";
import icon from "../../../assets/icon.png"
const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {

        logOut()
            .then(() => {
                console.log("signOut SuccessFully")
            })
            .catch((error) => {
                console.log(error.message)
            })


    }

    const Navitem = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/covarage">Covarage</NavLink></li>
        <li><NavLink to="/sendParcel">Add Parcel</NavLink></li>

        {
            user && <>
                <li><NavLink to="/dashboard">DashBoard</NavLink></li>
            </>
        }
        <li><NavLink to="/about">About</NavLink></li>

    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {Navitem}
                    </ul>
                </div>
                <div className="btn btn-ghost text-xl"><ProfastLogo></ProfastLogo></div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {Navitem}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>

                        <div className="flex gap-2">
                            
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img

                                            src={icon }/>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    
                                    <li><Link to="/dashboard/profile">Profile</Link></li>
                                    <li><Link to="/dashboard/profile">Setting</Link></li>
                                    <li><button onClick={handleLogOut}  className='btn font-bold'><LuLogOut /> Logout</button></li>
                                </ul>
                            </div>
                        </div>

                        
                    </> :
                        <>
                            <Link to="/login"><button className='btn'>LogIn</button></Link>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;