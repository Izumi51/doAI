import { createContext } from 'react';

const AuthContext = createContext({
    token: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    register: () => {},
});

export default AuthContext;