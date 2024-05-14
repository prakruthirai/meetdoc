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

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../Api/Config";
import Accordion from "react-bootstrap/Accordion";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import "./meetingcard.css";

const MeetingCard = ({
  audioId,
  audioName,
  audioTitle,
  audioDescription,
  audioDate,
  audioAttendees,
}) => {
  const [transcriptColor, setTranscriptColor] = useState("red");
  const [summaryColor, setSummaryColor] = useState("red");
  const [momColor, setMomColor] = useState("red");
  const [transcriptGenerated, setTranscriptGenerated] = useState(false);
  const [summaryGenerated, setSummaryGenerated] = useState(false);
  const [transcriptFetched, setTranscriptFetched] = useState(false);
  const [summaryFetched, setSummaryFetched] = useState(false);
  const [momFetched, setMomFetched] = useState(false);

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
        setTranscriptColor("green");
        setTranscriptGenerated(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSummaryGeneration = async (id) => {
    if (!transcriptGenerated) {
      alert("Please generate transcript first.");
      return;
    }
    try {
      const response = await axios.get(
        `${baseURL}/api/meetdoc/audio-summary-gen/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (response.status === 200) {
        setSummaryColor("green");
        setSummaryGenerated(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTranscript = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/meetdoc/audio-transcript-fetch/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (response.status === 200) {
        setTranscriptFetched(true);
        navigate("/transcriptpage");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSummary = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/meetdoc/audio-summary-fetch/${id}`,
        null,
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
        null,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (response.status === 200) {
        setMomFetched(true);
        navigate("/mompage");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // return (

  //   <div className="card mt-5 mx-auto w-100 mb-3">
  //     <div className="border p-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
  //       <div className="col-12 mt-2 position-relative d-flex flex-wrap">
  //         {/* <div className="d-flex flex-wrap"> */}
  //           {/* Other content here */}
  //         {/* </div> */}
  //         <div className="d-flex align-items-center">
  //         <div className=" title-container me-4  mb-0">
  //      <p className="title-text">
  //          {audioTitle}
  //        </p>
  //        </div>
  //        <div className=" description-container me-4 mb-0"  >
  //        <p className="description-text">
  //          {audioDescription}
  //        </p>
  //        </div>
  //        <div className="  date-container me-4 mb-0">
  //       <p className="date-text">
  //          {audioDate}
  //        </p>
  //        </div>
  //        <div className="me-4 mb-0">
  //        <p>
  //          {audioAttendees}
  //        </p>
  //        </div>
  //        <div className="me-4 mb-0">
  //        <span>
  //       <audio controls>
  //          <source
  //           src={baseURL+audioName}
  //         />
  //       </audio>
  //       </span>
  //       </div>
  //       <div className="d-flex align-items-center mt-3">
  //           <button
  //             className={`btn ${
  //               transcriptColor === "red" ? "btn-danger" : "btn-success"
  //             } me-2`}
  //             onClick={() => handleTranscriptGeneration(audioId)}
  //             style={{ cursor: "pointer" }}
  //           >
  //             <FontAwesomeIcon icon={faPersonRunning} /> Generate Transcript
  //           </button>
  //           <button
  //             className={`btn ${
  //               summaryColor === "red" ? "btn-danger" : "btn-success"
  //             } me-2`}
  //             onClick={() => handleSummaryGeneration(audioId)}
  //             style={{ cursor: "pointer" }}
  //             disabled={!transcriptGenerated}
  //           >
  //             <FontAwesomeIcon icon={faPersonRunning} /> Generate Summary
  //           </button>
  //           <button
  //             className={`btn ${
  //               momColor === "red" ? "btn-danger" : "btn-success"
  //             } me-2`}
  //             onClick={() => handleMomGeneration(audioId)}
  //             style={{ cursor: "pointer" }}
  //             disabled={!summaryGenerated}
  //           >
  //             <FontAwesomeIcon icon={faPersonRunning} /> Generate MoM
  //           </button>
  //           <button
  //             className={`btn ${
  //               transcriptFetched ? "btn-success" : "btn-danger"
  //             } me-2`}
  //             onClick={() => fetchTranscript(audioId)}
  //             style={{ cursor: "pointer" }}
  //             disabled={!transcriptGenerated}
  //           >
  //             Fetch Transcript
  //           </button>
  //           <button
  //             className={`btn ${
  //               summaryFetched ? "btn-success" : "btn-danger"
  //             } me-2`}
  //             onClick={() => fetchSummary(audioId)}
  //             style={{ cursor: "pointer" }}
  //             disabled={!summaryGenerated}
  //           >
  //             Fetch Summary
  //           </button>
  //           <button
  //             className={`btn ${
  //               momFetched ? "btn-success" : "btn-danger"
  //             } me-2`}
  //             onClick={() => fetchMom(audioId)}
  //             style={{ cursor: "pointer" }}
  //             disabled={!momFetched}
  //           >
  //             Fetch MoM
  //           </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  // );
  return (
    <div className="card mt-5 mx-auto w-100 mb-3">
      <div className="col-12 border p-1">
        <div className="row m-0">
          <div className="col-8">
            <div className="row m-0">
              <div className="col-12 mt-2 position-relative">
                <p className="title-text">Title: {audioTitle}</p>
              </div>

              <div style={{ width: "350px" }}>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Description</Accordion.Header>
                    <Accordion.Body>
                      <p className="description-text">{audioDescription}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className=" col-4 d-flex justify-content-between align-items-center me-4">
                <div className="date-container">
                  <p>Time: {audioDate}</p>
                </div>
                <div className="me-4"></div>
                <p>No.of speakers:{audioAttendees}</p>
                <div className="me-4"></div>
                <span>
                  <audio controls>
                    <source src={baseURL + audioName} />
                  </audio>
                </span>

                <div className="me-4"></div>
                <div className="d-flex align-items-center mt-3 ">
                  <button
                    className={`btn ${
                      transcriptColor === "red" ? "btn-danger" : "btn-success"
                    } me-2`}
                    onClick={() => handleTranscriptGeneration(audioId)}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faPersonRunning} /> Generate
                    Transcript
                  </button>
                  {transcriptGenerated && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => fetchTranscript(audioId)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </span>
                  )}
                  <div className="me-4"></div>

                  <button
                    className={`btn ${
                      summaryColor === "red" ? "btn-danger" : "btn-success"
                    } me-2`}
                    onClick={() => handleSummaryGeneration(audioId)}
                    style={{ cursor: "pointer" }}
                    disabled={!transcriptGenerated}
                  >
                    <FontAwesomeIcon icon={faPersonRunning} /> Generate Summary
                  </button>
                  {summaryGenerated && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => fetchSummary(audioId)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </span>
                  )}
                  <div className="me-4"></div>

                  <button
                    className={`btn ${
                      momColor === "red" ? "btn-danger" : "btn-success"
                    } me-2`}
                    onClick={() => handleMomGeneration(audioId)}
                    style={{ cursor: "pointer" }}
                    disabled={!summaryGenerated}
                  >
                    <FontAwesomeIcon icon={faPersonRunning} /> Generate MoM
                  </button>
                  {momFetched ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => fetchMom(audioId)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
