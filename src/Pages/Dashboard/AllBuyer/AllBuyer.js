import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Share/Loading/Loading';

const AllBuyer = () => {

    const { user } = useContext(AuthContext);

    const { data: allbuyers = [], isLoading, refetch } = useQuery({
        queryKey: ['allbuyers', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allbuyers/${'seller'}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    console.log(allbuyers);


    return (
        <div className="overflow-x-auto">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>role</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allbuyers.map((buyer, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <th>{buyer.name}</th>
                            <td>{buyer.email}</td>
                            <td>{buyer.role}</td>
                            <td><button className='btn btn-xs btn-secondary'>Delete</button></td>

                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllBuyer;