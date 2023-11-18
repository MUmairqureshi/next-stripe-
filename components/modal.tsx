import React, { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;      // Callback function to close the modal
  children: ReactNode;      // Content to be rendered inside the modal
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content px-4 py-10 sm:p-10" onClick={e => e.stopPropagation()}>
        {children}
        <button className="close-modal text-xs" onClick={onClose}>
          Close
        </button>
      </div>

      {/* Add some basic styles */}
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          padding: 16px;
        }

        .modal-content {
          position: relative;
          background: white;
          max-width: 768px;
          max-height: 80%;
          overflow-y: auto;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .close-modal {
          position: absolute;
          right: 16px;
          top: 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.5em;
        }
      `}</style>
    </div>
  );
}

export default Modal;
