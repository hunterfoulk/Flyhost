import React from "react";
import "./features.scss";
import Loginsvg from "../../images/untitled.png";
interface Props {}

const Features: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="features-main">
        <div className="features-header">
          <h1>Features</h1>
        </div>
        <div className="getting-started-main">
          <div className="getting-started-left">
            <div className="getting-started-text-container">
              <h2>Getting Started</h2>
              <p>Create an account and sign in to upload a file</p>
            </div>
          </div>
          <div className="getting-started-right">
            <div className="getting-started-img-container">
              {" "}
              <img src={Loginsvg} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
