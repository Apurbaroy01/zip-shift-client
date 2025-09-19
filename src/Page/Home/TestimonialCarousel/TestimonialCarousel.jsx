import { useState } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import logo1 from '../../../assets/customer-top.png'

const testimonials = [
    {
        id: 1,
        name: "Awlad Hossin",
        role: "Senior Product Designer",
        text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
        color: "bg-teal-900",
    },
    {
        id: 2,
        name: "Rasel Ahamed",
        role: "CTO",
        text: "This service has helped us deliver products faster with 100% safety. Customer satisfaction has been our strongest achievement with Profast Courier.",
        color: "bg-teal-500",
    },
    {
        id: 3,
        name: "Nasir Uddin",
        role: "CEO",
        text: "Profast Courier ensures timely delivery across Bangladesh. Their low cost and reliability have been crucial for our growth.",
        color: "bg-teal-700",
    },
    {
        id: 4,
        name: "Nasir Uddin",
        role: "CEO",
        text: "Profast Courier ensures timely delivery across Bangladesh. Their low cost and reliability have been crucial for our growth.",
        color: "bg-teal-700",
    },
    {
        id: 5,
        name: "Nasir Uddin",
        role: "CEO",
        text: "Profast Courier ensures timely delivery across Bangladesh. Their low cost and reliability have been crucial for our growth.",
        color: "bg-teal-700",
    },
];

const TestimonialCarousel = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    return (
        <div className="text-center py-16 bg-gray-50"data-aos="zoom-in-up">
            {/* Section Title */}
            <div className="flex justify-center mb-4">
                <img
                    src={logo1}
                    alt="icon"
                    className="w-auto"
                />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
                What our customers are saying
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                Achieve proper alignment, reduce pain, and strengthen your body with ease!
            </p>

            {/* Testimonial Card */}
            <div className="relative max-w-lg mx-auto">
                <div className="bg-white shadow-md rounded-2xl p-8 transition-all">
                    <FaQuoteLeft className="text-teal-500 text-3xl mb-4" />
                    <p className="text-gray-600 mb-6">{testimonials[current].text}</p>

                    <div className="flex items-center gap-3 border-t pt-4">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${testimonials[current].color}`}
                        >
                            {testimonials[current].name.charAt(0)}
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-gray-900">
                                {testimonials[current].name}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {testimonials[current].role}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center items-center gap-6 mt-6">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-white shadow hover:bg-teal-500 hover:text-white transition"
                    >
                        <FaArrowLeft />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${index === current ? "bg-teal-600" : "bg-gray-300"
                                    }`}
                            ></span>
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full bg-white shadow hover:bg-teal-500 hover:text-white transition"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;
