import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import TopCon from './components/TopCon'
import { appStore, authStore } from 'src/stores'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import AuditsTableDHSZ from './components/AuditsTableDHSZ'
import BaseTabs from 'src/components/BaseTabs'
const TABS_LIST_NURSE = [
  {
    title: '待我审核',
    component: <AuditsTableDHSZ type='waitAuditedNurse' needAudit />
  },
  {
    title: '我已审核',
    component: <AuditsTableDHSZ type='auditedFailNurse' needAudit={false} />
  }
]

export default observer(function NurseAudit() {
  return (
    <Wrapper>
      <TopCon />
      <MainCon>
        <BaseTabs config={TABS_LIST_NURSE} />
      </MainCon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 200px);
  align-items: stretch;
  display: flex;
  margin: 15px;
`
