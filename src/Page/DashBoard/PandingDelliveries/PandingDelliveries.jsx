import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecoure from "../../../Hook/useAxiosSecoure";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";

const PendingDeliveries = () => {
    const axiosSecure = useAxiosSecoure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    // Load parcels assigned to the current rider
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["riderParcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
            return res.data;
        },
    });

    // Mutation for updating parcel status
    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ parcelId, status }) => {
            const res = await axiosSecure.patch(`/parcels/${parcelId}/status`, {
                status,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["riderParcels"]);
        },
    });

    const handleStatusUpdate = async (parcel, newStatus) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `Mark parcel as "${newStatus.replace("_", " ")}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update",
        });

        if (confirm.isConfirmed) {
            try {
                await updateStatus({ parcelId: parcel._id, status: newStatus });
                Swal.fire("Updated!", "Parcel status updated successfully.", "success");
            } catch (err) {
                console.log(err)
                Swal.fire("Error!", "Failed to update status.", "error");
            }
        }
    };

    if (isLoading) {
        return <p className="p-6">Loading...</p>;
    }

    if (parcels.length === 0) {
        return <p className="p-6 text-gray-500">No assigned deliveries.</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Receiver</th>
                            <th>Receiver District</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr key={parcel._id}>
                                <td>{parcel.trackigId}</td>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.parcelType}</td>
                                <td>{parcel.receiverName}</td>
                                <td>{parcel.receiverDistrict}</td>
                                <td>৳{parcel.price}</td>
                                <td className="capitalize">
                                    {parcel.delevery_status.replace("_", " ")}
                                </td>
                                <td>
                                    {parcel.delevery_status === "rider_assigned" && (
                                        <button
                                            className="btn btn-sm btn-primary text-black"
                                            onClick={() =>
                                                handleStatusUpdate(parcel, "in_transit")
                                            }
                                        >
                                            Mark Picked Up
                                        </button>
                                    )}
                                    {parcel.delevery_status === "in_transit" && (
                                        <button
                                            className="btn btn-sm btn-success text-black"
                                            onClick={() =>
                                                handleStatusUpdate(parcel, "delivered")
                                            }
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingDeliveries;
