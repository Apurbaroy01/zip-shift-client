import { FaChevronDown } from "react-icons/fa";

const faqs = [
    {
        question: "How does this posture corrector work?",
        answer:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
        question: "Is it suitable for all ages and body types?",
        answer:
            "Yes, posture correctors are generally designed to be adjustable and suitable for most body types and ages.",
    },
    {
        question: "Does it really help with back pain and posture improvement?",
        answer:
            "Yes, when used correctly, posture correctors can support spinal alignment and reduce strain, which may help with posture and discomfort.",
    },
    {
        question: "Does it have smart features like vibration alerts?",
        answer:
            "Some models come with advanced features like vibration reminders to alert you when slouching.",
    },
    {
        question: "How will I be notified when the product is back in stock?",
        answer:
            "You will receive an email or SMS notification once the product is back in stock.",
    },
];

const FaqAccordion = () => {
    return (
        <div className="max-w-3xl mx-auto py-12">
            <h2 className="text-3xl font-bold text-center mb-3">
                Frequently Asked Question (FAQ)
            </h2>
            <p className="text-center text-gray-500 mb-10">
                Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                Achieve proper alignment, reduce pain, and strengthen your body with ease!
            </p>

            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-xl"
                    >
                        <input type="radio" name="faq-accordion" defaultChecked={idx === 0} />
                        <div className="collapse-title text-lg font-medium flex justify-between items-center ">
                            {faq.question}
                            <FaChevronDown className="ml-2 text-gray-500 " />
                        </div>
                        <div className="collapse-content text-gray-600">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-medium px-6 py-3 rounded-xl shadow-md transition">
                    See More FAQ's
                    <span className="w-7 h-7 bg-black text-white flex items-center justify-center rounded-full">
                        ➜
                    </span>
                </button>
            </div>
        </div>
    );
};

export default FaqAccordion;
