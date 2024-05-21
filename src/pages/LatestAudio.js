// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import baseURL from '../Api/Config';

// function LatestAudio() {
//   const [latestAudio, setLatestAudio] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchLatestAudio = async () => {
//     try {
//       const tokens = localStorage.getItem('access_token');
//       // console.log(tokens)
//       const response = await axios.get(`${baseURL}/api/meetdoc/latest-audio`, {
//         headers: {
//           Authorization: `Bearer ${tokens}`,
//         },
//       });
//       setLatestAudio(response.data.data); // Assuming response.data contains the audio data
//       console.log(latestAudio)

//     } catch (error) {
//       setError(error);
//       console.error('Error fetching latest audio:', error);
//     }
//   };

//   useEffect(() => {
//     fetchLatestAudio(); // Fetch on initial render
//   }, []); // Empty dependency array ensures fetching only once

//   return (
//     <div>
//       {error ? (
//         <p>Error fetching latest audio: {error.message}</p>
//       ) : latestAudio ? (
//         <div className='container'>
//           {/* <h2>Latest Uploaded Audio</h2> */}
//           {/* <p>FileID: {latestAudio.id}</p>
//           <p>Audio File: {latestAudio.filename}</p> */}

//           <p>
//             <audio controls>
//               <source
//               src={baseURL+latestAudio.filename}
//               />
//                 </audio>
//               </p>
//               {/* Add more details about the latest audio if needed */}
//             </div>
//             ) : (
//             <p>Loading latest audio...</p>
//       )}
//         </div>
//       );
// }

//       export default LatestAudio;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../Api/Config';
import MeetingCard from './MeetingCard';

import { useNavigate } from 'react-router-dom';

const AudioList = () => {
  const [audioList, setAudioList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    const fetchAudioList = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/meetdoc/upload-audio-list/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setAudioList(response.data);
        console.log(audioList)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching audio list:', error);
        setLoading(false);
      }
    };

    fetchAudioList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/meetdoc/remove-audio/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      // Update the state to remove the deleted audio file
      setAudioList(audioList.filter(audio => audio.id !== id));
      console.log(`Audio with ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting audio:', error);
    }
  };


  useEffect(() => {
    // console.log(audioList);
  }, [audioList]);

  return (
    <div>
      <h1>Audio List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // <ul>
        <div>
          {audioList.length === 0 ? (
            <p>No audio files found for the user</p>
          ) : (
            audioList.map((audio) => (
              <MeetingCard key={audio.id} audioId={audio.id} audioName={audio.filename} audioTitle={audio.title}  audioDate={audio.upload_date} audioDescription={audio.description}
              audioAttendees={audio.count_of_attendees} onDelete={handleDelete} />
            ))
            
          )}
          
        </div>
      )}
    </div>
  );
};
//                 <p>Audio Name: {audio.filename}</p>
//                 <p>Description: {audio.description}</p>
//                 <p>
//                   <audio controls>
//                     <source
//                       src={baseURL + audio.filename}
//                     />
//                   </audio>
//                 </p>
//             ))
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

export default AudioList;
