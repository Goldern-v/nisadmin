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
export interface Props extends RouteComponentProps<{ name?: string }> {}

import { ReactComponent as SJZK } from './images/icon/SJZK.svg'
import { ReactComponent as YDBG } from './images/icon/YDBG.svg'
import { ReactComponent as HZBG } from './images/icon/HZBG.svg'
import { ReactComponent as WTBG } from './images/icon/WTBG.svg'

const LEFT_MENU_CONFIG: any = [
  {
    title: '三级质控记录',
    icon: <SJZK />,
    path: '/qcThree',
    component: { ...QualityControlRecord }
  },
  {
    title: '三级质控月度报告',
    icon: <YDBG />,
    path: '/qcThree/analysis',
    component: Analysis
  },
  {
    title: '三级质控汇总报告',
    icon: <HZBG />,
    path: '/qcThree/summaryReport',
    component: SummaryReport
  },
  {
    title: '三级质控问题汇总',
    icon: <WTBG />,
    path: '/qcThree/problemSummary',
    component: ProblemSummary
  }
]

export default function QcThreeRouter(props: Props) {
  useEffect(() => {}, [props.history.location.pathname])
  let currentRoutePath = props.history.location.pathname || ''
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

  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={LEFT_MENU_CONFIG} />
      </LeftMenuCon>
      <MainCon>
        {currentRoute && currentRoute.component && (
          <currentRoute.component getTitle={currentRoute && currentRoute.title} />
        )}
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
