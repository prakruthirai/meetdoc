import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'


const Header = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
        <Link to='/' >Home</Link>
        <span> &nbsp; </span>
        {user ? (
          <p onClick={logoutUser}>Logout</p> 
        ): (
          <Link to='/login' >Login</Link>
        )}
        <span> &nbsp; </span>
        <Link to='/signup' >SignUp</Link>

        {user && <p> Hello {user.username}</p>}
    </div>
  )
}

export default Header;