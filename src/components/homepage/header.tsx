import React from "react";
import "./header.scss";
import Navbar from "../navbar/navbar";
import Headerimg from "../../images/headersvg6.jpg";
import { FaSignInAlt } from "react-icons/fa";
import { useStateValue } from "../../state";

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const [{ auth, components }, dispatch] = useStateValue();

  return (
    <>
      <div className="header">
        <Navbar />
        <div className="header-content">
          <div className="header-content-left">
            <div className="left-content-container">
              <div className="left-content-header">
                <span>File Sharing Made Quick And Easy</span>
              </div>
              <div className="left-content-text">
                <p>
                  FlyHost is all about making it as easy as possible for anyone
                  around the world to upload, share, and download files they
                  need for everyday life.
                </p>
              </div>
              {auth.isAuthenticated ? null : (
                <div className="login-div">
                  <button
                    onClick={() => {
                      dispatch({
                        type: "manage",
                        components: {
                          loginModal: true,
                          backdrop: true,
                        },
                      });
                    }}
                    className="login-button"
                  >
                    <FaSignInAlt
                      style={{
                        position: "relative",
                        right: "5.5px",
                        top: "2px",
                        fontSize: "18px",
                      }}
                    />
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="header-content-right">
            <div className="right-img-container">
              <img src={Headerimg} />
            </div>
          </div>
        </div>
        <div className="wave-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
            className="waves"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g>
              <use
                className="p1 parallax"
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(250,250,250,0.7)"
              />
              <use
                className="p4 parallax"
                xlinkHref="#gentle-wave"
                x="48"
                y="7"
                fill="rgba(250,250,250,0.9)"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Header;
