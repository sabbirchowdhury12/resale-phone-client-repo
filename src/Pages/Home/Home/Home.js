import React from 'react';
import AdvertiseProducts from '../AdvertiseProducts/AdvertiseProducts';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import ExtraSection from '../ExtraSection/ExtraSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <Category />
            <AdvertiseProducts />
            <ExtraSection />
        </div>
    );
};

export default Home;