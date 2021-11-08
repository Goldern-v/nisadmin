import styled from "styled-components";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { trainingManualModal } from "./TrainingManualModal";
import Tabs from "./components/Tabs";

import { appStore } from "src/stores";
interface Props {}

export default observer(function TrainingManual(props: Props) {
  // 初始化表格数据
  useEffect(() => {
    trainingManualModal.myOnload();
  }, [trainingManualModal.tabKey]);
  useEffect(() => {
    trainingManualModal.init();
  }, []);

  //导出培训清单
  const exportList = () => {
    trainingManualModal.export();
  };
  const print = () => {
    trainingManualModal.print();
  };
  return (
    <Wrapper>
      <Header>
        <Title>培训手册</Title>
        <HandleBtn>
          {appStore.HOSPITAL_ID == "hj" ? (
            <div>
              <Button className="btn" onClick={print}>
                打印
              </Button>
              <Button className="btn" onClick={exportList}>
                导出
              </Button>
              <Button
                type="primary"
                onClick={() => (trainingManualModal.modalBtn = true)}
              >
                添加培训计划
              </Button>
            </div>
          ) : (
            <Button
              type="primary"
              onClick={() =>
                appStore.history.push(
                  `/trainingManualSetting?nameType=trainingManualSetting`
                )
              }
            >
              培训清单管理
            </Button>
          )}
        </HandleBtn>
      </Header>
      <Content>
        <Tabs />
      </Content>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;
const Header = styled.div`
  height: 55px;
  color: #333;
  line-height: 55px;
  width: 100%;
`;
const Title = styled.div`
  float: left;
  font-weight: bold;
  font-size: 22px;
`;
const HandleBtn = styled.div`
  float: right;
  .btn {
    margin-right: 10px;
  }
`;
const Content = styled.div`
  height: calc(100vh - 220px);
  padding-bottom: 10px;
  box-sizing: border-box;
  .ant-tabs-nav {
    width: 100% !important;
  }
  .ant-tabs-tab {
    text-align: center !important;
    width: 16.66% !important;
  }
`;
