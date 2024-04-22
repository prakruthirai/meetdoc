// import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute";
// import {AuthProvider , AuthContext } from "./context/AuthContext";
// import Homepage from "./pages/homepage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from './pages/SignupPage';
// import Header from "./components/Header";
// import 'bootstrap/dist/css/bootstrap.min.css'

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <AuthProvider>
//           <Header/>
//           <Routes>
//             <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
//             <Route path="/login" element={<LoginPage />} />
//             <AuthContext.Consumer>
//               {({ user }) => (
//                 user && user.isAdmin ? (
//                   <Route path="/signup" element={<SignupPage />} />
//                 ) : null
//               )}
//               </AuthContext.Consumer>
//           </Routes>
//         </AuthProvider>
//       </Router>
//     </div>
//   );
// }

// export default App;

// import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute";
// import { AuthProvider, AuthContext } from "./context/AuthContext"; // Import AuthContext
// import Homepage from "./pages/homepage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import Header from "./components/Header";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <AuthProvider>
//           <Header />
//           <AuthContext.Consumer>
//             {({ user }) => (
//               <Routes>
//                 <Route
//                   path="/"
//                   element={<PrivateRoute element={<Homepage />} />}
//                 />
//                 <Route path="/login" element={<LoginPage />} />
//                 {user && user.isAdmin ? (
//                   <Route path="/signup" element={<SignupPage />} />
//                 ) : null}
//               </Routes>
//             )}
//           </AuthContext.Consumer>
//         </AuthProvider>
//       </Router>
//     </div>
//   );
// }

// export default App;

// ___________________________________________

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute";
// import { AuthProvider, AuthContext } from "./context/AuthContext";
// import Homepage from "./pages/homepage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import Header from "./components/Header";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <AuthProvider>
//           <Header />
//           <AuthContext.Consumer>
//             {({ user }) => (
//               <Routes>
//                 <Route
//                   path="/"
//                   element={<PrivateRoute element={<Homepage />} />}
//                 />
//                 <Route
//                   path="/login"
//                   element={
//                     user ? <Navigate to="/" /> : <LoginPage />
//                   }
//                 />
//                 {user && user.isAdmin && (
//                   <Route
//                     path="/signup"
//                     element={<SignupPage />}
//                   />
//                 )}
//               </Routes>
//             )}
//           </AuthContext.Consumer>
//         </AuthProvider>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute element={<Homepage />} />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/signup"
              element={<SignupPage />}
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

