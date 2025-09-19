import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-md  p-8">
                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back 👋
                </h2>
                 

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                    {/* Email */}
                    <div>
                        <label className="label text-gray-700 font-semibold ">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email"
                            className="input input-bordered w-full rounded-xl"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Enter your password"
                            className="input input-bordered w-full rounded-xl"
                        />
                        <div className="text-right mt-2">
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full rounded-xl text-lg font-semibold shadow-md"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="divider">OR</div>

                {/* Social Login */}
                <button className="btn btn-outline w-full rounded-xl flex items-center gap-2">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>

                {/* Signup link */}
                <p className="text-center mt-6 text-sm text-gray-600 flex">
                    Don’t have an account?{" "}
                    <p className="text-blue-600 font-semibold hover:underline"><Link to="/register">Sign Up</Link></p>
                </p>
            </div>
        </div>
    );
};

export default Login;
