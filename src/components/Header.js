// import React, { useContext } from 'react'
// import {Link} from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'


// const Header = () => {
//   const {user, isAdmin, logoutUser} = useContext(AuthContext)
//   return (
//     <div>
//         <Link to='/' >Home</Link>
//         <span> &nbsp; </span>
//         {user ? (
//           <>
//           {isAdmin && (
//             <Link to="/signup">SignUp</Link>
//           )}
//           <span> &nbsp; </span>
//           <p onClick={logoutUser}>Logout</p>  
//         </>
//         ): (
//           <Link to='/login' >Login</Link>
//         )}
//         <span> &nbsp; </span>
//         <Link to='/signup' >SignUp</Link>

//         {/* {user && <p> Hello {user.username}</p>} */}
//     </div>
//   )
// }

// export default Header;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, isAdmin, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">Home</Link>
      <span>&nbsp;</span>
      {user ? (
        <>
          {isAdmin && <Link to="/signup">SignUp</Link>}
          <span>&nbsp;</span>
          <p onClick={logoutUser}>Logout</p>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <span>&nbsp;</span>
      {/* Render SignUp link only if the user is an admin */}
      {user && isAdmin && <Link to="/signup">SignUp</Link>}
    </div>
  );
};

export default Header;
