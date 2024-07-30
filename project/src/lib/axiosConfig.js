import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Ensure cookies are sent with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Ensure cookies are sent with requests
    headers: { 'Content-Type': 'application/json' },
});

export default axiosConfig;