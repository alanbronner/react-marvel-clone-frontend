import React from "react";
import Logo from "../LeReacteurLogo.svg";
const Footer = () => {
  return (
    <div className="footer_wrapper">
      <div className="footer_body">
        <div className="footer_content">
          <h5>v1.00 – © Le Reacteur</h5>
          <div>
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
