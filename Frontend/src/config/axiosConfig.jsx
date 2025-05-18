import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "https://dutio-collab-7lym.vercel.app", 
    withCredentials: true,
})

export default axiosInstance;