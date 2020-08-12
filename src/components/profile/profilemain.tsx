import React, { useState, useEffect } from "react";
import "./profilemain.scss";
import Navbar from "../navbar/navbar";
import { ToastContainer, toast } from "react-toastify";
import { useStateValue } from "../../state";
import Axios from "axios";
import api from "../../services/api";
import { saveAs } from "file-saver";
import FileSaver from "file-saver";
import _ from "lodash";

// FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })

interface Props {}

const ProfileMain: React.FC<Props> = ({}) => {
  const [myfiles, setMyFiles] = useState([]);
  const [{ auth, components }, dispatch] = useStateValue();

  const getMyFiles = async () => {
    let user_id = parseFloat(auth.user.user_id);
    const queryParams = { params: { user_id } };

    await api
      .get("/myfiles", queryParams)
      .then((res) => {
        setMyFiles(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error, "fetch error.");
      });
  };

  useEffect(() => {
    getMyFiles();
  }, []);

  const saveFile = async (file: any) => {
    const files = file.title;
    const queryParams = { params: { files } };

    await api
      .get("/download", { ...queryParams, responseType: "arraybuffer" })
      .then((res) => {
        // console.log("response data", res.data);
        console.log("response dataaa", res);

        console.log(files);
        var blob = new Blob([res.data], {
          type: file.type,
        });
        FileSaver.saveAs(blob, file.title);
      })
      .catch((error) => {
        console.error(error, "fetch error.");
      });

    // console.log("fired");
    // console.log(file.file);
  };

  return (
    <>
      <div className="profile-main">
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <ToastContainer />
        <div className="profile-main-header">
          <Navbar />
        </div>
        <div className="main-content-container">
          <div className="left-main">
            <div className="files-main-header">
              <div className="h1-container">
                <h1>My Files</h1>
              </div>
              <input placeholder="Search..." type="text" />
            </div>
            <div className="files-main">
              {myfiles.map((file: any) => {
                const date = new Date(file.date).toLocaleDateString();
                console.log(file.file);

                return (
                  <div className="file-container">
                    <div className="title-container">
                      <span
                        style={{
                          backgroundColor: "#6772e5",
                          width: "100%",
                          textAlign: "center",
                          color: "white",
                          padding: "5px 0px",
                        }}
                      >
                        File Name
                      </span>
                      <span>{file.title}</span>
                    </div>
                    <div className="type-container">
                      <span
                        style={{
                          backgroundColor: "#6772e5",
                          width: "100%",
                          textAlign: "center",
                          color: "white",
                          padding: "5px 0px",
                        }}
                      >
                        File Type
                      </span>
                      <span style={{ padding: "5px 0px" }}>{file.type}</span>
                    </div>
                    <div className="size-container">
                      <span
                        style={{
                          backgroundColor: "#6772e5",
                          width: "100%",
                          textAlign: "center",
                          color: "white",
                          padding: "5px 0px",
                        }}
                      >
                        File Size
                      </span>
                      <span>{file.size} Bytes</span>
                    </div>
                    <div className="date-container">
                      <span
                        style={{
                          backgroundColor: "#6772e5",
                          width: "100%",
                          textAlign: "center",
                          color: "white",
                          padding: "5px 0px",
                        }}
                      >
                        Date Uploaded
                      </span>
                      <span>{date}</span>
                    </div>
                    <div className="stars-container">
                      <span
                        style={{
                          backgroundColor: "#6772e5",
                          width: "100%",
                          textAlign: "center",
                          color: "white",
                          padding: "5px 0px",
                        }}
                      >
                        File Downloads
                      </span>
                      <span>{file.stars}</span>
                    </div>
                    <div className="delete-container">
                      <span
                        style={{
                          backgroundColor: "#6772e5",
                          width: "100%",
                          textAlign: "center",
                          color: "white",
                          padding: "5px 0px",
                        }}
                      >
                        Actions
                      </span>
                      <div>
                        <a
                          className="download-button"
                          // href=""
                          // download="https://airbnbbucket.s3.us-east-2.amazonaws.com/filesharing/626.gif"
                          // target="_blank"
                          // download={file.title}
                          onClick={() => saveFile(file)}
                        >
                          Download
                        </a>

                        <button className="delete-button">Delete</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right-main"></div>
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
