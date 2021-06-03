import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-weight: 200;
    box-sizing: border-box;
  }

  html {
      font-size: 16px;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
