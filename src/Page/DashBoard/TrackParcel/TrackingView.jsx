import {
    FaClock,
    FaCheckCircle,
    FaMotorcycle,
    FaTruck,
    FaBoxOpen,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecoure from "../../../Hook/useAxiosSecoure";
import { useParams } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";

const TrackingView = () => {
    const axiosSecure = useAxiosSecoure();
    const { tracking_id } = useParams();
    const { user } = useAuth();

    const STATUS_ICONS = {
        parcel_created: <FaClock className="text-gray-400 text-2xl" />,
        Payment_done: <FaCheckCircle className="text-green-500 text-2xl" />,
        rider_assigned: <FaMotorcycle className="text-blue-500 text-2xl" />,
        in_transit: <FaTruck className="text-yellow-500 text-2xl" />,
        delivered: <FaBoxOpen className="text-green-600 text-2xl" />,
    };

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["trackings", tracking_id],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/trackings/${tracking_id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner text-primary w-12 h-12"></span>
            </div>
        );
    }

    if (!parcels || parcels.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
                <FaBoxOpen className="text-6xl text-gray-400 mb-4" />
                <h2 className="text-lg font-semibold text-gray-600">
                    No tracking details found
                </h2>
            </div>
        );
    }

    const lastStatus = parcels[parcels.length - 1].status;

    return (
        <div className="max-w-2xl mx-auto mt-14 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-2xl rounded-2xl border border-gray-200 p-8 relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                    🚚 Parcel Tracking
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Track your shipment’s journey in real-time
                </p>

                <div className="mt-5 inline-block px-5 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                    <span className="text-gray-700 font-medium">
                        Tracking ID:{" "}
                        <span className="font-bold text-blue-600">{tracking_id}</span>
                    </span>
                </div>
            </div>

            {/* Parcel Steps */}
            <div className="space-y-5">
                {parcels.map((parcel, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-blue-50">
                                {STATUS_ICONS[parcel.status] || (
                                    <FaClock className="text-gray-400 text-xl" />
                                )}
                            </div>
                            <div>
                                <h3 className="capitalize font-semibold text-gray-800">
                                    {parcel.status.replace("_", " ")}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Updated by:{" "}
                                    <span className="font-medium text-gray-700">
                                        {parcel.updated_by || "system"}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-gray-500">
                                {new Date(parcel.timestamp).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delivered Section */}
            {lastStatus === "delivered" && (
                <div className="mt-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-lg mb-3 animate-bounce">
                        <FaCheckCircle className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-600">
                        Delivered Successfully!
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Your parcel has reached its destination 🎉
                    </p>
                </div>
            )}
        </div>
    );
};

export default TrackingView;
