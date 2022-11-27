import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookPhone from './BookPhone';
import Loading from '../Share/Loading/Loading';
import CategoryProduct from './CategoryProduct';
import { useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const CategoryProducts = () => {
    const products = useLoaderData();
    const [product, setProduct] = useState(null);

    if (!products.length) {
        return <Loading />;
    }


    return (
        <div className='mt-16 w-5/6	 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>

                {
                    products?.map(product => <CategoryProduct key={product._id} product={product} setProduct={setProduct}
                    />)
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

export default CategoryProducts;