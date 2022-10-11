import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import LeftMenuPage from 'src/components/LeftMenuPage'
import MyCreateList from './page/MyCreateList'
import { ReactComponent as WCJD } from './images/WCJD.svg'
import { ReactComponent as CSWD } from './images/CSWD.svg'
import { ReactComponent as BKES } from './images/BKSD.svg'
import { appStore } from 'src/stores'
export interface Props {}

export default function WardLog() {
  const leftMenuConfig = [
    {
      title: '我创建的',
      path: '/wardLog/myCreateList',
      icon: <WCJD />,
      component: { ...MyCreateList },
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '本科室的',
      path: '/wardLog/myWard',
      icon: <BKES />,
      component: { ...MyCreateList },
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
    },
    {
      title: '抄送我的',
      path: '/wardLog/copyForMe',
      icon: <CSWD />,
      component: { ...MyCreateList },
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
