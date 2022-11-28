import React from 'react';
import phone from '../../../../src/Assests/phone.webp';

const Banner = () => {
    return (
        <div className="hero h-screen" style={{ backgroundImage: `url(${phone})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-2xl md:text-5xl font-bold">Hello Dear</h1>
                    <p className="mb-5">You are welcome to our page. Here, You can buy and sell your old phone.</p>
                    <button className="btn btn-secondary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;