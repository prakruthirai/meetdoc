import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import Logo from './Logo.js'
// import About from '../pages/About.js';
// import Services from "../pages/Services.js";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const FooterComponent = () => {
  return (
    <div className="container-fluid">
      <div className="row mt-4  mb-4 footer-container">
      <div className="col-md-12 h-100 br-12 cus-dark" id="connect">
        <div className="row mt-3 mb-3 text-center">
          <ul className="footer-links d-inline-block"> {/* Added d-inline-block */}
            <li>
              <a href="/aboutpage" className="text-decoration-none">About</a>
            </li>
            <li>
              <a href="/services" className="text-decoration-none">Services</a>
            </li>
          </ul>
          {/* Empty row */}
        </div>

        <hr className="text-white" />
        <div className="row m-auto d-flex flex-row justify-content-center align-items-center">
          <div className="col-md-2 d-block ">
            <a href="https://lavasa.christuniversity.in/" className="text-decoration-none">
              <Logo />
            </a>
          </div>
          <div className="col-md-5">
            {/* Empty column to push the address to the right */}
          </div>
          <div className="col-md-3 m-auto d-block h-50 address ">
            <div className="mt-4 text-footer ">
              <span className="text-custom">CHRIST (Deemed to be University)</span>
              <p style={{ fontFamily: 'Roboto', fontSize: '14px' }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Pune Lavasa Campus - 'The Hub of Analytics'Christ University Road, 30 Valor Court
                At Post: Dasve Lavasa,Taluka: Mulshi
                Pune 412112, Maharashtra.
              </p>
            </div>
          </div>
        </div>
        <hr className="text-white" />
        <div className="row">
          <div className="col-md-12 d-flex text-black-50 pb-3 justify-content-around align-items-center">

            <div className="float-start">
              © CHRIST Infotech, All Right Reserved.
            </div>
            <div className="text-black ">
              <a href="https://www.youtube.com/@ChristUniversityLavasa" target="_blank" rel="noreferrer" className="text-decoration-none">
                <FontAwesomeIcon icon={faYoutube} className="text-white mx-2" />
              </a>
            </div>
            <div className="float-end">
              Developed & Maintained By {"  "}
              <a href="http://christinfotech.org/" target="_blank" rel="noreferrer" className="text-decoration-none">
                CHRIST Infotech
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FooterComponent;

