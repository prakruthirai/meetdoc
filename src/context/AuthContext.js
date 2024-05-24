import { createContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import baseURL from "../Api/Config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('authTokens'));
    if (data && data.access_token) {
      setAuthTokens(data);
      setUser(jwtDecode(data["data"]["access_token"]));
    }
    
  }, []);
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem('authTokens'));
  //   if (data && data.access_token) {
  //     setAuthTokens(data);
  //     const decodedToken = jwtDecode(data["data"]["access_token"]);
  //     setUser({...decodedToken, role: decodedToken.role});
  //   }
  // }, [authTokens]);

  // REFRESH

  const refreshTokens = useCallback(async () => {
    console.log("Calling refresh token");
    try {
      // Check if authTokens is null
      if (!authTokens) {
        console.error('User is not authenticated.');
        return false;
      }
      const response = await axios.post(`${baseURL}/api/authentication/refresh`, {
        refresh_token: authTokens.refresh_token
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data)
        setAuthTokens({ ...authTokens, access_token: data["access_token"] });
        setUser(jwtDecode(data["access_token"]));
        localStorage.setItem('access_token', JSON.stringify(data["access_token"]));

        console.log('Token refreshed successfully')
        return true;
      } else {
        console.error('Token refresh Failed:', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error occured during token refresh:', error)
      return false;
    }
  }, [authTokens]);

  useEffect(() => {
    if (authTokens) {
      const tokenExpirationTime = jwtDecode(authTokens.access_token).exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = tokenExpirationTime - currentTime;
      const refreshBefore = timeUntilExpiration - 5000;

      const timeoutId = setTimeout(refreshTokens, refreshBefore);

      return () => clearTimeout(timeoutId);

    }
  }, [authTokens, refreshTokens]);

  // LOGIN
  const loginUser = async (username, password) => {
    console.log("trying to log in");
    try {
      const response = await axios.post(`${baseURL}/api/authentication/login`, {
        username,
        password
      });

      const data = response.data;
      console.log(data);
      if (response.status === 200 && data["data"]["access_token"]) {

        const access_token = data["data"]["access_token"].replace(/['"]+/g, '');
        const refresh_token = data["data"]["refresh_token"].replace(/['"]+/g, '');
        const role = data["role"].replace(/['"]+/g, '');
        const first_name = data["first_name"].replace(/['"]+/g, '');
        const user = data["user"].replace(/['"]+/g, '');
        const email = data["email"].replace(/['"]+/g, '');
      

        console.log(access_token)

        setAuthTokens(data["data"]);
        setUser(jwtDecode(access_token));
        localStorage.setItem('authTokens', JSON.stringify(data));
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('role', role);
        localStorage.setItem('first_name', first_name);
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);
        
        navigate('/');
        return true;
      } else {
        alert('Something went wrong!');
        return false;
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      alert('Failed to authenticate. Please try again.');
      return false;
    }
  };

  // LOGOUT

  const logoutUser = async () => {
    console.log("trying to log out");
    if (!authTokens) {
      console.warn('User is not logged in, cannot logout.');
      return;
    }
    try {
      const tokens = localStorage.getItem("access_token")
      const response = await axios.post(`${baseURL}/api/authentication/logout`, {
        refresh_token: authTokens.refresh_token,
      }, {
        headers: {
          Authorization: `Bearer ${tokens}`
        }
      });
      if (response.status === 200 || response.status === 204) {
        // Logout successful
        console.log("Logout clicked");
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        localStorage.removeItem('first_name');
        localStorage.removeItem('email');
        navigate('/login');
      } else {
        console.error('Unexpected response while logging out:', response);

      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  //   let logoutUser = () => {
  //     setAuthTokens(null)
  //     setUser(null)
  //     localStorage.removeItem('authTokens')
  //     localStorage.removeItem('accessToken')
  //     localStorage.removeItem('refreshToken')
  //     navigate('/login')
  // }



  return (
    <AuthContext.Provider value={{ authTokens, user, loginUser, logoutUser, refreshTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

