import React, { useState } from "react";
import { FaCamera, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../../../assets/icon.png";
import axios from "axios";
import useAuth from "../../../Hook/useAuth";
import { toast } from "react-toastify";

const Profile = () => {
    const { user, updatauser, changePassword } = useAuth();
    const [name, setName] = useState(user?.displayName || "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // -------------------------
    // 📸 Photo Upload
    // -------------------------
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("image", file);

            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_api}`,
                formData
            );

            const photoURL = res.data?.data?.display_url;

            await updatauser({ photoURL });

            toast.success("Profile photo updated");
        } catch (err) {
            toast.error("Photo upload failed");
        } finally {
            setLoading(false);
        }
    };

    // -------------------------
    // 🧑 Update Name
    // -------------------------
    const handleNameUpdate = async () => {
        if (!name) return toast.error("Name required");

        try {
            await updatauser({ displayName: name });
            toast.success("Name updated");
        } catch {
            toast.error("Name update failed");
        }
    };

    // -------------------------
    // 🔒 Change Password
    // -------------------------
    const handlePasswordChange = async () => {
        if (password.length < 6)
            return toast.error("Password must be at least 6 characters");

        try {
            await changePassword(password);
            toast.success("Password changed successfully");
            setPassword("");
        } catch {
            toast.error("Re-login required to change password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">

                <h2 className="text-2xl font-bold text-center">My Profile</h2>

                {/* Profile Photo */}
                <div className="flex justify-center">
                    <div className="relative">
                        <img
                            src={user?.photoURL || logo}
                            className="w-28 h-28 rounded-full border-4 border-primary object-cover"
                        />
                        <label className="absolute bottom-1 right-1 bg-primary p-2 rounded-full text-white cursor-pointer">
                            <FaCamera />
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Name */}
                <div>
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaUser /> Name
                        </span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <button
                        onClick={handleNameUpdate}
                        className="btn btn-primary w-full mt-2"
                    >
                        Update Name
                    </button>
                </div>

                {/* Email */}
                <div>
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaEnvelope /> Email
                        </span>
                    </label>
                    <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Password Change */}
                <div>
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaLock /> New Password
                        </span>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="******"
                    />
                    <button
                        onClick={handlePasswordChange}
                        className="btn btn-warning w-full mt-2"
                    >
                        Change Password
                    </button>
                </div>

                {loading && (
                    <p className="text-center text-sm text-gray-500">
                        Updating...
                    </p>
                )}
            </div>
        </div>
    );
};

export default Profile;
