import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';


const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const { data: userIdenty = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://resale-phone-garage.vercel.app/users?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });


    const handleAddProduct = (event) => {
        event.preventDefault();
        const form = event.target;

        const modelName = form.modelName.value;
        const location = form.location.value;
        const resalePrice = form.price.value;
        const originalPrice = form.originalPrice.value;
        const sellerName = form.sellerName.value;
        const email = form.email.value;
        const desc = form.desc.value;
        const puchesYear = form.puchesYear.value;
        const condition = form.condition.value;
        const number = form.number.value;
        const category_id = form.brandName.value;
        const uses = form.uses.value;
        const userStatus = userIdenty.userStatus;

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        const newdate = day + "/" + month + "/" + year;

        const img = form.image.files[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const img = imgData.data.url;
                    const product = {
                        img,
                        modelName,
                        location,
                        resalePrice,
                        originalPrice,
                        sellerName,
                        email,
                        desc,
                        puchesYear,
                        condition,
                        number,
                        category_id,
                        uses,
                        userStatus,
                        date: newdate
                    };
                    fetch('https://resale-phone-garage.vercel.app/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success(`Product is added successfully`);
                                navigate('/dashboard/products');
                            }
                        });
                }
            });




    };
    return (
        <div className='container mx-auto p-5'>
            <h2 className='text-2xl text-center font-bold'>Add a Product</h2>
            <form onSubmit={handleAddProduct} className='grid grid-cols-1 gap-3 mt-10'>
                <input type="text" disabled defaultValue={user?.displayName} name='sellerName' className="input w-full input-bordered " />
                <input type="text" disabled defaultValue={user?.email} name='email' className="input w-full input-bordered " />
                <label htmlFor="">Brand Name: </label>
                <select name='brandName' className="input w-full input-bordered">
                    <option value="01">Xiaomi</option>
                    <option value="02">Symphony</option>
                    <option value="03">i-Phone</option>
                </select>
                <input type="text" placeholder='Model Name' name='modelName' required className="input w-full input-bordered " />
                <label htmlFor="">Condition </label>
                <select name='condition' className="input w-full input-bordered">
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                </select>
                <input type="text" placeholder='Price' name='price' required className="input w-full input-bordered " />
                <input type="text" placeholder='Original Price' name='originalPrice' required className="input w-full input-bordered " />
                <input name="image" type="file" placeholder="Image" required className="input w-full input-bordered" />
                <input name="number" type="text" placeholder="Phone Number" required className="input w-full input-bordered" />
                <input name="location" type="text" placeholder="Location" required className="input w-full input-bordered" />
                <input name="puchesYear" type="text" placeholder="Year of Purchase" required className="input w-full input-bordered" />
                <input name="uses" type="text" placeholder="Use Time" required className="input w-full input-bordered" />
                <textarea className="textarea w-full input-bordered " rows="5" name="desc" placeholder='Other Information'></textarea>
                <input className='btn btn-secondary w-full' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddProduct;