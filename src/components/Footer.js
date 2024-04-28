import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import Logo from './Logo.js'

const FooterComponent = () => {
  return (
    <div className="row mt-4 mx-3 mb-4 footer-container">
      <div className="col-md-12 h-100 br-15 cus-dark" id="connect">
        <div className="row mt-3 mb-3">
          {/* Empty row */}
        </div>
        <hr className="text-white" />
        <div className="row m-auto d-flex flex-row justify-content-center align-items-center">
          <div className="col-md-2 d-block m-2 p-2 logo">
            <a href="https://lavasa.christuniversity.in/" className="text-decoration-none">
              <Logo/>
            </a>
          </div>
          <div className="col-md-3 m-auto d-block h-50 address ">
            <div className="text-black mt-4 text-footer"> 
              <span className="text-custom">CHRIST (Deemed to be University)</span>
              <p>Pune Lavasa Campus - 'The Hub of Analytics'</p>
              <p>Christ University Road, 30 Valor CourtAt Post: Dasve</p>
              <p>Lavasa,Taluka: MulshiPune 412112, Maharashtra.</p>
            </div>
          </div>
        </div>
        <hr className="text-white" />
        <div className="row">
          <div className="col-md-12 d-flex text-black-50 pb-3 justify-content-around align-items-center"> 
            <div className="float-start">
              © CHRIST Infotech, All Right Reserved.
            </div>
            <div className="text-black mx-2"> 
            <a href="https://www.youtube.com/@ChristUniversityLavasa" target="_blank" rel="noreferrer" className="text-decoration-none">
                <FontAwesomeIcon icon={faYoutube} className="text-black mx-2" />
              </a>
            </div>
            <div className="float-end">
              Developed & Maintained By{" "}
              <a href="http://christinfotech.org/" target="_blank" rel="noreferrer" className="text-decoration-none">
                CHRIST Infotech
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;

