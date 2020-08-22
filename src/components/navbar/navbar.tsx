import React from "react";
import "./navbar.scss";
import { FaSignInAlt } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import { useStateValue } from "../../state";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../images/FLYHOST5.png";
import Hamburger from "./hamburger";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const [{ auth, components }, dispatch] = useStateValue();
  const history = useHistory();
  let isMobile = window.innerWidth <= 700;

  const handleLogout = () => {
    localStorage.clear();

    dispatch({
      type: "logout",
    });

    history.push("/");
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          <div className="logo-container">
            <img src={Logo} />
          </div>

          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/");
            }}
          >
            FlyHost
          </span>
        </div>
        {isMobile ? (
          <Hamburger />
        ) : (
          <div className="nav-right">
            <span
              onClick={() => {
                history.push("/");
              }}
            >
              Home
            </span>
            <span
              onClick={() => {
                history.push("/search");
              }}
            >
              Search
            </span>
            {auth.isAuthenticated ? (
              <>
                <div className="username-container">
                  <span
                    className="username"
                    onClick={() => {
                      history.push("/myfiles");
                    }}
                  >
                    Dashboard
                  </span>
                </div>

                <div className="logout">
                  {" "}
                  <span
                    className="username"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </span>
                </div>
              </>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
