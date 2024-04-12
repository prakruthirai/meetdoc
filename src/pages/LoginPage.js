// import React ,{useContext} from 'react'
// import { AuthContext } from '../context/AuthContext';
// import "./login.css"


// const LoginPage = () => {
//     let {loginUser} = useContext(AuthContext)
//   return (
//     <div className='row'>
//        <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}></div>

       
        
//         <form onSubmit={loginUser} className='container'>
//         <div className="card">
//           <div className="header">
//              <h2>Login</h2>
        
//           {/* <div className='container'>
//             <div className='header'>
           
//               <div classname='text'>Login</div>
//               <div className='underline'></div>
//             </div>
//             */}
//           </div>
          
//           <div className='card-body'>
//            <div className='form-group'>
//             <input type = "text" className='username' name= "username" placeholder='Enter Username' />
//              </div>
             
//             <br></br>
         
//             <div className='form-group'>
//             <input type = "password" className='password' name= "password" placeholder='Enter password' />
//        </div>
//        </div>
//             <br></br>
//             <div className='card-footer'>
//             <button type="submit" className='submit'>Login</button>
//             </div>
//             </div>
//         </form>
//      </div>
//     // </div>
  

    
//   )
// }

// export default LoginPage;

// 2nd update

import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Modal } from 'react-bootstrap';
import "./login.css";

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(username, password);
        setShowModal(false); // Close the modal after logging in
    };

    return (
        <div>
            <button className="open-modal-button" onClick={() => setShowModal(true)}>Login</button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to MeetDoc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleLogin}>
                        <div className='form-group'>
                            <input type="text" className='username' name="username" placeholder='Enter Username' />
                        </div>
                        <div className='form-group'>
                            <input type="password" className='password' name="password" placeholder='Enter password' />
                        </div>
                        <div className='form-group'>
                            <button type="submit" className='submit'>Login</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginPage;
