import styled from "styled-components";
import React from "react";
import { RouteComponentProps } from "react-router";
import ReviewHeader from "./components/ReviewHeader";
import NurseAudit from "./components/NurseAudit";
export interface Props extends RouteComponentProps {}

export default function FormReview() {
  return (
    <Wrapper>
      <ReviewHeader />
      <ScrollCon>
        <NurseAudit />
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
