import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';

const BookPhone = ({ product, setProduct }) => {

    const { user } = useContext(AuthContext);
    const { modelName, resalePrice, img } = product;

    const handleOrder = (event) => {

        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const email = form.email.value;
        const price = form.price.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const order = {
            title,
            email,
            price,
            name,
            phone,
            location,
            img,
            productId: product._id
        };

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setProduct(null);
                    toast.success(`Product is added successfully`);
                }
            });
    };


    const updateProducts = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                }
            });
    };

    const handleValue = () => {
        setProduct(null);
    };

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={handleValue} htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleOrder} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" name='title' disabled defaultValue={modelName} className="input w-full input-bordered " />
                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="price" type="text" disabled defaultValue={resalePrice} placeholder="Price" className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <input name="location" type="text" placeholder="Location" className="input w-full input-bordered" />
                        <br />
                        <input onClick={() => updateProducts(product._id)} className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookPhone;