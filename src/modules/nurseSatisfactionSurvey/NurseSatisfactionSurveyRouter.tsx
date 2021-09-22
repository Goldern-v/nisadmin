import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftMenuPage from 'src/components/LeftMenuPage'
import NurseSatisfactionSurvey from './page/NurseSatisfactionSurvey'
import { ReactComponent as WCJD } from './images/WCJD.svg'
import { ReactComponent as CSWD } from './images/CSWD.svg'
import { ReactComponent as BKES } from './images/BKSD.svg'
import { appStore } from 'src/stores'
export interface Props {}

export default function WardLog() {
  const leftMenuConfig = [
    {
      title: '护士长年计划',
      path: '/nurseSatisfactionSurvey/year',
      icon: <WCJD />,
      component: { ...NurseSatisfactionSurvey },
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '护士长月计划',
      path: '/nurseSatisfactionSurvey/month',
      icon: <BKES />,
      component: { ...NurseSatisfactionSurvey },
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '护士长年总结',
      path: '/nurseSatisfactionSurvey/conclusion',
      icon: <CSWD />,
      component: { ...NurseSatisfactionSurvey },
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '护理创新项目记录',
      path: '/nurseSatisfactionSurvey/innovation',
      icon: <CSWD />,
      component: { ...NurseSatisfactionSurvey },
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    }
  ]
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
