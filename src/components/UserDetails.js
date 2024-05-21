// src/components/UserProfile.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserDetails = () => {
  const { user } = useContext(AuthContext);
  const first_name = localStorage.getItem('first_name');
//   const role = localStorage.getItem('role');

  const styles = {
    container: {
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px',
      margin: '20px auto',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
      marginBottom: '20px',
      textAlign: 'center',
    },
    text: {
      margin: '10px 0',
      fontSize: '1rem',
    },
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User Profile</h2>
      <p style={styles.text}><strong>Name:</strong> {first_name}</p>
      <p style={styles.text}><strong>Email:</strong> {user.email}</p>
      {/* <p style={styles.text}><strong>Role:</strong> {role}</p> */}
    </div>
  );
};

export default UserDetails;
