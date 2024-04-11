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

import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { Link } from 'react-router-dom';

const Homepage = () => {
  const { user,logoutUser } = useContext(AuthContext); // Access logoutUser function from AuthContext
  // const navigate = useNavigate

  return (
    <div>
      
      <Navbar bg="dark" variant="dark">
        {/* <Navbar.Brand href="/">Website</Navbar.Brand> */}
        <Nav className="me-auto">
          {/* <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/services">Services</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link> */}
          {user ? (
          <p onClick={logoutUser}>Logout</p> 
        ): (
          <Link to='/login' >Login</Link>
        )}
        </Nav>
        {/* <Button variant="outline-light" onClick={logoutUser}>Logout</Button> Logout button */}
      </Navbar>
      <h1>Home page</h1>
      {user && <p> Hello {user.username}</p>}
    </div>
  );
}

export default Homepage;
