import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Spin } from 'antd'
import LeftMenu from 'src/components/LeftMenu'
import { observer } from 'mobx-react';
import FollowUpGroupPlan from './views/followUpGroupPlan/FollowUpGroupPlan'
import FollowUpGroupStatistical from './views/followUpGroupStatistical/FollowUpGroupStatistical'
import FollowUpPatientsManage from './views/followUpPatientsManage/FollowUpPatientsManage'
import FollowUpGroupManage from './views/followUpGroupManage/FollowUpGroupManage'
import DiseaseManage from './views/diseaseManage/DiseaseManage'
import FollowUpQuestionnaireManage from './views/followUpQuestionnaireManage/FollowUpQuestionnaireManage'
export interface Props { }
export default observer(function NursingFollowUpRouter(props: any) {
  const { location } = props
  const [modlueLoading, setModuleLoading] = useState(false)
  const [authMenu, setAuthMenu] = useState([] as any[])
  const LEFT_MENU = [
    ...authMenu
  ] as any[]
  const targetComponent = () => {
    const BaseCon = (
      <MainCon>
        <Spin spinning={modlueLoading}>
          <BaseMatchCon>{modlueLoading ? '' : '无匹配模块'}</BaseMatchCon>
        </Spin>
      </MainCon>
    )
    const getTagetMenu = () => {
      let currentPathName = location.pathname || ''
      let targetMenu = null as any
      LEFT_MENU.forEach((menuItem: any) => {
        if (targetMenu) return
        if (menuItem.children) {
          menuItem.children
            .map((childItem: any) => {
              if(childItem.path == currentPathName){
                targetMenu = childItem
              }
            })
        } else if (currentPathName === menuItem.path) {
          targetMenu = menuItem
        }
      })
      return targetMenu
    }
    if (modlueLoading)
      return BaseCon
    const targetMenu = getTagetMenu()
    if (targetMenu) return <targetMenu.component {...targetMenu.props || {}} />
    return BaseCon
  }
  const getAuthMenu = () => {
    setModuleLoading(true)
    setTimeout(() => {
      setModuleLoading(false)
      setAuthMenu([
        {
          title: '随访计划',
          path: '/nursingFollowUp',
          props: {
            可随访: true,
            可随访分配护士: false
          },
          component: FollowUpGroupPlan,
        },
        {
          title: '随访患者管理',
          path: '/nursingFollowUp/随访患者管理',
          props: {
            可随访: true,
            可随访分配护士: false
          },
          component: FollowUpPatientsManage,
        },
        {
          title: '随访统计',
          path: '/nursingFollowUp/随访统计',
          props: {
            可随访: true,
            可随访分配护士: false
          },
          component: FollowUpGroupStatistical,
        },
        {
          title: '随访设置',
          children : [
            {
              title: '病种管理',
              path: '/nursingFollowUp/病种管理',
              props: {
                可随访: true,
                可随访分配护士: false
              },
              component: DiseaseManage,
            },
            {
              title: '随访问卷管理',
              path: '/nursingFollowUp/随访问卷管理',
              props: {
                可随访: true,
                可随访分配护士: false
              },
              component: FollowUpQuestionnaireManage,
            },
            {
              title: '随访小组管理',
              path: '/nursingFollowUp/随访小组管理',
              props: {
                可随访: true,
                可随访分配护士: false
              },
              component: FollowUpGroupManage,
            },
          ]
        },
      ])
    }, 1000)
  }
  useEffect(() => {
    getAuthMenu()
  }, [])
  return <Wrapper>
    <LeftMenuCon>
      <LeftMenu config={LEFT_MENU} menuTitle="护理随访" />
    </LeftMenuCon>
    {targetComponent()}
  </Wrapper>
})
const Wrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
  overflow: hidden;
  .nursingData {
    height: 100%;
    width: 100%;
    padding: 0 15px 0 40px;
    box-sizing: border-box;
  }
  .nursingCharges {
    height: 100%;
    width: 88%;
    padding: 0 15px 0 40px;
    box-sizing: border-box;
  }
`;
const BaseMatchCon = styled.div`
  width: 100%;
  height: 100%;
  line-height: calc(100vh - 48px);
  text-align: center;
  font-size: 24px;
`
const LeftMenuCon = styled.div`
  width: 200px;
`;
const MainCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  width: 0px;
  align-items: stretch;
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  padding: 5px 15px;
`