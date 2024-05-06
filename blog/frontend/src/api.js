import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// using the env varible VITE_API_URL to establish the base URL to use
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Intercept the request To add in the token class in the headers of the request
api.interceptors.request.use(
    (config) => {
        // Get the token From storage, if the token exist insert token
        // In the head next to the Bearer variable
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api