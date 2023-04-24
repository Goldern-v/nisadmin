import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SelectCon from './components/SelectCon'
// import BaseTabs from 'src/components/BaseTabs'

// import { authStore, appStore } from 'src/stores'
import NurseAudit from './NurseAudit'
import { getCurrentMonth } from 'src/utils/date/currentMonth'
import { appStore } from 'src/stores'
export interface Props extends RouteComponentProps { }

export default function AuditsManagementView() {
  const [showType, setShowType] = useState(appStore.HOSPITAL_ID === 'wjgdszd' ? 'nurseFile' : 'nurseFileNys')
  const [needAudit, setNeedAudit] = useState(true)
  const [selectedDate, setSelectedDate] = useState(getCurrentMonth())
  const [keyword, setKeyword] = useState('')
  const [qcCode, setQcCode] = useState('');//阳春中医，添加质控表单
  return (
    <Wrapper>
      <SelectCon
        showType={showType}
        setShowType={setShowType}
        qcCode={qcCode}
          setQcCode={setQcCode}
        keyword={keyword}
        setKeyword={setKeyword}
        needAudit={needAudit}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ScrollCon>
        <NurseAudit
          showType={showType}
          keyword={keyword}
          qcCode={qcCode}
          needAudit={needAudit}
          setNeedAudit={setNeedAudit}
          selectedDate={selectedDate}
        />
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
