import styled from "styled-components";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { trainingManualModal } from '../TrainingManualModal'
import { appStore } from "src/stores";
import Tabs from '../components/Tabs'
interface Props { }

export default observer(function TrainingManualSetting(props: Props) {

  // 初始化表格数据
  useEffect(() => {
    trainingManualModal.allOnload()
  }, [trainingManualModal.tabKey]);

  useEffect(() => {
    trainingManualModal.init()
  }, []);

  return (
    <Wrapper>
      <Header>
        <Title>培训清单管理</Title>
        <HandleBtn>
          <Button type="primary" style={{ marginRight: '15px' }} onClick={() => trainingManualModal.modalBtn = true}>添加培训计划</Button>
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
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
`
const HandleBtn = styled.div`
  float: right;
`
const Content = styled.div`
  height: calc( 100vh - 115px);
  .ant-tabs-nav {
    width: 100% !important;
  }
  .ant-tabs-tab {
    text-align: center !important;
    width: 16.66% !important;
  }
`
