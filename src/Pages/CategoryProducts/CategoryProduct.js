import React from 'react';
import { GoVerified } from 'react-icons/go';


const CategoryProduct = ({ product, setProduct }) => {

    const { condition, desc, img, location, modelName, number, originalPrice, puchesYear, resalePrice, sellerName, uses, } = product;

    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure><img className='lg:h-96' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{modelName}</h2>
                <p className='flex items-center gap-2'>Seller Name: {sellerName} <span className='text-green-600'>{
                    product.status === 'verified' &&
                    <GoVerified />
                }
                </span></p>
                <p>{desc}</p>
                <p>Condition: {condition}</p>
                <div className='lg:flex items-center justify-between'>
                    <p>Orginal Price: ${originalPrice}</p>
                    <p>Resale Price: ${resalePrice}</p>
                </div>
                <p>Purchase Year: {puchesYear}</p>
                <p>Use: {uses} year</p>
                <p>Phone: {number}</p>
                <p>Location: {location}</p>
                {
                    product.date &&
                    <p>Published Date: {product.date}</p>
                }



                <div className="card-actions justify-center">
                    <label
                        htmlFor="booking-modal"
                        className="btn btn-primary text-white"
                        onClick={() => setProduct(product)}
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;