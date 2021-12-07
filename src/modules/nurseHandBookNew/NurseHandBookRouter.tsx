import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftMenuPage from 'src/components/LeftMenuPage'
import NurseHandBook from './page/NurseHandBook'
import NurseHandBook_jmfy from './page/NurseHandBook_jmfy'
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
          path: '/nurseHandBookNew/planJM',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
          disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
        },
        {
          title: '护士长工作总结',
          path: '/nurseHandBookNew/conclusionJM',
          icon: <WCJD />,
          component: { ...NurseHandBook_jmfy },
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
