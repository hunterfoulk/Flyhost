import axios from "axios";

let token;
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  token = user.token;
}
const BACKEND_URL =
  "http://localhost:9000/.netlify/functions/server/filesharing/";
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});

export default api;
