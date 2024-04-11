// import React ,{useContext} from 'react'
// import { AuthContext } from '../context/AuthContext';
// import "./login.css"

// const LoginPage = () => {
//     let {loginUser} = useContext(AuthContext)
//   return (
//     <div>
       
 
//         <form onSubmit={loginUser}>
        
//           <div className='container'>
//             <div className='header'>
           
//               <div className='text'>Login</div>
//               <div className='underline'></div>
//             </div>
           
//           </div>
//             <input type = "text" className='username' name= "username" placeholder='Enter Username' />
//             <br></br>
//             <input type = "password" className='password' name= "password" placeholder='Enter password' />
//             <br></br>
//             <button type="submit" className='submit'>Login</button>
            
//         </form>
     
//     </div>
  

    
//   )
// }

// export default LoginPage;

import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser(username, password);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
