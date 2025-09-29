import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecoure from '../../../Hook/useAxiosSecoure';

const PaymentFrom = () => {
    const axiosSecure = useAxiosSecoure();
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    console.log(parcelId);

    const { data: parcelInfo = {}, isPending } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })

    if (isPending) {
        return <p>Loding.....</p>
    }

    const amount = parcelInfo.price;
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }


        const card = elements.getElement(CardElement)
        if (!card) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('error', error);
            setError(error.message)
        }
        else {
            setError("")
            console.log('PaymentMethod', paymentMethod);
        }
    };

    return (
        <div className='w-9/12 mx-auto p-10  justify-center items-center '>
            <form onSubmit={handleSubmit}>
                <div className="border rounded-lg p-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": { color: "#a0aec0" },
                                },
                                invalid: { color: "#e53e3e" },
                            },
                        }}
                    />
                </div>

                <button className='btn btn-primary w-full mt-5' type='submit' disabled={!stripe}>
                    Pay ${amount}
                </button>
            </form>
            {
                error && <p className='text-2xl text-red-600'>{error}</p>
            }

        </div>
    );
};

export default PaymentFrom;