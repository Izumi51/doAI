import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import api from '../api/axios';

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            console.log('Auth initialized with token:', storedToken ? 'present' : 'absent');
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, name } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userName', name);
            setToken(token);
            setIsAuthenticated(true);
            return true;
        }catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (email, password, name) => {
        try {
            const response = await api.post('/auth/register', { email, password, name });
            const { token, name: userName } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);
            setToken(token);
            setIsAuthenticated(true);
            return true;
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
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;