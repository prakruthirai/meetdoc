import React from "react";
import Applogo from "./Applogo"; // Import the Logo component
import "./Header.css";

const Header = () => {
  return (
    <header className="header" >
      <div className="container-fluid">
      <div className="logo-container">
        <div className="col-md-3 d-block m-0.5 p-0.5 applogo">          
            <Applogo />
        </div>
        <div className ="logo-name">
        {/* <h1 className="app-name"></h1> */}
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;