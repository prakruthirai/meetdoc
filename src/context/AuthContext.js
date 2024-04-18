import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const useAuth = () => {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            });
            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }
            const data = await response.json();
            if(response.status === 200){
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/');
            } else {
                alert('Something went wrong!!');
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    const updateToken = async () => {
        console.log('Update token called');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'refresh': authTokens.refresh
                })
            });
            if(response.status === 200) {
                const data = await response.json();
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
            } else {
                logoutUser();
            }
        } catch (error) {
            console.error('Error occurred during token refresh:', error);
            logoutUser();
        }
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if(authTokens) {
                updateToken();
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [authTokens]);

    return { user, loginUser, logoutUser };
};

const AuthProvider = ({ children }) => {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
