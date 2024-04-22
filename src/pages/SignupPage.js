// RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // const [first_name, setFirstname] = useState('');
    const [password, setPassword] = useState('');
//  const [error, setError] = useState('');
//  const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a request to your backend API to register the user
            const response = await fetch('http://127.0.0.1:8000/api/authentication/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            console.log('Registration successful:', data);

            // Redirect to the login page
            navigate('/signup');
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignupPage = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     // const [first_name, setFirstname] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://127.0.0.1:8000/api/authentication/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({  username, email, password })
//             });
//             if (!response.ok) {
//                 throw new Error('Registration failed');
//             }
//             // Clear form fields
            
//             setUsername('');
//             setEmail('');
//             // setFirstname('');
//             setPassword('');
//             // Set success message
//             setSuccessMessage('Registration successfull.');
//             // Redirect to signup page
//             navigate('/signup');
//         } catch (error) {
//             setError('Registration failed. Please try again.'); // Provide feedback to user
//             console.error('Error occurred during registration:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Username:</label>
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 </div>
//                 {/* <div>
//                     <label>Firstname:</label>
//                     <input type="text" value={first_name} onChange={(e) => setFirstname(e.target.value)} required />
//                 </div> */}
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 </div>
//                 <button type="submit">Register</button>

//                 {error && <p>{error}</p>} {/* Display error message if registration fails */}
//                 {successMessage && <p>{successMessage}</p>} {/* Display success message */}
//             </form>
//         </div>
//     );
// };

// export default SignupPage;
