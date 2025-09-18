import Marquee from "react-fast-marquee";

import clientlogo1 from '../../../assets/brands/amazon.png'
import clientlogo2 from '../../../assets/brands/amazon_vector.png'
import clientlogo3 from '../../../assets/brands/casio.png'
import clientlogo4 from '../../../assets/brands/moonstar.png'
import clientlogo5 from '../../../assets/brands/randstad.png'
import clientlogo6 from '../../../assets/brands/start-people 1.png'
import clientlogo7 from '../../../assets/brands/start.png'

const ClientLogoMarque = () => {
    return (
        <div className="bg-gray-50 py-6 rounded-xl shadow-inner">
            <div className="text-xl text-center font-semibold mb-10">
                <p>We've helped thousands of sales teams</p>
            </div>
            <Marquee gradient={false} speed={60}>
                <div className="flex items-center gap-16">
                    <img src={clientlogo1} alt="Amazon" className="w-20 object-contain hover:scale-110 transition-transform duration-300" />
                    <img src={clientlogo2} alt="Amazon Vector" className="w-20 object-contain hover:scale-110 transition-transform duration-300" />
                    <img src={clientlogo3} alt="Casio" className="w-20 object-contain hover:scale-110 transition-transform duration-300" />
                    <img src={clientlogo4} alt="Moonstar" className="w-20 object-contain hover:scale-110 transition-transform duration-300" />
                    <img src={clientlogo5} alt="Randstad" className="w-20 object-contain hover:scale-110 transition-transform duration-300" />
                    <img src={clientlogo6} alt="Start People" className="w-20 object-contain hover:scale-110 transition-transform duration-300" />
                    <img src={clientlogo7} alt="Start" className="w-20 object-contain hover:scale-110 transition-transform duration-300" />
                </div>
            </Marquee>
        </div>
    );
};

export default ClientLogoMarque;
