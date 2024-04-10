// RegisterPage.js
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a request to your backend API to register the user
            const response = await fetch('http://example.com/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            console.log('Registration successful:', data);

            // Redirect to the login page
            // history.push('/login');
        } catch (error) {
            console.error('Error occurred during registration:', error);
            // Handle error
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default SignupPage;
