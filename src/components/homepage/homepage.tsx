import React from "react";
import "./homepage.scss";
import Header from "./header";
import Features from "./features";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {}

const Homepage: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="home-main">
        <Header />
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
        <Features />
      </div>
    </>
  );
};

export default Homepage;
