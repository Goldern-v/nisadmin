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
    font-family: '微软雅黑'
  }


/** Zimage 样式调整*/
#zmageControl,#zmageControlFlipLeft, #zmageControlFlipRight,#zmageControlPagination {
  background: #fff !important;
}

`

export default GlobalStyle
