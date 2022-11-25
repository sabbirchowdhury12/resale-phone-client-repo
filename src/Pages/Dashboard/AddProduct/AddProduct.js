import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';


const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const imageHostKey = "8fd3dbe5918be63ad82f01b3fb69d14a";

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
                    };
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            toast.success(`Product is added successfully`);
                            navigate('/dashboard/myProduts');
                        });
                }
            });




    };
    return (
        <div className='container mx-auto'>
            <form onSubmit={handleAddProduct} className='grid grid-cols-1 gap-3 mt-10'>
                <input type="text" disabled defaultValue={user?.displayName} name='sellerName' className="input w-full input-bordered " />
                <input type="text" disabled defaultValue={user?.email} name='email' className="input w-full input-bordered " />
                <label htmlFor="">Brand Name: </label>
                <select name='brandName' className="input w-full input-bordered">
                    <option value="01">Xiaomi</option>
                    <option value="02">Symphony</option>
                    <option value="03">i-Phone</option>
                </select>
                <input type="text" placeholder='Model Name' name='modelName' className="input w-full input-bordered " />
                <label htmlFor="">Condition </label>
                <select name='condition' className="input w-full input-bordered">
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                </select>
                <input type="text" placeholder='Price' name='price' className="input w-full input-bordered " />
                <input type="text" placeholder='Original Price' name='originalPrice' className="input w-full input-bordered " />
                <input name="image" type="file" placeholder="Image" className="input w-full input-bordered" />
                <input name="number" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                <input name="location" type="text" placeholder="Location" className="input w-full input-bordered" />
                <input name="puchesYear" type="text" placeholder="Year of Purchase" className="input w-full input-bordered" />
                <input name="uses" type="text" placeholder="Use Time" className="input w-full input-bordered" />
                <textarea className="textarea w-full input-bordered " rows="5" name="desc" placeholder='Other Information'></textarea>
                <input className='btn btn-accent w-full' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddProduct;