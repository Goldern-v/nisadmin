import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftMenuPage from 'src/components/LeftMenuPage'
import NurseHandBook from './page/NurseHandBook'
import { ReactComponent as WCJD } from './images/WCJD.svg'
import { ReactComponent as CSWD } from './images/CSWD.svg'
import { ReactComponent as BKES } from './images/BKSD.svg'
import { appStore } from 'src/stores'
export interface Props {}

export default function WardLog() {
  const leftMenuConfig:any = appStore.hisMatch({
    map: {
      gzsrm: [
        {
          title: '护士长年计划',
          path: '/nurseHandBook/year',
          icon: <WCJD />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士长月计划',
          path: '/nurseHandBook/month',
          icon: <BKES />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士长年总结',
          path: '/nurseHandBook/conclusion',
          icon: <CSWD />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护理创新项目记录',
          path: '/nurseHandBook/innovation',
          icon: <CSWD />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '业务学习项目',
          path: '/nurseHandBook/businessStudy',
          icon: <CSWD />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '管理小组会议记录',
          path: '/nurseHandBook/meetingRecord',
          icon: <CSWD />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '公休会记录',
          path: '/nurseHandBook/holidayRecord',
          icon: <CSWD />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        }
      ],
      default: [
        {
          title: '护士长年计划',
          path: '/nurseHandBook/year',
          icon: <WCJD />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士长月计划',
          path: '/nurseHandBook/month',
          icon: <BKES />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士长年总结',
          path: '/nurseHandBook/conclusion',
          icon: <CSWD />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护理创新项目记录',
          path: '/nurseHandBook/innovation',
          icon: <CSWD />,
          component: { ...NurseHandBook },
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        }
      ]
    }
  })
  
  
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
