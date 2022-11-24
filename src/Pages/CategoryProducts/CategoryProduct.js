import React from 'react';

const CategoryProduct = ({ product }) => {

    const { condition, desc, img, location, modelName, number, originalPrice, puchesYear, resalePrice, sellerName, uses, _id } = product;


    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure><img className='lg:h-96' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{modelName}</h2>
                <p>{desc}</p>
                <p>Condition: {condition}</p>
                <div className='lg:flex items-center justify-between'>
                    <p>Orginal Price: ${originalPrice}</p>
                    <p>Resale Price: ${resalePrice}</p>
                </div>
                <p>Purchase Year: {puchesYear}</p>
                <p>Use: {uses} year</p>

                <p>Seller Name: {sellerName}</p>
                <p>Phone: {number}</p>
                <p>Location: {location}</p>


                <div className="card-actions justify-center">
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;