import { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecoure from "../../../Hook/useAxiosSecoure";

const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

const PendingRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = useAxiosSecoure();

    const { isPending, data: riders = [], refetch } = useQuery({
        queryKey: ["pending-riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        },
    });

    const handleDecision = async (id, action, email) => {
        const confirm = await Swal.fire({
            title: `${action === "approve" ? "Approve" : "Reject"} Rider?`,
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: action === "approve" ? "#16a34a" : "#dc2626",
            confirmButtonText: "Confirm",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/${id}/status`, {
                status: action === "approve" ? "active" : "rejected",
                email,
            });

            refetch();
            Swal.fire("Success", `Rider ${action}d successfully`, "success");
        } catch {
            Swal.fire("Error", "Failed to update rider status", "error");
        }
    };

    if (isPending) {
        return <div className="p-10 text-center text-lg font-medium">Loading pending riders...</div>;
    }

    return (
        <div className="p-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold mb-4">Pending Rider Applications</h2>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead className="bg-base-200 sticky top-0 z-10">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Region</th>
                                    <th>District</th>
                                    <th>Phone</th>
                                    <th>Applied</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-6 text-gray-400">
                                            No pending riders found
                                        </td>
                                    </tr>
                                )}

                                {riders.map((rider) => (
                                    <tr key={rider._id}>
                                        <td className="font-medium">{rider.name}</td>
                                        <td className="text-sm text-gray-600">{rider.email}</td>
                                        <td>{rider.region}</td>
                                        <td>{rider.district}</td>
                                        <td>{rider.phone}</td>
                                        <td className="text-sm">{formatDateTime(rider.created_at)}</td>
                                        <td className="flex justify-center gap-2">
                                            <button
                                                onClick={() => setSelectedRider(rider)}
                                                className="btn btn-xs btn-info"
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDecision(rider._id, "approve", rider.email)
                                                }
                                                className="btn btn-xs btn-success"
                                                title="Approve"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDecision(rider._id, "reject", rider.email)
                                                }
                                                className="btn btn-xs btn-error"
                                                title="Reject"
                                            >
                                                <FaTimes />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Rider Details Modal */}
            {selectedRider && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-xl mb-4">Rider Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Phone:</strong> {selectedRider.phone}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bike_brand}</p>
                            <p><strong>Bike Reg:</strong> {selectedRider.bike_registration}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p className="md:col-span-2">
                                <strong>Applied At:</strong>{" "}
                                {formatDateTime(selectedRider.created_at)}
                            </p>
                            {selectedRider.note && (
                                <p className="md:col-span-2">
                                    <strong>Note:</strong> {selectedRider.note}
                                </p>
                            )}
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn btn-outline"
                                onClick={() => setSelectedRider(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PendingRiders;
