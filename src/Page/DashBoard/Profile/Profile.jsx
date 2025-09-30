import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaCamera } from "react-icons/fa";

const Profile = () => {
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    // handle photo upload
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // here you will send data to backend (axios/fetch)
        console.log("Profile Updated");
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Update Profile</h2>

                    {/* Profile Photo */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={preview || "https://via.placeholder.com/120"}
                                alt="Profile"
                                className="w-28 h-28 rounded-full object-cover border-4 border-primary"
                            />
                            <label
                                htmlFor="photoUpload"
                                className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-focus"
                            >
                                <FaCamera />
                            </label>
                            <input
                                id="photoUpload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaUser /> Name
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaEnvelope /> Email
                                </span>
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Change Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaLock /> New Password
                                </span>
                            </label>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaLock /> Confirm Password
                                </span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Submit */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
