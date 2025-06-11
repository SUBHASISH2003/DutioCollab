import axios from 'axios';


const axiosInstance = axios.create({
    
    baseURL: "https://dutiocollab-production-be7a.up.railway.app",

    withCredentials: true,
})

export default axiosInstance;