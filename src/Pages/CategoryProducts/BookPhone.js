import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';

const BookPhone = ({ product, setProduct }) => {
    const { user } = useContext(AuthContext);
    console.log(product);
    const { modelName, resalePrice } = product;


    const handleValue = () => {
        setProduct(null);
    };

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={handleValue} htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled defaultValue={modelName} className="input w-full input-bordered " />
                        <input type="text" disabled defaultValue={resalePrice} className="input w-full input-bordered " />
                        <input name="name" type="text" disabled defaultValue={user?.displayName} className="input w-full input-bordered" />
                        <input name="email" type="email" disabled defaultValue={user?.email} className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />

                        <input name="location" type="text" placeholder="Location" className="input w-full input-bordered" />

                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookPhone;