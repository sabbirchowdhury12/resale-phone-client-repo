import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Share/Loading/Loading';

const AllSeller = () => {

    const { data: allsellers = [], isLoading, refetch } = useQuery({
        queryKey: ['allsellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allsellers/${'seller'}`);
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

    const handleVerify = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('verified successfully');
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
                        <th>Verify</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allsellers.map((seller, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <th>{seller.name}</th>
                            <td>{seller.email}</td>
                            <td>{seller.verify ?
                                'Verified' :
                                <button onClick={() => handleVerify(seller._id)} className='btn btn-xs btn-secondary'>Verify</button>
                            }</td>
                            <td><button onClick={() => handleDelete(seller._id)} className='btn btn-xs btn-secondary'>Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllSeller;