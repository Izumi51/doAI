import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import api from '../api/axios';

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            setUserName(storedUserName);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, name } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userName', name);
            setToken(token);
            setUserName(name);
            setIsAuthenticated(true);
            return { success: true };
        }catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            setToken(null);
            setIsAuthenticated(false);
            return { success: false};
        }
    };

    const register = async (email, password, name) => {
        try {
            const response = await api.post('/auth/register', { email, password, name });
            const { token, name: userName } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);
            setToken(token);
            setUserName(userName);
            setIsAuthenticated(true);
            return { success: true };
        }catch (error) {
            // Throw error with meaningful message for the UI to catch
            const errorMessage = error.response?.data?.message || 
                               error.response?.status === 400 ? 'Email já está em uso' : 
                               'Erro ao registrar. Tente novamente.';
            throw new Error(errorMessage);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, userName, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;