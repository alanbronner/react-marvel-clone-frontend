import React from "react";

const Modal = ({ isActive, setIsActive, children }) => {
  return (
    <div
      className="modal_container"
      style={{
        display: isActive,
      }}
    >
      <div className="modal_body">
        <span className="close" onClick={() => setIsActive("none")}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
