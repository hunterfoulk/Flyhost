import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./state";

const initialState = {
  auth: {
    isAuthenticated: false,
    token: "",
    user: {},
  },
  components: {
    loginModal: false,
    backdrop: false,
    uploadModal: false,
    navdrop: false,
  },
};
const user = localStorage.getItem("user");
if (user) {
  initialState.auth.isAuthenticated = true;
  initialState.auth.user = JSON.parse(user);
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        auth: action.auth,
      };
    case "logout":
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          user: {},
        },
      };
    case "manage":
      return {
        ...state,
        components: action.components,
      };

    default:
      return state;
  }
};

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
