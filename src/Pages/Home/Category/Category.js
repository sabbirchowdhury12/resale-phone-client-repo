import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Share/Loading/Loading';

const Category = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: () => fetch('http://localhost:5000/category')
            .then(res => res.json())
    });
    console.log(categories);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='container mx-auto mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-20'>
                {
                    categories.map(category => <div className="card w-96 " key={category._id}>
                        <figure><img src={category.logo} className='h-40' alt="Shoes" /></figure>
                        <div className="card-body">
                            <Link to={`/category/${category.category_id}`}><h2 className='text-center font-bold text-2xl' >{category.category_name}!</h2></Link>
                        </div>
                    </div>)

                }
            </div>
        </div>
    );
};

export default Category;