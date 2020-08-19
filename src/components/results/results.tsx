import React, { useEffect } from "react";
import "./results.scss";
import { useStateValue } from "../../state";
import Navbar from "../navbar/navbar";
import { AiOutlineFileZip } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import Noresults from "../noresults/noresults";

interface Props {
  handleSearch: (searchterm: string) => void;
}

const Results: React.FC<Props> = ({ handleSearch }) => {
  const history = useHistory();

  const [{ auth, components, searchresults }, dispatch] = useStateValue();

  const fullPath = window.location.pathname;
  let searchterm = window.location.pathname.replace("/results/", "");

  useEffect(() => {
    handleSearch(searchterm);
    console.log("FULL PATHNAME", window.location.pathname);
    console.log("PARSED search term", searchterm);

    return () => {
      dispatch({
        type: "search",
        searchresults: {
          results: [],
        },
      });
      dispatch({
        type: "manage",
        components: {
          ...components,
          isFetching: true,
        },
      });
    };
  }, [fullPath]);

  let results = searchresults.results.length;

  if (!components.isFetching && searchresults.results.length === 0) {
    return <Noresults />;
  }

  return (
    <>
      <div className="results-main">
        <div className="nav-container">
          <Navbar />
        </div>

        <div className="files-container">
          <div className="h1-container">
            <h1>{results} Results Found</h1>
          </div>

          <div className="files-header">
            <div className="header-one">
              <span>Name</span>
            </div>
            <div className="header-two">
              <span>Size</span>
            </div>
            <div className="header-three">
              <span>Downloads</span>
            </div>
            <div className="header-four">
              <span>Date</span>
            </div>
          </div>
          {searchresults.results.map((newFile: any) => {
            const date = new Date(newFile.date).toLocaleDateString();
            let file_id = newFile.file_id;

            return (
              <div
                className="file"
                onClick={() => {
                  history.push(`/current/${file_id}`);
                  console.log(file_id);
                }}
              >
                <div className="header-zero">
                  <div>
                    <AiOutlineFileZip />
                  </div>
                </div>
                <div className="titles-containers">
                  <span>{newFile.title}</span>
                </div>
                <div className="titles-containers">
                  <span>{newFile.size} B</span>
                </div>

                <div className="titles-containers">
                  <span>{newFile.stars}</span>
                </div>

                <div className="titles-containers">
                  <span>{date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Results;
