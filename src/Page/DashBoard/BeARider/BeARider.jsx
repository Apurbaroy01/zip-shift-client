import { useForm } from "react-hook-form";


const BeARider = () => {

    const { watch, register, handleSubmit, formState: { errors } } = useForm();
    const region = watch("region")



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
                        {regionDistricts[region]?.map((district)=>(
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