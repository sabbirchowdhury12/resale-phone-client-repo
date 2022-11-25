import React from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';


const AddProduct = () => {
    const imageHostKey = "8fd3dbe5918be63ad82f01b3fb69d14a";

    const handleAddProduct = (event) => {
        event.preventDefault();
        const form = event.target;

        const modelName = form.modelName.value;



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
                    console.log(imgData.data.url);
                    const product = {

                    };
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(` is added successfully`);
                            Navigate('/dashbord/managedoctors');
                        });
                }
            });



    };
    return (
        <div className='container mx-auto'>
            <form onSubmit={handleAddProduct} className='grid grid-cols-1 gap-3 mt-10'>
                <input type="text" placeholder='Product Name' name='product-name' className="input w-full input-bordered " />
                <input type="text" placeholder='Price' name='price' className="input w-full input-bordered " />
                <label htmlFor="">Brand Name: </label>
                <select className="input w-full input-bordered">
                    <option value="01">Xiaomi</option>
                    <option value="02">Symphony</option>
                    <option value="03">i-Phone</option>
                </select>
                <input type="text" placeholder='Model Name' name='modelName' className="input w-full input-bordered " />
                <label htmlFor="">Condition </label>
                <select className="input w-full input-bordered">
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                </select>
                <input name="image" type="file" placeholder="Image" className="input w-full input-bordered" />
                <input name="number" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                <input name="location" type="text" placeholder="Location" className="input w-full input-bordered" />
                <input name="year" type="text" placeholder="Year of Purchase" className="input w-full input-bordered" />
                <textarea className="textarea w-full input-bordered " rows="5" name="desc" placeholder='Other Information'></textarea>
                <input className='btn btn-accent w-full' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddProduct;