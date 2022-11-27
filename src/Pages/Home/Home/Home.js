import React from 'react';
import AdvertiseProducts from '../AdvertiseProducts/AdvertiseProducts';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';

const Home = () => {
    return (
        <div>
            <Banner />
            <Category />
            <AdvertiseProducts />
        </div>
    );
};

export default Home;