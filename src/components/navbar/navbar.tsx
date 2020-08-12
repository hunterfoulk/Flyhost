import React from "react";
import "./navbar.scss";
import { FaSignInAlt } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import { useStateValue } from "../../state";
import { Link, useHistory } from "react-router-dom";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const [{ auth, components }, dispatch] = useStateValue();
  const history = useHistory();

  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/");
            }}
          >
            FlyHost
          </span>
        </div>
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
              dispatch({
                type: "manage",
                components: {
                  uploadModal: true,
                  backdrop: true,
                },
              });
            }}
          >
            Upload
          </span>
          {auth.isAuthenticated ? (
            <div
              className="username-container"
              onClick={() => {
                history.push("/myfiles");
              }}
            >
              <span className="username">
                Account
                <AiOutlineDown
                  style={{
                    position: "relative",
                    top: "3px",
                    left: "5px",
                    fontSize: "18px",
                  }}
                />
              </span>
            </div>
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
      </div>
    </>
  );
};

export default Navbar;
