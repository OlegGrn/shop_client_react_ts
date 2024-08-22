import { createGlobalStyle } from 'styled-components';
import {baseTheme} from "./theme";

const minWidth: string = baseTheme.minWidth || '320px';
const fontFamily: string = baseTheme.fontFamily || "sans-serif"


export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }

  *,
  *:before,
  *:after {
    //-moz-box-sizing: border-box;
    //-webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  :focus,
  :active {
    outline: none;
  }

  a:focus,
  a:active {
    outline: none;
  }

  aside,
  nav,
  footer,
  header,
  section {
    display: block;
  }

  html,
  body {
    height: 100%;
    min-width: ${minWidth};
  }

  body {
    line-height: 1;
    font-family: ${fontFamily};
    //text-rendering: optimizeLegibility;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  input,
  button,
  textarea {
    font-family: ${fontFamily};
  }

  input::-ms-clear {
    display: none;
  }

  button {
    cursor: pointer;
  }

  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  a,
  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  ul li {
    list-style: none;
  }

  img {
    vertical-align: top;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    font-size: inherit;
  }
 


  //-webkit-overflow-scrolling: touch;
  //animation-play-state: paused !important;

`