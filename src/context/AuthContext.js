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
        console.log("Response data:", data);

        if (data && data.data && data.data.access_token) {
            setAuthTokens(data.data);
            setUser(jwtDecode(data.data.access_token));
            localStorage.setItem("authTokens", JSON.stringify(data.data));
            navigate("/");
        } else {
            console.error("Invalid token received:", data.data.access_token);
            throw new Error("Invalid token received");
        }
    } catch (error) {
        console.error("Error occurred during login:", error);
        alert("Failed to authenticate. Please try again.");
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
            refresh: authTokens.refresh_token,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAuthTokens(data);
        setUser(jwtDecode(data.access_token));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error occurred during token refresh:", error);
      logoutUser();
    }
  };

  return { user, loginUser, logoutUser };
};

const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
