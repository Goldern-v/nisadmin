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
import { ReactComponent as HZBG } from "./images/icon/HZBG.svg"
import 护理质量巡查情况汇总表 from './views/qcFormHj/护理质量巡查情况汇总表'
// import { appStore } from 'src/stores'
import 护理质量检查小结 from './views/qcFormHj/护理质量检查小结'
import 质控表单汇总 from './views/qcDghl/质控表单汇总'

// 合并武汉的一级质量
import { ReactComponent as YIBG } from './images/icon/YJBG.svg'
import { ReactComponent as YJJL } from './images/icon/YJJL.svg'
import { appStore, authStore } from 'src/stores'

import FollowUpRecord from './views/qcOne/page/followUpRecord/FollowUpRecord'
import SafetyHazards from './views/qcOne/page/safetyHazards/SafetyHazards'
import HumanResource from './views/qcOne/page/humanResource/HumanResource'
import NursingReportList from './views/qcOne/report/NursingReportList/NursingReportList'
// import NursingReportDetailView from './views/qcOne/report/NursingReportDetail/NursingReportDetailView'
import NursingWorkPlainList from './views/qcOne/page/nursingWorkPlain/NursingWorkPlainList'
import NursingQualityCheck from './views/qcOne/page/nursingQualityCheck/NursingQualityCheck'
import NurseMeetingRecord from './views/qcOne/page/nurseMeetingRecord/NurseMeetingRecord'
import BadEventRecord from './views/qcOne/page/badEventRecord/BadEventRecord'
// 质控报告
import StarRatingReport from './views/qcOne/report/StarRatingReport/StarRatingReport'
import StarRatingYearReport from './views/qcOne/report/StarRatingYearReport/StarRatingYearReport'
import BadEventReport from './views/qcOne/report/BadEventReport/BadEventReport'
import PatientVisitQuarter from './views/qcOne/report/PatientVisitQuarter/PatientVisitQuarter'
import PatientVisitMonth from './views/qcOne/report/PatientVisitMonth/PatientVisitMonth'
import SafetyCheckReport from './views/qcOne/report/SafetyCheck/SafetyCheckReport'
// 护士满意度调查表
import SatisfyInvestigation from './views/qcOne/page/satisfyInvestigation/SatisfyInvestigation'
import SatisfyInvestigationDetail from './views/qcOne/page/satisfyInvestigation/SatisfyInvestigationDetail'
// 患者满意度调查表
import SatisfiedPatInvestigation from './views/qcOne/page/satisfiedPat/SatisfiedPatInvestigation'
import SatisfiedPatInvestigationDetail from './views/qcOne/page/satisfiedPat/SatisfiedPatInvestigationDetail'
// 工作量统计
import Workload from './views/workload/Workload'
// import 护理质量巡查情况汇总表 from './views/qcFormHj/护理质量巡查情况汇总表'
// import QualityControlRecord from './views/qualityControlRecord/QualityControlRecord'

// import { ReactComponent as EJZK } from './images/icon/EJZK.svg'
// import { ReactComponent as YDBG } from './images/icon/YDBG2.svg'

