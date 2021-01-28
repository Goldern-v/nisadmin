import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import { appStore } from "src/stores/index";
import BaseTabs from "src/components/BaseTabs";
import { Button } from "antd";

interface Props { }
export default observer(function TrainingManual(props: Props) {

  // 初始化数据
  useEffect(() => {
  }, []);

  const TABS_LIST_NURSE = [
    {
      title: 'N0',
      component: <Table />
    },
    {
      title: 'N1',
      component: <Table />
    },
    {
      title: 'N2',
      component: <Table />
    },
    {
      title: 'N3',
      component: <Table />
    },
    {
      title: 'N4',
      component: <Table />
    },
    {
      title: 'N5',
      component: <Table />
    }
  ];

  function Table() {
    const Page = styled.div`
      position: relative;
      .spcialNav {
        position: absolute;
        top: -35px;
        right: 0
      }
    `
    return (
      <Page>
      </Page>
    )
  }



  return (
    <Wrapper>
      <Header>
        <Title>培训手册</Title>
        <HandleBtn>
          <Button type="primary">培训清单管理</Button>
        </HandleBtn>
      </Header>
      <Content>
        <BaseTabs
          // defaultActiveKey={onlineLearningModal.key}
          config={TABS_LIST_NURSE}
          onChange={(key: any) => {
            // onlineLearningModal.tabsChanged(key);
            // onlineLearningModal.key = key;
          }}
        />
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
  .ant-tabs-tab {
    text-align: center !important;
    width: 150px;
  }
`
