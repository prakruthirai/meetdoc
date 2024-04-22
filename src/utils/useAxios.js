// import axios from 'axios'
// import { jwtDecode } from "jwt-decode";
// import dayjs from 'dayjs'
// import { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'


// const baseURL = 'http://127.0.0.1:8000'


// const useAxios = () => {
//     const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

//     const axiosInstance = axios.create({
//         baseURL,
//         headers:{Authorization: `Bearer ${authTokens?.access}`}
//     });


//     axiosInstance.interceptors.request.use(async req => {
    
//         const user = jwtDecode(authTokens.access)
//         const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
//         if(!isExpired) return req
    
//         const response = await axios.post(`${baseURL}/api/token/refresh/`, {
//             refresh: authTokens.refresh
//           });
    
//         localStorage.setItem('authTokens', JSON.stringify(response.data))
        
//         setAuthTokens(response.data)
//         setUser(jwtDecode(response.data.access))
        
//         req.headers.Authorization = `Bearer ${response.data.access}`
//         return req
//     })
    
//     return axiosInstance
// }

// export default useAxios;

// ___________________________________________

// import axios from 'axios';
// import jwt_decode from "jwt-decode";
// import dayjs from 'dayjs';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const baseURL = 'http://127.0.0.1:8000';

// const useAxios = () => {
//   const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

//   const axiosInstance = axios.create({
//     baseURL,
//     headers: { Authorization: `Bearer ${authTokens?.access}` }
//   });

//   axiosInstance.interceptors.request.use(async req => {
//     const user = jwt_decode(authTokens.access);
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     if (!isExpired) return req;

//     try {
//       const response = await axios.post(`${baseURL}/api/token/refresh/`, {
//         refresh: authTokens.refresh
//       });

//       localStorage.setItem('authTokens', JSON.stringify(response.data));
//       setAuthTokens(response.data);
//       setUser(jwt_decode(response.data.access));
      
//       req.headers.Authorization = `Bearer ${response.data.access}`;
//     } catch (error) {
//       console.error('Error occurred during token refresh:', error);
//     }

//     return req;
//   });

//   return axiosInstance;
// };

// export default useAxios;

// _______________________________________________________

import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import baseURL from "../Api/Config";

const useAxios = () => {
  const { authTokens, setAuthTokens, setUser } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access_token}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    let currentTokens = authTokens;

    // If authTokens are not present, fetch them from localStorage
    if (!currentTokens) {
      const storedTokens = localStorage.getItem('authTokens');
      if (storedTokens) {
        currentTokens = JSON.parse(storedTokens);
        setAuthTokens(currentTokens);
        setUser(jwt_decode(currentTokens.access_token));
      }
    }

    // Check token expiry
    if (currentTokens) {
      const user = jwt_decode(currentTokens.access_token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      // If token is expired, refresh it
      if (isExpired) {
        try {
          const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: currentTokens.refresh
          });

          // Update authTokens with the refreshed tokens
          currentTokens = response.data;
          localStorage.setItem('authTokens', JSON.stringify(currentTokens));
          setAuthTokens(currentTokens);
          setUser(jwt_decode(currentTokens.access_token));

          // Update Authorization header
          req.headers.Authorization = `Bearer ${currentTokens.access_token}`;
        } catch (error) {
          console.error('Error occurred during token refresh:', error);
        }
      }
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;

