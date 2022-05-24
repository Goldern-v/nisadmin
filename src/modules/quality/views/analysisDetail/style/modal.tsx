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
    }
  }
` as any