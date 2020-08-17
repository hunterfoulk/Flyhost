import React from "react";
import "./footer.scss";
import Logo from "../../images/FLYHOST4.png";
import { FiMail } from "react-icons/fi";

interface Props {}

const Footer: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-left">
          <div className="contact-header-container">
            {" "}
            <span>Contact</span>
          </div>

          <div>
            <div>
              <FiMail style={{ position: "relative", top: "3px" }} />{" "}
              Hunterfoulkdev@gmail.com
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="logo-container">
            <img src={Logo} />
          </div>
        </div>
        <div className="footer-right">
          <span>© 2020 FlyHost | All rights reserved.</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
