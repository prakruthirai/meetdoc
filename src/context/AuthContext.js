// import React, { createContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const useAuth = () => {
//   const [authTokens, setAuthTokens] = useState(null);
//   const [user, setUser] = useState(null);

//   const navigate = useNavigate();
//   const loginUser = async (username, password) => {
//     try {
//         const response = await fetch(
//             "http://127.0.0.1:8000/api/authentication/login",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     username: username,
//                     password: password,
//                 }),
//             }
//         );

//         if (!response.ok) {
//             throw new Error("Failed to authenticate");
//         }

//         const data = await response.json();
//         console.log("Response data:", data);

//         if (data && data.data && data.data.access_token) {
//             setAuthTokens(data.data);
//             setUser(jwtDecode(data.data.access_token));
//             localStorage.setItem("authTokens", JSON.stringify(data.data));
//             navigate("/");
//         } else {
//             console.error("Invalid token received:", data.data.access_token);
//             throw new Error("Invalid token received");
//         }
//     } catch (error) {
//         console.error("Error occurred during login:", error);
//         alert("Failed to authenticate. Please try again.");
//     }
// };



//   const logoutUser = () => {
//     setAuthTokens(null);
//     setUser(null);
//     localStorage.removeItem("authTokens");
//     navigate("/login");
//   };

//   const updateToken = async () => {
//     console.log("Update token called");
//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/api/authentication/refresh",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             refresh: authTokens.refresh_token,
//           }),
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setAuthTokens(data);
//         setUser(jwtDecode(data.access_token));
//         localStorage.setItem("authTokens", JSON.stringify(data));
//       } else {
//         throw new Error("Failed to refresh token");
//       }
//     } catch (error) {
//       console.error("Error occurred during token refresh:", error);
//       logoutUser();
//     }
//   };

//   return { user, loginUser, logoutUser };
// };

// const AuthProvider = ({ children }) => {
//   const auth = useAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };

// export { AuthContext, AuthProvider };


import { createContext, useState, useEffect } from "react";
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
    const tokens = JSON.parse(localStorage.getItem('authTokens'));
    if (tokens && tokens.access) {
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access));
    }
  }, []);

  const refreshTokens = async () => {
    try {
      // Check if authTokens is null
      if (!authTokens) {
        console.error('User is not authenticated.');
        return false;
      }
  
      const response = await axios.post(`${baseURL}/api/authentication/refresh`, {
        refresh: authTokens.refresh
      });
  
      const data = response.data;
      localStorage.setItem('authTokens', JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      return true;
    } catch (error) {
      console.error('Error occurred during token refresh:', error);
      return false;
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${baseURL}/api/authentication/login`, {
        username,
        password
      });

      const data = response.data;
      // console.log();
      if (response.status === 200 && data["data"]["access_token"]) {
        setAuthTokens(data["data"]);
        setUser(jwtDecode(data["data"]["access_token"]));
        localStorage.setItem('authTokens', JSON.stringify(data));
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

  const logoutUser = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/authentication/logout`, {
        refresh_token: authTokens.refresh_token
      });
      if (response.status === 200) {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
      } else {
        console.error('Failed to logout:', response);
      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, loginUser, logoutUser, refreshTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

