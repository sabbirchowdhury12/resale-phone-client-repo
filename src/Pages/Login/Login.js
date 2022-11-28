import { GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, signWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [loginUserEmail, setLoginUserEmail] = useState();
    const [token] = useToken(loginUserEmail);

    const provider = new GoogleAuthProvider();

    const from = location.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = (data) => {
        login(data.email, data.password)
            .then(result => {
                setLoginUserEmail(data.email);
                toast.success('login success');
            }).catch(error => console.log(error));
    };

    const handleWithGoogle = () => {
        signWithGoogle(provider)
            .then(result => {
                const user = result.user;
                const role = 'buyer';
                saveUser(user.displayName, user.email, role);
            }).catch(error => console.error(error));
    };



    const saveUser = (name, email, role) => {

        const user = {
            name,
            email,
            role,
        };

        fetch('http://localhost:5000/googleuser', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setLoginUserEmail(email);
            });
    };


    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input
                            {...register("email", {
                                required: 'email is required'
                            })}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.email && <p className='text-red-700'>{errors.email.message}</p>}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type='password'
                            {...register("password", {
                                required: 'password is required',
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-700'>{errors.password?.message}</p>}
                        <label className="label"> <span className="label-text">Forget Password?</span></label>
                    </div>


                    <input className='btn btn-secondary w-full' value="Login" type="submit" />
                </form>
                <p>Don't have any acount. <Link className='text-secondary' to="/signup">Create new Account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleWithGoogle} className='btn btn-secondary btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;