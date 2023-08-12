import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/components/_modal.scss";

function Modal({ isVisible, children, onClose, hideCloseBtn }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = isVisible ? (
    <div
      onClick={handleClose}
      className={`modal-overlay ${isVisible ? "open" : ""}`}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {hideCloseBtn || (
          <button className="close-button" onClick={handleClose}>
            X
          </button>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

export default Modal;
