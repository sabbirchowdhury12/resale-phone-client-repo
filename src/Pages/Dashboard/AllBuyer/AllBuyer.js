import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Share/Loading/Loading';

const AllBuyer = () => {

    const { data: allbuyers = [], isLoading, refetch } = useQuery({
        queryKey: ['allbuyers'],
        queryFn: async () => {
            const res = await fetch(`https://resale-phone-garage.vercel.app/allbuyers/${'seller'}`, {
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

    return (
        <div className="overflow-x-auto mt-10">
            <table className="table w-full">

                <thead>
                    {allbuyers.length ?
                        < tr >
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>role</th>
                            <th>Delete</th>
                        </tr> : <th className='text-center text-2xl mt-5 font-bold '>There is no buyer available.</th>
                    }
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
        </div >
    );
};

export default AllBuyer;