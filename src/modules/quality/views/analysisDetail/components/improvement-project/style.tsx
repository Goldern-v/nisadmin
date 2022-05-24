import styled from "styled-components";

export const MainCon  = styled.div`
  margin: 10px 30px;
  
  display: grid;
  grid-template-columns: 110px 1fr 1fr auto 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 1px 1px;
  background-color: #000;
  border: 1px solid #000;
  div {
    white-space: pre-wrap;
    font-size: 14px; 
  }
  >div {
    background-color: #fff;
    padding: 5px;
    min-height: 50px;
    &:nth-child(9) {
      grid-row: 5 / 7;
    }
  }
  .title-small {
    white-space: pre-wrap;
    font-size: 12px;
  }
  .ipt {
    grid-column: 2 / 8;
    min-height: 73px;
  }
` as any