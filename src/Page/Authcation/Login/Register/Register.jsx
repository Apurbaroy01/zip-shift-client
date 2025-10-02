
import { useForm } from 'react-hook-form';
import { Await, Link, useNavigate, } from 'react-router-dom';
import useAuth from '../../../../Hook/useAuth';
import useAxios from '../../../../Hook/useAxios';

const Register = () => {
    const { register, handleSubmit } = useForm();
    const { createUser } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result)

                const userInfo = {
                    email: data.email,
                    role: "user",
                    create_At: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                }

                const userRes = await axiosInstance.post("/user", userInfo)
                console.log(userRes.data)
                
                navigate("/")

            })
            .catch((error) => {
                console.log(error.message)
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-md  p-8">
                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
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

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full rounded-xl text-lg font-semibold shadow-md"
                    >
                        Register
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
                    I have already an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>

                </p>
            </div>
        </div>
    );
};

export default Register;
