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
  th{
    height: 36px !important;
    font-size: 14px !important;
  }
  td {
        box-sizing: border-box;
        padding: 0 8px;
        font-size: 13px !important;
        height: ${(p) => p.theme.$tableRowHeight} !important;
      }
  body {
    margin: 0px;
    height: 100%;
    font-size: 14px;
  }
  #root {
    height: 100%;
  }
  * {
    font-family: simsun,Times New Roman,Georgia,Serif !important ;
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

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #bfbfbf;
      font-weight: normal;
    }

.largeTip {
  max-width: 800px !important;
}    
.ant-spin-nested-loading {
  height: 100%;
}
`

export default GlobalStyle
