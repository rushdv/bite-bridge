import axios from "axios";
import { auth } from "../config/firebase";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Attach Firebase ID token to every request
axiosInstance.interceptors.request.use(async (config) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
