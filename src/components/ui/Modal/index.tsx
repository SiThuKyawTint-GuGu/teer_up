import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" onClick={onClose}>
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle z-[99999] sm:h-screen" aria-hidden="true">
        &#8203;
      </span>
      <div className="inline-block align-bottom text-left overflow-visible shadow-xl transform transition-all sm:my-8 sm:align-top">
        {children}
      </div>
    </div>
  );
};

export default Modal;
