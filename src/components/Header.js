import React from "react";
import Applogo from "./Applogo"; // Import the Logo component
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="col-md-2 d-block m-2 p-2 applogo">          
            <Applogo />
        </div>
        <div className ="logo-name">
        {/* <h1 className="app-name"></h1> */}
        </div>
      </div>
    </header>
  );
};

export default Header;