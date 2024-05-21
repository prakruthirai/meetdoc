import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Homepage.css'; // Ensure this file exists and is named correctly
import baseURL from "../Api/Config";

import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const [audioCount, setAudioCount] = useState(0);
  const [analytics, setAnalytics] = useState({
    transcript_count: 0,
    summary_count: 0,
    mom_count: 0
  });
  const [adminData, setAdminData] = useState({
    user_count: 0,
    audio_counts: {},
  });
  const [userList, setUserList] = useState([]);
  const tokens = localStorage.getItem("access_token");
  const first_name = localStorage.getItem("first_name");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    const fetchAudioCount = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/meetdoc/count-of-audio`, {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        });
        setAudioCount(response.data.audio_count);
      } catch (error) {
        console.error('Error fetching audio count:', error);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/meetdoc/analytics`, {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        });
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/meetdoc/admin-dashboard`, {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        });
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    const fetchUserList = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/meetdoc/list-users`, {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        });
        setUserList(response.data.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
        setUserList([]);
      }
    };


    if (user && tokens) {
      fetchAudioCount();
      fetchAnalytics();
      fetchAdminData();
      fetchUserList();
    }
  }, [user, tokens]);

  return (
    <div className="dashboard">
      <h1>Welcome, {first_name}!</h1>
      <div className="card-container">
      <div className="card">
        <h2>Audio Count</h2>
        <p>{audioCount}</p>
      </div>
      <div className="card">
        <h2>Transcripts</h2>
        <p>{analytics.transcript_count}</p>
      </div>
      {/* </div> */}
      <div className="card">
        <h2>Summaries</h2>
        <p>{analytics.summary_count}</p>
      </div>
      <div className="card">
        <h2>MOMs</h2>
        <p>{analytics.mom_count}</p>
      </div>
      </div>
      {user && role === "Admin" && (
        <div className="admin-section">
          <h2>Admin Data</h2>
          <div className="card">
            <h3>Total Users</h3>
            <p>{adminData.user_count}</p>
          </div>
          <div className="card">
            <h3>User Audio Counts</h3>
            <ul>
              {Object.entries(adminData.audio_counts).map(([username, count]) => (
                <li key={username}>{username}: {count}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Recent Users</h3>
            <ul>
              {userList.map(user => (
                <li key={user.id}>{user.username}{user.email} {user.first_name} </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
