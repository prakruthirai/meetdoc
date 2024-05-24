
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning, faEye, faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Modal, Accordion } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import baseURL from "../Api/Config";
import "./meetingcard.css";


const MeetingCard = ({
  audioId,
  audioName,
  audioTitle,
  audioDescription,
  // audioDate,
  meetingDate,
  audioAttendees,
  onDelete,
}) => {
  const [transcriptColor, setTranscriptColor] = useState("red");
  const [summaryColor, setSummaryColor] = useState("red");
  const [momColor, setMomColor] = useState("red");
  const [transcriptGenerated, setTranscriptGenerated] = useState(false);
  const [summaryGenerated, setSummaryGenerated] = useState(false);
  const [transcriptFetched, setTranscriptFetched] = useState(false);
  const [summaryFetched, setSummaryFetched] = useState(false);
  const [momFetched, setMomFetched] = useState(false);
  const [transcriptTaskId, setTranscriptTaskId] = useState(null);
  const [summaryTaskId, setSummaryTaskId] = useState(null);
  const [transcriptTaskCompleted, setTranscriptTaskCompleted] = useState(false);
  const [summaryTaskCompleted, setSummaryTaskCompleted] = useState(false);
  // const [showTranscriptPopup, setShowTranscriptPopup] = useState(false);
  const [transcriptContent, setTranscriptContent] = useState("");
  const [summaryContent, setSummaryContent] = useState("");
  const [momContent, setMomContent] = useState("");
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showMomModal, setShowMomModal] = useState(false);
  // const [transcriptContent, setTranscriptContent] = useState("");
  const navigate = useNavigate();
  const tokens = localStorage.getItem("access_token");

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login')
    }
  }, [navigate])

  const handleTranscriptGeneration = async (id) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/meetdoc/audio-transcript-gen/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (response.status === 200) {
        setTranscriptTaskId(response.data.task_id);
        setTranscriptTaskCompleted(false);
        console.log("Transcript generation task queued");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (transcriptTaskId && !transcriptTaskCompleted) {
      const fetchTaskStatus = async () => {
        try {
          const response = await axios.get(
            `${baseURL}/api/meetdoc/task-status/${transcriptTaskId}`,
            {
              headers: {
                Authorization: `Bearer ${tokens}`,
              },
            }
          );
          if (response.status === 200) {
            const { status } = response.data;
            if (status === "COMPLETED") {
              setTranscriptColor("green");
              setTranscriptGenerated(true);
              // localStorage.setItem(`transcriptGenerated_${audioId}`, "true");
              setTranscriptTaskCompleted(true);
            } else if (status === "FAILED") {
              setTranscriptTaskCompleted(true);
            } else {
              // Handle pending task
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const interval = setInterval(fetchTaskStatus, 5000); 
      return () => clearInterval(interval);
    }
  }, [transcriptTaskId, transcriptTaskCompleted, tokens]);

  const handleSummaryGeneration = async (id) => {
    if (!transcriptGenerated) {
      alert("Please generate transcript first.");
      return;
    }
    try {
      const response = await axios.post(
        `${baseURL}/api/meetdoc/audio-summary-gen/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (response.status === 200) {
        setSummaryTaskId(response.data.task_id);
        setSummaryTaskCompleted(false);
        console.log("Summary generation task queued");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (summaryTaskId && !summaryTaskCompleted) {
      const fetchTaskStatusSummary = async () => {
        try {
          const response = await axios.get(
            `${baseURL}/api/meetdoc/task-status-summary/${summaryTaskId}`,
            {
              headers: {
                Authorization: `Bearer ${tokens}`,
              },
            }
          );
          if (response.status === 200) {
            const { status } = response.data;
            if (status === "COMPLETED") {
              setSummaryColor("green");
              setSummaryGenerated(true);
              // localStorage.setItem(`summaryGenerated_${audioId}`, "true");
              setSummaryTaskCompleted(true);
            } else if (status === "FAILED") {
              setSummaryTaskCompleted(true);
            } else {
              // Handle pending task
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const interval = setInterval(fetchTaskStatusSummary, 5000); // Fetch task status every 5 seconds
      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [summaryTaskId, summaryTaskCompleted, tokens]);

  const handleMomGeneration = async (id) => {
    if (!summaryGenerated) {
      alert("Please generate summary first.");
      return;
    }
    try {
      const response = await axios.post(
        `${baseURL}/api/meetdoc/audio-mom-gen/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (response.status === 200) {
        setMomColor("green");
        setMomFetched(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTranscript = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/meetdoc/audio-transcript-fetch/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("transcript fetched")
        const transcriptContent = response.data['data'][0]['transcript'];
        // console.log(response.data['data'][0]['transcript']);
        // console.log(transcriptContent);
        setTranscriptContent(transcriptContent);
        setShowTranscriptModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleCloseTranscriptModal = () => {
    setShowTranscriptModal(false);
  };


  const fetchSummary = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/meetdoc/audio-summary-fetch/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (response.status === 200) {
        const summaryContent = response.data['data'][0]['summary'];
        setSummaryContent(summaryContent);
        setShowSummaryModal(true);
        // navigate("/summarypage");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCloseSummaryModal = () => {
    setShowSummaryModal(false);
  };

  const fetchMom = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/meetdoc/audio-mom-fetch/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (response.status === 200) {
        const momContent = response.data['data'][0]['mom'];;
        setMomContent(momContent);
        setShowMomModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseMomModal = () => {
    setShowMomModal(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(audioId);
    }
  };

  const handleDownloadTranscript = () => {
    const blob = new Blob([transcriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSummary = () => {
    const blob = new Blob([summaryContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMom = () => {
    const blob = new Blob([momContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mom.txt';
    a.click();
    URL.revokeObjectURL(url);
  };


  return(
    <div className="card mt-5 mx-auto w-100 mb-3">
    {/* <div className=" border p-1"> */}
    <div className="row  align-items-center">
      <div className="col-md-4 mb-2">
        <div className="row m-0 align-items-center">
          <div className="col-12 col-md-4  mt-2 text-start">
            <p className="title-text" style={{ fontSize: '1rem'}}>Title: {audioTitle}</p>
          </div>
          {/* <div className=" col-12 col-md-4 mt-2">
            <p className="title-text" style={{ fontSize: '1rem' }}>Uploaded Date: {audioDate}</p>
          </div> */}
          <div className=" col-12 col-md-4 mt-2">
            <p className="title-text" style={{ fontSize: '1rem' }}>Meeting Date: {meetingDate}</p>
          </div>
          <div className="col-12 col-md-4  mt-2 text-start " style={{ width: "350px" }}>
          <p className="mb-2 me-4 " style={{ fontSize: '1rem' }}>No.of speakers:{audioAttendees}</p>
          </div>
        </div>
      </div>
  
  
      
        <div className="col-md-4 mb-2">
        <div className="mb-2 me-4 " style={{ width: "350px" }}>
        <Accordion defaultActiveKey="" >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                  <p className="description-text" style={{ fontSize: '1rem' }}>{audioDescription}</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </div>
            </div>
            <div className=" col d-flex justify-content-start align-items-center flex-wrap">
        <span>
          <audio controls className="mb-2 me-4">
            <source src={baseURL + audioName} />
          </audio>
        </span>
  
  
        {/* <div className="me-4"></div> */}
        {/* <div className="d-flex flex-wrap align-items-center mb-2"> */}
        <div className=" w-100 d-flex flex-wrap align-items-center">
          <button
            className={`btn 
              ${transcriptColor === "red" ? "btn-danger" : "btn-success"
              } me-2 mb-2`}
            onClick={() => handleTranscriptGeneration(audioId)}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faPersonRunning} /> 
            Transcript
          </button>
          {transcriptGenerated && (
            <span
              className="me-2 mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => fetchTranscript(audioId)}
            >
              <FontAwesomeIcon icon={faEye} />
            </span>
          )}
          <Modal show={showTranscriptModal} onHide={handleCloseTranscriptModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transcript</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{transcriptContent}</p>
        </Modal.Body>
        {/* <Transcriptpage transcriptContent={transcriptContent} /> */}
        <Modal.Footer>
        <button
            className="btn btn-primary me-2 mb-2"
            onClick={handleDownloadTranscript}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faDownload} /> Download Transcript
          </button>
          <button className="btn btn-secondary" onClick={handleCloseTranscriptModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
          {/* <div className="me-4"></div> */}
  
          <button
            className={`btn ${summaryColor === "red" ? "btn-danger" : "btn-success"
              } me-2 mb-2`}
            onClick={() => handleSummaryGeneration(audioId)}
            style={{ cursor: "pointer" }}
            disabled={!transcriptGenerated}
          >
            <FontAwesomeIcon icon={faPersonRunning} />  Summary
          </button>
          {summaryGenerated && (
            <span
              className="me-2 mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => fetchSummary(audioId)}
            >
              <FontAwesomeIcon icon={faEye} />
            </span>
          )}
          {/* <div className="me-4"></div> */}
  
          <button
            className={`btn ${momColor === "red" ? "btn-danger" : "btn-success"
              } me-2 mb-2`}
            onClick={() => handleMomGeneration(audioId)}
            style={{ cursor: "pointer" }}
            disabled={!summaryGenerated}
          >
            <FontAwesomeIcon icon={faPersonRunning} />  MoM
          </button>
          {momFetched ? (
            <span
              className="me-2 mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => fetchMom(audioId)}
            >
              <FontAwesomeIcon icon={faEye} />
            </span>
          ) : null}
          <button className="btn mr-2 mb-2 btn-danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
    
      <Modal show={showSummaryModal} onHide={handleCloseSummaryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{summaryContent}</p>
        </Modal.Body>
        <Modal.Footer>
        <button
            className="btn btn-primary me-2 mb-2"
            onClick={handleDownloadSummary}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faDownload} /> Download Summary
          </button>
          <button className="btn btn-secondary" onClick={handleCloseSummaryModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMomModal} onHide={handleCloseMomModal}>
        <Modal.Header closeButton>
          <Modal.Title>MoM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{momContent}</p>
        </Modal.Body>
        <Modal.Footer>
        <button
            className="btn btn-primary me-2 mb-2"
            onClick={handleDownloadMom}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faDownload} /> Download MoM
          </button>
          <button className="btn btn-secondary" onClick={handleCloseMomModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      
    </div>
  );
};
  // </div>
  //   );
  // };
  
  export default MeetingCard;
  