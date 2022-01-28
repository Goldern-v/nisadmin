import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftMenuPage from 'src/components/LeftMenuPage'
import NurseHandBook_jmfy from './page/NurseHandBook_jmfy'
import NurseHandBook_lcey from './page/NurseHandBook_lcey'
import { ReactComponent as WCJD } from './images/WCJD.svg'
import { ReactComponent as CSWD } from './images/CSWD.svg'
import { ReactComponent as BKES } from './images/BKSD.svg'
import { appStore } from 'src/stores'
export interface Props {}

export default function NurseHandBookRouter() {
  const leftMenuConfig:any = appStore.hisMatch({
    map: {
      jmfy: [
        {
          title: '护士长工作计划',
          path: '/nurseHandBookNew/jmPlan',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士长工作总结',
          path: '/nurseHandBookNew/jmconclusion',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '月度人力、基础质量、专科质量指标分析',
          path: '/nurseHandBookNew/jmAnalyse',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        // {
        //   title: '月度质控分析与改进',
        //   path: '/nurseHandBookNew/jmQc',
        //   icon: <WCJD />,
        //   component: { ...NurseHandBook_jmfy },
        //   disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        // },
        {
          title: '护理人员季度考核成绩表',
          path: '/nurseHandBookNew/jmQuarterlyAudit',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护理人员月度培训实施记录表',
          path: '/nurseHandBookNew/jmMonthTrain',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '科室护理人员月度动态出勤表',
          path: '/nurseHandBookNew/jmDeptDuty',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '论文、科研、创新登记表',
          path: '/nurseHandBookNew/jmRegisterForm1',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '教学、培训登记表',
          path: '/nurseHandBookNew/jmRegisterForm2',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
      ],
      lcey: [
        {
          title: '护士基本情况',
          path: '/nurseHandBookNew/lcBaseInfo',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士考勤记录',
          path: '/nurseHandBookNew/lcAttendance',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护理工作计划',
          path: '/nurseHandBookNew/lcPlan',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护理工作总结',
          path: '/nurseHandBookNew/lcConclusion',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '继续教育及科研',
          path: '/nurseHandBookNew/lcEducation',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '病区工作',
          path: '/nurseHandBookNew/lcWard',
          icon: <WCJD />,
          component: { ...NurseHandBook_lcey },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
      ],
      default: []
    }
  })
  
  
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
