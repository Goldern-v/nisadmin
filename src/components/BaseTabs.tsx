import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane
export interface Props {
  config: any[]
}

export default function BaseTabs (props: Props) {
  return (
    <TabsCon>
      <Tabs type='card'>
        {props.config.map((item: any, index: number) => {
          return (
            <TabPane tab={item.title} key={index.toString()}>
              {item.component}
            </TabPane>
          )
        })}
      </Tabs>
    </TabsCon>
  )
}
const TabsCon = styled.div`
  min-height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(219, 224, 228, 1);
  overflow: hidden;
  .ant-tabs-card > .ant-tabs-content {
    margin-top: -16px;
  }

  .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
  }

  .ant-tabs-card > .ant-tabs-bar {
    background: rgba(242, 244, 245, 1);
  }

  .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    background: transparent !important;
    border: 0 !important;
    border-right: 1px solid #dbe0e4 !important;
    border-bottom: 1px solid #dbe0e4 !important;
    margin-right: 0 !important;
    border-radius: 0 !important;
    font-size: 13px !important;
    color: #7a7f8f !important;
  }

  .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab.ant-tabs-tab-active {
    background: #fff !important;
    border-bottom: 0 !important;
    color: #333333 !important;
  }
`
