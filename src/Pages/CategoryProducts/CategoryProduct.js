import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { GoVerified } from 'react-icons/go';
import { AuthContext } from '../../Contexts/AuthProvider';


const CategoryProduct = ({ product, setProduct }) => {

    const { condition, desc, img, location, modelName, number, originalPrice, puchesYear, resalePrice, sellerName, uses, } = product;

    const { user } = useContext(AuthContext);

    const handleRepotedAdmin = (product) => {

        const modelName = product.modelName;
        const email = user.email;
        const productId = product._id;
        const name = product.sellerName;
        const img = product.img;

        const reportedItem = {
            modelName,
            email,
            productId,
            name,
            img
        };
        console.log(reportedItem);

        fetch('http://localhost:5000/reportedItem', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(reportedItem)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Reported successfully');
                }
            });
    };

    return (
        !product.paid &&
        <div className="card  bg-base-100 shadow-xl">
            <button onClick={() => handleRepotedAdmin(product)} className='p-2 text-end font-bold text-secondary'>Report to Admin</button>
            <figure><img className='lg:h-96' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{modelName}</h2>
                <p className='flex items-center gap-2'>Seller Name: {sellerName} <span className='text-green-600'>{
                    product.userStatus === 'verified' &&
                    <GoVerified />
                }
                </span></p>
                <p>{desc}</p>
                <p>Condition: {condition}</p>

                <p>Orginal Price: ${originalPrice}</p>
                <p>Resale Price: ${resalePrice}</p>

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
                        className="btn btn-secondary w-full text-white"
                        onClick={() => setProduct(product)}
                    >Book Appointment</label>
                </div>
            </div>
        </div>

    );
};

export default CategoryProduct;