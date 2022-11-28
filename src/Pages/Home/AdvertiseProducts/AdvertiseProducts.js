import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Share/Loading/Loading';
import BookPhone from '../../CategoryProducts/BookPhone';
import CategoryProduct from '../../CategoryProducts/CategoryProduct';
import { useState } from 'react';

const AdvertiseProducts = () => {

    const [product, setProduct] = useState(null);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/${'advertise'}`, {
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
        products.length &&
        <div className='container mx-auto'>
            <h2 className='text-center my-5 text-2xl font-bold underline uppercase '>Advertise Poducts</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-20 mt-10 p-5'>
                {
                    products.map(product => <CategoryProduct key={product._id} setProduct={setProduct} product={product} />)
                }
            </div>
            {
                product && <>
                    <BookPhone product={product} setProduct={setProduct} />
                </>
            }
        </div>
    );
};

export default AdvertiseProducts;