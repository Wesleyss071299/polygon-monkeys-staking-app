import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    gray: {
      1: '#161618',
      2: '#1C1C1F',
      3: '#232326',
      4: '#28282C',
      5: '#2E2E32',
      6: '#34343A',
      7: '#3E3E44',
      8: '#C8C7CB',
      9: '#706F78',
      10: '#7E7D86',
      11: '#A09FA6',
      12: '#EDEDEF'
    },
    background: '#000000',
    text: '#fff',
    card: '#193C35',
    button: '#FFF',
    buttonText: '#000',
    progressBar: '#000',
    progressBarBg: '#fff',
    divider: '#FFFF',
    isDark: false
  },
  breakpoints: {
    mobile: 'only screen and (max-width: 769px)',
    tablet: 'only screen and (max-width: 1023px)',
    wide: 'only screen and (min-width: 1536px)',
    extraWide: 'only screen and (min-width: 1921px)'
  }
};

export const darkTheme: DefaultTheme = {
  colors: {
    gray: {
      1: '#161618',
      2: '#1C1C1F',
      3: '#232326',
      4: '#28282C',
      5: '#2E2E32',
      6: '#34343A',
      7: '#3E3E44',
      8: '#C8C7CB',
      9: '#706F78',
      10: '#7E7D86',
      11: '#A09FA6',
      12: '#EDEDEF'
    },
    background: '#FFF',
    text: '#FFF',
    card: '#000',
    button: '#fff',
    buttonText: '#000',
    progressBar: '#000',
    progressBarBg: '#000',
    divider: '#000',
    isDark: true
  },
  breakpoints: {
    mobile: 'only screen and (max-width: 769px)',
    tablet: 'only screen and (max-width: 1023px)',
    wide: 'only screen and (min-width: 1536px)',
    extraWide: 'only screen and (min-width: 1921px)'
  }
};
