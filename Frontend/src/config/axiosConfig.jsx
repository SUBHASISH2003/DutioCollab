import axios from 'axios';


const axiosInstance = axios.create({
    
    baseURL: "dutiocollab-production-660d.up.railway.app",
    withCredentials: true,
})

export default axiosInstance;