// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import baseURL from "../Api/Config";

// const MeetingCard = ({ audioId,audioName, audioTitle, audioDescription, audioDate, audioAttendees }) => {

//   const [transcriptColor, setTranscriptColor] = useState("red");
//   const [summaryColor, setSummaryColor] = useState("red");
//   const [momColor, setMomColor] = useState("red");

//   const navigate = useNavigate();

//   // console.log(audioId)
//   // console.log(audioName)

//   useEffect(() => {
//     if (!localStorage.getItem('authTokens')) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const tokens = localStorage.getItem("access_token");
//   // console.log(tokens)

//   const handleTranscriptGeneration = async (id) => {
//     // const tokenss = localStorage.getItem("access_token");
//       // console.log(tokenss)
//       try {
//         const response = await axios.post(
//             `${baseURL}/api/meetdoc/audio-transcript-gen/${id}`,
//             null, // This is for the request body, which is null here
//             {
//                 headers: {
//                     Authorization: `Bearer ${tokens}`,
//                 },
//             }
//         );
//       if (response.status === 200) {
//         setTranscriptColor("green");
//         // fetchTranscripts();
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleSummaryGeneration = async (id) => {
//     try {
//       const response = await axios.post(
//           `${baseURL}/api/meetdoc/audio-summary-gen/${id}`,
//           null, // This is for the request body, which is null here
//           {
//               headers: {
//                   Authorization: `Bearer ${tokens}`,
//               },
//           }
//       );
//       if (response.status === 200) {
//         setSummaryColor("green");
//         // fetchSummary();
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleMomGeneration = async (id) => {
//     try {
//       const response = await axios.post(
//           `${baseURL}/api/meetdoc/audio-mom-gen/${id}`,
//           null, // This is for the request body, which is null here
//           {
//               headers: {
//                   Authorization: `Bearer ${tokens}`,
//               },
//           }
//       );
//       if (response.status === 200) {
//         setMomColor("green");
//         // fetchMom();
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const fetchTranscripts = async (id) => {
//     try {
//       const response = await axios.post(
//           `${baseURL}/api/meetdoc/audio-transcript-fetch/${id}`,
//           null, // This is for the request body, which is null here
//           {
//               headers: {
//                   Authorization: `Bearer ${tokens}`,
//               },
//           }
//       );
//       if (response.status === 200) {
//         navigate('/transcript');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const fetchSummary = async (id) => {
//     try {
//       const response = await axios.post(
//           `${baseURL}/api/meetdoc/audio-summary-fetch/${id}`,
//           null, // This is for the request body, which is null here
//           {
//               headers: {
//                   Authorization: `Bearer ${tokens}`,
//               },
//           }
//       );
//       if (response.status === 200) {
//         navigate('/summary');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const fetchMom = async (id) => {
//     try {
//       const response = await axios.post(
//           `${baseURL}/api/meetdoc/audio-mom-fetch/${id}`,
//           null, // This is for the request body, which is null here
//           {
//               headers: {
//                   Authorization: `Bearer ${tokens}`,
//               },
//           }
//       );
//       if (response.status === 200) {
//         navigate('/mom');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch initial data if needed
//   }, []);

//   return (
//     <div className="card mt-5 mx-auto w-100  mb-3 " >
//       <div className="border p-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
//        {/* <div className="col-md-8 mb-3 mb-md-0">
//          <audio controls src={audioId} type="audio/mpeg" />
//         </div> */}
//       <div className="col-12 mt-2 position-relative">
//       <div className="d-flex flex-wrap">
//       <div className="me-4 ">

//       <p>
//           {audioTitle}
//         </p>
//         </div>
//         <div className="me-4 "  style={{ flex: '0' }}>
//         <p style={{ wordWrap: 'break-word' }}>
//           {audioDescription}
//         </p>
//         </div>
//         <div className="me-4 ">
//         <p>
//           {audioDate}
//         </p>
//         </div>
//         <div className="me-4 ">
//         <p>
//           {audioAttendees}
//         </p>
//         </div>
//         <div className="mt-3 ">
//         <span>
//         <audio controls>
//           <source
//             src={baseURL+audioName}
//           />
//         </audio>
//         </span>
//         </div>

//         <div className=" mt-4 d-flex">
//         <div className="me-2">
//           </div>
//         <button
//           className={`btn ${transcriptColor === "red" ? "btn-danger" : "btn-success"} me-2`}
//           onClick={() => handleTranscriptGeneration(audioId) }
//           style={{ cursor: "pointer" }}
//         >
//           <FontAwesomeIcon icon={faPersonRunning} /> Transcript
//         </button>
//         <button
//           className={`btn btn-custom ${summaryColor === "red" ? "btn-danger" : "btn-success"} me-2`}
//           onClick={handleSummaryGeneration}
//           style={{ cursor: "pointer" }}
//         >
//           <FontAwesomeIcon icon={faPersonRunning} /> Summary
//         </button>
//         <button
//           className={`btn btn-custom ${momColor === "red" ? "btn-danger" : "btn-success"} me-2`}
//           onClick={handleMomGeneration}
//           style={{ cursor: "pointer" }}
//         >
//           <FontAwesomeIcon icon={faPersonRunning} /> MoM
//         </button>
//           </div>

//     </div>
//     </div>
//         </div>

//     </div>
//   );
// };

// export default MeetingCard;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import baseURL from "../Api/Config";
import "./meetingcard.css";

const MeetingCard = ({
  audioId,
  audioName,
  audioTitle,
  audioDescription,
  audioDate,
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
  const navigate = useNavigate();
  const tokens = localStorage.getItem("access_token");


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
        const transcriptContent = response.data.transcript;
        setTranscriptFetched(true);
        navigate("/transcriptpage", { state: { transcriptContent } });
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        setSummaryFetched(true);
        navigate("/summarypage");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        const momContent = response.data.mom;
        setMomFetched(true);
        navigate("/mompage");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(audioId);
    }
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
          <div className=" col-12 col-md-4 mt-2">
            <p className="title-text" style={{ fontSize: '1rem' }}>Date: {audioDate}</p>
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
  </div>
    );
  };
  
  export default MeetingCard;
  