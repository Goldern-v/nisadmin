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
export interface Props extends RouteComponentProps<{ name?: string }> { }

import { ReactComponent as CXTJ } from './images/查询统计.svg'
import { ReactComponent as FXBG } from './images/分析报告.svg'
import { ReactComponent as ZKJL } from './images/质控记录.svg'
import { appStore } from 'src/stores'
import RecordView from './views/checkWard/view/record/RecordView'
import ScheduleView from './views/checkWard/view/schedule/ScheduleView'
import CheckWardReportView from './views/checkWard/view/report/CheckWardReportView'
import ReportView from './views/checkWard/view/report1/ReportView'
import WritingForm from './views/writingForm/WritingForm'

const LEFT_MENU_CONFIG: any = [
  {
    title: '质控记录',
    icon: <ZKJL />,
    children: [
      // {
      //   title: '一级质控',
      //   path: '/quality/qualityControlRecord/1',
      //   component: { ...QualityControlRecord }
      // },
      {
        title: '二级质控',
        path: '/quality/qualityControlRecord/2',
        component: { ...QualityControlRecord }
      },
      {
        title: '三级质控',
        path: '/quality/qualityControlRecord/3',
        component: { ...QualityControlRecord }
      }
    ]
  },
  {
    title: '质控分析报告',
    icon: <FXBG />,
    children: [
      {
        title: '三级质控月度报告',
        path: '/quality/analysis',
        component: Analysis
      },
      {
        title: '三级质控汇总报告',
        path: '/quality/summaryReport',
        component: SummaryReport
      },
      {
        title: '三级质控问题汇总',
        path: '/quality/problemSummary',
        component: ProblemSummary
      },
      {
        title: '二级质控月度报告',
        path: '/quality/workSummaryReportList',
        component: WorkSummaryReportList
      }
    ]
  },

  {
    title: '查询统计',
    icon: <CXTJ />,
    children: [
      {
        title: '检查表单统计表',
        path: '/quality/queryStatistics',
        component: QueryStatistics
      },
      {
        title: '文件书写统计表',
        path: '/quality/writingForm',
        component: WritingForm
      }
    ]
  }
]

if (appStore.isDev) {
  LEFT_MENU_CONFIG.push({
    title: '护理查房',
    icon: <ZKJL />,
    children: [
      {
        title: '查房记录',
        path: '/quality/checkWard/record',
        component: RecordView
      },
      {
        title: '查房计划表',
        path: '/quality/checkWard/schedule',
        component: ScheduleView
      },
      {
        title: '查房统计报告',
        path: '/quality/checkWard/checkWardReportView',
        component: CheckWardReportView
      },
      // {
      //   title: '查房统计报告1',
      //   path: '/quality/checkWard/reportView',
      //   component: ReportView
      // }
    ]
  })
}

export default function QualityView(props: Props) {
  useEffect(() => { }, [props.history.location.pathname])
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
