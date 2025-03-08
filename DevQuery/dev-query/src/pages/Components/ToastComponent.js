// ToastComponent.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

// Styled Close Button Component
const CloseButton = ({ closeToast }) => (
  <button
    className="custom-close-button"
    onClick={closeToast}
  >
    ×
  </button>
);

// Styled ToastContainer
const StyledToastContainer = styled(ToastContainer)`
  .glass-toast {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #fff;
    font-family: Arial, sans-serif;
    padding: 20px;
    min-height: 60px;
    font-size:14px;
  }

  .Toastify__toast--success {
    background: rgba(0, 243, 57, 0.3);
  }

  .Toastify__toast--error {
    background: rgba(215, 48, 65, 0.38);
  }

  .Toastify__toast--warning {
    background: rgba(227, 186, 23, 0.7);
  }

  .custom-close-button {
    position: absolute;
    right: 5px;
    top: 30%;
    transform: translateY(-50%);
    background: none;
    border: none;
    scale: 1.3;
    cursor: pointer;
    padding: 10px;
    width: max-content;
    height: max-content;
    color: rgb(0, 238, 255);
    &:hover {
      background-color: transparent;
      cursor: pointer;
      border:none;
         box-shadow: none;
    }
  }
`;

const ToastComponent = () => {
  return (
    <StyledToastContainer
      toastClassName="glass-toast"
      closeButton={CloseButton} // Pass the CloseButton component
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
    />
  );
};

export default ToastComponent;