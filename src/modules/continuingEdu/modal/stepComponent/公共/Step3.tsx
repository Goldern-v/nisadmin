import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import SelectPeople from "../../SelectPeople/SelectPeople";
import { stepViewModal } from "../StepViewModal";
import { cloneJson } from "src/utils/json/clone";
export interface Props {}

export default function Step3() {
  const [checkedUserList, setCheckedUserList]: any = useState([]);
  useEffect(() => {
    setCheckedUserList(stepViewModal.stepData3.participantList);
  }, []);
  return (
    <Wrapper>
      <SelectPeople checkedUserList={checkedUserList} />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
