import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import ServicesCard from '../ServicesCard/ServicesCard';
import ClientLogoMarque from '../ClientLogoMarque/ClientLogoMarque';
import Benifits from '../Benifits/Benifits';
import BeMarchant from '../BeMarchent/BeMarchant';
import TestimonialCarousel from '../TestimonialCarousel/TestimonialCarousel';
import FaqAccordion from '../FaqAccordion/FaqAccordion';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <ServicesCard></ServicesCard>
            <ClientLogoMarque></ClientLogoMarque>
            <Benifits></Benifits>
            <BeMarchant></BeMarchant>
            <TestimonialCarousel></TestimonialCarousel>
            <FaqAccordion></FaqAccordion>
        </div>
    );
};

export default Home;