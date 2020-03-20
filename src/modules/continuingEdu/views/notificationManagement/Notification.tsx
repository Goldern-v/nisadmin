import styled from "styled-components";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TabledCon } from "src/components/BaseTable";
import Header from "./components/Header";
import Table from "./components/Table";

export default observer(function Notification() {
  // 初始化
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Header />
      <Content>
        <Table />
      </Content>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const Content = styled(TabledCon)`
  box-sizing: border-box;
`;
