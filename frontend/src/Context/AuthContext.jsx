import React, { createContext, useState, useEffect } from 'react';
import { showToast, confirmAction } from '../utils/alertService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Check localStorage when the app starts
    useEffect(() => {
        const savedToken = localStorage.getItem('gentaura_token')
        const savedUser = localStorage.getItem('gentaura_user')
        
        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
            setIsLoggedIn(true)
        }
    }, [])

    // Login
    const login = (userData, userToken) => {
        localStorage.setItem('gentaura_token', userToken)
        localStorage.setItem('gentaura_user', JSON.stringify(userData))
        setUser(userData)
        setToken(userToken)
        setIsLoggedIn(true)
    }

    // Logout
    const logout = async () => {
        const isConfirmed = await confirmAction("Sign Out", "Are you sure you want to end your session?");

        if (isConfirmed) {
            localStorage.removeItem('gentaura_token')
            localStorage.removeItem('gentaura_user')
            setUser(null)
            setToken(null)
            setIsLoggedIn(false)
            window.location.href = '/'

            showToast("Logged out successfully");
        }
    }

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                isLoggedIn, 
                login, 
                logout 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};