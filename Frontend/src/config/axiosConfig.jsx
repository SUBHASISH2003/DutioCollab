import axios from 'axios';


const axiosInstance = axios.create({
    
    baseURL: "https://dutio.onrender.com",

    withCredentials: true,
})

export default axiosInstance;