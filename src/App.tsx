import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useInput from "./hooks/useInput";
import { signupUser } from "./actions/index";
import Homepage from "./components/homepage/homepage";
import Backdrop from "./components/backdrop/backdrop";
import ProfileMain from "./components/profile/profilemain";
import Search from "./components/searchpage/searchpage";
import Results from "./components/results/results";
import Current from "./components/current/current";
import UploadModal from "./components/uploadmodal/uploadmodal";
import api from "./services/api";
import ModalTransition from "./hooks/transition";
import { useStateValue } from "../src/state";
import AuthModal from "./components/authmodal/authmodal";
import Footer from "./components/footer/footer";
import axios from "axios";

interface Props {}

const App: React.FC<Props> = ({}) => {
  const [users, setUsers] = useState([]);
  const [{ auth, components, searchresults }, dispatch] = useStateValue();

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

  const handleSearch = async (searchterm: string) => {
    const queryParams = { params: { searchterm } };
    console.log("searchterm", queryParams);

    await axios
      .get(
        `http://localhost:9000/.netlify/functions/server/filesharing/results/${searchterm}`,
        queryParams
      )
      .then((res) => {
        console.log("search response", res.data);

        dispatch({
          type: "search",
          searchresults: {
            results: res.data,
          },
        });

        dispatch({
          type: "manage",
          components: {
            ...components,
            isFetching: false,
          },
        });
      })
      .catch((error) => {
        console.log(error, "search term error");
      });
  };

  const handleCurrent = async (file_id: any) => {
    console.log("file_id ", file_id);

    const queryParams = { params: { file_id } };

    await axios
      .get(
        `http://localhost:9000/.netlify/functions/server/filesharing/current/${file_id}`,
        queryParams
      )
      .then((res) => {
        console.log("response", res.data.results);
        console.log("username", res.data.user);
        console.log("comments", res.data.newresults);

        dispatch({
          type: "current",
          currentfile: {
            current: res.data.results,
            username: res.data.user,
            comments: res.data.newresults,
          },
        });

        dispatch({
          type: "manage",
          components: {
            ...components,
            isFetching: false,
          },
        });
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const fetchComments = async (file_id: any) => {
    console.log("file_id ", file_id);

    const queryParams = { params: { file_id } };

    await axios
      .get(
        `http://localhost:9000/.netlify/functions/server/filesharing/fetchcomments`,
        queryParams
      )
      .then((res) => {
        console.log("response", res.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <>
      <Router>
        {components.backdrop && <Backdrop closeModal={closeModal} />}

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
        <Route
          exact
          path="/search"
          render={() => (
            <>
              <Search />
            </>
          )}
        ></Route>

        <Route
          exact
          path="/results/:searchterm"
          render={() => (
            <>
              <Results handleSearch={handleSearch} />
            </>
          )}
        ></Route>

        <Route
          exact
          path="/current/:file_id"
          render={() => (
            <>
              <Current
                handleCurrent={handleCurrent}
                fetchComments={fetchComments}
              />
            </>
          )}
        ></Route>

        <Footer />
      </Router>
    </>
  );
};

export default App;
