import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import AuditEduPlan from './../auditEduPlant/AuditEduPlan'
import FormReview from "./../trainingSetting/formReview/FormReview";
import 典型案例库审核 from './../学习资源/典型案例库/典型案例库审核'
import 学习笔记审核 from './views/学习笔记审核/学习笔记审核'
import { appStore } from 'src/stores'
import AppStore from 'src/stores/AppStore';
// import { Button } from 'antd'

export interface Props { }

export default observer(function 审核集中管理() {
  const { queryObj, history } = appStore
  const handleMenuRefresh = () => {

  }

  const handleTagChange = (tabId: string) => {
    history.replace(`/continuingEdu/审核发布?tabId=${tabId}`)
  }

  const tabList = [
    { name: '学习计划审核', id: '1' },
    { name: '资质准入审核', id: '2' },
    { name: '典型案例审核', id: '3' },
    { name: '学员笔记审核', id: '4' },
  ]

  const currentView = () => {
    switch (queryObj.tabId) {
      case '2':
        return <FormReview />
      case '3':
        return <典型案例库审核 />
      case '4':
        return <学习笔记审核 />
      default:
        return <AuditEduPlan
          btntop='151px'
          height='calc(100% - 80px)'
          surplusHeight={310}
          handleRefresh={handleMenuRefresh} />
    }
  }

  return <Wrapper>
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
  </Wrapper>
})

const Wrapper = styled.div`
  height: 100%;
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