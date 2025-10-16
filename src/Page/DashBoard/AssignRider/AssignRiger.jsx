import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaMotorcycle } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecoure from "../../../Hook/useAxiosSecoure";
import useTrackingLogger from "../../../Hook/useTrackingLogger";
import useAuth from "../../../Hook/useAuth";

const AssignRider = () => {
    const axiosSecure = useAxiosSecoure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [riders, setRiders] = useState([]);
    const [loadingRiders, setLoadingRiders] = useState(false);
    const queryClient = useQueryClient();
    const { logTracking } = useTrackingLogger();
    const { user } = useAuth();

    // ✅ Load assignable parcels
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["assignableParcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels?payment_status=paid&delevery_status=not_collected"
            );
            return res.data.sort(
                (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
            );
        },
    });

    // ✅ Mutation for assigning rider
    const { mutateAsync: assignRider } = useMutation({
        mutationFn: async ({ parcel, rider }) => {
            const res = await axiosSecure.patch(`/parcels/${parcel._id}/assign`, {
                riderId: rider._id,
                riderEmail: rider.email,
                riderName: rider.name,
            });
            return { parcel, rider, data: res.data };
        },
        onSuccess: async ({ parcel, rider }) => {
            queryClient.invalidateQueries(["assignableParcels"]);
            Swal.fire("Success", "Rider assigned successfully!", "success");

            // ✅ logTracking now works correctly
            await logTracking({
                tracking_id: parcel.tracking_id,
                status: "rider_assigned",
                details: `Assigned to ${rider.name}`,
                updated_by: user?.email,
            });

            document.getElementById("assignModal").close();
        },
        onError: () => {
            Swal.fire("Error", "Failed to assign rider", "error");
        },
    });

    // ✅ Open modal and load riders
    const openAssignModal = async (parcel) => {
        setSelectedParcel(parcel);
        setLoadingRiders(true);
        setRiders([]);

        try {
            const res = await axiosSecure.get("/riders/available", {
                params: { region: parcel.senderRegion },
            });
            setRiders(res.data);
        } catch (error) {
            console.error("Error fetching riders", error);
            Swal.fire("Error", "Failed to load riders", "error");
        } finally {
            setLoadingRiders(false);
            document.getElementById("assignModal").showModal();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>

            {isLoading ? (
                <p>Loading parcels...</p>
            ) : parcels.length === 0 ? (
                <p className="text-gray-500">No parcels available for assignment.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Sender Center</th>
                                <th>Receiver Center</th>
                                <th>Cost</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.parcelType}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td>{parcel.receiverDistrict}</td>
                                    <td>৳{parcel.price}</td>
                                    <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => openAssignModal(parcel)}
                                            className="btn btn-sm btn-primary text-black"
                                        >
                                            <FaMotorcycle className="inline-block mr-1" />
                                            Assign Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 🛵 Assign Rider Modal */}
                    <dialog id="assignModal" className="modal">
                        <div className="modal-box max-w-2xl">
                            <h3 className="text-lg font-bold mb-3">
                                Assign Rider for Parcel:{" "}
                                <span className="text-primary">
                                    {selectedParcel?.parcelName}
                                </span>
                            </h3>

                            {loadingRiders ? (
                                <p>Loading riders...</p>
                            ) : riders.length === 0 ? (
                                <p className="text-error">
                                    No available riders in this district.
                                </p>
                            ) : (
                                <div className="overflow-x-auto max-h-80 overflow-y-auto">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Bike Info</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {riders.map((rider) => (
                                                <tr key={rider._id}>
                                                    <td>{rider.name}</td>
                                                    <td>{rider.phone}</td>
                                                    <td>
                                                        {rider.bike_brand} - {rider.bike_registration}
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                assignRider({ parcel: selectedParcel, rider })
                                                            }
                                                            className="btn btn-xs btn-success"
                                                        >
                                                            Assign
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}
        </div>
    );
};

export default AssignRider;
