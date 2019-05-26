import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SelectCon from './components/SelectCon'
import BaseTabs from 'src/components/BaseTabs'
import AuditsTableDHSZ from './components/AuditsTableDHSZ'
import AuditsTable2 from './components/AuditsTable2'
import AuditsTable3 from './components/AuditsTable3'
import AuditsTable4 from './components/AuditsTable4'
import AuditsTable5 from './components/AuditsTable5'
import AuditsTable6 from './components/AuditsTable6'
import { authStore, appStore } from 'src/stores'
export interface Props extends RouteComponentProps {}

export interface Props extends RouteComponentProps {}

const TABS_LIST_NURSE = [
  {
    title: '待护士长审核',
    component: <AuditsTableDHSZ />
  },
  {
    title: '护士长审核退回',
    component: <AuditsTable2 />
  },
  {
    title: '待护理部审核',
    component: <AuditsTable3 />
  },
  {
    title: '审核通过',
    component: <AuditsTable4 />
  }
]

const TABS_LIST_NURSING = [
  {
    title: '待护理部审核',
    component: <AuditsTableDHSZ />
  },

  {
    title: '护理部审核退回',
    component: <AuditsTable5 />
  },
  {
    title: '审核通过',
    component: <AuditsTable5 />
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
export default function AuditsManagementView () {
  return (
    <Wrapper>
      <SelectCon />
      <ScrollCon>
        <BaseTabs config={tabShow()} />
      </ScrollCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: ${(p) => p.theme.$mcp};
  padding-bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ScrollCon = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0 -15px;
  padding: ${(p) => p.theme.$mcp};
`
