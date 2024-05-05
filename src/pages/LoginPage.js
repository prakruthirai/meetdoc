import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
// import './login.css'

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser(username, password);
    };

    return (
       <div className='container-fluid'>
         <div className='row'>
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '150px' }}>
                <form onSubmit={handleLogin} className="container">
                    <div className="card" style={{ width: '400px' }}>
                        <div className="card-header">
                            <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>Login</h2>
                            <p style={{ fontSize: '16px', margin: '0' }}>Enter your credentials</p>
                        </div>
                        <div className="card-body" style={{ height: '100px' }}>
                            <div className="form-group position-relative">
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="User Name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} 
                                    className='form-control pl-4' // Added 'pl-4' class for left padding
                                    style={{ paddingLeft: '35px' }}
                                />
                                <FontAwesomeIcon icon={faUser} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
                            </div>
                            <br />
                            <div className="form-group position-relative">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className='form-control pl-4' // Added 'pl-4' class for left padding
                                    style={{ paddingLeft: '35px' }}
                                />
                                <FontAwesomeIcon icon={faLock} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
       </div>
    );
};

export default LoginPage;