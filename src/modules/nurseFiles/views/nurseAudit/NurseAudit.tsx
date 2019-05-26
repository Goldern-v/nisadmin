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
    title: '待护士长审核',
    component: <AuditsTableDHSZ type='waitAuditedNurse' />
  },
  {
    title: '护士长审核退回',
    component: <AuditsTableDHSZ type='auditedFailNurse' />
  },
  {
    title: '待护理部审核',
    component: <AuditsTableDHSZ type='waitAuditedDepartment' />
  },
  {
    title: '审核通过',
    component: <AuditsTableDHSZ type='auditedSuccessDepartment' />
  }
]

const TABS_LIST_NURSING = [
  {
    title: '待护理部审核',
    component: <AuditsTableDHSZ type='waitAuditedDepartment' />
  },

  {
    title: '护理部审核退回',
    component: <AuditsTableDHSZ type='auditedFailDepartment' />
  },
  {
    title: '审核通过',
    component: <AuditsTableDHSZ type='auditedSuccessDepartment' />
  }
]
const tabShow = () => {
  if (authStore.post === '护长') {
    return TABS_LIST_NURSE
  } else if (authStore.post === '护理部') {
    return TABS_LIST_NURSING
  } else {
    return []
  }
}
export default observer(function NurseAudit () {
  return (
    <Wrapper>
      <TopCon />
      <MainCon>
        <BaseTabs config={tabShow()} />
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
  height: calc(100vh - 230px);
  align-items: stretch;
  display: flex;
  margin: 20px;
`
