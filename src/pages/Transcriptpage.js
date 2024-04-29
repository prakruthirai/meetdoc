
import React, { useState, useEffect } from "react";
import axios from "axios";
import { faBackward, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Transcriptpage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("transcript_api_endpoint")
      .then((response) => {
        const transcriptContent = response.data.transcript;
        setLoading(false);
        displayTranscriptInTinyMCE(transcriptContent);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const displayTranscriptInTinyMCE = (content) => {
    const iframe = document.getElementById("tinyMCEIframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(content);
    iframeDocument.close();
    
  };
  const handleSave = () => {
    const iframe = document.getElementById("tinyMCEIframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const editedTranscript = iframeDocument.body.innerHTML;
    
    // Save the edited transcript to local storage
    localStorage.setItem("editedTranscript", editedTranscript);
    // Define your save logic here
    console.log("Saving transcript...");
  };
 

  return (
    <div className="container">
      <div className="row mt-10">
        <div>
          <a className="text-decoration-none" href="meetingcard">
            <FontAwesomeIcon icon={faBackward} />
            Back
          </a>
        </div>
      </div>

      <div className="position-relative">
        <a
          className="position-absolute top-50 end-0 translate-middle-y text-decoration-none"
          onClick={handleSave}
        >
          <FontAwesomeIcon icon={faFile} />
          Save
        </a>
      </div>

      <br />

      <iframe 
        id="tinyMCEIframe"
        title="TinyMCE Editor"
        src="/tiny.html"
        width="100%"
        height="800px"
      />
    </div>
  );
};

export default Transcriptpage;
