import React, { useRef, useState } from "react";
import "./uploadmodal.scss";
import useClickOutside from "../../hooks/useClickOutside";
import { MdClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaRegFileArchive } from "react-icons/fa";
import { useStateValue } from "../../state";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";

interface Props {
  closeModal: () => void;
}

const UploadModal: React.FC<Props> = ({ closeModal }) => {
  const ref = useRef<any>();
  useClickOutside(ref, () => closeModal());
  const [{ auth, components }, dispatch] = useStateValue();
  const [fileReader, setFileReader] = useState<any>(false);
  const [newFile, setNewfile] = useState<any>([]);

  const notify = () =>
    toast.success("👍 Files Uploaded.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  ////////////////////////////////////////////////////////////////
  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];

    console.log("name", e.target.files[0].name);

    if (file) {
      console.log("this is the file", e.target.value);
      setFileReader(true);

      setNewfile((prev: any) => [...prev, file]);
    }
  };
  console.log("new files", newFile);

  const handleUpload = (e: any) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      let user_id = auth.user.user_id;
      for (let i = 0; i < newFile.length; i++) {
        formData.append(newFile[i].name, newFile[i]);
      }
      formData.append("user_id", user_id);
      console.log("formData", newFile);
      api.post("/upload", formData);

      setTimeout(() => {
        dispatch({
          type: "manage",
          components: {
            uploadModal: false,
            backdrop: false,
          },
        });

        notify();
      }, 1200);
    } catch {
      console.log("client error");
    }
  };

  return (
    <>
      <div className="upload-modal" ref={ref}>
        <div className="upload-header">
          <span>Select Files To Upload</span>
          <MdClose
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => {
              dispatch({
                type: "manage",
                components: {
                  uploadModal: false,
                  backdrop: false,
                },
              });
            }}
          />
        </div>

        <div className="upload-container">
          {fileReader ? (
            <>
              <div className="selected-main">
                {newFile.map((file: any) => (
                  <div className="selected-container">
                    <div className="icon-container">
                      <FaRegFileArchive style={{ marginRight: "8px" }} />
                    </div>
                    <span className="name-container">{file.name}</span>
                    {file.type === "application/x-zip-compressed" ? (
                      <span className="type-container">.zip</span>
                    ) : (
                      <span className="type-container">{file.type}</span>
                    )}

                    <div className="size-container">
                      <span>{file.size} bytes</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <label htmlFor="upload-input">
                <FiUpload className="upload-icon" />
              </label>

              <input
                id="upload-input"
                type="file"
                style={{ display: "none" }}
                multiple
                onChange={handleFileSelect}
              />
            </>
          )}
        </div>
        <div className="upload-footer">
          <div className="footer-left">
            <label className="file-icon" htmlFor="file-input">
              <AiOutlineFileAdd style={{ marginRight: "5px" }} />
              Add file
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              multiple
              onChange={handleFileSelect}
            />
          </div>
          <div className="footer-right">
            <button
              onClick={() => {
                dispatch({
                  type: "manage",
                  components: {
                    uploadModal: false,
                    backdrop: false,
                  },
                });
              }}
              className="cancel-button"
              type="submit"
            >
              Cancel
            </button>
            <button
              onClick={(e: any) => handleUpload(e)}
              className="upload-button"
              type="submit"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModal;
