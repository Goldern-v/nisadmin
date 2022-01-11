import styled from 'styled-components'

export const PrintPage = styled.div`
  width: 660px;
  height: 962px;
  margin: 0mm auto;
  page-break-after: always;
  /* border: 1px solid; */
  position: relative;
  * {
    color: #000;
  }
  table {
    table-layout: fixed;
  }
`