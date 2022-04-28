import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:FreeMono, monospace;
    }

    html {
        height: 100%;
    }
    body {
        min-height: 100%;
       
    }

`;
