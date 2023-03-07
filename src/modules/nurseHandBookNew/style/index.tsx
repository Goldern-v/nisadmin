import styled from "styled-components";
const TEXT_SIZE = '14px'
const LINE = '24px'

export const MULTI_UNDERLINE = (size: number = 24, pt: number = 4) => `
background-image: linear-gradient(
  180deg,
  transparent 0px,
  transparent ${size - 1}px,
  #555 ${size - 1}px,
  #555 ${size}px
);
background-position: top left;
background-size: 100% ${size}px;
/* background-repeat: repeat-y; */
background-clip: content-box;
-webkit-print-color-adjust: exact;
print-color-adjust: exact;
color-adjust: exact;
`
export const DetailCtxCon: any = styled.div`
  background: #fff;
  padding: 15px;
  margin: 0px auto;
  white-space: pre-wrap;
  font-size: ${TEXT_SIZE};
  line-height: ${LINE};
  &.con--a4 {
    width: 780px;
    min-height: 1080px;
  }
  .ant-input {
    font-size: ${TEXT_SIZE};
    line-height: ${LINE};
    padding: 4px;
  }
  .title-con {
    display: flex;
    justify-content: center;
    align-items: center;
    input.title {
      width: 100px;
    }
  }
  .title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    line-height: 40px;
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0;
    min-height: 40px;
    :focus {
      box-shadow: none;
    }
  }
  .cell-ipt,
  .cell-ipt.ant-calendar-picker input,
  .cell-ipt.ant-calendar-picker pre,
  .cell-ipt .ant-select-selection
   {
    width: 100%;
    height: inherit;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0;
    resize: none;
    &[contentEditable=true] {
      min-height: 200px;
      white-space: pre-wrap;
      &:not(:focus):empty::before {
        content: attr(data-placeholder);
        color: #888;
      }
    }
    &:focus {
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }
  table {
    width: 100%;
    border: 1px solid #000;
    margin: auto;
    font-size: ${TEXT_SIZE};
    line-height: 32px;
    td,th {
      border: 1px solid #000;
      text-align: center;
    }
    td .label {
      line-height: 32px;
    }
    td {
      .cell-ipt.ant-calendar-picker {
        min-width: 100% !important;
      }
    }
  }
  .cell-ipt.ant-calendar-picker {
    min-width: 160px !important;
  }
  .date-con {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 140px;
    margin-left: auto;
    .label {
      white-space: nowrap;
    }
  }
  /* 打印样式 */
  pre {
    white-space: pre-wrap;
    min-height: 32px;
  }
  pre.te-8 {
    min-height: 300px;
  }
  pre.title {
    border: none;
  }
  .title-con {
    pre.title {
      width: auto;
    }
  }
  pre.te-60 {
    min-height: 56px;
  }
  pre.te-150 {
    min-height: 150px;
  }
  pre.te-200 {
    min-height: 200px;
  }
  pre.ant-input {
    padding-left: 5px;
    padding-right: 5px;
  }
  
  .ctx-line {
    display: flex;
    white-space: nowrap;
    align-items: center;
  }
  .ta-l {
    text-align: left;
  }
  .ta-c {
    text-align: center;
  }
  .fw-b {
    font-weight: bold;
  }
  .f-s {
    font-size: 13px;
  }
`