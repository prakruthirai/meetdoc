
import React, { useState, useContext , useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons"; 
import { AuthContext } from '../context/AuthContext';
import { Button, Modal  } from 'react-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";
import UserDetails from "./UserDetails";

import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user, logoutUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
//   console.log(role)
const navigate = useNavigate();

useEffect(() => {
  if (!localStorage.getItem('authTokens')) {
    navigate('/login')
  }
}, [navigate])

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (user && role === "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser();
    console.log("Logout clicked");
  };

  return (
    <nav>
      <Link to="/" className="title">
        MeetDoc.
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
      {isAdmin && (
          <li>
            <NavLink to="/signup">Create User</NavLink>
          </li>
        )}
        <li>
            <NavLink to="/uploadpage">Upload Audio</NavLink>
          </li>
          <li>
            <NavLink to="/latestaudio">View Audios</NavLink>
          </li>
          {user && (
          <li>
            <FontAwesomeIcon
              icon={faUser}
              onClick={() => setShowProfile(true)}
              style={{ cursor: "pointer" }}
            />
          </li>
        )}
        <li>
          {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        {/* <li className="dropdown">
        <span className="dropdown-btn">
        <FontAwesomeIcon icon={faBars} />
          </span>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
            {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link to="/login" >Login</Link>
          )}
              {/* <button onClick={handleLogout}>Logout</button> */}
            {/* </li> */}
          {/* </ul>
        </li> */}
      </ul>
      <Modal show={showProfile} onHide={() => setShowProfile(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserDetails />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfile(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};
