import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "https://dutiocollab-production.up.railway.app", 
    withCredentials: true,
})

export default axiosInstance;