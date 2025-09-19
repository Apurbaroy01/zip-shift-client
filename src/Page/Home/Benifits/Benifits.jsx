import { FaMapMarkedAlt, FaBoxOpen, FaHeadset } from "react-icons/fa";


const Benifits = () => {
    const features = [
        {
            icon: <FaMapMarkedAlt className="text-5xl text-blue-600" />,
            title: "Live Parcel Tracking",
            desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind."
        },
        {
            icon: <FaBoxOpen className="text-5xl text-green-600" />,
            title: "100% Safe Delivery",
            desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
        },
        {
            icon: <FaHeadset className="text-5xl text-purple-600" />,
            title: "24/7 Call Center Support",
            desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
        }
    ];

    return (
        <div className="bg-gray-50 py-10 px-6 md:px-16 space-y-6">
            {features.map((feature, index) => (
                <div
                    data-aos="zoom-in"
                    key={index}
                    className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                >

                    <div className="flex-shrink-0 w-30 flex items-center text-center justify-center">
                        {feature.icon}
                    </div>

                    <div className="divider lg:divider-horizontal"></div>
                    <div>

                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Benifits;
