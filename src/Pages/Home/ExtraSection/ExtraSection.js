import React from 'react';

const ExtraSection = () => {
    return (
        <div className='container mx-auto my-10 p-10'>
            <h2 className='text-center text-2xl font-bold  my-10'>How Can You Use</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20'>
                <div className='text-center bg-blue-800 p-2 rounded text-white'>
                    <div className='text-5xl text-gray-400 pb-3'>01</div>
                    <h2 className='text-xl font-bold'>Choose The Phone You Like</h2>
                    <p>If you want to buy a phone. Frist search it and choose</p>
                </div>
                <div className='text-center bg-blue-800 p-2 rounded text-white'>
                    <div className='text-5xl text-gray-400 pb-3'>02</div>
                    <h2 className='text-xl font-bold'>Book Your Phone</h2>
                    <p>If you want to buy a product. Book it.</p>
                </div>
                <div className='text-center bg-blue-800 p-2 rounded text-white'>
                    <div className='text-5xl text-gray-400 pb-3'>03</div>
                    <h2 className='text-xl font-bold'>Payment </h2>
                    <p>After book you have to payment for buy a poduct</p>
                </div>
                <div className='text-center bg-blue-800 p-2 rounded text-white'>
                    <div className='text-5xl text-gray-400 pb-3'>04</div>
                    <h2 className='text-xl font-bold'>Sell a Phone</h2>
                    <p>If you want to sell a phone a phone. Added it</p>
                </div>
            </div>
        </div>
    );
};

export default ExtraSection;