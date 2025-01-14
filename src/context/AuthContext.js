import React, { createContext, useState, useContext } from 'react';
import { login as mockLogin, signup as mockSignup } from '../api/MockApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password) => {
        const response = await mockLogin(email, password);
        if (response.success) {
            setUser(response.user);
            setIsAuthenticated(true);
            return { success: true };
        }
        return { success: false, message: response.message };
    };

    const signup = async (email, password, name) => {
        const response = await mockSignup(email, password, name);
        if (response.success) {
            setUser(response.user);
            setIsAuthenticated(true);
            return { success: true };
        }
        return { success: false, message: response.message };
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}