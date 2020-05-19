import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import ReviewTable from "./ReviewTable";
import BaseTabs from "src/components/BaseTabs";
const TABS_LIST_NURSE = [
  {
    title: "待我审核",
    component: <ReviewTable type="waitAuditedNurse" needAudit />
  },
  {
    title: "我已审核",
    component: <ReviewTable type="auditedFailNurse" needAudit={false} />
  }
];

export default observer(function NurseAudit() {
  return (
    <Wrapper>
      <MainCon>
        <BaseTabs config={TABS_LIST_NURSE} />
      </MainCon>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: calc(100vh - 55px)
  display: flex;
  flex-direction: column;
`;

const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 115px);
  align-items: stretch;
  display: flex;
  margin: 0 15px;
`;
