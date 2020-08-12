import React, { useRef } from "react";
import "./backdrop.scss";
import { useStateValue } from "../../state";
import ModalTransition from "../../hooks/transition";
import UploadModalTransition from "../../hooks/uploadTrans";
import AuthModal from "../authmodal/authmodal";
import UploadModal from "../uploadmodal/uploadmodal";
import Bodyscroll from "../../hooks/bodyscroll";
import useClickOutside from "../../hooks/useClickOutside";

interface Props {
  closeModal: () => void;
}

const Backdrop: React.FC<Props> = ({ closeModal }) => {
  const [{ auth, components }, dispatch] = useStateValue();
  Bodyscroll();

  const ref = useRef<any>();
  useClickOutside(ref, () => closeModal());
  return (
    <>
      <div className="backdrop">
        <ModalTransition loginModal={components.loginModal}>
          {components.loginModal && <AuthModal closeModal={closeModal} />}
        </ModalTransition>
        <UploadModalTransition uploadModal={components.uploadModal}>
          {components.uploadModal && <UploadModal closeModal={closeModal} />}
        </UploadModalTransition>
      </div>
    </>
  );
};

export default Backdrop;
