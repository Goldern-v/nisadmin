import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import SelectPeople from "../../SelectPeople/SelectPeople";
export interface Props {}

export default function Step3() {
  let checkedUserList: any = [];
  return (
    <Wrapper>
      <SelectPeople checkedUserList={checkedUserList} />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
