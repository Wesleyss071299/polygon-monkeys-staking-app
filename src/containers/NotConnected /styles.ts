import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  img {
    z-index: 1;
  }

  div {
    z-index: 1;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/background.png');
    background-size: cover;
    background-position: center;
    filter: blur(5px); /* Adjust the blur radius as needed */
    z-index: 0;
    border: none;
    transform: scale(1.1);
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 30px;
  z-index: 1;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(237, 212, 254, 0.6);
  border-radius: 12px;
  padding: 20px;
  z-index: 1;
  span {
    color: #000;
    font-size: 25px;
  }

  h1 {
    color: #37255f;
    font-size: 78px;
  }
`;
