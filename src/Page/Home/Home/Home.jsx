import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import ServicesCard from '../ServicesCard/ServicesCard';
import ClientLogoMarque from '../ClientLogoMarque/ClientLogoMarque';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <ServicesCard></ServicesCard>
            <ClientLogoMarque></ClientLogoMarque>
        </div>
    );
};

export default Home;