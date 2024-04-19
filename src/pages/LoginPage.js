import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './login.css'

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser(username, password);
    };

    return (
        <div className='row'>
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
           
            <form onSubmit={handleLogin} className="container">
            <div className="card">
            <div className="card-header">
            <h2>Welcome to Meetdoc</h2>
            </div>
                <div className="card-body"> 
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} className='form-control'
                    />
                </div>
               
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} className='form-control'
                    />
                </div>
                </div>
                <div className="card-footer">
                <button type="submit" class="btn btn-primary">Login</button>
                </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default LoginPage;

