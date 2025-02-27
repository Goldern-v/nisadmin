import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { appStore } from 'src/stores'

import wardManagementViewModel from './WardManagementViewModel'

import { ReactComponent as KSPHSZ } from './images/KSPHSZ.svg'

import DeptFileShare from 'src/modules/deptReferSetting/views/DeptFileShare'
import DeptBed from 'src/modules/deptReferSetting/views/DeptBed'
import FlatManage from 'src/modules/deptReferSetting/views/FlatManage'
import ManagementSummary from '../deptReferSetting/views/ManagementSummary'
import FlatManageProblemList from '../deptReferSetting/views/FlatManageProblemList'
// 引入类别字典设置页面
// 引入自动推送设置页面
export interface Props extends RouteComponentProps<{ name?: string }> { }

const LEFT_MENU_CONFIG = [
  {
    title: '扁平管理',
    component: FlatManage,
    icon: <KSPHSZ />,
    children: [
      {
        title: '扁平管理设置',
        path: '/wardManagement/扁平管理设置',
        component: FlatManage
      },
      {
        title: '扁平管理问题查看',
        path: '/wardManagement/扁平管理问题查看',
        component: FlatManageProblemList
        // hide: true
      },
      {
        title: '扁平管理汇总',
        path: '/wardManagement/扁平管理汇总',
        component: ManagementSummary
      }
    ]
  },
  ...appStore.hisMatch({
    map: {
      dghl: [],//东莞横沥屏蔽
      default: [
        {
            title: '病区文件',
            path: '/wardManagement/病区文件',
            component: DeptFileShare,
            icon: <KSPHSZ />
        }
      ]
    }
  }),
  // {
  //   title: '病区文件',
  //   path: '/wardManagement/病区文件',
  //   component: DeptFileShare,
  //   icon: <KSPHSZ />
  // },
  ...appStore.hisMatch({
    map: {
      wh: [
        {
          title: '病区床位',
          path: '/wardManagement/病区床位',
          hide: !appStore.isDev,
          component: DeptBed,
          icon: <KSPHSZ />
        }
      ],
      default: []
    }
  })
]

export default function WardManagementView(props: Props) {
  useEffect(() => { }, [props.match.params.name])
  let currentRoutePath = props.match.url || ''

  let currentRoute = getTargetObj(
    LEFT_MENU_CONFIG,
    'path',
    currentRoutePath
  )
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find((item1: any) => item1[targetKey] === targetName)
      } else {
        return item[targetKey] === targetName
      }
    })
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find((item1: any) => item1[targetKey] === targetName)
    }
    return chooseRoute
  }
  let cacheSetHeadTitle = currentRoute && currentRoute.title
  wardManagementViewModel.setHeadTitle(cacheSetHeadTitle)

  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={LEFT_MENU_CONFIG} />
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
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
`

const LeftMenuCon = styled.div`
  width: 200px;
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
