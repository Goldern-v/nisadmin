import styled from "styled-components";

export const DetailCtxCon: any = styled.div`
  background: #fff;
  padding: 15px;
  margin: 0px auto;
  font-size: 16px;
  line-height: 24px;
  .title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
    line-height: 32px;
    font-weight: bold;
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0;
    :focus {
      box-shadow: none;
    }
  }
  .cell-ipt, .cell-ipt.ant-calendar-picker input, .cell-ipt.ant-calendar-picker pre {
    width: 100%;
    height: inherit;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0;
    resize: none;
    &[contentEditable=true] {
      min-height: 176px;
      white-space: pre-wrap;
    }
    &:focus {
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }
  
  .ta-l {
    text-align: left;
  }
  table {
    border: 1px solid #000;
    margin: auto;
    td,th {
      border: 1px solid #000;
      text-align: center;
    }
    td .label {
      line-height: 32px;
    }
  }
  pre.te-8 {
    min-height: 200px;
  }
  .ant-input {
    font-size: 16px;
  }
`