import React, { useEffect, useState } from "react";
import "./current.scss";
import { useStateValue } from "../../state";
import Navbar from "../navbar/navbar";
import { GoCloudDownload } from "react-icons/go";
import FileSaver from "file-saver";
import _ from "lodash";
import api from "../../services/api";
import axios from "axios";

interface Props {
  handleCurrent: (file_id: any) => void;
  fetchComments: (file_id: any) => void;
}

const Current: React.FC<Props> = ({ handleCurrent, fetchComments }) => {
  const [
    { auth, components, searchresults, currentfile },
    dispatch,
  ] = useStateValue();

  const [newComment, makeNewComment] = useState("");

  console.log("current file", currentfile);

  const fullPath = window.location.pathname;
  let file_id = window.location.pathname.replace("/current/", "");

  console.log("FILE ID", file_id);
  useEffect(() => {
    handleCurrent(file_id);
    fetchComments(file_id);

    return () => {
      clearResults();
    };
  }, [fullPath]);

  const clearResults = () => {
    dispatch({
      type: "current",
      currentfile: {
        current: {},
        username: "",
        comments: [],
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

  const date = new Date(currentfile.current.date).toLocaleDateString();
  const saveFile = async () => {
    const files = currentfile.current.title;
    const file_id = currentfile.current.file_id;
    const queryParams = { params: { files, file_id } };
    console.log("file title", files);
    console.log("file id", file_id);

    await api
      .get("/download", { ...queryParams, responseType: "arraybuffer" })
      .then((res) => {
        console.log(res.data);
        var blob = new Blob([res.data], {
          type: currentfile.current.type,
        });
        FileSaver.saveAs(blob, currentfile.current.title);
      })
      .catch((error) => {
        console.error(error, "fetch error.");
      });
  };

  const handleComment = async () => {
    console.log("file id", currentfile.current.file_id);
    console.log("user id", auth.user.user_id);

    const payload = {
      user_id: auth.user.user_id,
      file_id: currentfile.current.file_id,
      comment: newComment,
    };

    await axios
      .post(
        "http://localhost:9000/.netlify/functions/server/filesharing/postcomment",
        payload
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error, "post comment error");
      });
  };

  const commentslength = currentfile.comments.length;

  return (
    <>
      <div className="current-main">
        <div className="nav-container">
          <Navbar />
        </div>
        <div className="current-file-container">
          <div className="current-header">
            <span>{currentfile.current.title}</span>
            <button onClick={() => saveFile()}>
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
                <span>Upload By: {currentfile.username.username}</span>
              </div>
              <div className="date-container">
                <span>Downloads: {currentfile.current.stars}</span>
              </div>
              <div className="date-container">
                <span>Comments: {commentslength}</span>
              </div>
            </div>
          </div>
          <div className="current-bottom">
            <span className="comments-header">Comments</span>
            {auth.isAuthenticated ? (
              <>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Leave comment..."
                    value={newComment}
                    onChange={(e: any) => makeNewComment(e.target.value)}
                  />
                  <button onClick={() => handleComment()}>Post Comment</button>
                </div>
              </>
            ) : (
              <div style={{ marginBottom: "5px" }}>
                <span style={{ fontSize: "14px", marginLeft: "20px" }}>
                  <span
                    onClick={() => {
                      dispatch({
                        type: "manage",
                        components: {
                          loginModal: true,
                          backdrop: true,
                        },
                      });
                    }}
                    style={{
                      color: "#516bff",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    sign in
                  </span>{" "}
                  to leave a comment
                </span>
              </div>
            )}

            <div className="comments-container">
              {currentfile.comments.map((comment: any) => (
                <>
                  <div className="comment">
                    <span className="comment-username">{comment.username}</span>
                    <div className="comment-text">
                      <span>{comment.comment}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Current;
