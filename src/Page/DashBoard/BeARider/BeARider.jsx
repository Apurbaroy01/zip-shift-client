import { useForm } from "react-hook-form";


const BeARider = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const regionDistricts = {
        Dhaka: ["Gazipur", "Narayanganj", "Tangail"],
        Chittagong: ["Cox's Bazar", "Rangamati", "Khagrachari"],
        Sylhet: ["Moulvibazar", "Habiganj", "Sunamganj"],
    };

    const onSubmit = async (data) => {
        console.log(data)


    }
    return (
        <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-2">Become a Rider</h2>
            <p className="text-gray-500 mb-6">Fill out the form to apply as a delivery rider.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    {/* Name (read-only) */}
                    <input
                        type="text"
                        value=""
                        readOnly
                        className="input input-bordered text-black w-full bg-gray-100"
                    />

                    {/* Email (read-only) */}
                    <input
                        type="email"
                        value=""
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
                    {errors.phone && (
                        <span className="text-red-500 text-sm">Phone number is required</span>
                    )}

                    {/* National ID */}
                    <input
                        type="text"
                        placeholder="National ID Card Number"
                        className="input input-bordered w-full"
                        {...register("nid", { required: true })}
                    />
                    {errors.nid && (
                        <span className="text-red-500 text-sm">NID is required</span>
                    )}

                    {/* Region */}
                    <select
                        className="select select-bordered w-full"
                        {...register("region", { required: true })}
                    >
                        <option value="">Select Region</option>

                        <option key=" " value=""></option>

                    </select>
                    {errors.region && <span className="text-red-500 text-sm">Region is required</span>}

                    {/* District */}
                    <select
                        className="select select-bordered w-full"
                        {...register("district", { required: true })}
                    >
                        <option value="">Select District</option>

                        <option key="" value=""> </option>

                    </select>
                    {errors.district && <span className="text-red-500 text-sm">District is required</span>}

                    {/* Bike Brand */}
                    <input
                        type="text"
                        placeholder="Bike Brand (e.g., Yamaha FZ)"
                        className="input input-bordered w-full"
                        {...register("bike_brand", { required: true })}
                    />
                    {errors.bike_brand && (
                        <span className="text-red-500 text-sm">Bike brand is required</span>
                    )}

                    {/* Bike Registration */}
                    <input
                        type="text"
                        placeholder="Bike Registration Number"
                        className="input input-bordered w-full"
                        {...register("bike_registration", { required: true })}
                    />
                    {errors.bike_registration && (
                        <span className="text-red-500 text-sm">Registration number is required</span>
                    )}

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