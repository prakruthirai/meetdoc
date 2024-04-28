
import React, { useState, useEffect } from "react";
import axios from "axios";
import { faBackward, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Summarypage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("summary_api_endpoint")
      .then((response) => {
        const summaryContent = response.data.summary;
        setLoading(false);
        displaySummaryInTinyMCE(summaryContent);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const displaySummaryInTinyMCE = (content) => {
    const iframe = document.getElementById("tinyMCEIframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(content);
    iframeDocument.close();
    
  };
  const handleSave = () => {
    const iframe = document.getElementById("tinyMCEIframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const editedSummary = iframeDocument.body.innerHTML;
    
    // Save the edited transcript to local storage
    localStorage.setItem("editedSummary", editedSummary);
    // Define your save logic here
    console.log("Saving summary...");
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

export default  Summarypage;








