import React from 'react';
import styled from 'styled-components';

// Define the interface for props
interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <StyledWrapper>
      {message && <Message>{message}</Message>} {/* Conditionally render the message */}
      <div className="container">
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
}

const Message = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  margin-top: 200px;
  color: #21C55D; /* Tailwind blue 500 */

`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh; /* Center the loader vertically */
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    height: 96px;
    width: 96px;
    animation: rotate_3922 1.2s linear infinite;
    background-color: #21C55D; /* Tailwind blue 500 */
    background-image: linear-gradient(#21C55D, #6ee7b7, #34d399); /* blue gradient */
  }

  .container span {
    position: absolute;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    background-color: #21C55D;
    background-image: linear-gradient(#21C55D, #ffffff); /* blue gradient */
  }

  .container span:nth-of-type(1) {
    filter: blur(5px);
  }

  .container span:nth-of-type(2) {
    filter: blur(10px);
  }

  .container span:nth-of-type(3) {
    filter: blur(25px);
  }

  .container span:nth-of-type(4) {
    filter: blur(50px);
  }

  .container::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background-color: #fff;
    border: solid 5px #ffffff;
    border-radius: 50%;
  }

  @keyframes rotate_3922 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export default Loader;
