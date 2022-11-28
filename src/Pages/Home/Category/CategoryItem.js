import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const CategoryItem = ({ category }) => {
    return (

        <div className="card" key={category._id}>
            <figure><img src={category.logo} className='h-40' alt="Shoes" /></figure>
            <div className="card-body">

                <div className='flex text-center items-center justify-center p-2'>
                    <Link to={`/category/${category.category_id}`}><p className='text-center font-bold text-2xl text-secondary ' >{category.category_name} </p>
                    </Link>
                    <BsFillArrowRightCircleFill className='text-secondary ml-2 text-3xl pt-2' />
                </div>
            </div>
        </div>

    );
};

export default CategoryItem;