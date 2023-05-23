import styled from 'styled-components';

export const GradientContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  mix-blend-mode: overlay;
  z-index: 1;

  img {
    position: fixed;
    -webkit-filter: blur(80px);
    filter: blur(80px);
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px;
  margin-bottom: 48px;
  position: relative;

  .collection-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    h1 {
      font-size: 3.2rem;
    }
  }

  label {
    width: 60px;
    height: 30px;
    position: relative;
    display: block;
    background: #ebebeb;
    border-radius: 200px;
    transition: 0.3s;
    border: 1px solid #ffff;
    box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4),
      inset 0px -5px 15px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    ::after {
      content: '';
      width: 18px;
      height: 18px;
      position: absolute;
      top: 3px;
      left: 3px;
      background: linear-gradient(180deg, #ffcc89, #d8860b);
      border-radius: 18px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    }
  }
  .right {
    display: flex;
    align-items: center;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  input:checked + label {
    background: #242424;
  }

  input:checked + label::after {
    left: 49px;
    transform: translate(-100%);
    background: linear-gradient(180deg, #777, #3a3a3a);
  }

  label:active::after {
    width: 26px;
  }

  .wallet-adapter-button {
    font-family: 'Bebas Neue', cursive !important;
    font-weight: 700 !important;
    letter-spacing: 1px !important;
    line-height: 1.2 !important;
    color: #000;
    background: #edd4fe;
    border-radius: 12px;
    font-weight: bold;
    position: relative;
    z-index: 2;
    margin-left: 30px;

    i {
      display: none !important;
    }

    transition: all 0.5s ease;

    :hover {
      filter: brightness(0.8);
    }
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;

    .collection-info {
      flex-direction: column;

      h1 {
        font-size: 2.2rem;
      }
    }
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  max-width: 1050px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 28px;
`;

export const StakingInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  gap: 16px;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 16px;
  }

  @media ${({ theme }) => theme.breakpoints.wide} {
    justify-content: space-around;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    > div {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  background: #edd4fe;
  border-radius: 20px;
  width: 100%;
  max-width: 300px;
  padding: 24px 32px;
  color: #000 !important;

  h6 {
    font-size: 1.4rem;
    color: #000;
  }

  strong {
    display: block;
    font-size: 2.8rem;
    margin-bottom: auto;
  }

  span {
    display: block;
    color: #000;
    font-size: 1.2rem;
  }

  > div {
    display: flex;
    gap: 4px;
    flex-direction: column;

    span {
      align-self: flex-end;
    }

    progress {
      width: 100%;
      height: 10px;
      border-radius: 20px;

      ::-webkit-progress-value {
        border-radius: 20px;
        background: ${({ theme }) => theme.colors.progressBar};
      }

      ::-webkit-progress-bar {
        background: ${({ theme }) => theme.colors.progressBarBg};
        border-radius: 20px;
      }
    }
  }

  button {
    max-width: 100%;
    margin-top: 8px;
  }
`;

export const Popup = styled.div`
  position: absolute;
  flex-direction: column;
  /* top: 10px; */
  display: flex;
  visibility: hidden;

  right: 30px;
  background-color: #edd4fe;
  width: 300px;
  border-radius: 12px;
  padding: 10px;
  opacity: 0;
  z-index: 3;
  color: #000;
  transition: opacity 0.3s ease;
  span {
    margin-top: 4px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.divider};
  border-radius: 2px;
  width: 100%;

  .staking-actions {
    align-items: center;
    margin-left: auto;
    display: flex;
    gap: 12px;

    svg {
      cursor: pointer;
      :hover + div {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

export const Button = styled.button<{ isActive?: boolean }>`
  font-family: 'Bebas Neue', cursive !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  line-height: 1.2 !important;
  border: none;
  border-radius: 12px;
  outline: none;
  background: #edd4fe;
  position: relative;
  z-index: 1;
  padding: ${({ isActive }) => (isActive ? '8px 24px' : '8px 24px')};
  color: #000;
  font-size: 1.2rem;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 0.2s ease;

  :hover {
    filter: brightness(0.8);
  }
`;

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-auto-columns: 1fr;
  grid-column-gap: 28px;
  grid-row-gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 230px));
  justify-content: flex-start;
  padding-bottom: 20px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    justify-content: center;
  }
`;

export const TokenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 12px;

  background: #edd4fe;
  padding: 16px;
  border-radius: 12px;
  color: #000 !important;
  position: relative;

  input {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 20px;
    margin-right: 20px;
    z-index: 1;
  }

  img {
    border-radius: 12px;
  }

  h2 {
    font-size: 1.6rem;
    text-align: center;
  }

  .line {
    height: 1px;
    width: 100%;
    background-color: #fff;
    color: #000;
  }

  .nft-info {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  button {
    width: 100%;
    border-radius: 99999px;
    background-color: #fff;
    color: ${({ theme }) => theme.colors.buttonText};
    font-size: 1rem;
    font-weight: bold;
    padding: 8px 16px;
    text-transform: uppercase;
    margin-top: 12px;
    border: none;
    cursor: pointer;

    transition: all 0.2s ease;

    :hover {
      filter: brightness(0.8);
    }

    :disabled {
      cursor: not-allowed;
      /* pointer-events: none; */

      :hover {
        filter: brightness(1);
      }
    }
  }
`;
