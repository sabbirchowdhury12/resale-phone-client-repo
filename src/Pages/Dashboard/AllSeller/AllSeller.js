import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Share/Loading/Loading';

const AllSeller = () => {

    const { data: allsellers = [], isLoading, refetch } = useQuery({
        queryKey: ['allsellers'],
        queryFn: async () => {
            const res = await fetch(`https://resale-phone-garage.vercel.app/allsellers/${'seller'}`, {
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

    const handleDelete = (id) => {
        fetch(`https://resale-phone-garage.vercel.app/users/${id}`, {
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
        const user = {
            _id: id._id,
            email: id.email
        };
        fetch(`https://resale-phone-garage.vercel.app/users`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json(user))
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('verified successfully');
                    refetch();
                }
            });
    };


    return (
        <div className="overflow-x-auto mt-10">
            <table className="table w-full">

                <thead>
                    {allsellers.length ?
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verify</th>
                            <th>Delete</th>
                        </tr> : <th className='text-center text-2xl mt-5 font-bold '>There is no seller available.</th>
                    }

                </thead>
                <tbody>
                    {
                        allsellers.map((seller, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <th>{seller.name}</th>
                            <td>{seller.email}</td>
                            <td>{seller.status ?
                                'Verified' :
                                <button onClick={() => handleVerify(seller)} className='btn btn-xs btn-secondary'>Verify</button>
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