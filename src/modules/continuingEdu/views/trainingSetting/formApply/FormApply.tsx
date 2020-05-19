import styled from "styled-components";
import React from "react";
import ApplyHeader from "./components/ApplyHeader";
import ApplyTable from "./components/ApplyTable";
interface Props {
  getTitle: any;
}

export default function FormApply(props: Props) {
  return (
    <Wrapper>
      <ApplyHeader getTitle={props.getTitle} />
      <ScrollCon>
        <ApplyTable getTitle={props.getTitle} />
      </ScrollCon>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollCon = styled.div`
  flex: 1;
`;
