import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Tabs, Input } from 'antd'
const TabPane = Tabs.TabPane
export interface Props {
  config?: any[]
  style?: any
  treeData: any
}

export default function BaseTreeSelect (props: Props) {
  return (
    <Wrapper style={props.style ? { ...props.style } : {}}>
      <TreeSelectDiv>
        <Input type='text' />
        <DownloadPane>
          !!!!
          {/* {props.config.map((item: any, index: number) => {
            return (
              <TabPane tab={item.title} key={index.toString()}>
                {item.component}
              </TabPane>
            )
          })} */}
        </DownloadPane>
      </TreeSelectDiv>
    </Wrapper>
  )
}
const Wrapper = styled.div``
const DownloadPane = styled.div`
  position: absolute;
  background: red;
  z-index: 100;
`
const TreeSelectDiv = styled.div`
  min-height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 0px solid rgba(219, 224, 228, 1);
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
    transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
  }

  .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab.ant-tabs-tab-active {
    background: #fff !important;
    border-bottom: 0 !important;
    color: #333333 !important;
  }
  .ant-tabs-nav-container * ::after,
  .ant-tabs-nav-container * ::before {
    display: none !important;
  }
`
