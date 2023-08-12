import React, { useState } from "react";

const ModalContext = React.createContext({
  isOpen: { signUp: false },
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState({ signUp: false });

  const modalHandler = {
    openModal: (name) => setIsOpen((prev) => ({ ...prev, [name]: true })),
    closeModal: (name) => setIsOpen((prev) => ({ ...prev, [name]: false })),
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        ...modalHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => React.useContext(ModalContext);
