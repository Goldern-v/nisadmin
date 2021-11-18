import styled from "styled-components";
import React, { useState, useEffect } from "react";
import SelectCon from "./components/SelectCon";
import ArrangeSheet from "./components/ArrangeSheet";
import { observer } from "src/vendors/mobx-react-lite";
export interface Props { }

export default observer(function ArrangeHome() {
  return (
    <Wrapper>
      <SelectCon />
      {/* <ArrangeSheet isEdit={false} surplusHeight={100} isEditable={false} /> */}
      <ArrangeSheet isEdit={false} surplusHeight={260} isEditable={false} />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
