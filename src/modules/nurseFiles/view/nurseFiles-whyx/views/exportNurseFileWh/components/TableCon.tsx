import styled from 'styled-components'

export const TableCon = styled.table`
  width: 100%;
  border-collapse: collapse;
  td {
    border: 1px solid #000;
    height: 27px;
    text-align: center;
  }
  tr{
    &.main-title-row{
      font-weight: bold;
    }
    &.title-row,&.content-row{
      font-size:12px;
    }

    &.content-row{
      /* td{
        &>div{
          width: 100%;
          height: auto;
          max-height: 100%;
          overflow: hidden;
        }
      } */
    }
  }
`