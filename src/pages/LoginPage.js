import React ,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import "./login.css"


const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
  return (
    <div className='row'>
       <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}></div>

       
        
        <form onSubmit={loginUser} className='container'>
        <div className="card">
          <div className="header">
             <h2>Login</h2>
        
          {/* <div className='container'>
            <div className='header'>
           
              <div classname='text'>Login</div>
              <div className='underline'></div>
            </div>
            */}
          </div>
          
          <div className='card-body'>
           <div className='form-group'>
            <input type = "text" className='username' name= "username" placeholder='Enter Username' />
             </div>
             
            <br></br>
         
            <div className='form-group'>
            <input type = "password" className='password' name= "password" placeholder='Enter password' />
       </div>
       </div>
            <br></br>
            <div className='card-footer'>
            <button type="submit" className='submit'>Login</button>
            </div>
            </div>
        </form>
     </div>
    // </div>
  

    
  )
}

export default LoginPage;