import axios from "axios";

const Axiosinstance = axios.create({
    baseURL: `http://localhost:5000`,
});


const useAxiosSecoure = () => {
    return Axiosinstance;
};

export default useAxiosSecoure;