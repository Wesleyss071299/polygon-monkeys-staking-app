import styled from 'styled-components';

export const Popup = styled.div`
  position: absolute;
  top: 0;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  opacity: 0;
  z-index: 2;
  transition: opacity 0.3s ease;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h6 {
    color: ${({ theme }) => theme.colors.gray[1]};
    font-size: 1.6rem;
    font-family: sans-serif;
  }

  span {
    color: #000;
    font-size: 1.4rem;
    align-self: flex-start !important;
  }
`;

export const IconContainerWrapper = styled.div`
  width: 20px;
  align-self: flex-end;
  background-color: red;

  &:hover ${Popup} {
    opacity: 1;
  }
`;
