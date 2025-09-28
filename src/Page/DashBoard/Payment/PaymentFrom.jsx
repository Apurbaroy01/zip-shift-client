import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentFrom = () => {
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();


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
                    Pay
                </button>
            </form>
            {
                error && <p className='text-2xl text-red-600'>{error}</p>
            }

        </div>
    );
};

export default PaymentFrom;