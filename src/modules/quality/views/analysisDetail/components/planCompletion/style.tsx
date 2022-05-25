import styled from "styled-components";

export const MainCon  = styled.div`
  margin: 10px 30px;
  
  display: grid;
  grid-template-columns: 50% auto;
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
  }
  .title-top {
    grid-column:50%;
    white-space: pre-wrap;
    font-size: 16px;
    text-align: center;
  }
  .ipt {
    grid-column:50%;
    min-height: 173px;
  }
` as any