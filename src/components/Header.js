// import React, { useContext } from 'react'
// import {Link} from 'react-router-dom'
// import {AuthContext} from '../context/AuthContext'

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
//   const {user,logoutUser} = useContext(AuthContext)
//   return (
//     <div>
//         <Link to='/' >Home</Link>
//         <span> &nbsp; </span>
//         {user ? (
//           <p onClick={logoutUser}>Logout</p> 
//         ): (
//           <Link to='/login' >Login</Link>
//         )}
//         <span> &nbsp; </span>
//         <Link to='/signup' >SignUp</Link>

//         {user && <p> Hello {user.username}</p>}
//     </div>
//   )
// }

// export default Header;


// import "./Navbar.css";

// const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        Home
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        {/* Add a login link */}
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        
        {/* {user ? (
//           <p onClick={logoutUser}>Logout</p> 
//         ): (
//           <Link to='/login' >Login</Link>
//         )} */}

      </ul>
    </nav>
  );
};

export default Header;
