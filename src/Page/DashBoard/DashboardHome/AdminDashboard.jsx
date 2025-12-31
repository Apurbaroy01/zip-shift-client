import { useQuery } from "@tanstack/react-query";
import {
    FaMotorcycle,
    FaUserClock,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";
import useAxiosSecoure from "../../../Hook/useAxiosSecoure";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    const axiosSecure = useAxiosSecoure();

    const { data: riderStatus = {} } = useQuery({
        queryKey: ["riderStatusCount"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/status-count");
            return res.data;
        }
    });
    console.log(riderStatus)

    const { data: parcelCollection = {} } = useQuery({
        queryKey: ["parcelCollection"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcel/status-count");
            return res.data;
        }
    });
    console.log(parcelCollection)

 


    // 🔹 Fake data for other cards
    const fakeStats = [
        {
            id: 4,
            title: "Pending Parcels",
            value: parcelCollection?.not_collected,
            icon: <FaClock />,
            color: "from-red-100 to-red-50 text-red-600",
            link:"/dashboard/assign-rider"
        },
        {
            id: 2,
            title: "Pending Riders",
            value: riderStatus?.pending,
            icon: <FaUserClock />,
            color: "from-yellow-100 to-yellow-50 text-yellow-600",
            link:"/dashboard/panding-riders"
            
        },
        {
            id: 1,
            title: "Total Riders",
            value: riderStatus?.active,
            icon: <FaMotorcycle />,
            color: "from-blue-100 to-blue-50 text-blue-600",
            link:"/dashboard/active-riders"
        },
        
        {
            id: 3,
            title: "Delivered Parcels",
            value: parcelCollection.delivered,
            icon: <FaCheckCircle />,
            color: "from-green-100 to-green-50 text-green-600",

        },
        
        {
            id: 5,
            title: "Assigned Riders",
            value: parcelCollection?.rider_assigned,
            icon: <FaMotorcycle />,
            color: "from-blue-100 to-blue-50 text-blue-600",
            link:"/dashboard/assign-rider"
        },
    ];

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl text-center font-bold">Admin Dashboard</h1>

            {/* 🔹 Fake Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {fakeStats.map((item) => (

                    <Link to={item.link}

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
                    </Link>
                ))}
            </div>

           
        </div>
    );
}
