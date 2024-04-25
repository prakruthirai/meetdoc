// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';


const PrivateRoute = ({ element, admin}) => {
    const {user} = useContext(AuthContext);
    if (!user) {
        return  <Navigate to="/login" replace />
    }

    if (admin && (!user || user.role !=="admin")){
        return <Navigate to="/login" replace />
    }

    return element;
   
}

export default PrivateRoute;
