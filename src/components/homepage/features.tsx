import React from "react";
import "./features.scss";
import Loginsvg from "../../images/signupfeature.jpg";
import uploadfeature from "../../images/featureupload.jpg";
import downloadfeature from "../../images/downloadfeature.jpg";
import movieresults from "../../images/movieresults.jpg";

interface Props {}

const Features: React.FC<Props> = ({}) => {
  let isMobile = window.innerWidth <= 700;

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
        {isMobile ? (
          <div className="uploading-main">
            <div className="uploading-right">
              <div className="uploading-text-container">
                <h2>Upload Desired Files</h2>
                <p>Share your desired files with the world.</p>
              </div>
            </div>
            <div className="uploading-left">
              <div className="uploading-img-container">
                <img src={uploadfeature} />
              </div>
            </div>
          </div>
        ) : (
          <div className="uploading-main">
            <div className="uploading-left">
              <div className="uploading-img-container">
                <img src={uploadfeature} />
              </div>
            </div>
            <div className="uploading-right">
              <div className="uploading-text-container">
                <h2>Upload Desired Files</h2>
                <p>Share your desired files with the world.</p>
              </div>
            </div>
          </div>
        )}

        <div className="download-main">
          <div className="download-left">
            <div className="download-text-container">
              <h2>Search for accessible downloads</h2>
              <p>Download files and free software quick and easy</p>
            </div>
          </div>
          <div className="download-right">
            <div className="download-img-container">
              <img src={isMobile ? movieresults : downloadfeature} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
