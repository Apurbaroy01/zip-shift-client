import React from 'react';
import useAuth from '../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecoure from '../../../Hook/useAxiosSecoure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecoure();

    const { data: history = [] } = useQuery({
        queryKey: ["history", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment?email=${user.email}`)
            return res.data
        }
    })

    console.log(history)
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                My Payment History ({history.length})
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>parcel ID</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Transation</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((payment, index) => (
                            <tr key={payment._id} className="border-b">
                                <td>{index + 1}</td>
                                <td>{payment.parcelId} </td>
                                <td>{payment.amount} </td>
                                <td >{payment.email}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.paid_At}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;