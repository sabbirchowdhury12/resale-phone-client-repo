import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Share/Loading/Loading';
import CategoryItem from './CategoryItem';

const Category = () => {

    const [categories, setCategories] = useState([]);


    //axios api call
    useEffect(() => {
        axios.get('https://resale-phone-garage.vercel.app/category')
            .then(data => {
                setCategories(data.data);
            });
    }, []);

    // const { data: categories = [], isLoading } = useQuery({
    //     queryKey: ['category'],
    //     queryFn: () => fetch('https://resale-phone-garage.vercel.app/category')
    //         .then(res => res.json())
    // });

    // if (isLoading) {
    //     return <Loading />;
    // }

    return (
        <div className='container mx-auto my-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-20'>
                {
                    categories?.map(category => <CategoryItem category={category} key={category._id} />)

                }
            </div>
        </div>
    );
};

export default Category;