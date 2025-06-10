import axios from 'axios';


const axiosInstance = axios.create({
    // baseURL: "https://dutiocollab-production.up.railway.app", 
    baseURL: "http://localhost:4000", // Use this for local development
    withCredentials: true,
})

export default axiosInstance;