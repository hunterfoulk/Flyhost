import React, { useState, useRef } from "react";
import "./authmodal.scss";
import Bodyscroll from "../../hooks/bodyscroll";
import useClickOutside from "../../hooks/useClickOutside";
import useInput from "../../hooks/useInput";
import useLogin from "../../hooks/useLogin";
import { signupUser } from "../../actions/index";

interface Props {
  closeModal: () => void;
}

const AuthModal: React.FC<Props> = ({ closeModal }) => {
  const [tab, setTab] = useState("LOGIN");
  const email = useInput("");
  const username = useInput("");
  const password = useInput("");
  const loginUser = useLogin();

  const handleSubmitLogin = async (e: any) => {
    e.preventDefault();

    const payload = {
      email: email.value,
      password: password.value,
    };

    const clearForm = () => {
      email.setValue("");
      password.setValue("");
    };

    loginUser(payload, clearForm);
  };

  const handleSubmitSignup = async (e: any) => {
    e.preventDefault();

    const payload = {
      email: email.value,
      username: username.value,
      password: password.value,
    };

    const clearForm = () => {
      username.setValue("");
      password.setValue("");
      email.setValue("");
    };

    signupUser(payload, clearForm);
  };

  const activeTabStyle = {
    backgroundColor: "white",
  };
  const ref = useRef<any>();
  useClickOutside(ref, () => closeModal());

  return (
    <>
      <div className="modal-container" ref={ref}>
        <div className="modal-header">
          <div
            style={tab === "LOGIN" ? activeTabStyle : {}}
            onClick={() => setTab("LOGIN")}
            className="login-tab"
          >
            <span>Login</span>
          </div>
          <div
            style={tab === "SIGNUP" ? activeTabStyle : {}}
            onClick={() => setTab("SIGNUP")}
            className="signup-tab"
          >
            <span>Signup</span>
          </div>
        </div>
        {tab === "SIGNUP" && (
          <form
            className="form-container"
            onSubmit={(e: any) => handleSubmitSignup(e)}
          >
            <input
              placeholder="Email..."
              value={email.value}
              onChange={email.onChange}
            />
            <input
              placeholder="Account name..."
              value={username.value}
              onChange={username.onChange}
            />
            <input
              placeholder="Password..."
              type="password"
              value={password.value}
              onChange={password.onChange}
            />
            <button type="submit">Signup</button>
          </form>
        )}
        {tab === "LOGIN" && (
          <form
            className="form-container"
            onSubmit={(e: any) => handleSubmitLogin(e)}
          >
            <input
              placeholder="Email..."
              value={email.value}
              onChange={email.onChange}
            />
            <input
              placeholder="Password..."
              type="password"
              value={password.value}
              onChange={password.onChange}
            />
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </>
  );
};

export default AuthModal;
