import * as React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  table {
    width: 100%;
  }
  /deep/ .ant-select-selection {
    border: none !important;
    text-align: center;
  }
  /deep/.ant-select-selection: focus {
    border: none !important;
  }

  .special-radio {
    /deep/ .ant-radio-wrapper {
      display: flex;

      > span:nth-child(2) {
        text-align: left;
      }
      .ant-radio {
        margin-top: 12px;
      }
    }
  }
  /deep/ textarea {
    resize: none; //去右下角灰点
    text-align: left !important;
  }

  /deep/ .ant-radio {
    width: 16px;
    height: 16px;
    .ant-radio-inner {
      border-radius: 0;
      border-color: #ccc;
    }
  }

  /deep/ .ant-radio-checked {
    .ant-radio-inner::after {
      background-color: transparent;
      content: "✔";
      font-size: 16px;
      font-weight: 600;
      top: -1px;
      left: 0;
    }
  }

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
  .noPadding {
    padding: 0 !important;
  }
  .padding {
    padding: 0 10px !important;
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
    text-align: center;
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
  /deep/ .ant-radio {
    width: 16px;
    height: 16px;
    .ant-radio-inner {
      border-radius: 0;
      border-color: #ccc;
    }
  }
  .marginTop {
    margin-top: 20px;
  }

  /deep/ .ant-radio-checked {
    .ant-radio-inner::after {
      background-color: transparent;
      content: "✔";
      font-size: 16px;
      font-weight: 600;
      top: -1px;
      left: 0;
    }
  }
  .vailgnBottom {
    vertical-align: bottom !important;
    text-align: right !important;
  }

  .vailgnTop {
    vertical-align: top !important;
    text-align: left !important;
  }
  .godie {
    /deep/.ant-input {
      border: none !important;
    }
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
    text-align: center;
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
  .specialInput {
    /deep/.ant-input {
      width: 150px;
    }
  }
  /deep/ textarea {
    resize: none; //去右下角灰点
    border: none !important;
    text-align: left !important;
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
