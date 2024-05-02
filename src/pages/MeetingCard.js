import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import Axios for making API requests
import { useNavigate } from "react-router-dom";
import baseURL from "../Api/Config";

const MeetingCard = ({ title, description, date, audioSrc }) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [transcripts, setTranscripts] = useState([]);
  const [summary, setSummary] = useState([]);
  const [Mom, setMom] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [transcriptColor, setTranscriptColor] = useState("red"); // State to track the color of the transcript link
  const [summaryColor, setSummaryColor] = useState("red"); // State to track the color of the summary link
  const [momColor, setMomColor] = useState("red"); // State to track the color of the MoM link
  const [navigate] = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login');
    } else {
      fetchTranscripts();
      fetchSummary();
      fetchMom();
    }
  }, [navigate]);

  const handleTrancriptGeneration = async () => {
    const tokens = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `${baseURL}/api/meetdoc/audio-transcript-gen/<int:audio_id>`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens}`
          }
        }
      );
      if (response.status === 200) {
        setResponseMessage(response.data.message); // Update state with response message
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  };

  const fetchTranscripts = async () => {
    const tokens = localStorage.getItem("access_token");
    try {
      const response = await axios.get(
        `${baseURL}/api/meetdoc/audio-transcript-fetch/<int:audio_id>`,
        {
          headers: { Authorization: `Bearer ${tokens}` }
        }
      );
      if (response.status === 200) {
        setTranscripts(response.data.data); // Update state with fetched transcripts
      } else {
        setErrorMessage(response.data.message); // Update state with error message
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
      setErrorMessage("Failed to fetch transcripts"); // Update state with error message
    }
  };

  const handleSummaryGeneration = async () => {
    const tokens = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `${baseURL}/api/meetdoc/audio-summary-gen/<int:audio_id>`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens}`
          }
        }
      );
      if (response.status === 200) {
        setResponseMessage(response.data.message); // Update state with response message
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  };

  const fetchSummary = async () => {
    const tokens = localStorage.getItem("access_token");
    try {
      const response = await axios.get(
        `${baseURL}/api/meetdoc/audio-summary-fetch/<int:audio_id>`,
        {
          headers: { Authorization: `Bearer ${tokens}` }
        }
      );
      if (response.status === 200) {
        setSummary(response.data.data); // Update state with fetched transcripts
      } else {
        setErrorMessage(response.data.message); // Update state with error message
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
      setErrorMessage("Failed to fetch transcripts"); // Update state with error message
    }
  };

  const handleMomGeneration = async () => {
    const tokens = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `${baseURL}/api/audio-mom-gen/<int:audio_id>`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens}`
          }
        }
      );
      if (response.status === 200) {
        setResponseMessage(response.data.message); // Update state with response message
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  };

  const fetchMom = async () => {
    const tokens = localStorage.getItem("access_token");
    try {
      const response = await axios.get(
        `${baseURL}/api/meetdoc/audio-mom-fetch/<int:audio_id>`,
        {
          headers: { Authorization: `Bearer ${tokens}` }
        }
      );
      if (response.status === 200) {
        setMom(response.data.data); // Update state with fetched transcripts
      } else {
        setErrorMessage(response.data.message); // Update state with error message
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
      setErrorMessage("Failed to fetch transcripts"); // Update state with error message
    }
  };

  return (
    <div className="card mt-5 mx-auto w-75 mb-3 ">
      <div className="border p-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="col-md-8  mb-3 mb-md-0">
          <div className="row m-0">
            <div className="col-12 position-relative d-flex justify-content-center align-items-center">
              <div className="playbutton" style={{ width: '50%', maxWidth: '1000px' }}>
                <audio controls>
                  <source src={audioSrc} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-between align-items-center">
          <a
            className={`btn btn-custom ${transcriptColor === "red" ? "btn-danger" : "btn-success"} me-2`}
            onClick={handleTrancriptGeneration}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faPersonRunning} /> Transcript
          </a>

          <a
            className={`btn btn-custom ${summaryColor === "red" ? "btn-danger" : "btn-success"} me-2`}
            onClick={handleSummaryGeneration}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faPersonRunning} /> Summary
          </a>

          <a
            className={`btn btn-custom ${momColor === "red" ? "btn-danger" : "btn-success"} me-2`}
            onClick={handleMomGeneration}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faPersonRunning} /> MoM
          </a>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
