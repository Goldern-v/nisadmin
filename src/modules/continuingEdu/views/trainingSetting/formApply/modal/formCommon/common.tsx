import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  table {
    width: 100%;
  }
   .ant-select-selection {
    border: none !important;
    text-align: center;
  }
   .ant-select-selection:focus {
    border: none !important;
  }

  .special-radio {
     .ant-radio-wrapper {
      display: flex;

      > span:nth-child(2) {
        text-align: left;
      }
      .ant-radio {
        margin-top: 12px;
      }
    }
  }
   textarea {
    resize: none; //去右下角灰点
    text-align: left !important;
  }

   .ant-radio {
    width: 16px;
    height: 16px;
    .ant-radio-inner {
      border-radius: 0;
      border-color: #ccc;
    }
  }
   .ant-radio-checked {
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
    .ant-input {
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
  .ant-input {
    border: none;
    word-break: break-all;
    word-wrap: break-word;
    text-align: center;
    font-size: 13px !important;
    padding: 3px 0 !important;
  }
   .ant-input-disabled {
    background-color: #fff !important;
  }
  .ant-input:focus {
    border: none;
    box-shadow: none;
  }
   .ant-radio-wrapper {
    margin-right: 0 !important;
  }
  .img {
    display: inline-block;
    height: 30px;
    width: 85px;
  }
  //  textarea::-webkit-scrollbar {
  //   display: none; //去滚动条
  // }
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
    padding: 5px 10px;
    box-sizing: border-box;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
  }
   .ant-radio {
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
   .ant-radio-checked {
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
    .ant-input {
      border: none !important;
    }
  }
  .textAlign {
    text-align: left !important;
  }
  .ant-input {
    border: none;
    word-break: break-all;
    word-wrap: break-word;
    border-bottom: 1px solid #000 !important;
    width: 75px;
    border-radius: 0;
    text-align: center;
    font-size: 13px !important;
    padding: 3px 0 !important;
  }
   .ant-input-disabled {
    background-color: #fff !important;
  }
  .ant-input:focus {
    border: none;
    box-shadow: none;
  }
   .ant-radio-wrapper {
    font-size: 12px !important;
  }
  .specialInput {
    .ant-input {
      width: 150px;
    }
  }
   textarea {
    resize: none; //去右下角灰点
    border: none !important;
    text-align: left !important;
  }
  .img {
    display: inline-block;
    height: 30px;
    width: 85px;
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
