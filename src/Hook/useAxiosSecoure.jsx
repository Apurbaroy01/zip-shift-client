import axios from "axios";
import useAuth from "./useAuth";

const Axiosinstance = axios.create({
    baseURL: `http://localhost:5000`,
});


const useAxiosSecoure = () => {
    const { user } = useAuth();
    Axiosinstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })
    return Axiosinstance;
};

export default useAxiosSecoure;