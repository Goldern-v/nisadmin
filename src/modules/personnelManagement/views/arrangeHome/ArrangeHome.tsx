import styled from "styled-components";
import React from "react";
import SelectCon from "./components/SelectCon";
import ArrangeSheet from "./components/arrangeSheet/ArrangeSheet";
import { observer } from "src/vendors/mobx-react-lite";
export interface Props { }

export default observer(function ArrangeHome() {
  return (
    <Wrapper>
      <SelectCon />
      <ArrangeSheet isEdit={false} surplusHeight={155} isEditable={false} />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
