import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecoure from '../../../Hook/useAxiosSecoure';

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecoure();

    const { data: parcels, isLoading, isError } = useQuery({
        queryKey: ["myparcel", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        },
        
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                My Parcels ({parcels.length})
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Tracking ID</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Delivery</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="border-b">
                                <td>{index + 1}</td>
                                <td>{parcel.trackigId}</td>
                                <td>{parcel.parcelType}</td>
                                <td>{parcel.price}৳</td>
                                <td
                                  className={
                                    parcel.paymrnt_status === "unpaid"
                                      ? "text-red-500 font-semibold"
                                      : "text-green-600 font-semibold"
                                  }
                                >
                                  {parcel.paymrnt_status}
                                </td>
                                <td>{parcel.delevery_status}</td>
                                <td>
                                    {new Date(parcel.creation_Date).toLocaleDateString()}
                                </td>
                                <td className="space-x-2">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded">
                                        Edit
                                    </button>
                                    {parcel.paymrnt_status === "unpaid" && (
                                        <button className="px-3 py-1 bg-green-500 text-white rounded">
                                            Pay Now
                                        </button>
                                    )}
                                    <button className="px-3 py-1 bg-gray-600 text-white rounded">
                                        Track
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcel;
