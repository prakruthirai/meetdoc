
// import React, { useState } from 'react';
// import axios from 'axios';
// import baseURL from "../Api/Config";
// import './uploadpage.css'

// const Uploadpage = () => {
//   const [files, setFiles] = useState(null);
//   const [progress, setProgress] = useState({ started: false, pc: 0 });
//   const [msg, setMsg] = useState(null);

//   useEffect(() => {
//     if(!localStorage.getItem('authTokens')){
//       navigate('/login')
//     }
//   },[navigate])

//   const handleUpload = () => {
//     if (!files) {
//       setMsg("No file selected");
//       return;
//     }
    
//     const fd = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       fd.append(`files[${i}]`, files[i]);
//     }

//     setMsg("Uploading...");
//     setProgress(prevState => ({ ...prevState, started: true }));

//     axios.post(`${baseURL}/api/meetdoc/upload-audio/`, fd, {
//       onUploadProgress: (progressEvent) => {
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         setProgress(prevState => ({ ...prevState, pc: percentCompleted }));
//       },
//       headers: {
//         // "Custom-Header": "value",
//         'Content-Type': 'multipart/form-data',
//       }
//     })
//     .then(res => {
//       setMsg("Upload successful");
//       console.log(res.data);
//     })
//     .catch(err => {
//       setMsg("Upload failed");
//       console.error(err);
//     });
//   };

//   return (
//     <div className="file-card">
//       <h1>Uploading Files</h1>
//       <input onChange={(e) => setFiles(e.target.files)} type='file' multiple />
//       {files && <button onClick={handleUpload} className="upload-button">Upload</button>}
//       {progress.started && <progress max='100' value={progress.pc}></progress>}
//       {msg && <span>{msg}</span>}
//     </div>
//   );
// };

// export default Uploadpage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import baseURL from "../Api/Config";
// import { useNavigate } from 'react-router-dom';

// const AudioUploader = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem('authTokens')) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//     setUploadError(null);
//   };

//   const uploadAudio = async () => {
//     if (!selectedFile) {
//       setUploadError('Please select an audio file.');
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     console.log(formData)
//     formData.append('audio_file', selectedFile);
    
//     try {
//       const tokens = localStorage.getItem("accessToken");
//       console.log(tokens)
//       const response = await axios.post(`${baseURL}/api/meetdoc/upload-audio/`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${tokens}`,
//         },
//       });
//       console.log('Audio uploaded successfully:', response.data);
//       navigate('/meetingcard')
//     } catch (error) {
//       console.error('Error uploading audio:', error);
//       if (error.response) {
//         console.log('Server Error:', error.response.data);
//       } else if (error.request) {
//         console.log('Network Error:', error.request);
//       } else {
//         console.log('Error:', error.message);
//       }
//       setUploadError('Error uploading audio. Please try again later.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} accept="audio/*" />
//       {uploading && <p>Uploading...</p>}
//       {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
//       <button onClick={uploadAudio}>Upload Audio</button>
//     </div>
//   );
// };

// export default AudioUploader;

import React, { useState, useEffect ,useRef } from 'react';
import axios from 'axios';
import './uploadpage.css'
import baseURL from "../Api/Config";
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css';

import { useNavigate } from 'react-router-dom';

const AudioUploader = () => {
  const [filename, setFilename] = useState(null);
  const [description, setDescription] = useState('');
  const [attendees, setAttendees]= useState('');
  const [title, setTitle]= useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const editorRef = useRef(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileChange = (event) => {
    setFilename(event.target.files[0]);
    setUploadError(null);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);

    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.scroll.domNode.scrollTop = editor.scroll.domNode.scrollHeight;
    }
    
  };

  const handleAttendees = (event) => {
    setAttendees(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  

  const uploadAudio = async () => {
    if (!filename) {
      setUploadError('Please select an audio file.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    
    formData.append('filename', filename);
    formData.append('description', description); // Append description to form data
    formData.append('count_of_attendees',attendees)

    console.log(formData)

  
    // console.log(data)
    try {
      const tokens = localStorage.getItem("access_token");
      console.log(tokens)
      const response = await axios.post(`${baseURL}/api/meetdoc/upload-audio/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${tokens}`,
        },
      });
      console.log('Audio uploaded successfully:', response.data);
      navigate('/latestaudio')
    } catch (error) {
      console.error('Error uploading audio:', error);
      if (error.response) {
        console.log('Server Error:', error.response.data);
      } else if (error.request) {
        console.log('Network Error:', error.request);
      } else {
        console.log('Error:', error.message);
      }
      setUploadError('Error uploading audio. Please try again later.');
    } finally {
      setUploading(false);
    }
  };

  return (
        <div>
          {/* <input type="file" onChange={handleFileChange} accept="audio/wav" />
          <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" /> */}
        <div className='file-card'>
          
        <div className='mb-3 row  '>
          <div className='col'>
            <input type="text" value={title} onChange={handleTitle} placeholder="Title"  class="form-control form-control-lg" />
            </div>
            {/* </div>
            <div className='mb-3 row'> */}
            <div className='col'>
            <input type="text" value={attendees} onChange={handleAttendees} placeholder="No.of attendees"  class="form-control form-control-lg" />
            </div>
            </div>

            <div className='mb-3 row' style={{ textAlign: 'right' }}>
          <input type="file" onChange={handleFileChange} accept="audio/*" style={{ marginLeft: '50px' }} />
          </div> 
          
          {/* <div className='mb-3 row'>
            <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description"  class="form-control form-control-lg" />
            </div> */}
            <div className='mb-3 row'>
          <div className='col'>
          <div className="editor-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <ReactQuill 
              ref={editorRef}
              value={description} 
              onChange={handleDescriptionChange} 
              placeholder="Description" 
              className="quill-editor"
              // style={{ minHeight: '200px', overflowY: 'auto' }}
            />
          </div>
          </div>
        </div>
          
       
        
          {uploading && <p>Uploading...</p>}
          {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
          <button onClick={uploadAudio} className='upload-button'>Upload Audio</button>
        </div>
      </div>

      );
    }
    
    export default AudioUploader;
