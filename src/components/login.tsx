import React from "react";
import useInput from "../hooks/useInput";
import useLogin from "../hooks/useLogin";

interface Props {}

const Login: React.FC<Props> = ({}) => {
  const username = useInput("");
  const password = useInput("");
  const loginUser = useLogin();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      username: username.value,
      password: password.value,
    };

    const clearForm = () => {
      username.setValue("");
      password.setValue("");
    };

    loginUser(payload, clearForm);
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
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
