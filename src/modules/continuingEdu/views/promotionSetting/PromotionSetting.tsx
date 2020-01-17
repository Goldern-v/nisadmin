import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Tabs } from 'antd'
import { PageHeader, PageTitle, Place } from "src/components/common"
import TabContent from "./components/TabContent"
import createModal from 'src/libs/createModal'
import RequestEditModal from './components/RequestEditModal'
const { TabPane } = Tabs
export interface Props { }

export default function PromotionSetting() {

  let tabConfig = [
    {
      title: "N1升N2",
      index: 1
    },
    {
      title: "N2升N3",
      index: 2
    }
  ] as any[]

  let requestEditModal = createModal(RequestEditModal)

  return <Wrapper>
    <PageHeader>
      <PageTitle>晋升要求设置</PageTitle>
      <Place />
      <Button onClick={() => requestEditModal.show()}>编辑</Button>
    </PageHeader>
    <MainContent>
      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={(info: any) => console.log(info)}>
          {tabConfig.map((item: any) =>
            <TabPane tab={item.title} key={item.index}></TabPane>)}
        </Tabs>
        <TabContent />
      </div>
    </MainContent>
    <requestEditModal.Component />
  </Wrapper>
}
const Wrapper = styled.div``

const MainContent = styled.div`
  padding: 0 15px;
  &>div{
    background: #fff;
  }
  .ant-tabs-top-bar{
    padding:0;
    margin: 0;
  }
`