import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    // Skip adding token only for public product endpoints
    // Allow auth for user-specific endpoints like /products/created-by/* and /products/processing-by/*
    const isPublicProductEndpoint = config.url === '/products' || 
                                   (config.url.startsWith('/products/') && 
                                    config.url.match(/^\/products\/\d+$/) && 
                                    config.method.toLowerCase() === 'get');
    
    if(isPublicProductEndpoint) {
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