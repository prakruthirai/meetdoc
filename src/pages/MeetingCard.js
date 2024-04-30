
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import Axios for making API requests
import { useNavigate } from "react-router-dom";

const MeetingCard = ({ title, description, date, audioSrc }) => {
  const [transcriptColor, setTranscriptColor] = useState("red"); // State to track the color of the transcript link
  const [summaryColor, setSummaryColor] = useState("red"); // State to track the color of the summary link
  const [momColor, setMomColor] = useState("red"); // State to track the color of the MoM link
  const [navigate]=useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchTranscript = () => {
    // Make API call to fetch transcript
    axios
      .get("transcript_api_endpoint")
      .then((response) => {
        // Update transcript state
        // Set color to green
        setTranscriptColor("green");
        // Navigate to transcript page
        window.location.href = "transcript_page.html";
      })
      .catch((error) => {
        console.error("Error fetching transcript:", error);
      });
  };

  const fetchSummary = () => {
    // Make API call to fetch summary
    axios
      .get("summary_api_endpoint")
      .then((response) => {
        // Update summary state
        // Set color to green
        setSummaryColor("green");
        // Handle summary response if needed
      })
      .catch((error) => {
        console.error("Error fetching summary:", error);
      });
  };

  const fetchMom = () => {
    // Make API call to fetch MoM
    axios
      .get("mom_api_endpoint")
      .then((response) => {
        // Update mom state
        // Set color to green
        setMomColor("green");
        // Handle MoM response if needed
      })
      .catch((error) => {
        console.error("Error fetching MoM:", error);
      });
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
            onClick={fetchTranscript}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faPersonRunning} /> Transcript
          </a>
          
          
          <a
             className={`btn btn-custom ${transcriptColor === "red" ? "btn-danger" : "btn-success"} me-2`}
            onClick={fetchSummary}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faPersonRunning} /> Summary
          </a>
          
    
          <a
             className={`btn btn-custom ${transcriptColor === "red" ? "btn-danger" : "btn-success"} me-2`}
            onClick={fetchMom}
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

