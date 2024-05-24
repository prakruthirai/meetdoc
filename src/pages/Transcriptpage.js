
import React, { useState, useEffect } from "react";
import { faBackward, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";

const Transcriptpage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const { transcriptContent } = location.state || {};
    if (transcriptContent) {
      displayTranscriptInTinyMCE(transcriptContent);
    } else {
      setError("No transcript content available.");
      setLoading(false);
    }
  }, [location.state]);

  const displayTranscriptInTinyMCE = (content) => {
    const iframe = document.getElementById("tinyMCEIframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    const onEditorReady = () => {
      if (iframe.contentWindow.tinyMCEEditor) {
        iframe.contentWindow.tinyMCEEditor.setContent(content);
        setLoading(false);
      } else {
        setTimeout(onEditorReady, 100); // Retry after 100ms if editor is not ready
      }
    };
    onEditorReady();
  };

  const handleSave = () => {
    const iframe = document.getElementById("tinyMCEIframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const editedTranscript = iframe.contentWindow.tinyMCEEditor.getContent();

    localStorage.setItem("editedTranscript", editedTranscript);
    console.log("Saving transcript...");
  };

  return (
    <div className="container">
      <div className="row mt-10">
        <div>
          <a className="text-decoration-none" href="/meetingcard">
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

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <iframe
        id="tinyMCEIframe"
        title="TinyMCE Editor"
        src="/tiny.html"
        width="100%"
        height="800px"
        onLoad={() => {
          const { transcriptContent } = location.state || {};
          if (transcriptContent) {
            displayTranscriptInTinyMCE(transcriptContent);
          }
        }}
      />
    </div>
  );
};

export default Transcriptpage;
