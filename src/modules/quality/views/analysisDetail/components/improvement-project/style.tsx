import styled from "styled-components";
import { FieldDataCon } from "../../style/modal";

export const MainCon  = styled(FieldDataCon)`
  margin: 10px 30px;
  
  display: grid;
  grid-template-columns: 110px 1fr 1fr auto 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 1px 1px;
  background-color: #e7e7e7;
  border: 1px solid #e7e7e7;
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
  .title_left {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .title-small {
    white-space: pre-wrap;
    font-size: 12px;
    text-align: center;
    color: red;
  }
  .fixed {
    height: 100px;
    overflow: hidden;
  }
  .ipt {
    grid-column: 2 / 8;
    min-height: 73px;
    overflow: auto;
  }
` as any