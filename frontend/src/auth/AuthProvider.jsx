import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import api from '../api/axios';

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');
        const storedUserId = localStorage.getItem('userId');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            setUserName(storedUserName);
            setUserId(storedUserId);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, name, userId } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userName', name);
            localStorage.setItem('userId', userId);
            setToken(token);
            setUserName(name);
            setUserId(userId);
            setIsAuthenticated(true);
            return { success: true };
        }catch (loginError) {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('userId');
            setToken(null);
            setUserName(null);
            setUserId(null);
            setIsAuthenticated(false);
            return { success: false};
        }
    };

    const register = async (email, password, name) => {
        try {
            const response = await api.post('/auth/register', { email, password, name });
            const { token, name: userName, userId } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userId', userId);
            setToken(token);
            setUserName(userName);
            setUserId(userId);
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
        localStorage.removeItem('userId');
        setToken(null);
        setUserName(null);
        setUserId(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, userName, userId, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;