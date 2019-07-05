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
  * {
    font-family: simsun,Times New Roman,Georgia,Serif !important ;
    font-size: 14px;
  }


/** Zimage 样式调整*/
#zmageControl,#zmageControlFlipLeft, #zmageControlFlipRight,#zmageControlPagination {
  background: #fff !important;
}

.scrollBox {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
}
`

export default GlobalStyle
