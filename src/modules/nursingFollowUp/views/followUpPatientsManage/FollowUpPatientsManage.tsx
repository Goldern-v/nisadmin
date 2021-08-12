import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
import 已分配出院患者 from './components/已分配出院患者'
import 待分配出院患者 from './components/待分配出院患者'

export interface Props { }

export default function FollowUpPatientsManage(props: any) {
  const { queryObj, history } = appStore
  const handleTagChange = (tabId: string) => {
    history.replace(`/nursingFollowUp/随访患者管理?tabId=${tabId}`)
  }
  const tabList = [
    { name: '已分配出院患者', id: '1' },
    { name: '待分配出院患者', id: '2' },
  ]
  const currentView = () => {
    switch (queryObj.tabId) {
      case '2':
        return <待分配出院患者 />
      default:
        return <已分配出院患者 />
    }
  }
  return <Wrapper>
    <div className="body">
      <div className="tab-nav-header">
        {tabList.map((item: any) => (
          <div
            key={item.id}
            className={[
              'tag-item',
              (() => {
                if (item.id == '1' && !queryObj.tabId)
                  return 'active'
                return item.id == queryObj.tabId ? 'active' : ''
              })()
            ].join(' ')}
            onClick={() => handleTagChange(item.id)}>
            {item.name}
          </div>
        ))}
      </div>
      <div className="page-content">
        {currentView()}
      </div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  height: 100%;
  width: 90vw;
  display: flex;
  flex-direction: column;
  .tab-nav-header{
    background: #fff;
    overflow: hidden;
    &>div{
      cursor: pointer;
      padding: 0 15px;
      border-right: 1px solid #eee;
      height:36px;
      font-size: 14px;
      line-height:36px;
      width: auto;
      float: left;
      &.active{
        background: rgba(0,0,0,0.045);
      }
    }
  }
  .page-content{
    flex: 1;
  }
`