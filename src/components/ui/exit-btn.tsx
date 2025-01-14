import React from 'react';
import styled from 'styled-components';

interface ExitButtonProps {
  onClick?: () => void; // Định nghĩa prop onClick, có thể là hàm
}

const ExitButton: React.FC<ExitButtonProps> = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="button" onClick={onClick}>
        <span className="text">Exit</span>
        <svg className="arrow" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    width: 120px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    cursor: pointer;
    border: 3px solid #ef4444; /* red-500 */
    background-color: #ef4444; /* red-500 */
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.137);
  }

  .text {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(27, 27, 27);
    color: white;
  }

  .arrow path {
    fill: rgb(19, 19, 19);
  }

  .button:hover .arrow {
    animation: slide-in-left 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @keyframes slide-in-left {
    0% {
      transform: translateX(-8px);
      opacity: 0;
    }

    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  .button:active {
    transform: scale(0.97);
  }
`;

export default ExitButton;
