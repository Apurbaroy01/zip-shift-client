import React from 'react';
import { Outlet } from 'react-router-dom';
import loginImage from '../../assets/authImage.png'
import ProfastLogo from '../../Page/Share/ProfastLogo/ProfastLogo';

const AuthLayout = () => {
    return (
        <div className=" bg-base-200 min-h-screen">
            <div>
                <ProfastLogo></ProfastLogo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse items-center justify-center text-center">
                <div className='flex-1'>
                    <img
                        src={loginImage}
                        className="max-w-sm rounded-lg "
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;