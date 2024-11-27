import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex size-full items-center justify-center bg-black bg-opacity-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-lg bg-white p-5"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
