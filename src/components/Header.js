// import React from "react";

// import Applogo from "./Applogo"; // Import the Logo component

// import "./Header.css";

// const Header = () => {
//   return (
//     <header className="header" >
//       <div className="container-fluid">
//       <div className="logo-container">
//         <div className="col-md-3 d-block m-0.5 p-0.5 applogo">          
//             <Applogo />
//         </div>

      
//       </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../context/AuthContext';
import { Button, Modal } from 'react-bootstrap';
import Applogo from "./Applogo";
import UserDetails from "./UserDetails";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authTokens')) {
      navigate('/login');
    }
  }, [navigate]);

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
    <header className="header">
      <div className="container-fluid">
      <div className="header-content">
        <div className="logo-container">
          <div className="col-md-3 d-block m-0.5 p-0.5 applogo">
          <Link to="/">
              <Applogo />
            </Link>
          </div>
          </div>
          {/* <nav> */}
            {user ? (
              <>
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
                    <FontAwesomeIcon
                      icon={faUser}
                      onClick={() => setShowProfile(true)}
                      style={{ cursor: "pointer",color: 'white' }}
                    />
                  </li>
                  <li>
                    <Button onClick={handleLogout}>Logout</Button>
                  </li>
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
              </>
            ) : (
              <ul>
                {/* <li>
                  <Link to="/login">Login</Link>
                </li> */}
              </ul>
            )}
          {/* </nav> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

