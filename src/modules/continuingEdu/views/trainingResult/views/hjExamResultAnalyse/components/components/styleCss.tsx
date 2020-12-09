import styled from 'styled-components'

export const Content = styled.div`
  text-align: center;
  width: 100%;
`
export const ContentSpecial = styled.div`
  text-align: center;
  width: 100%;
  table {
    width: 95%;
    margin: 5px 0 0 20px;    
    box-sizing: border-box;
  }
  th,
  td {
    border: 1px solid #000;
    padding: 3px 4px;
    box-sizing: border-box;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
    font-size: 11px !important;
  }
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
`
export const TableTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  margin-left: 20px;
`
export const ChartCon = styled.div.attrs({
  height: 0
})`
  padding: 5px 20px 0 20px;
  position: relative;
`
export const Part = styled.div`
  width: 49%;
  display: inline-block;
  transform: translate(0, -38%)
`
export const PartOne = styled.div`
  width: 48%;
  display: inline-block;
  margin-right: 20px;
`
