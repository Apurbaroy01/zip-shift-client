import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../../Hook/useAuth';
import useAxios from '../../../../Hook/useAxios';

const Register = () => {
    const { register, handleSubmit } = useForm();
    const { createUser, updatauser } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(async () => {

                await updatauser({
                    displayName: data.name,
                });

                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: "user",
                    create_At: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                };

                await axiosInstance.post("/user", userInfo);
                navigate("/");
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">

                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Create Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Your full name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="example@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            transition"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-white text-lg font-semibold
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        hover:from-blue-700 hover:to-indigo-700
                        transition shadow-lg"
                    >
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-8">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Login */}
                <button
                    className="w-full py-3 border border-gray-300 rounded-xl
                    flex items-center justify-center gap-3
                    hover:bg-gray-50 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="font-medium text-gray-700">
                        Continue with Google
                    </span>
                </button>

                {/* Footer */}
                <p className="text-center mt-6 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
