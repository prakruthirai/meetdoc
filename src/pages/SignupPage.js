import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from "../Api/Config";

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/api/authentication/register`, {
                username,
                email,
                first_name,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status !== 200) { // Check response status
                throw new Error('Registration failed');
            }
            // Clear form fields
            setUsername('');
            setEmail('');
            setFirstname('');
            setPassword('');
            setSuccessMessage('Registration successful.');
            // Redirect to signup page
            navigate('/signup');
        } catch (error) {
            setError('Registration failed. Please try again.'); // Provide feedback to user
            console.error('Error occurred during registration:', error);
        }
    };

    return (
        <div>
             <div className="offset-lg-3 col-lg-6" style={{ marginTop: '60px' }}>
            
            <form onSubmit={handleSubmit}>
            <div className="card">
            
            <div className="card-header">
            <h2>Register</h2>
            </div>
            <div className="card-body">
                 <div className="column">
                 <div className="col-lg-9">
                    <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-field" />
                </div>
                </div>
                <div className="col-lg-9">
                    <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required  className='form-control' />
                </div>
                </div>
                <div className="col-lg-9">
                    <div className="form-group">
                    <label>Firstname:</label>
                    <input type="text" value={first_name} onChange={(e) => setFirstname(e.target.value)} required />
                </div>
                </div>
                <div className="col-lg-9">
                    <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                </div>
                </div>
                </div>
                <div className="card-footer">
                <button type="submit">Register</button>
                </div>

                {error && <p>{error}</p>} {/* Display error message if registration fails */}
                {successMessage && <p>{successMessage}</p>} {/* Display success message */}
                </div>
            </form>
        
        </div>
        </div>
    );
};

export default SignupPage;
