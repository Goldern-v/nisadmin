import * as React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  table {
    width: 100%;
  }
  .special-radio {
    /deep/ .ant-radio-wrapper {
      display: flex;

      > span:nth-child(2) {
        text-align: left;
      }
      .ant-radio {
        width: 16px;
        height: 16px;
        margin-top: 12px;
      }
    }
  }
  /deep/ textarea {
    resize: none; //去右下角灰点
  }


  // /deep/ .ant-radio-inner {
  //   border-radius: 0px;
  // }
  // /deep/ .ant-radio-inner::after {
  //   background-color: #fff;
  // }
  // /deep/.ant-radio-wrapper-checked {
  //   background: url('${require("../../../images/question-correct.png")}') no-repeat;
  // }
  // /deep/ .ant-radio-checked .ant-radio-inner {
  //   opacity: 0;
  // }


  
  .specialInput {
    /deep/.ant-input {
      border-bottom: 1px solid #000 !important;
      width: 150px;
      border-radius: 0;
    }
  }
  th,
  td {
    border: 1px solid #000;
    padding: 5px 10px;
    box-sizing: border-box;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
  }
  .vailgnTop {
    vertical-align: top !important;
    text-align: left !important;
  }
  .textAlign {
    text-align: left !important;
  }
  .vailgnBottom {
    vertical-align: bottom !important;
    text-align: right !important;
  }
  /deep/.ant-input {
    border: none;
    height: 100%;
    word-break: break-all;
    word-wrap: break-word;
  }
  /deep/ .ant-input-disabled {
    background-color: #fff !important;
  }
  /deep/.ant-input:focus {
    border: none;
    box-shadow: none;
  }
  /deep/ .ant-radio-wrapper {
    margin-right: 0 !important;
  }
`;
export const CJJSWrapper = styled.div`
  height: 100%;
  width: 100%;
  table {
    width: 100%;
  }
  th,
  td {
    border: 1px solid #000;
    padding: 6px 10px;
    box-sizing: border-box;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
  }
  .vailgnTop {
    vertical-align: top !important;
    text-align: left !important;
  }
  .textAlign {
    text-align: left !important;
  }
  /deep/.ant-input {
    border: none;
    height: 100%;
    word-break: break-all;
    word-wrap: break-word;
    border-bottom: 1px solid #000 !important;
    width: 75px;
    border-radius: 0;
  }
  /deep/ .ant-input-disabled {
    background-color: #fff !important;
  }

  /deep/.ant-input:focus {
    border: none;
    box-shadow: none;
  }
  /deep/ .ant-radio-wrapper {
    font-size: 12px !important;
  }
`;
export const Span = styled.span`
  display: inline-block;
  margin: 3px 0 0 20px;
`;
export const SpanMiddle = styled.span`
  display: inline-block;
  margin: 3px 0 0 30px;
`;
export const SpanMax = styled.span`
  display: inline-block;
  margin: 3px 0 0 125px;
`;
export const SpanLength = styled.span`
  display: inline-block;
  width: 125px;
`;
