import logo1 from '../../../assets/location-merchant.png'

const BeMarchant = () => {
    return (
        <div className="hero bg-[#03373D] p-10 rounded-3xl "data-aos="flip-up">
            <div className="hero-content flex-col lg:flex-row-reverse text-white">
                <img
                    src={logo1}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className='flex gap-5'>
                        <button className="btn btn-primary rounded-4xl">Become a Merchant</button>
                        <button className="btn btn-dash btn-secondary rounded-4xl">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMarchant;