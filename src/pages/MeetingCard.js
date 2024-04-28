
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faEye,
  faPencil,
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import Axios for making API requests

const MeetingCard = ({ title, description, date, audioSrc }) => {
  const [transcriptColor, setTranscriptColor] = useState("red"); // State to track the color of the transcript link
  const [summaryColor, setSummaryColor] = useState("red"); // State to track the color of the summary link
  const [momColor, setMomColor] = useState("red"); // State to track the color of the MoM link

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
    <div className="row mt-5 mb-2">
      <div className="col-12 border p-1">
        <div className="row m-0">
          <div className="col-8">
            <div className="row m-0">
              <div className="col-12 mt-2 position-relative">
                <h3>{title} title</h3>
                <a
                  className="position-absolute top-50 end-0 translate-middle-y"
                  href="edit.js"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </a>
              </div>
              <div className="col-12">
                <p className="text-truncate">{description} description</p>
              </div>
              <div className="col-12  position-relative">
                <p className="fst-italic">{date} date</p>
                <br />
                <div className="position-absolute top-50 end-0 translate-middle-y" >
                  {/* <audio controls autoplay className="col-12">
                                        <source src={audioSrc} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                        
                                    </audio> */}
                  <div className="playbutton"  style={{ width: '50%', maxWidth: '1000px' }}>
        
                    <audio controls>
                      <source src={audioSrc} />
                      Your browser does not support the audio element.
                      
                    </audio>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 d-flex justify-content-evenly align-items-center">
            <a
              className={`text-decoration-none ${
                transcriptColor === "red" ? "text-danger" : "text-success"
              }`}
            //   href="transcript_page.html"
              onClick={fetchTranscript}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faPersonRunning} />
              Transcript
              {/* <FontAwesomeIcon
                icon={faEye}
                style={{ marginLeft: "5px" }}
              /> */}
            </a>
            <a
              className={`text-decoration-none ${
                summaryColor === "red" ? "text-danger" : "text-success"
              }`}
              onClick={fetchSummary}
              href=" "
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faPersonRunning} />
              Summary
              {/* <FontAwesomeIcon
                icon={faEye}
                style={{ marginLeft: "5px" }}
              /> */}
            </a>
            <a
              className={`text-decoration-none ${
                momColor === "red" ? "text-danger" : "text-success"
              }`}
              onClick={fetchMom}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faPersonRunning} />
              {/* MoM */}
              MoM
              {/* <FontAwesomeIcon icon={faEye} style={{ marginLeft: "5px" }} /> */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
