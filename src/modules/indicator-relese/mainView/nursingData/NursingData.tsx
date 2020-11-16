import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import Header from "./components/Header";
import Content from "./components/Content";

interface Props {
  getTitle: any;
}
export default observer(function NursingData(props: Props) {
  const { getTitle } = props; //获取当前页面标题

  return (
    <Wrapper>
      <Header getTitle={getTitle} />
      <Content />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
