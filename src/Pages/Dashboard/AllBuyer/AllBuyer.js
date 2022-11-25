import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Share/Loading/Loading';

const AllBuyer = () => {

    const { data: allbuyers = [], isLoading, refetch } = useQuery({
        queryKey: ['allbuyers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allbuyers/${'seller'}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('delete successfully');
                    refetch();
                }
            });
    };

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>role</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allbuyers.map((buyer, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <th>{buyer.name}</th>
                            <td>{buyer.email}</td>
                            <td>{buyer.role}</td>
                            <td><button onClick={() => handleDelete(buyer._id)} className='btn btn-xs btn-secondary'>Delete</button></td>

                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllBuyer;