import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Spin } from 'antd'
import LeftMenu from 'src/components/LeftMenu'
import { ReactComponent as ZKHL } from "./images/ZKHL.svg";
import { appStore } from 'src/stores';
import { observer } from 'mobx-react-lite';
import service from 'src/services/api';
import moment from 'moment'

import StatisticTable from './statisticsTable'
import NursingData from "./mainView/nursingData/NursingData"
import IndicatorBaseTable from './IndicatorBaseTable'
import SelfDeclaration from './selfDeclaration'

export default observer(function indicatorView(props: any) {
  const [modlueLoading, setModuleLoading] = useState(false)

  const [dateRange, setDateRange] = useState([
    moment().format('YYYY-MM-01'),
    moment().format('YYYY-MM-DD'),
  ])

  const [authMenu, setAuthMenu] = useState([] as any[])

  const LEFT_MENU = [...authMenu]

  const targetComponent = () => {
    let name = props.match.params.name || ''

    switch (name) {
      case '公共季度统计表':
      case '专科季度统计表':
        return <MainCon>
          <StatisticTable name={name}/>
        </MainCon>

      case 'eventReport': // 国家数据填报
        return <MainCon>
          <SelfDeclaration/>
        </MainCon>

      case '护理质量相关数据':
        return <div className="nursingData">
          <NursingData getTitle={props.match.params.name}/>
        </div>

      case '':
        return <MainCon>
          <Spin spinning={modlueLoading}>
            <BaseMatchCon>{modlueLoading ? '获取菜单...' : '无匹配模块'}</BaseMatchCon>
          </Spin>
        </MainCon>

      default:
        return <MainCon style={{ padding: '5px 0px' }}>
          <IndicatorBaseTable
            name={name}
            dateRange={dateRange}
            onDateRangeChange={(payload: any) => setDateRange(payload)}/>
        </MainCon>
    }
  }

  /**获取左侧菜单栏并初始化右侧面板 */
  const getMenu = () => {
    setModuleLoading(true)
    service.commonApiService.getSideMenu('SYS_MENU_001')
      .then(res => {
        setModuleLoading(false)
        let newAuthMenu = (res.data || []).map((item0: any, idx0: number) => {

          let menuItem0 = {
            title: item0.name || `未命名 ${idx0}`,
            path: `${item0.url}`,
            icon: <ZKHL/>,
          } as any

          if (item0.childrenMenu && item0.childrenMenu.length > 0) {
            menuItem0.children =
              item0.childrenMenu.map((item1: any, idx1: number) => {
                return {
                  title: item1.name || `未命名 ${idx0}-${idx1}`,
                  path: `${item1.url}`,
                }
              })
          }

          return menuItem0
        })

        setAuthMenu(newAuthMenu)
        //如果没有展示模块-则使用第一个模块展示
        let name = props.match.params.name || ''
        if (!name && newAuthMenu.length > 0) {
          let firstRoute = newAuthMenu[0]
          if (newAuthMenu[0].children && newAuthMenu[0].children.length > 0)
            firstRoute = newAuthMenu[0].children[0]

          console.log(firstRoute)

          appStore.history.replace(firstRoute.path)
        }
      }, () => setModuleLoading(false))
  }

  useEffect(() => {
    getMenu()
  }, [])

  return <Wrapper>
    <LeftMenuCon>
      <LeftMenu config={LEFT_MENU} menuTitle="敏感指标"/>
      {/* <StatisticLeftList /> */}
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
  /* position: relative;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
  border-top: 0;
  height: 100%; */
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