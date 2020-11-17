import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import Header from "./components/Header";
import Table from "./components/Table";
import HjTable from "./components/HjTable";
import { appStore } from "src/stores/index";
import createModal from "src/libs/createModal";
import AddRecordModal from "../../modal/AddRecordModal";
import BaseTabs from "src/components/BaseTabs";
import { mainPageModal } from "./MainPageModal";
import { mainPageApi } from "./api/MainPageApi";
import { stepViewModal } from "../../modal/stepComponent/StepViewModal";

interface Props {
  getTitle: any;
  getId: any;
  getParentsName: any;
}
export default observer(function MainPage(props: Props) {
  const { getTitle, getId, getParentsName } = props; //获取当前页面标题
  const addRecordModal = createModal(AddRecordModal); // 添加弹窗
  const [dataList, setDataList] = useState([] as any); // 动态TAbs

  useEffect(() => {
    getTabs();
    stepViewModal.getParentsName = getParentsName || "";
  }, [getId, getTitle]);

  // 获取动态选项卡
  const getTabs = () => {
    let arr: any = [];
    let obj: any = {};
    mainPageApi.getTypeData(getId).then(res => {
      res.data.map((item: any, index: number) => {
        obj = {
          title: item.name,
          component: <HjTable addRecordModal={addRecordModal} />
        };
        arr.push(obj);
      });
      setDataList(arr);
    });
  };

  return (
    <Wrapper>
      <Header
        getTitle={getTitle}
        getId={getId}
        addRecordModal={addRecordModal}
      />
      <Content>
        {appStore.HOSPITAL_ID === "wh" ? (
          <Table getId={getId} addRecordModal={addRecordModal} />
        ) : (
          <BaseTabs
            defaultActiveKey={mainPageModal.key}
            config={dataList}
            onChange={(key: any) => {
              mainPageModal.tabsChanged(key);
              mainPageModal.key = key;
              mainPageModal.onload();
            }}
          />
        )}
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
