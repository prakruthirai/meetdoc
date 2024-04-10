import React ,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import "./login.css"

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
  return (
    <div>
 
        <form onSubmit={loginUser}>
          <div className='container'>
            <div className='header'>
              <div classname='text'>Login</div>
              <div className='underline'></div>
            </div>
           
          </div>
            <input type = "text" className='username' name= "username" placeholder='Enter Username' />
            <br></br>
            <input type = "password" className='password' name= "password" placeholder='Enter password' />
            <br></br>
            <input type = "submit" className='submit' />
            
        </form>
    </div>
  )
}

export default LoginPage;