export default function QcOneRouterHj(props: Props) {

  const route_质控记录 = {
    title: '一级质控记录',
    path: '/qcOneDghl',
    icon: <EJZK />,
    component: { ...QualityControlRecord },
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
  }

  const route_护理质量巡查情况汇总表 = {
    title: '护理质量巡查情况汇总表',
    icon: <YDBG />,
    path: '/qcOneDghl/护理质量巡查情况汇总表?qcLevel=1',
    component: 护理质量巡查情况汇总表,
    keepAlive: true,
    // hide: !appStore.isDev,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
  }

  const route_护理质量检查小结 = {
    title: "护理质量检查小结",
    icon: <YDBG />,
    path: "/qcOneDghl/护理质量检查小结?qcLevel=1",
    component: 护理质量检查小结,
    keepAlive: true,
    // hide: !appStore.isDev,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  }

  const route_质控表单汇总 = {
    title: "单个质控表单汇总",
    icon: <HZBG />,
    path: "/qcOneDghl/质控表单汇总?qcLevel=1",
    component: 质控表单汇总,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  }

  const LEFT_MENU_CONFIG: any = [
    route_质控记录,
    route_护理质量巡查情况汇总表,
    route_护理质量检查小结,
    ...appStore.hisMatch({
      map: {
        dghl: [route_质控表单汇总],
        jmfy: [
          {
            title: '一级质控记录表单',
            path: '/qcOneDghl',
            icon: <EJZK />,
            component: { ...QualityControlRecord },
            keepAlive: true,
            disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
          },
          {
            title: '护理质量巡查情况汇总表',
            icon: <YDBG />,
            path: '/qcOneDghl/护理质量巡查情况汇总表?qcLevel=1',
            component: 护理质量巡查情况汇总表,
            keepAlive: true,
            // hide: !appStore.isDev,
            disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
          }
        ],
        default: []
        // other: []
      }
    }),
    {
      title: '一级质控表',
      icon: <YJJL />,
      children: [
        {
          title: '护理工作计划',
          path: '/qcOneDghl/nursingWorkPlainList',
          component: NursingWorkPlainList,
          keepAlive: true,
          disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '病区质量检查',
          path: '/qcOneDghl/nursingQualityCheck',
          component: NursingQualityCheck,
          keepAlive: true,
          disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士会议记录',
          path: '/qcOneDghl/nurseMeetingRecord',
          component: NurseMeetingRecord,
          keepAlive: true,
          disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '不良事件记录',
          path: '/qcOneDghl/badEventRecord',
          component: BadEventRecord,
          keepAlive: true,
          disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '人力资源调配',
          path: '/qcOneDghl/humanResource',
          component: HumanResource
        },
        {
          title: '安全隐患排查表',
          path: '/qcOneDghl/safetyHazards',
          component: SafetyHazards,
          keepAlive: true,
          disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '季度家庭随访表',
          path: '/qcOneDghl/followUpRecord',
          component: FollowUpRecord
        }
      ]
    },
    {
      title: '病区护理工作报表',
      icon: <YIBG />,
      path: '/qcOneDghl/nursingReportList',
      component: NursingReportList,
      keepAlive: true,
      disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP',
      hide: !authStore.isRoleManage
    },
    {
      title: '星级考核报表',
      icon: <YIBG />,
      path: '/qcOneDghl/starRatingReport',
      component: StarRatingReport,
      keepAlive: true,
      disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '年度星级考核报表',
      icon: <YIBG />,
      path: '/qcOneDghl/starRatingYearReport',
      component: StarRatingYearReport,
      keepAlive: true,
      disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '不良事件登记表',
      icon: <YIBG />,
      path: '/qcOneDghl/badEventReport',
      component: BadEventReport,
      keepAlive: true,
      disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '安全隐患排查汇总表',
      icon: <YIBG />,
      path: '/qcOneDghl/safetyCheckReport',
      component: SafetyCheckReport,
      keepAlive: true,
      disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '季度家访汇总表',
      icon: <YIBG />,
      path: '/qcOneDghl/patientVisitQuarter',
      component: PatientVisitQuarter,
      keepAlive: true,
      disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '月度随访表',
      icon: <YIBG />,
      path: '/qcOneDghl/patientVisitMonth',
      component: PatientVisitMonth,
      keepAlive: true,
      disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
    },
    ...appStore.hisMatch({
      map: {
        wh: [
          {
            title: '满意度调查表',
            icon: <YJJL />,
            hide: !appStore.isDev,
            children: [
              {
                title: '护士满意度调查表详情',
                hide: true,
                path: '/qcOneDghl/satisfyInvestigationDetail',
                component: SatisfyInvestigationDetail,
              },
              {
                title: '护士满意度调查表',
                path: '/qcOneDghl/satisfyInvestigation',
                component: SatisfyInvestigation,
                keepAlive: true,
                disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
              },
              {
                title: '患者满意度调查表详情',
                hide: true,
                path: '/qcOneDghl/satisfiedPatInvestigationDetail',
                component: SatisfiedPatInvestigationDetail,
              },
              {
                title: '患者满意度调查表',
                path: '/qcOneDghl/satisfiedPatInvestigation',
                component: SatisfiedPatInvestigation,
                keepAlive: true,
                disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
              },
            ]
          },
          {
            title: '工作量',
            icon: <YJJL />,
            hide: !appStore.isDev,
            children: [
              {
                title: '服务之星',
                path: '/qcOneDghl/serviceStar',
                component: Workload,
                keepAlive: true,
                indexKey: '1',
                disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
              },
              {
                title: '技术能手',
                path: '/qcOneDghl/technicalExperts',
                component: Workload,
                keepAlive: true,
                indexKey: '2',
                disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
              },
              {
                title: '工作量统计',
                path: '/qcOneDghl/workloadStatistics',
                component: Workload,
                keepAlive: true,
                indexKey: '3',
                disabledKeepAlive: () => (appStore.history && appStore.history.action) !== 'POP'
              }
            ]
          }
        ],
        default: [],
      }
    })
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
