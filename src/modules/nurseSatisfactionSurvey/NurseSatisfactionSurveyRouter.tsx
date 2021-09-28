import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftMenuPage from 'src/components/LeftMenuPage'
import NurseSatisfactionSurvey from './page/NurseSatisfactionSurvey'
import NurseSatisfactionSurveySet from './page/NurseSatisfactionSurveySet'
import { ReactComponent as WCJD } from './images/WCJD.svg'
import { ReactComponent as CSWD } from './images/CSWD.svg'
import { ReactComponent as BKES } from './images/BKSD.svg'
import { appStore } from 'src/stores'
export interface Props { }

export default function WardLog() {
  const leftMenuConfig = [
    {
      title: '护士长满意度调查表',
      path: '/nurseSatisfactionSurvey/questionnaire',
      icon: <WCJD />,
      component: NurseSatisfactionSurvey,
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    },
    // {
    //   title: '满意度调查表结果统计',
    //   path: '/nurseSatisfactionSurvey/statistical',
    //   icon: <BKES />,
    //   component: { ...NurseSatisfactionSurvey },
    //   keepAlive: true,
    //   disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    // },
    {
      title: '满意度调查表设置',
      path: '/nurseSatisfactionSurvey/set',
      icon: <CSWD />,
      component: NurseSatisfactionSurveySet,
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    },
  ]
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
