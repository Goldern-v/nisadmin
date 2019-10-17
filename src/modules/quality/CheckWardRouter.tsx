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

import { ReactComponent as CXTJ } from './images/查询统计.svg'
import { ReactComponent as FXBG } from './images/分析报告.svg'
import { ReactComponent as ZKJL } from './images/质控记录.svg'
import { appStore } from 'src/stores'
import RecordView from './views/checkWard/view/record/RecordView'
import ScheduleView from './views/checkWard/view/schedule/ScheduleView'
import CheckWardReportView from './views/checkWard/view/report/CheckWardReportView'
import WritingForm from './views/writingForm/WritingForm'

const LEFT_MENU_CONFIG: any = [
  {
    title: '查房记录',
    path: '/checkWard',
    component: RecordView
  },
  {
    title: '查房计划表',
    path: '/checkWard/schedule',
    component: ScheduleView
  },
  {
    title: '查房统计报告',
    path: '/checkWard/checkWardReportView',
    component: CheckWardReportView
  }
]

export default function CheckWardRouter(props: Props) {
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
