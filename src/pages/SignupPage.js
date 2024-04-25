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
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Firstname:</label>
                    <input type="text" value={first_name} onChange={(e) => setFirstname(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>

                {error && <p>{error}</p>} {/* Display error message if registration fails */}
                {successMessage && <p>{successMessage}</p>} {/* Display success message */}
            </form>
        </div>
    );
};

export default SignupPage;
