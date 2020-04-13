import styled from "styled-components"
import React, { useState, useEffect } from "react"
import { Button, Tabs, Spin } from "antd"
import { PageHeader, PageTitle, Place } from "src/components/common"
import TabContent from "./components/TabContent"
import createModal from "src/libs/createModal"
import RequestEditModal from "./components/RequestEditModal"
import { promotionSettingModel } from "./model/PromotionSettingModel"
import { observer } from "mobx-react-lite"
const { TabPane } = Tabs
export interface Props { }

export default observer(function PromotionSetting() {
  const { levelList, activeLevel, loading, currentLevelItem } = promotionSettingModel

  let requestEditModal = createModal(RequestEditModal)

  useEffect(() => {
    promotionSettingModel.inited()
  }, [])

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle maxWidth={1000}>晋升要求设置</PageTitle>
        <Place />
        <Button onClick={() => {
          if (!loading)
            requestEditModal.show({
              defaultLevelSort: currentLevelItem.sort || '',
              onOkCallBack: () => promotionSettingModel.getData()
            })
        }}>编辑</Button>
      </PageHeader>
      <MainContent>
        <div>
          <Spin spinning={loading}>
            <Tabs
              activeKey={activeLevel}
              onChange={(newLevel: any) =>
                promotionSettingModel.activeLevelChange(newLevel)
              }
            >
              {levelList.map((item: any) => (
                <TabPane tab={item.title} key={item.sort} />
              ))}
            </Tabs>
            <TabContent />
          </Spin>
        </div>
      </MainContent>
      <requestEditModal.Component />
    </Wrapper>
  )
})

const Wrapper = styled.div``

const MainContent = styled.div`
  padding: 0 15px;
  & > div {
    background: #fff;
  }
  .ant-tabs-top-bar {
    padding: 0;
    margin: 0;
  }
`
