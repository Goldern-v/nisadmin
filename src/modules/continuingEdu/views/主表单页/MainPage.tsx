import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import MergeTh from "../../components/mergeTh/MergeTh";
import Header from "./components/Header";
import Table from "./components/Table";
import { appStore } from "src/stores/index";
import qs from "qs";

interface Props {
  getTitle: any;
  getId: any;
}
export default observer(function MainPage(props: Props) {
  const { getTitle, getId } = props; //获取当前页面标题
  // 初始化
  useEffect(() => {}, [props.getId]);

  return (
    <Wrapper>
      <Header getTitle={getTitle} getId={getId} />
      <Content>
        <Table getId={getId} />
      </Content>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const Content = styled(TabledCon)`
  padding: 0 15px;
  box-sizing: border-box;
`;
