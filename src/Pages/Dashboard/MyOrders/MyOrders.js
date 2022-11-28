import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Share/Loading/Loading';

const MyOrders = () => {

    const { user } = useContext(AuthContext);

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://resale-phone-garage.vercel.app/orders?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });


    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">

                <thead>
                    {orders.length ?
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr> : <th className='text-center text-2xl'>You have no oder.</th>
                    }
                </thead>
                <tbody>
                    {
                        orders.map((order, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <th><img src={order.img} className='h-20' alt="" /></th>
                            <td>{order.title}</td>
                            <td>{order.price}</td>
                            <td>{order.paid ? <button className='btn btn-primary' disabled>paid</button> :
                                <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs btn-secondary'>Pay Now</button></Link>
                            }</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;