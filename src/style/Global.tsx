import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@kwswap/uikit/dist/theme'
import 'video-react/dist/video-react.css'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: number;
    src: url('/fonts/D-DINExp.ttf');
  }
  @font-face {
    font-family: CircularXXSub;
    font-weight: 400;
    src: url(/fonts/CircularXXSub-Book.woff2) format("woff2"),url(/fonts/CircularXXSub-Book.woff) format("woff")
}
@font-face {
  font-family: text;
  font-weight: 500;
  src: url(/fonts/CircularXXSub-Medium.woff2) format("woff2"),url(/fonts/CircularXXSub-Medium.woff) format("woff")
}
@font-face {
    font-family: text-bold;
    font-weight: 700;
    src: url(/fonts/CircularXXSub-Bold.woff2) format("woff2"),url(/fonts/CircularXXSub-Bold.woff) format("woff")
}
@font-face {
  font-family: text-bold;
  font-weight: 700;
  src: url(/fonts/CircularXXSub-Bold.woff2) format("woff2"),url(/fonts/CircularXXSub-Bold.woff) format("woff")
}
@font-face {
  font-family: italics-title;
  font-weight: 900;
  src: url(/fonts/CircularXXSub-Black.woff2) format("woff2"),url(/fonts/CircularXXSub-Black.woff) format("woff")
}
@font-face {
    font-family: title;
    font-weight: 900;
    src: url(/fonts/CircularXXSub-Black.woff2) format("woff2"),url(/fonts/CircularXXSub-Black.woff) format("woff")
}
  * {
    font-family: 'text';
    font-weight:bold;
  }
 
  html{
    overflow-x: hidden;
    margin:0 auto;
    :root{
      --animate-delay:0.1s;
      --animate-duration:0.5s;
    }
  }
  body {
    background: #000;
    min-height:100vh;
    overflow-y: auto !important;
    overflow-x: hidden;
    padding-right: 0 !important;
    color:#fff;
    font-size: 16px;
    
    img {
      height: auto;
      vertical-align: middle;
      max-width: 100%;
    }
    .rich-text{
      white-space: pre-wrap;
       p {
        min-height: 1em
      }
    }
    .MuiButton-root.MuiButton-sizeLarge{
      padding-top: 11px;
      padding-bottom: 11px;
    }
    .MuiTable-root{ 
      border-collapse: separate;
      border-spacing: 0 5px;
      font-size: 14;
      th{
        font-weight: 600;
      }
      tr{
        border:0;
        background:#171719;
        transition: all linear 0.2s;
        
        td,th{
          border:0;
        }
      }
      tbody{
        tr:hover{
          background:#000;
        }
      }

    }
  }
  
`

export default GlobalStyle
