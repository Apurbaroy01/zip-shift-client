import { useQuery } from "@tanstack/react-query";
import {
    FaMotorcycle,
    FaUserClock,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";
import useAxiosSecoure from "../../../Hook/useAxiosSecoure";

export default function AdminDashboard() {
    const axiosSecure = useAxiosSecoure();

    // 🔹 Real data (existing)
    const { data: deliveryStatus = [] } = useQuery({
        queryKey: ["parcelStatusCount"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels/delivery/status-count");
            return res.data;
        },
    });

    // 🔹 Fake data for other cards
    const fakeStats = [
        {
            id: 1,
            title: "Total Riders",
            value: 32,
            icon: <FaMotorcycle />,
            color: "from-blue-100 to-blue-50 text-blue-600",
        },
        {
            id: 2,
            title: "Pending Riders",
            value: 7,
            icon: <FaUserClock />,
            color: "from-yellow-100 to-yellow-50 text-yellow-600",
        },
        {
            id: 3,
            title: "Delivered Parcels",
            value: deliveryStatus.delivered,
            icon: <FaCheckCircle />,
            color: "from-green-100 to-green-50 text-green-600",
        },
        {
            id: 4,
            title: "Pending Parcels",
            value: 41,
            icon: <FaClock />,
            color: "from-red-100 to-red-50 text-red-600",
        },
    ];

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl text-center font-bold">Admin Dashboard</h1>

            {/* 🔹 Fake Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {fakeStats.map((item) => (
                    <div
                        key={item.id}
                        className={`card bg-gradient-to-br ${item.color} shadow-md`}
                    >
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div className="text-4xl">
                                    {item.icon}
                                </div>
                                <span className="badge badge-outline">
                                    {item.title}
                                </span>
                            </div>

                            <div className="mt-4">
                                <h2 className="text-4xl font-extrabold">
                                    {item.value}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔹 Real Delivery Status Cards */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Parcel Status Count
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {deliveryStatus.map(({ count, status }) => (
                        <div
                            key={status}
                            className="card bg-base-100 shadow-md border border-base-200 p-6 flex flex-col items-center justify-center"
                        >
                            
                            <p className="text-4xl font-extrabold text-primary mt-2">
                                {count}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
