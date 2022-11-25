import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Share/Loading/Loading';

const MyOrders = () => {

    const { user } = useContext(AuthContext);

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders?email=${user?.email}`);
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
                    <tr>
                        <th></th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <th><img src={order.img} className='h-20' alt="" /></th>
                            <td>{order.title}</td>
                            <td>{order.price}</td>
                            <td><button className='btn btn-xs btn-secondary'>Pay Now</button></td>

                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;