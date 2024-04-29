import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { Link, useNavigate} from 'react-router-dom';

const Homepage = () => {
  const {user, logoutUser } = useContext(AuthContext); // Access logoutUser function from AuthContext
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  console.log(user)

  useEffect(() => {
    if(!localStorage.getItem('authTokens')){
      navigate('/login')
    }
  },[navigate])

  useEffect(() => {
    if (user && role === 'Admin') {
      setIsAdmin(true);
    }
  }, [user]);

  return (
    <div>
      
      <Navbar bg="light" variant="light" style={{ marginRight: '10px' }} >
        {/* <Navbar.Brand href="/">Website</Navbar.Brand> */}
        {/* <Nav className="me-auto"> */}
        
        <Nav className="me-auto  nav_bar_warpper">
          <Nav.Link href="/about">About</Nav.Link> 
        </Nav>
        <Nav>
        <Button variant="primary" style={{ marginRight: '30px' }} onClick={() => navigate('/')}>Your MeetDocs</Button>
          {user ? (
            <Button variant="outline-dark" onClick={logoutUser}>Logout</Button>
          ) : (
            <Link to="/login" style={{ marginLeft: '10px' }} >Login</Link>
          )}
          
        </Nav>
        <Nav>
        {isAdmin && (
        <button onClick={() => navigate('/signup')}>Create User</button>
      )}
        </Nav>
      </Navbar>
      {user?.username && <p>Hello {user.username}</p>}
    </div>
  );
}

export default Homepage;

