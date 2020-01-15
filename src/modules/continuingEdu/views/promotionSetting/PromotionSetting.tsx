import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from "src/components/common";
import BaseTabs, { ConfigItem } from "src/components/BaseTabs";
import TabContent from "./TabContent"
export interface Props { }

export default function PromotionSetting() {

  let tabConfig: ConfigItem[] = [
    {
      title: "已发布",
      component: <TabContent />,
      index: 1
    }
  ];

  return <Wrapper>
    <PageHeader>
      <PageTitle>晋升要求设置</PageTitle>
      <Place />
      <Button>编辑</Button>
    </PageHeader>
    <MainContent>
      <BaseTabs defaultActiveKey={'1'} config={tabConfig} />
    </MainContent>
  </Wrapper>
}
const Wrapper = styled.div``

const MainContent = styled.div`
 padding: 0 15px;
`