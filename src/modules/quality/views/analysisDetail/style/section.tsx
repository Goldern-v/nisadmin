import styled from "styled-components";

export const SectionCon = styled.div`
  min-height: 60px;
  position: relative;

  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
`
export const OperationSecCon = styled.div`
  padding-bottom: 5px;
  .context {
    /* text-align: center; */
    line-height: 24px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 60px;
    &.context-title {
      margin-left: 50px;
    }
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .context div {
    min-width: 60px;
    height: 24px;
    border-bottom: 1px solid #000;
  }
` as any