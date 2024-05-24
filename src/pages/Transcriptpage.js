// import React, { useState, useEffect } from "react";
// import { faBackward, faFile } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useNavigate, useLocation } from "react-router-dom";

// const Transcriptpage = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem('authTokens')) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const { transcriptContent } = location.state || {};
//     if (transcriptContent) {
//       displayTranscriptInTinyMCE(transcriptContent);
//     } else {
//       setError("No transcript content available.");
//       setLoading(false);
//     }
//   }, [location.state]);

//   const handleSave = () => {
//     const editedTranscript = window.tinyMCEEditor.getContent();
//     localStorage.setItem("editedTranscript", editedTranscript);
//     console.log("Saving transcript...");
//   };

//   const displayTranscriptInTinyMCE = (content) => {
//     const iframe = document.getElementById("tinyMCEIframe");
//     const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

//     const onEditorReady = () => {
//       if (iframe.contentWindow.tinyMCEEditor) {
//         iframe.contentWindow.tinyMCEEditor.setContent(content);
//         setLoading(false);
//       } else {
//         setTimeout(onEditorReady, 100); // Retry after 100ms if editor is not ready
//       }
//     };
//     onEditorReady();
//   };

//   return (
//     <div className="container">
//       <div className="row mt-10">
//         <div>
//           <FontAwesomeIcon icon={faBackward} onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />
//           <span style={{ marginLeft: "10px", cursor: "pointer", color: "black" }}>Back</span>
//         </div>
//       </div>

//       <div className="position-relative">
//         <FontAwesomeIcon icon={faFile} onClick={handleSave} style={{ position: "absolute", top: "50%", right: "0", transform: "translateY(-50%)", cursor: "pointer" }} />
//         <span style={{ position: "absolute", top: "50%", right: "30px", transform: "translateY(-50%)", cursor: "pointer", color: "black" }}>Save</span>
//       </div>

//       <br />

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <iframe
//         id="tinyMCEIframe"
//         title="TinyMCE Editor"
//         src="/tiny.html"
//         width="100%"
//         height="800px"
//         onLoad={() => {
//           const { transcriptContent } = location.state || {};
//           if (transcriptContent) {
//             displayTranscriptInTinyMCE(transcriptContent);
//           }
//         }}
//       />
//     </div>
//   );
// };

// export default Transcriptpage;
