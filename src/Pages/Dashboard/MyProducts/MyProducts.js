import { useQuery } from '@tanstack/react-query';
import React, { Profiler } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Share/Loading/Loading';

const MyProducts = () => {

    const { user } = useContext(AuthContext);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://resale-phone-garage.vercel.app/products?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });



    const handleDelete = (id) => {
        fetch(`https://resale-phone-garage.vercel.app/products/${id}`, {
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

    const handleAdvertise = (id) => {
        fetch(`https://resale-phone-garage.vercel.app/products/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make advetise successfully');
                    refetch();
                }
            });
    };

    if (isLoading) {
        return <Loading />;
    }



    return (
        <div className="overflow-x-auto">
            <table className="table w-full">

                <thead>
                    {
                        products.length ?
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Sale Status</th>
                                <th>Delete</th>
                            </tr> : <th className='text-center text-2xl mt-5 font-bold '>There is no product available.</th>
                    }

                </thead>
                <tbody>
                    {
                        products.map((product, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{product.modelName}</td>
                            <td>{product.resalePrice}</td>
                            <td>{product.paid ? 'Sold' :
                                <button onClick={() => handleAdvertise(product._id)} title='click to advertise' className='btn btn-xs'>{product.saleStatus ? product.saleStatus : 'available'}</button>
                            }
                            </td>
                            <td >{product.paid ? 'payment done' :
                                <button onClick={() => handleDelete(product._id)} className='text-red-600 font-bold text-xl'>X</button>
                            }</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;