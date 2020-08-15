import axios from "axios";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useStateValue } from "../src/state";

///// SIGNUP /////
export const signupUser = async (payload, clearForm) => {
  // const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log("payload", payload);

  const notify = () =>
    toast("👍 Account Created.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  await axios
    .post(
      "http://localhost:9000/.netlify/functions/server/filesharing/signup",
      payload
    )
    .then((res) => {
      console.log("response", res);
      console.log("account created");
      clearForm();
      notify();
    })

    .catch((error) => {
      console.error("error", error);
    });
};

// DELETE FILE //

export const deleteFile = async (file_id) => {
  console.log("file_id", file_id);

  await axios
    .post(
      "http://localhost:9000/.netlify/functions/server/filesharing/deletefile",
      {
        file_id: file_id,
      }
    )
    .then((res) => console.log(res))
    .catch((error) => console.error("delete failed:", error));
};
