import styled from "styled-components";

export const MainCon  = styled.div`
  margin: 10px 30px;
  display: grid;
  grid-template-rows: 36px auto;
  grid-template-columns: 50% auto;
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
  }
  .title-top {
    white-space: pre-wrap;
    font-size: 16px;
    text-align: center;
    line-height: 26px;
    background-color: #fafafa;
  }
  .ipt {
    grid-column:50%;
    min-height: 120px;
  }
` as any