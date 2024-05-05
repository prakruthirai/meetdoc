
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faBackward, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Mompage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("mom_api_endpoint")
      .then((response) => {
        const momContent = response.data.mom;
        setLoading(false);
        displayMomInTinyMCE(momContent);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const displayMomInTinyMCE = (content) => {
    const iframe = document.getElementById("tinyMCEIframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(content);
    iframeDocument.close();
    
  };
  const handleSave = () => {
    const iframe = document.getElementById("tinyMCEIframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const editedMom = iframeDocument.body.innerHTML;
    
    // Save the edited transcript to local storage
    localStorage.setItem("editedMom", editedMom);
    // Define your save logic here
    console.log("Saving mom...");
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

export default Mompage;
