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

// UPLOAD FILE //

export const handleFileUpload = async (newFile, newDate) => {
  let formData = new FormData();

  formData.append("newFile", newFile);
  console.log("formData", formData);
  console.log("formData", newFile);
};
