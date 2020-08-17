import React, { useEffect } from "react";
import "./current.scss";
import { useStateValue } from "../../state";
import Navbar from "../navbar/navbar";
import { GoCloudDownload } from "react-icons/go";

interface Props {
  handleCurrent: (file_id: any) => void;
}

const Current: React.FC<Props> = ({ handleCurrent }) => {
  const [
    { auth, components, searchresults, currentfile },
    dispatch,
  ] = useStateValue();

  console.log("current file", currentfile);
  const fullPath = window.location.pathname;
  let file_id = window.location.pathname.replace("/current/", "");
  useEffect(() => {
    handleCurrent(file_id);
  }, [fullPath]);
  const date = new Date(currentfile.current.date).toLocaleDateString();

  return (
    <>
      <div className="current-main">
        <div className="nav-container">
          <Navbar />
        </div>
        <div className="current-file-container">
          <div className="current-header">
            <span>{currentfile.current.title}</span>
            <button>
              <GoCloudDownload
                style={{
                  fontSize: "17px",
                  position: "relative",
                  right: "3px",
                  top: "1px",
                  color: "green",
                }}
              />
              Download
            </button>
          </div>
          <div className="current-content-main">
            <div className="current-left">
              <div className="type-container">
                <span>Type: {currentfile.current.type}</span>
              </div>

              <div className="type-container">
                <span>Size: {currentfile.current.size} bytes</span>
              </div>
            </div>
            <div className="current-right">
              <div className="date-container">
                <span>Upload Date: {date}</span>
              </div>
              <div className="date-container">
                <span>Upload By: {currentfile.current.username}</span>
              </div>
              <div className="date-container">
                <span>Downloads: {currentfile.current.stars}</span>
              </div>
              <div className="date-container">
                <span>Comments: 0</span>
              </div>
            </div>
          </div>
          <div className="current-bottom">
            <span className="comments-header">Comments</span>
            <div className="comments-container">
              <span>hi</span>
              <span>hi</span>
              <span>hi</span>
              <span>hi</span>
              <span>hi</span>
              <span>hi</span>
              <span>hi</span>
              <span>hi</span>
              <span>hi</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Current;
