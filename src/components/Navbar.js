
import React, { useState, useContext , useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons"; 
import { AuthContext } from '../context/AuthContext';
import { Button } from 'react-bootstrap';
import "./Navbar.css";

import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user, logoutUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  
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
    </nav>
  );
};
