import React, { useRef } from "react";
import "./navbar.scss";
import { useStateValue } from "../../state";
import useClickOutside from "../../hooks/useClickOutside";
interface Props {}

const Hamburger: React.FC<Props> = ({}) => {
  const [{ auth, components }, dispatch] = useStateValue();

  return (
    <>
      <div className="hamburger">
        <span
          className="hamburger-icon"
          onClick={() => {
            dispatch({
              type: "manage",
              components: {
                navdrop: true,
                // backdrop: true,
              },
            });
          }}
        >
          ☰
        </span>
      </div>
    </>
  );
};

export default Hamburger;
