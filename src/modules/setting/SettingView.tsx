import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
// import { RouteComponentProps } from 'react-router'
import LeftMenu from 'src/components/LeftMenu'
import { appStore } from 'src/stores'
import EditTable from './components/EditTable'
import 绩效参数设置 from './view/绩效参数设置'
import 节假日设置 from './view/节假日设置'
import 物流角色设置 from './view/物流角色设置'
import settingViewModel from './SettingViewModel'

export interface Props extends RouteComponentProps<{ name?: string }> {}

const LEFT_MENU_CONFIG = [
  {
    title: '护理诊断字典',
    path: '/setting/护理诊断字典'
  },
  {
    title: '健康宣教字典',
    path: '/setting/健康宣教字典'
  },
  {
    title: '护理评估设置',
    path: '/setting/护理评估设置'
  },
  {
    title: '节假日设置',
    path: '/setting/节假日设置',
    component: 节假日设置
  },
  {
    title: '物流平台设置',
    children: [
      {
        title: '物品分类字典设置',
        path: '/setting/物品分类字典设置',
        component: EditTable
      },
      {
        title: '物流角色设置',
        path: '/setting/物流角色设置',
        component: 物流角色设置
      },
      {
        title: '物流分类及流程设置',
        path: '/setting/物流分类及流程设置'
      }
    ]
  },
  {
    title: '绩效参数设置',
    path: '/setting/绩效参数设置',
    component: 绩效参数设置
  }
]

// const getCurrentRoute = (type: string) => {
//   return {
//     title: type
//   }
// }

export default function SettingView (props: Props) {
  // let currentType = appStore.match.params.type
  // let currentRoute = getCurrentRoute(currentType)

  useEffect(() => {
    console.log(props)
    console.log(currentRoute)
  }, [props.match.params.name])
  let currentRouteName = props.match.params.name || ''
  let currentRoute = getTargetObj(LEFT_MENU_CONFIG, 'title', currentRouteName)
  // 筛选目标对象
  function getTargetObj (listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find((item1: any) => item1[targetKey] === targetName)
      } else {
        return item[targetKey] === targetName
      }
    })
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find((item1: any) => item1.title === targetName)
    }
    return chooseRoute
  }
  let cacheSetHeadTitle = currentRoute && currentRoute.title
  settingViewModel.setHeadTitle(cacheSetHeadTitle)
  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={LEFT_MENU_CONFIG} menuTitle='系统设置' />
      </LeftMenuCon>
      <MainCon>
        {/*
        <TopCon>{currentRoute && currentRoute.title}</TopCon>
        <TableCon> */}
        {/* <EditTable /> */}
        {currentRoute && currentRoute.component && (
          <currentRoute.component getTitle={currentRoute && currentRoute.title} />
        )}
        {/* </TableCon>
         */}
      </MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - 93px);
  display: flex;
  align-items: stretch;
`

const LeftMenuCon = styled.div`
  width: 200px;
  position: relative;
  z-index: 1;
  background: #f8f8f8;
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border-top: 0;
`
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`

const TopCon = styled.div`
  height: 45px;
  background: #f8f8f8;
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  position: relative;
  font-size: 16px;
  color: #333333;
  padding: 0 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`

const TableCon = styled.div`
  flex: 1;
  margin: 15px;
  background: #fff;
  border: 1px solid rgba(228, 228, 228, 1);
`
