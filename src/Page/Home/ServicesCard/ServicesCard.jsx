import {
  FaTruck,
  FaGlobe,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";

const ServicesCard = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      icon: <FaTruck size={28} />,
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      icon: <FaGlobe size={28} />,
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      icon: <FaWarehouse size={28} />,
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: <FaMoneyBillWave size={28} />,
    },
    {
      title: "Corporate Service / Contract in Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
      icon: <FaBuilding size={28} />,
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      icon: <FaUndo size={28} />,
    },
  ];

  return (
    <section className="bg-teal-900 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white">Our Services</h2>
        <p className="text-gray-200 mt-2 mb-10 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              data-aos="fade-right"
              key={index}
              className="p-6 rounded-xl bg-white shadow-sm transition duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:bg-yellow-200"
            >
              <div className="flex justify-center items-center w-14 h-14 mx-auto rounded-full mb-4 bg-teal-100 text-teal-700 transition duration-300 hover:bg-teal-200">
                {service.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 transition duration-300 hover:text-teal-700">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 transition duration-300 hover:text-gray-800">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCard;
