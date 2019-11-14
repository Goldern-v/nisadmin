import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { Provider, KeepAlive } from 'react-keep-alive'
export interface Props extends RouteComponentProps<{ name?: string }> { }

import { ReactComponent as YIBG } from './images/icon/YJBG.svg'
import { ReactComponent as YJJL } from './images/icon/YJJL.svg'
import { appStore, authStore } from 'src/stores'

import FollowUpRecord from './views/qcOne/page/followUpRecord/FollowUpRecord'
import SafetyHazards from './views/qcOne/page/safetyHazards/SafetyHazards'
import HumanResource from './views/qcOne/page/humanResource/HumanResource'
import NursingReportList from './views/qcOne/report/NursingReportList/NursingReportList'
import NursingReportDetailView from './views/qcOne/report/NursingReportDetail/NursingReportDetailView'
import NursingWorkPlainList from './views/qcOne/page/nursingWorkPlain/NursingWorkPlainList'
import NursingQualityCheck from './views/qcOne/page/nursingQualityCheck/NursingQualityCheck'
import NurseMeetingRecord from './views/qcOne/page/nurseMeetingRecord/NurseMeetingRecord'
import BadEventRecord from './views/qcOne/page/badEventRecord/BadEventRecord'

import StarRatingReport from './views/qcOne/report/StarRatingReport/StarRatingReport'
import BadEventReport from './views/qcOne/report/BadEventReport/BadEventReport'
import PatientVisitQuarter from './views/qcOne/report/PatientVisitQuarter/PatientVisitQuarter'
import PatientVisitMonth from './views/qcOne/report/PatientVisitMonth/PatientVisitMonth'
import SafetyCheckReport from './views/qcOne/report/SafetyCheck/SafetyCheckReport'

const LEFT_MENU_CONFIG: any = [
  {
    title: '一级质控记录',
    icon: <YJJL />,
    children: [
      {
        title: '护理工作计划',
        path: '/qcOne/nursingWorkPlainList',
        component: NursingWorkPlainList,
        keepAlive: true,
        disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
      },
      {
        title: '病区质量检查',
        path: '/qcOne/nursingQualityCheck',
        component: NursingQualityCheck,
        keepAlive: true,
        disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
      },
      {
        title: '护士会议记录',
        path: '/qcOne/nurseMeetingRecord',
        component: NurseMeetingRecord,
        keepAlive: true,
        disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
      },
      {
        title: '不良事件记录',
        path: '/qcOne/badEventRecord',
        component: BadEventRecord,
        keepAlive: true,
        disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
      },
      {
        title: '人力资源调配',
        path: '/qcOne/humanResource',
        component: HumanResource
      },
      {
        title: '安全隐患排查表',
        path: '/qcOne/safetyHazards',
        component: SafetyHazards,
        keepAlive: true,
        disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
      },
      {
        title: '季度家庭随访表',
        path: '/qcOne/followUpRecord',
        component: FollowUpRecord
      }
    ]
  },
  {
    title: '病区护理工作报表',
    icon: <YIBG />,
    path: '/qcOne/nursingReportList',
    component: NursingReportList,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP',
    hide: !authStore.isRoleManage
  },
  {
    title: '星级考核报表',
    icon: <YIBG />,
    path: '/qcOne/starRatingReport',
    component: StarRatingReport,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
  },
  {
    title: '不良事件登记表',
    icon: <YIBG />,
    path: '/qcOne/badEventReport',
    component: BadEventReport,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
  },
  // {
  //   title: '安全隐患排查汇总表',
  //   icon: <YIBG />,
  //   path: '/qcOne/safetyCheckReport',
  //   component: SafetyCheckReport,
  //   keepAlive: true,
  //   disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
  // },
  {
    title: '季度家访汇总表',
    icon: <YIBG />,
    path: '/qcOne/patientVisitQuarter',
    component: PatientVisitQuarter,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
  },
  {
    title: '月度随访表',
    icon: <YIBG />,
    path: '/qcOne/patientVisitMonth',
    component: PatientVisitMonth,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
  }
]

export default function QcOneRouter(props: Props) {
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
