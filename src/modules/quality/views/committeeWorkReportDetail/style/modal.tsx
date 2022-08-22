import styled from "styled-components";

export const tableCon = styled.div`
  td {
    padding: 0 !important;
  }
  .cell-ipt {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0;
    resize: none;
    &:focus {
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }
` as any

export const FieldDataCon = styled.div`
  textarea {
    line-height: 21px;
    width: 100%;
    outline: none;
    background: transparent;
    border-radius: 0;
    resize: none;
    border: none;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
` as any

export const OperationModCon = styled.div`
  .context {
    /* text-align: center; */
    line-height: 28px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 10px;
    &.context-title {
      margin-left: 0px;
    }
  }
  .month-context {
    display:inline-block;
    border-bottom:1px solid #000;
    width:60px;
    text-align: center;

  }
  .context .ant-input {
    width: 60px;
    padding: 0;
    height: 28px;
    text-align: center;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    border-radius: 0;
    resize: none;
    &:focus {
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }
` as any