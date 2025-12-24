import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecoure from "../../../Hook/useAxiosSecoure";
import useAuth from "../../../Hook/useAuth";

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecoure();
    const [emailQuery, setEmailQuery] = useState("");
    const { user } = useAuth();


    // 🔹 সার্চ কুয়েরি হ্যান্ডেল করা
    const {
        data: users = [],
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["searchedUsers", emailQuery],
        enabled: !!emailQuery,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
            return res.data;
        },
    });

    // 🔹 রোল পরিবর্তনের ফাংশন (useMutation ছাড়া)
    const handleRoleChange = async (id, currentRole) => {
        const action = currentRole === "admin" ? "Remove admin" : "Make admin";
        const newRole = currentRole === "admin" ? "user" : "admin";

        const confirm = await Swal.fire({
            title: `${action}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            // ✅ সরাসরি Axios দিয়ে রিকোয়েস্ট পাঠানো হচ্ছে
            await axiosSecure.patch(`/users/${id}/role`, { role: newRole });

            await refetch();

            Swal.fire("Success", `${action} successful`, "success");
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Failed to update user role", "error");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl text-center font-semibold mb-4">Make Admin</h2>

            {/* 🔎 সার্চ ইনপুট */}
            <div className="flex gap-2 mb-6 items-center">
                <FaSearch />
                <input
                    type="text"
                    className="input input-bordered w-full max-w-md"
                    placeholder="Search user by email"
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                />
            </div>

            {isFetching && <p>Loading users...</p>}

            {!isFetching && users.length === 0 && emailQuery && (
                <p className="text-gray-500">No users found.</p>
            )}

            {users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-600 text-sm">
                            <tr>
                                <th>Email</th>
                                <th>Created</th>
                                <th>Role</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm">
                            {users.map((u) => (
                                <tr key={u._id} className="hover">
                                    <td className="font-medium">{u.email}</td>

                                    <td className="text-gray-500">
                                        {new Date(u.created_at).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <span
                                            className={`badge badge-sm ${u.role === "admin"
                                                    ? "badge-success"
                                                    : "badge-ghost"
                                                }`}
                                        >
                                            {u.role || "user"}
                                        </span>
                                    </td>

                                    <td className="text-right">
                                        <button
                                            onClick={() =>
                                                handleRoleChange(
                                                    u._id,
                                                    u.role || "user"
                                                )
                                            }
                                            className={`btn btn-xs ${u.role === "admin"
                                                    ? "btn-outline btn-error"
                                                    : "btn-primary"
                                                }`}

                                                disabled={u.email === user?.email}
                                        >
                                            {u.role === "admin" ? (
                                                <>
                                                    <FaUserTimes className="mr-1" />
                                                    Remove
                                                </>
                                            ) : (
                                                <>
                                                    <FaUserShield className="mr-1" />
                                                    Make Admin
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MakeAdmin;
