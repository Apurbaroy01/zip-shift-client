import { useForm } from "react-hook-form";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecoure from "../../../Hook/useAxiosSecoure";
import Swal from "sweetalert2";


const BeARider = () => {
    const { user } = useAuth();
    const { watch, register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecoure();
    const region = watch("region")



    const regionDistricts = {
        Dhaka: ["Gazipur", "Narayanganj", "Tangail"],
        Chittagong: ["Cox's Bazar", "Rangamati", "Khagrachari"],
        Sylhet: ["Moulvibazar", "Habiganj", "Sunamganj"],
    };

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            name:user?.displayName || "null",
            email:user.email,
            status: "pending",
            created_at: new Date().toISOString(),
        };

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.post("/riders", riderData);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Success!",
                            text: "Your application is pending approval.",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Application not submitted.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: error.response?.data?.message || "Something went wrong.",
                        icon: "error"
                    });
                }
            }
        });
    };





    return (
        <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-2">Become a Rider</h2>
            <p className="text-gray-500 mb-6">Fill out the form to apply as a delivery rider.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    {/* Name (read-only) */}
                    <input
                        type="text"
                        value={user?.displayName || "null"}
                        readOnly
                        className="input input-bordered text-black w-full bg-gray-100"
                    />

                    {/* Email (read-only) */}
                    <input
                        type="email"
                        value={user?.email || "null"}
                        readOnly
                        className="input input-bordered text-black w-full bg-gray-100"
                    />

                    {/* Age */}
                    <input
                        type="number"
                        placeholder="Your Age"
                        className="input input-bordered w-full"
                        {...register("age", { required: true, min: 18 })}
                    />
                    {errors.age && (
                        <span className="text-red-500 text-sm">You must be 18 or older</span>
                    )}

                    {/* Phone */}
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="input input-bordered w-full"
                        {...register("phone", { required: true })}
                    />


                    {/* National ID */}
                    <input
                        type="text"
                        placeholder="National ID Card Number"
                        className="input input-bordered w-full"
                        {...register("nid", { required: true })}
                    />


                    {/* Region */}
                    <select {...register("region")} className="select select-bordered w-full">
                        <option value="">Select Region</option>
                        {Object.keys(regionDistricts).map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>


                    {/* District */}
                    <select {...register("district")} className="select select-bordered w-full" disabled={!region}>
                        <option value="">Select District</option>
                        {regionDistricts[region]?.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}

                    </select>


                    {/* Bike Brand */}
                    <input
                        type="text"
                        placeholder="Bike Brand (e.g., Yamaha FZ)"
                        className="input input-bordered w-full"
                        {...register("bike_brand", { required: true })}
                    />


                    {/* Bike Registration */}
                    <input
                        type="text"
                        placeholder="Bike Registration Number"
                        className="input input-bordered w-full"
                        {...register("bike_registration", { required: true })}
                    />


                    {/* Additional Info (optional) */}
                    <textarea
                        placeholder="Additional information (optional)"
                        className="textarea textarea-bordered w-full"
                        {...register("note")}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary text-black w-full mt-4">
                    Submit Rider Application
                </button>
            </form>
        </div>
    );
};

export default BeARider;