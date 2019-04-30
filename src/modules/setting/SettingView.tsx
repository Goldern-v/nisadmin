import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import LeftMenu from 'src/components/LeftMenu'
import { appStore } from 'src/stores'
import EditTable from './components/EditTable'
export interface Props extends RouteComponentProps {}

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
    title: '物流平台设置',
    children: [
      {
        title: '物品分类字典设置',
        path: '/setting/物品分类字典设置'
      },
      {
        title: '物流角色设置',
        path: '/setting/物流角色设置'
      },
      {
        title: '物流分类及流程设置',
        path: '/setting/物流分类及流程设置'
      }
    ]
  }
]

const getCurrentRoute = (type: string) => {
  return {
    title: type
  }
}

export default function SettingView () {
  let currentType = appStore.match.params.type
  let currentRoute = getCurrentRoute(currentType)
  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={LEFT_MENU_CONFIG} />
      </LeftMenuCon>
      <MainCon>
        <TopCon>{currentRoute.title}</TopCon>
        <MainScroll>
          <TableCon>
            <EditTable />
          </TableCon>
        </MainScroll>
      </MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
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
const MainScroll = styled.div`
  flex: 1;
  overflow: auto;
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
  margin: 20px;
  background: #fff;
  border: 1px solid rgba(228, 228, 228, 1);
`
