import axios from 'axios';


const axiosInstance = axios.create({
    
    baseURL: "https://dutio.up.railway.app",

    withCredentials: true,
})

export default axiosInstance;