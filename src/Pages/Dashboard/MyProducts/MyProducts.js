import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Share/Loading/Loading';

const MyProducts = () => {

    const { user } = useContext(AuthContext);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
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

    if (isLoading) {
        return <Loading />;
    }



    return (
        <div className="overflow-x-auto">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{product.modelName}</td>
                            <td>{product.resalePrice}</td>
                            <td>{product.status ? product.status : 'available'}</td>
                            <td ><button onClick={() => handleDelete(product._id)} className='text-red-600 font-bold text-xl'>X</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;