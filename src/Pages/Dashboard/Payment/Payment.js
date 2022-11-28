import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {

    const order = useLoaderData();

    return (
        <div className='m-20'>
            <h2>Payment for {order.name}</h2>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;