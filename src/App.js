// import "./App.css";
// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute";
// import {AuthContext, AuthProvider} from "./context/AuthContext";
// import Homepage from "./pages/homepage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from './pages/SignupPage';
// import Header from "./components/Header";
// import 'bootstrap/dist/css/bootstrap.min.css'

// function App() {
//   const {user} = useContext(AuthContext)
//   return (
//     <div className="App">
//       <Router>
//         <AuthProvider>
//           <Routes>
//           <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />
//             {/* Redirect to login page if user is not authenticated */}
//             {!user ? <Navigate to="/login" /> : (
//               <>
//                 <Route path="/" element={<Header />} />
//                 <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
//               </>
//             )}
//           </Routes>
//         </AuthProvider>
//       </Router>
//     </div>
//   );
// }

// export default App;


import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/LoginPage";
// import SignupPage from './pages/SignupPage';
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/signup" element={<SignupPage />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
