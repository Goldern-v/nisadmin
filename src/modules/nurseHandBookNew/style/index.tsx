import styled from "styled-components";
const TEXT_SIZE = '14px'
export const DetailCtxCon: any = styled.div`
  background: #fff;
  padding: 15px;
  margin: 0px auto;
  white-space: pre-wrap;
  * {
    font-size: ${TEXT_SIZE};
    line-height: 24px;
  }
  &.con--a4 {
    width: 780px;
    min-height: 1080px;
  }
  .ant-input {
    font-size: ${TEXT_SIZE};
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
    line-height: 40px;
    font-weight: 800;
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
    td,th {
      border: 1px solid #000;
      text-align: center;
    }
    td .label {
      line-height: 32px;
    }
  }
  /* 打印样式 */
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