
import React, { useState } from 'react';
import axios from 'axios';
import baseURL from "../Api/Config";

const Uploadpage = () => {
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  const handleUpload = () => {
    if (!files) {
      setMsg("No file selected");
      return;
    }
    
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append(`files[${i}]`, files[i]);
    }

    setMsg("Uploading...");
    setProgress(prevState => ({ ...prevState, started: true }));

    axios.post(`${baseURL}/api/meetdoc/upload-audio/`, fd, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(prevState => ({ ...prevState, pc: percentCompleted }));
      },
      headers: {
        "Custom-Header": "value",
      }
    })
    .then(res => {
      setMsg("Upload successful");
      console.log(res.data);
    })
    .catch(err => {
      setMsg("Upload failed");
      console.error(err);
    });
  };

  return (
    <div>
      <h1>Uploading Files</h1>
      <input onChange={(e) => setFiles(e.target.files)} type='file' multiple />
      {files && <button onClick={handleUpload}>Upload</button>}
      {progress.started && <progress max='100' value={progress.pc}></progress>}
      {msg && <span>{msg}</span>}
    </div>
  );
};

export default Uploadpage;
