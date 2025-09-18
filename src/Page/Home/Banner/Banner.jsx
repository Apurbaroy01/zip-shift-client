import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import banner1 from '../../../assets/banner/banner1.png'
import banner2 from '../../../assets/banner/banner2.png'
import banner3 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
        <div className="w-11/12 mx-auto rounded-xl overflow-hidden shadow-md p-4">
            <Carousel 
                // autoPlay 
                // infiniteLoop 
                showThumbs={false} 
                showStatus={false} 
                interval={4000} 
                transitionTime={800}
                swipeable
                emulateTouch

            >
                <div>
                    <img 
                        src={banner1} 
                        alt="Banner 1" 
                        className="w-full h-[350px] md:h-[400px] object-cover" 
                    />
                </div>
                <div>
                    <img 
                        src={banner2} 
                        alt="Banner 2" 
                        className="w-full h-[350px] md:h-[400px] object-cover" 
                    />
                </div>
                <div>
                    <img 
                        src={banner3} 
                        alt="Banner 3" 
                        className="w-full h-[350px] md:h-[400px] object-cover" 
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
