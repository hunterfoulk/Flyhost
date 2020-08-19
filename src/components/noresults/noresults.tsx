import React from "react";
import "./noresults.scss";
import None from "./noresultspic.svg";
import Navbar from "../navbar/navbar";

interface Props {}

const Noresults: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="none-main">
        <div className="nav-container">
          <Navbar />
        </div>
        <img src={None} />

        <div className="span-container">
          <span>No Results Found</span>
        </div>
      </div>
    </>
  );
};

export default Noresults;
