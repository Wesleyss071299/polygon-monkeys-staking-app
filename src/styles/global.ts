import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Bebas Neue', cursive !important;
    font-weight: 700 !important;
    letter-spacing: 1px !important;
    line-height: 1.2 !important;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    background-color: #f9f1ef;
   }

  html {
    font-size: 62.5%; // 1rem = 10px
    height: 100%;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    position: relative;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  ::-webkit-scrollbar {
    height: 6px;
    width: 3px;
    background-color:#787878;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.7);
    -webkit-border-radius: 8px;
  }

  .dropdown {
    background: #edd4fe!important;
    width: 100%;
    max-width: 300px;
    border-radius: 20px;
    transition: all .2s ease;
    color: #000;
  }

  .dropdown-control {
    background-color: transparent;
    border: none;
    padding: 0;
    width: 100%;
    max-width: 300px;
    padding: 24px 32px;
    cursor: pointer;
    color: #000;
  }

  .dropdown-placeholder {
  }

  .dropdown-menu {
    background-color: '#edd4fe';
    margin-top: 4px;
    border-radius: 12px;
    padding: 8px 4px;
    width: 100%;
    max-width: 300px;
    border: none;
    top: 45%;
    transition: all .2s ease;
    color: #000;

    .is-selected {
      background-color: #edd4fe;

      h6, span {
        color: #000;
      }

      :hover {
        background-color: #edd4fe !important;
        cursor: default;
      }
    }
  }

  .dropdown-arrow {
    right: 24px;
    top: 32px;
  }

  .Dropdown-option {
    padding: 8px 24px;
    color: #000;

    :hover {
      background: rgba(255, 255, 255, .3);
      border-radius: 12px;
    }
  }
`;
