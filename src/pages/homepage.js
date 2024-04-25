// import React from 'react'
// // import { Link } from 'react-router-dom';
// import { Navbar,Nav } from 'react-bootstrap';

// const Homepage = () => {
//   return (
//     // <div>
//     //     <p>
//     //         you are logged in to the home page
//     //     </p>
//     // </div>
//     <div>
//        <Navbar bg="dark" data-bs-theme="dark">
    
//     {/* <Navbar.Brand href="#home">Home</Navbar.Brand>  */}
//   <Nav className="me-auto  nav_bar_warpper">
     
//   {/* <Link to='/signup'>Signuppage</Link> */}
//   {/* <Link to='/login'>Loginpage</Link> */}
 
        
          
//         </Nav>
       
         
//     </Navbar> 
//         <h1>Home page</h1>
//     </div>
//   )
// }

// export default Homepage;

// ----------------------------------------------

import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { Link, useNavigate} from 'react-router-dom';

const Homepage = () => {
  const { user,logoutUser } = useContext(AuthContext); // Access logoutUser function from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('authTokens')){
      navigate('/login')
    }
  },[navigate])

  return (
    <div>
      
      <Navbar bg="light" variant="light" style={{ marginRight: '10px' }} >
        {/* <Navbar.Brand href="/">Website</Navbar.Brand> */}
        {/* <Nav className="me-auto"> */}
        
        <Nav className="me-auto  nav_bar_warpper">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/services">Services</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          {user && user.role === 'Admin' && <Link to="/signup">SignUp</Link>}
        </Nav>
        <Nav>
        <Button variant="primary" style={{ marginRight: '30px' }} onClick={Homepage}>MeetDoc</Button>
          {user ? (
            <Button variant="outline-dark" onClick={logoutUser}>Logout</Button>
          ) : (
            <Link to="/login" style={{ marginLeft: '10px' }} >Login</Link>
          )}
          
        </Nav>
      </Navbar>
      {/* <h1>Home page</h1> */}
      {user && <p> Hello {user.username}</p>}
    </div>
  );
}

export default Homepage;

