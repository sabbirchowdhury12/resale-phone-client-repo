import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from '../../Share/Loading/Loading';

const ReportedItem = () => {

    const { data: reportedItems = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedItem'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reportedItem');
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <Loading />;
    }

    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/reportedItem/${id}`, {
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
                    {reportedItems.length ?
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Payment</th>
                        </tr> : <th className='text-center text-2xl'>You have no oder.</th>
                    }
                </thead>
                <tbody>
                    {
                        reportedItems.map((reportedItem, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <th><img src={reportedItem.img} className='h-20' alt="" /></th>
                            <td>{reportedItem.modelName}</td>
                            <td>{reportedItem.email}</td>
                            <td><button onClick={() => handleDelete(reportedItem._id)}>Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ReportedItem;