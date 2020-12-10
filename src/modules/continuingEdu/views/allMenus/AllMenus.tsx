import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TabledCon } from "src/components/BaseTable";
import Header from "./components/Header";
import Table from "./components/Table";
import createModal from "src/libs/createModal";
import AddRecordModal from "../../modal/AddRecordModal";
import { allMenusModal } from "./AllMenusModal";
import { allMenusApi } from "./api/AllMenusApi";
import { stepViewModal } from "../../modal/stepComponent/StepViewModal";

interface Props {
  getTitle: any;
  getId: any;
  getParentsName: any;
}
export default observer(function MainPage(props: Props) {
  const { getTitle, getId, getParentsName } = props; //获取当前页面标题
  const addRecordModal = createModal(AddRecordModal); // 添加弹窗

  useEffect(() => {
    stepViewModal.getParentsName = getParentsName || "";
    stepViewModal.getThirdName = getTitle || "";
  }, [getId, getTitle]);

  return (
    <Wrapper>
      <Header
        getTitle={getTitle}
        getId={getId}
        addRecordModal={addRecordModal}
      />
      <Content>
        <Table getId={getId} addRecordModal={addRecordModal} />
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
