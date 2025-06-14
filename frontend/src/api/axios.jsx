import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    // Skip adding token for public endpoints (only GET requests to products)
    if(config.url.includes('/products') && config.method.toLowerCase() === 'get') {
        return config;
    }

    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) => {
    return Promise.reject(error);
});

export default api;