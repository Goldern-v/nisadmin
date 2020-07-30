import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import QualityControlRecord from './views/qualityControlRecord/QualityControlRecord'
import QueryStatistics from './views/queryStatistics/QueryStatistics'
import Analysis from './views/analysis/Analysis'
import SummaryReport from './views/summaryReport/SummaryReport'
import WorkSummaryReportList from './views/workSummaryReportList/WorkSummaryReportList'
import ProblemSummary from './views/problemSummary/ProblemSummary'
import { Provider, KeepAlive } from 'react-keep-alive'
export interface Props extends RouteComponentProps<{ name?: string }> { }

import { ReactComponent as EJZK } from './images/icon/EJZK.svg'
import { ReactComponent as YDBG } from './images/icon/YDBG2.svg'
import 护理质量巡查情况汇总表 from './views/qcFormHj/护理质量巡查情况汇总表'
import 护理质量检查小结 from './views/qcFormHj/护理质量检查小结'
import { appStore } from 'src/stores'

export default function QcOneRouterHj(props: Props) {
  const LEFT_MENU_CONFIG: any = [
    {
      title: '一级质控记录',
      path: '/qcOneNys',
      icon: <EJZK />,
      component: { ...QualityControlRecord },
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '护理质量巡查情况汇总表',
      icon: <YDBG />,
      path: '/qcOneNys/护理质量巡查情况汇总表?qcLevel=1',
      component: 护理质量巡查情况汇总表,
      keepAlive: true,
      // hide: !appStore.isDev,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: "护理质量检查小结",
      icon: <YDBG />,
      path: "/qcOneNys/护理质量检查小结?qcLevel=1",
      component: 护理质量检查小结,
      keepAlive: true,
      // hide: !appStore.isDev,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
    },
  ]
  useEffect(() => { }, [props.history.location.pathname])
  let currentRoutePath = props.history.location.pathname || ''
  let currentRoute = getTargetObj(LEFT_MENU_CONFIG, 'path', currentRoutePath)
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find((item1: any) => item1[targetKey].split('?')[0] === targetName)
      } else {
        return item[targetKey].split('?')[0] === targetName
      }
    })
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find((item1: any) => item1[targetKey] === targetName)
    }
    return chooseRoute
  }

  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={LEFT_MENU_CONFIG} />
      </LeftMenuCon>
      <MainCon>
        {currentRoute &&
          currentRoute.component &&
          (currentRoute.keepAlive ? (
            <KeepAlive name={currentRoute.path} disabled={currentRoute.disabledKeepAlive}>
              <currentRoute.component getTitle={currentRoute && currentRoute.title} />
            </KeepAlive>
          ) : (
              <currentRoute.component getTitle={currentRoute && currentRoute.title} />
            ))}
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
