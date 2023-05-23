import styled, { css } from 'styled-components';

export const Button = styled.button<{ isLoading?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  max-width: 156px;
  padding: 10px;
  border-radius: 12px;
  text-transform: uppercase;
  border: none;
  color: #000;
  font-family: 'Bebas Neue', cursive !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  line-height: 1.2 !important;
  font-size: 1.2rem;
  background: #edd4fe;
  position: relative;
  z-index: 2;
  cursor: pointer;

  transition: all 0.2s ease;

  :hover {
    filter: brightness(0.8);
  }

  &:disabled {
    display: none;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      background-color: ${({ theme }) => theme.colors.gray[10]};
      cursor: pointer;
      pointer-events: none;
      color: ${({ theme }) => theme.colors.gray[6]};
    `}
`;
