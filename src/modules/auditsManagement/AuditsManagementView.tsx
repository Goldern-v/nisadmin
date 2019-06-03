import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SelectCon from './components/SelectCon'
import BaseTabs from 'src/components/BaseTabs'

import { authStore, appStore } from 'src/stores'
import NurseAudit from './NurseAudit'
export interface Props extends RouteComponentProps {}

export default function AuditsManagementView () {
  return (
    <Wrapper>
      <SelectCon />
      <ScrollCon>
        <NurseAudit />
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
  /* padding: ${(p) => p.theme.$mcp}; */
`
