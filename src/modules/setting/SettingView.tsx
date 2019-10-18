import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { appStore } from 'src/stores'

import HealthPropagandaView from './../healthPropaganda/HealthPropagandaView'
import EditTable from './components/EditTable'
import settingViewModel from './SettingViewModel'
import AutomaticPush from './view/ AutomaticPush'
import CategoryDictionary from './view/CategoryDictionary'

import { ReactComponent as JKXJZD } from './images/JKXJZD.svg'
import { ReactComponent as JJRSZ } from './images/JJRSZ.svg'
import { ReactComponent as KSPHSZ } from './images/KSPHSZ.svg'

import 绩效参数设置 from './view/绩效参数设置'
import 节假日设置 from './view/节假日设置'
import 物流角色设置 from './view/物流角色设置'
import 健康宣教字典 from './../healthPropaganda/健康宣教字典'
import Preview from './view/components/Preview'
import DeptFileShare from 'src/modules/deptReferSetting/views/DeptFileShare'
import FlatManage from 'src/modules/deptReferSetting/views/FlatManage'
import HealthEducationReportList from '../healthEducationReport/healthEducationReportList/HealthEducationReportList'
// 引入类别字典设置页面
// 引入自动推送设置页面
export interface Props extends RouteComponentProps<{ name?: string }> {}

const LEFT_MENU_CONFIG = [
  // {
  //   title: '护理诊断字典',
  //   icon: <HLZDZD />,
  //   path: '/setting/护理诊断字典'
  // },
  {
    title: '健康宣教设置',
    icon: <JKXJZD />,
    path: '/setting/健康宣教字典',
    children: [
      {
        title: '类别字典设置',
        path: '/setting/typeDict',
        component: CategoryDictionary
      },
      {
        title: '健康宣教字典详情',
        path: '/setting/健康宣教字典详情',
        component: HealthPropagandaView,
        hide: true
      },
      {
        title: '健康宣教字典',
        path: '/setting/健康宣教字典',
        component: 健康宣教字典
      },
      {
        title: '健康宣教字典详情',
        path: '/setting/自动推送字典详情',
        component: Preview,
        hide: true
      },
      {
        title: '自动推送设置',
        path: '/setting/pushSetting',
        component: AutomaticPush
      },
      {
        title: '健康宣教月度报告',
        path: '/setting/healthEducationReportList',
        component: HealthEducationReportList
      }
    ]
  },
  // {
  //   title: '护理评估设置',
  //   icon: <HLPGSZ />,
  //   path: '/setting/护理评估设置'
  // },
  {
    title: '节假日设置',
    icon: <JJRSZ />,
    path: '/setting/节假日设置',
    component: 节假日设置
  },
  {
    title: '科室偏好设置',
    icon: <KSPHSZ />,
    path: '/setting/科室文件共享',
    children: [
      {
        title: '扁平管理设置',
        path: '/setting/扁平管理设置',
        component: FlatManage
      },
      {
        title: '病区文件',
        path: '/setting/病区文件',
        component: DeptFileShare
      }
    ]
  }
  // {
  //   title: '物流平台设置',
  //   icon: <WLPTSZ />,
  //   children: [
  //     {
  //       title: '物品分类字典设置',
  //       path: '/setting/物品分类字典设置',
  //       component: EditTable
  //     },
  //     {
  //       title: '物流角色设置',
  //       path: '/setting/物流角色设置',
  //       component: 物流角色设置
  //     },
  //     {
  //       title: '物流分类及流程设置',
  //       path: '/setting/物流分类及流程设置'
  //     }
  //   ]
  // },
  // {
  //   title: '绩效参数设置',
  //   icon: <JXCSSZ />,
  //   path: '/setting/绩效参数设置',
  //   component: 绩效参数设置
  // }
]
const LEFT_MENU_CONFIG_WH = [
  {
    title: '科室偏好设置',
    icon: <KSPHSZ />,
    path: '/setting/科室文件共享',
    children: [
      {
        title: '扁平管理设置',
        path: '/setting/扁平管理设置',
        component: FlatManage
      },
      {
        title: '病区文件',
        path: '/setting/病区文件',
        component: DeptFileShare
      }
    ]
  }
]

export default function SettingView(props: Props) {
  useEffect(() => {}, [props.match.params.name])
  let currentRoutePath = props.match.url || ''
  let currentRoute = getTargetObj(LEFT_MENU_CONFIG, 'path', currentRoutePath)
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
  settingViewModel.setHeadTitle(cacheSetHeadTitle)
  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={appStore.HOSPITAL_ID == 'wh' ? LEFT_MENU_CONFIG_WH : LEFT_MENU_CONFIG} menuTitle='系统设置' />
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
