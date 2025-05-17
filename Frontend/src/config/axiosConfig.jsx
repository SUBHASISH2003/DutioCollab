import axios from 'axios';


const axiosInstance = axios.create({
    baseURL:"https://dutio-collab-id9l.vercel.app/", 
    withCredentials: true,
})

export default axiosInstance;