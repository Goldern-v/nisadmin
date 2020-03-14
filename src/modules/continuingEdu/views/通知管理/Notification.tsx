import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import MergeTh from "../../components/mergeTh/MergeTh";
import Header from "./components/Header";
import Table from "./components/Table";
import { appStore } from "src/stores/index";
import qs from "qs";
import createModal from "src/libs/createModal";
import AddRecordModal from "../../modal/AddRecordModal";

interface Props {
  getTitle: any;
  getId: any;
}
export default observer(function Notification(props: Props) {
  const { getTitle, getId } = props; //获取当前页面标题
  // 初始化
  const addRecordModal = createModal(AddRecordModal);
  useEffect(() => {}, [props.getId]);

  return (
    <Wrapper>
      <Header
        getTitle={getTitle}
        getId={getId}
        addRecordModal={addRecordModal}
      />
      <Content>
        <Table getId={getId} />
      </Content>
      <addRecordModal.Component />
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
