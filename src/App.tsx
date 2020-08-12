import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useInput from "./hooks/useInput";
import { signupUser } from "./actions/index";
import Signup from "./components/signup";
import Login from "./components/login";
import Homepage from "./components/homepage/homepage";
import Backdrop from "./components/backdrop/backdrop";
import ProfileMain from "./components/profile/profilemain";
import UploadModal from "./components/uploadmodal/uploadmodal";
import api from "./services/api";
import ModalTransition from "./hooks/transition";
import { useStateValue } from "../src/state";
import AuthModal from "./components/authmodal/authmodal";

interface Props {}

const App: React.FC<Props> = ({}) => {
  const [users, setUsers] = useState([]);
  const [{ auth, components }, dispatch] = useStateValue();

  const closeModal = () => {
    dispatch({
      type: "manage",
      components: {
        loginModal: false,
        backdrop: false,
      },
    });
  };

  console.log("users", users);
  return (
    <>
      <Router>
        {components.backdrop && <Backdrop closeModal={closeModal} />}

        <div className="App">
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Homepage />
              </>
            )}
          ></Route>

          <Route
            exact
            path="/myfiles"
            render={() => (
              <>
                <ProfileMain />
              </>
            )}
          ></Route>
        </div>
      </Router>
    </>
  );
};

export default App;
