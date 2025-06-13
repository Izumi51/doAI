import React, { useState } from 'react';
import AuthContext from './AuthContext';
import api from '../api/axios';

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const isAuthenticated = !!token;

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, name } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userName', name);
            setToken(token);
            return { success: true }
        }catch (error) {
            
            return {
                success: false, 
                message: error.response?.data?.message || 'Erro ao fazer login' 
            }
        }
    };

    const register = async (email, password, name) => {
        try {
            const response = await api.post('/auth/register', { email, password, name });
            const { token, name: userName } = response.data;

            localStorage.setItem('token', token);
            setToken(token);
            return true;
        }catch (error) {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;