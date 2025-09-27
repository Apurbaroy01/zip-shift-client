import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const PaymentFrom = () => {
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }


        const card = elements.getElement(CardElement)
        if (!card) {
            return;
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement></CardElement>

                <button type='submit' disabled={!stripe}>
                    Pay
                </button>
            </form>

        </div>
    );
};

export default PaymentFrom;