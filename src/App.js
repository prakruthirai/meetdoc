

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Uploadpage from "./pages/Uploadpage";
import MeetingCard from "./pages/MeetingCard";
import Footer from "./components/Footer"
import Header from "./components/Header";
import { Navbar } from "./components/Navbar";
import Transcriptpage from "./pages/Transcriptpage";
import Summarypage from "./pages/Summarypage";
import Mompage from "./pages/Mompage"
import LatestAudio from "./pages/LatestAudio";
import AboutPage from './pages/AboutPage';
import UserDetails from "./components/UserDetails";

// import "./App.css"


function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          
          <AuthProvider>
          <Header />
            {/* <AuthContext.Consumer>
              {({ user }) => (
                user && <Navbar />
              )}
            </AuthContext.Consumer> */}
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
                path="/uploadpage"
                element={<PrivateRoute element={<Uploadpage />} />}
              />
              <Route
                path="/signup"
                element={<PrivateRoute element={<SignupPage />} />}
              />
              <Route
                path="/latestaudio"
                element={<PrivateRoute element={<LatestAudio />} />}
              />

              <Route
                path="/meetingcard"
                element={<PrivateRoute element={<MeetingCard />} />}
              />
              <Route
                path="/transcriptpage"
                element={<PrivateRoute element={<Transcriptpage />} />}
              />
              <Route
                path="/summarypage"
                element={<PrivateRoute element={<Summarypage />} />}
              />
              <Route
                path="/mompage"
                element={<PrivateRoute element={<Mompage />} />}
              />
              <Route
                path="/aboutpage"
                element={<AboutPage />} 
              />
            
              <Route path="/profile" element={<PrivateRoute element={<UserDetails />} />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;

