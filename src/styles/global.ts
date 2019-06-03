import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, div, span,
  h1, h2, h3, h4, h5, h6, p, pre,
  a, code, i, dl, dt, dd, ol, ul, li,
  form, label, input, button, textarea,
  table, tbody, tfoot, thead, tr, th, td,
  canvas, footer, header, menu, nav, section, summary
  {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0px;
    height: 100%;
  }
  #root {
    height: 100%;
  }
  th{
    height: 30px !important;
    font-size: 14px !important;
    font-weight: bold !important;
  }
  td{
    height: 26px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
  }
  * {
    font-family: simsun,Times New Roman,Georgia,Serif !important ;
    font-size: 14px;
  }


/** Zimage 样式调整*/
#zmageControl,#zmageControlFlipLeft, #zmageControlFlipRight,#zmageControlPagination {
  background: #fff !important;
}

`

export default GlobalStyle
