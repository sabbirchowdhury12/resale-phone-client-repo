import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../Share/Loading/Loading';
import CategoryProduct from './CategoryProduct';

const CategoryProducts = () => {
    const products = useLoaderData();

    if (!products.length) {
        return <Loading />;
    }

    return (
        <div className='mt-16 w-5/6	 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>

                {
                    products?.map(product => <CategoryProduct key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default CategoryProducts;