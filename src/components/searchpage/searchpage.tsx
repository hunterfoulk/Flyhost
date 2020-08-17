import React, { useState } from "react";
import "./search.scss";
import Logo from "../../images/FLYHOST3.png";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { IoMdSearch } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";

interface Props {}

const Search: React.FC<Props> = ({}) => {
  const [searchterm, setSearchTerm] = useState<string>("");
  const history = useHistory();

  console.log(searchterm);
  return (
    <>
      <div className="search-main">
        <div className="nav-container">
          <Navbar />
        </div>

        <div className="search-header">
          <div className="logo-container">
            <img src={Logo} />
            <span>FlyHost</span>
          </div>
          <div className="search-container">
            <form
              onSubmit={() => {
                history.push(`/results/${decodeURIComponent(searchterm)}`);
              }}
            >
              <input
                type="text"
                placeholder="Search..."
                onChange={(e: any) => setSearchTerm(e.target.value)}
              />
            </form>
            <button
              onClick={() => {
                history.push(`/results/${decodeURIComponent(searchterm)}`);
              }}
            >
              <IoMdSearch
                style={{
                  position: "relative",
                  fontSize: "18px",
                  top: "3.5px",
                  right: "2px",
                }}
              />
              Search
            </button>
            <div style={{ marginTop: "5px" }} className="links-container">
              <span>sign up</span>
              <span>login</span>
              <span>about</span>
              <span>contact</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
