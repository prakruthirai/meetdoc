import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Homepage.css'; // Ensure this file exists and is named correctly
import baseURL from "../Api/Config";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const [audioCount, setAudioCount] = useState(0);
  const [analytics, setAnalytics] = useState({
    transcript_count: 0,
    summary_count: 0,
    mom_count: 0
  });
  const tokens = localStorage.getItem("access_token");
  const first_name = localStorage.getItem("first_name");

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

    if (user && tokens) {
      fetchAudioCount();
      fetchAnalytics();
    }
  }, [user, tokens]);

  return (
    <div className="dashboard">
      <h1>Welcome, {first_name}!</h1>
      <div className="card">
        <h2>Audio Count</h2>
        <p>{audioCount}</p>
      </div>
      <div className="card">
        <h2>Transcripts</h2>
        <p>{analytics.transcript_count}</p>
      </div>
      <div className="card">
        <h2>Summaries</h2>
        <p>{analytics.summary_count}</p>
      </div>
      <div className="card">
        <h2>MOMs</h2>
        <p>{analytics.mom_count}</p>
      </div>
    </div>
  );
};

export default Homepage;
