import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://salamualaikum-server-2.vercel.app/'
})

const useAxiosSecure = () => {

return axiosSecure

};

export default useAxiosSecure;