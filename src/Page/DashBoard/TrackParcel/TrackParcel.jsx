import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecoure from '../../../Hook/useAxiosSecoure';
import { useNavigate } from 'react-router-dom';

const TrackParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecoure();
    const navigate = useNavigate();

    const { data: parcels, isLoading, isError } = useQuery({
        queryKey: ["myparcel", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        },

    });

    
    const trackingParcel = (id) => {
        console.log("parcel id:", id)
        navigate(`/dashboard/parcelTracking/${id}`)

    }


    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                My Parcels Tracking ({parcels.length})
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
                                <td className='text-xs'>{parcel.trackigId}</td>
                                <td className='text-xs'>{parcel.parcelType}</td>
                                <td>{parcel.price}৳</td>
                                <td
                                    className={
                                        parcel.payment_status === "unpaid"
                                            ? "text-red-500 font-semibold"
                                            : "text-green-600 font-semibold"
                                    }
                                >
                                    {parcel.payment_status}
                                </td>
                                <td className='text-xs'>{parcel.delevery_status}</td>
                                <td>
                                    {new Date(parcel.creation_Date).toLocaleDateString()}
                                </td>
                                <td className="space-x-2 text-sm">
                                    <button onClick={() => trackingParcel(parcel.trackigId)} className="px-3 py-1 bg-blue-500 text-white rounded">
                                        view
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

export default TrackParcel;
