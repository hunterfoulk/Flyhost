import React from "react";
import useInput from "../hooks/useInput";
import { signupUser } from "../actions/index";

interface Props {}

const Signup: React.FC<Props> = ({}) => {
  const username = useInput("");
  const password = useInput("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload = {
      username: username.value,
      password: password.value,
    };

    const clearForm = () => {
      username.setValue("");
      password.setValue("");
    };

    signupUser(payload, clearForm);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="username"
          value={username.value}
          onChange={username.onChange}
        />
        <input
          type="text"
          placeholder="password"
          value={password.value}
          onChange={password.onChange}
        />
        <button onClick={(e: any) => handleSubmit(e)} type="submit">
          Signup
        </button>
      </div>
    </>
  );
};

export default Signup;
