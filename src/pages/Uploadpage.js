
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './uploadpage.css'
import baseURL from "../Api/Config";
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useNavigate } from 'react-router-dom';

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <input
    type="text"
    className="form-control form-control-lg"
    onClick={onClick}
    ref={ref}
    value={value}
    placeholder="Date"
    readOnly
  />
));

const AudioUploader = () => {
  const [filename, setFilename] = useState(null);
  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [dateOfMeeting, setDateOfMeeting] = useState(new Date());
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login')
    }
  }, [navigate])

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],

    ],
  }


  const handleFileChange = (event) => {
    setFilename(event.target.files[0]);
    setUploadError(null);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleAttendees = (event) => {
    setAttendees(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleMeetingDateChange = (date) => {
    setDateOfMeeting(date);
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
    formData.append('count_of_attendees', attendees)
    formData.append('title', title)
    formData.append('date_of_meeting', dateOfMeeting ? new Date(dateOfMeeting).toISOString().split('T')[0] : '');

    // formData.append('upload_date', date)

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
<div className="file-card">
{/* <input type="file" onChange={handleFileChange} accept="audio/wav" />
    <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" /> */}
<div className="row">
  <div className="col-lg-6  ">
    <div className="mb-3">
      <input
        type="text"
        value={title}
        onChange={handleTitle}
        placeholder="Title"
        class="form-control form-control-lg"
      />
    </div>

    {/* </div>
      <div className='mb-3 row'> */}
    <div className="mb-3  ">
      <input
        type="text"
        value={attendees}
        onChange={handleAttendees}
        placeholder="No.of attendees"
        class="form-control form-control-lg"
      />
    </div>

    <div className="mb-3 ">
            <DatePicker
              selected={dateOfMeeting}
              onChange={handleMeetingDateChange}
              // placeholder="Date"
              dateFormat="yyyy-MM-dd"
              customInput={<CustomInput />}
              
            />
          </div>

    <div className="mb-3 ">
    <div className="box">
      <input
        type="file"
        onChange={handleFileChange}
        accept="audio/*"
        style={{ marginLeft: "10px" }}
      />
    </div>
  </div>
  </div>

  {/* <div className='mb-3 row'>
      <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description"  class="form-control form-control-lg" />
      </div> */}
      
  <div className="col-lg-6">
    <div className="mb-3">
      <h2 className="small-heading">Description</h2>
      <div className="editor-container" style={{ maxHeight: "200px"}}>
        <ReactQuill
          // ref={editorRef}
          // value={description}
          // onChange={handleDescriptionChange}
          // placeholder="Description"
          // className="quill-editor"
          style={{
            minHeight: "200px",
            overflowY: "hidden",
            maxWidth: "500px",
          
          }}
          theme="snow"
          value={description}
          onChange={handleDescriptionChange}
          modules={modules}
        />
      </div>
    </div>
  </div>
</div>
<br/>
<div className="row" >
<div className="col d-flex align-items-center justify-content-center">
<div className="text-center">
    {uploading && <p>Uploading...</p>}
    {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
    <button onClick={uploadAudio} className="upload-button">
      Upload Audio
    </button>
  </div>
</div>
</div>
</div>

  );
}

export default AudioUploader;
