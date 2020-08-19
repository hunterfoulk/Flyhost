import React, { useState, useEffect } from "react";
import "./profilemain.scss";
import Navbar from "../navbar/navbar";
import { ToastContainer, toast } from "react-toastify";
import { useStateValue } from "../../state";
import Axios from "axios";
import api from "../../services/api";
import FileSaver from "file-saver";
import _ from "lodash";
import { MdRefresh } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";
import { deleteFile } from "../../actions/index";

interface Props {}

const ProfileMain: React.FC<Props> = ({}) => {
  const [myFiles, setMyFiles] = useState<any>([]);
  const [original, setOriginal] = useState<any>([]);
  const [{ auth, components }, dispatch] = useStateValue();
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [deleteModal, setDeleteModal] = useState(false);

  const filterBox = (str: any) => {
    setMyFiles((prevState: any) =>
      prevState.filter((item: any) => item.type.includes(str))
    );
  };

  const sortBox = () => {
    let newArr = [...myFiles].sort((a: any, b: any) => b.stars - a.stars);
    setMyFiles(newArr);
  };

  const [checkboxes, setCheckboxes] = useState([
    {
      name: "downloads",
      label: "Most Downloaded",
      checked: false,
    },
    {
      name: "gif",
      label: "Gif",
      checked: false,
      filter: () => filterBox("gif"),
    },
    {
      name: "zip",
      label: "Zip",
      checked: false,
      filter: () => filterBox("zip"),
    },
    {
      name: "mp4",
      label: "MP4",
      checked: false,
      filter: () => filterBox("mp4"),
    },
  ]);

  const getMyFiles = async () => {
    let user_id = parseFloat(auth.user.user_id);
    const queryParams = { params: { user_id } };

    await api
      .get("/myfiles", queryParams)
      .then((res) => {
        setMyFiles(res.data);
        setOriginal(res.data);
        console.log(res.data);

        dispatch({
          type: "manage",
          components: {
            isFetching: false,
          },
        });
      })
      .catch((error) => {
        console.error(error, "fetch error.");
      });
  };

  useEffect(() => {
    getMyFiles();

    return () => {
      setMyFiles([]);
      dispatch({
        type: "manage",
        components: {
          isFetching: true,
        },
      });
    };
  }, []);

  const saveFile = async (file: any) => {
    const files = file.title;
    const file_id = file.file_id;
    const queryParams = { params: { files, file_id } };

    await api
      .get("/download", { ...queryParams, responseType: "arraybuffer" })
      .then((res) => {
        var blob = new Blob([res.data], {
          type: file.type,
        });
        FileSaver.saveAs(blob, file.title);
      })
      .catch((error) => {
        console.error(error, "fetch error.");
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("search term", searchTerm);
    let filteredData = myFiles.filter((file: any) =>
      file.title?.toLowerCase().includes(searchTerm)
    );

    await setMyFiles(filteredData);
    setSearchTerm("");
  };

  const refresh = () => {
    getMyFiles();
    setCheckboxes([
      {
        name: "downloads",
        label: "Most Downloaded",
        checked: false,
      },
      {
        name: "gif",
        label: "Gif",
        checked: false,
        filter: () => filterBox("gif"),
      },
      {
        name: "zip",
        label: "Zip",
        checked: false,
        filter: () => filterBox("zip"),
      },
      {
        name: "mp4",
        label: "MP4",
        checked: false,
        filter: () => filterBox("mp4"),
      },
    ]);
  };

  const handleDelete = (file: any) => {
    let file_id = file.file_id;
    deleteFile(file_id);
  };

  const handleBox = (type: any, i: any) => {
    const copy = [...checkboxes];
    copy[i].checked = !copy[i].checked;
    setCheckboxes(copy);
    setMyFiles(original);
  };

  useEffect(() => {
    checkboxes.forEach((box: any) => {
      if (box.checked === true) {
        if (box.name === "downloads") {
          sortBox();
        } else {
          box.filter();
        }
      }
    });
  }, [checkboxes]);

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

        <div className="profile-main-header">
          <Navbar />
        </div>
        <div className="main-content-container">
          <div className="left-main">
            <div className="files-main-header">
              <div className="h1-container">
                <h1>My Files</h1>
              </div>

              <form
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
                onSubmit={(e: any) => handleSubmit(e)}
              >
                <input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    console.log(e.target.value);
                  }}
                  placeholder="Search..."
                  type="text"
                />
              </form>
            </div>
            <div className="refresh-container">
              <button
                onClick={() => {
                  dispatch({
                    type: "manage",
                    components: {
                      uploadModal: true,
                      backdrop: true,
                    },
                  });
                }}
              >
                Upload
              </button>
              <MdRefresh
                onClick={refresh}
                style={{
                  marginRight: "6px",
                  marginLeft: "6px",
                  cursor: "pointer",
                }}
              />
            </div>
            {myFiles.length === 0 && !components.isFetching ? (
              <div className="no-files">
                <h3>You currently have no files uploaded.</h3>
              </div>
            ) : (
              <div className="files-main">
                {myFiles.map((file: any) => {
                  const date = new Date(file.date).toLocaleDateString();

                  return (
                    <div className="file-container">
                      {deleteModal && (
                        <div className="delete-modal">
                          <div className="delete-header">
                            <FaExclamation />
                          </div>
                          <div className="delete-content">
                            <p>Are you sure you want to delete these files?</p>
                          </div>
                          <div className="delete-button-container">
                            <button
                              className="cancel-button"
                              onClick={() => setDeleteModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="delete-button"
                              onClick={async () => {
                                await handleDelete(file);
                                setDeleteModal(false);
                                refresh();
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="title-container">
                        <span
                          style={{
                            // backgroundColor: "#6772e5",
                            borderBottom: " 1px solid rgb(201, 221, 245)",
                            borderRight: " 1px solid rgb(201, 221, 245)",
                            borderLeft: " 1px solid rgb(201, 221, 245)",
                            width: "100%",
                            textAlign: "center",
                            // color: "white",
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
                            borderBottom: " 1px solid rgb(201, 221, 245)",
                            borderRight: " 1px solid rgb(201, 221, 245)",
                            width: "100%",
                            textAlign: "center",
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
                            borderBottom: " 1px solid rgb(201, 221, 245)",
                            borderRight: " 1px solid rgb(201, 221, 245)",
                            width: "100%",
                            textAlign: "center",

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
                            borderBottom: " 1px solid rgb(201, 221, 245)",
                            borderRight: " 1px solid rgb(201, 221, 245)",

                            width: "100%",
                            textAlign: "center",

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
                            borderBottom: " 1px solid rgb(201, 221, 245)",
                            borderRight: " 1px solid rgb(201, 221, 245)",

                            width: "100%",
                            textAlign: "center",

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
                            borderBottom: " 1px solid rgb(201, 221, 245)",
                            borderRight: " 1px solid rgb(201, 221, 245)",
                            width: "100%",
                            textAlign: "center",

                            padding: "5px 0px",
                          }}
                        >
                          Actions
                        </span>
                        <div>
                          <a
                            className="download-button"
                            onClick={() => saveFile(file)}
                          >
                            Download
                          </a>

                          <button
                            // onClick={() => setDeleteModal(true)}
                            onClick={() => handleDelete(file)}
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="right-main">
            <div className="right-header">
              <h3>Filter by</h3>
            </div>
            <div className="filters-container">
              {checkboxes.map((box: any, i) => (
                <>
                  <div className="checkbox-containers">
                    <input
                      type="checkbox"
                      onChange={(e: any) => handleBox(box.name, i)}
                      style={{ marginRight: "10px" }}
                      checked={box.checked}
                    />
                    <label>{box.label}</label>
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

export default ProfileMain;
