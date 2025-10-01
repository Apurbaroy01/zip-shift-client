import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaCamera } from "react-icons/fa";
import logo from "../../../assets/icon.png"

const Profile = () => {
    const [preview, setPreview] = useState(null);


    // handle photo upload
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("image",file)
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
                                src={preview || logo}
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








                </div>
            </div>
        </div>
    );
};

export default Profile;
