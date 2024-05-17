import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from "../Api/Config";
import "./signup.css";
import { faUser, faEnvelope, faLock, faGraduationCap } from "@fortawesome/free-solid-svg-icons"; // Import required FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('authTokens')) {
          navigate('/login');
        }
      }, [navigate]);
     console.log("is authenticated")


    const handleSubmit = async (e) => {
        e.preventDefault();
        const tokens = localStorage.getItem("access_token")
        console.log(tokens)
        try {
            var data={
                "username": username,
                 "email":email,
                 "first_name":first_name,
                 "password": password
             }
            const response = await axios.post
            (`${baseURL}/api/authentication/register`, data, {
                headers: {
                    Authorization: `Bearer ${tokens}`
                }
            }
        ); 
            console.log(response)
            if (response.status ===201) {
                setSuccessMessage("Registraction Successful")

                setUsername("");
                setEmail("");
                setFirstname("");
                setPassword("");

                navigate('/signup')
    
            } else{
                throw new Error("Registration failed")
            };
        }catch (error){
            setError('Registration failed. Please try again.')
            console.error('Error occurred during registration:', error);
        }
    };

    return (
        <div className='row'>
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '0px' }}>
                <form onSubmit={handleSubmit} className="container">
                    <div className="card" style={{ width: '500px', height: '300px' }}>
                        <div className="card-header">
                            <h2 style={{ fontFamily: 'Roboto', fontSize: '30px' }}>Create User</h2>
                        </div>
                        <div className="card-body"  style={{ height: '200px' }}>
                         <div className='row'>
                            <div className='col'>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faGraduationCap} /></span>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        placeholder="User Name" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} 
                                        required  
                                        className='form-control ' 
                                    />
                                </div>
                            </div>
                            </div>
                            
                            <div className='col'>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                                    <input 
                                        type="text" 
                                        id="email" 
                                        placeholder="E-mail" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required  
                                        className='form-control' 
                                    />
                                </div>
                            </div>
                            </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                    <input 
                                        type="text" 
                                        id="first_name" 
                                        placeholder="First Name" 
                                        value={first_name}
                                        onChange={(e) => setFirstname(e.target.value)} 
                                        required  
                                        className='form-control' 
                                    />
                                </div>
                            </div>
                            </div>
                            <div className='col'>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        placeholder="Password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required  
                                        className='form-control' 
                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary custom-font">Create User</button>
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