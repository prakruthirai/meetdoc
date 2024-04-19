import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const useAuth = () => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }
      const data = await response.json();
      console.log("Response data:", data); // Log the response data
      if (data && data.access_token) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access_token));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/");
      } else {
        console.error("Invalid token received:", data.access_token);
        throw new Error("Invalid token received");
      }
    //   if (response.status === 200) {
    //     setAuthTokens(data);
    //     setUser(jwtDecode(data.access));
    //     localStorage.setItem("authTokens", JSON.stringify(data));
    //     navigate("/");
    //   } else {
    //     alert("Something went wrong!!");
    //   }
    } catch (error) {
        console.error('Error occurred during login:', error);
        alert('Failed to authenticate. Please try again.');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const updateToken = async () => {
    console.log("Update token called");
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/authentication/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: authTokens.refresh,
          }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Error occurred during token refresh:", error);
      logoutUser();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 86400);
    return () => clearInterval(interval);
  }, [authTokens]);

  return { user, loginUser, logoutUser };
};

const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
