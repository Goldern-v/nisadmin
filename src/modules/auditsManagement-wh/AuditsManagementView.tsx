import styled from 'styled-components'
import React, { useState, useEffect, useMemo,useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import SelectCon from './components/SelectCon'
// import BaseTabs from 'src/components/BaseTabs'

import { appStore } from 'src/stores'
import NurseAudit from './NurseAudit'
import { getCurrentMonth } from 'src/utils/date/currentMonth'
import service from 'src/services/api'
import { Obj } from 'src/libs/types'
export interface Props extends RouteComponentProps { }
export interface ContextConIn extends Obj {
  showTypeName: string
  showTypeDict: any[]
  keyword: string,
}
export const ContextCon = React.createContext<ContextConIn>({
  showTypeName: '',
  showType: '',
  showTypeDict: [],
  keyword: '',
  selectedDate: null
})
export default function AuditsManagementView() {
  const [showType, setShowType] = useState('')
  const [needAudit, setNeedAudit] = useState(true)
  const [selectedDate, setSelectedDate] = useState(getCurrentMonth())
  const [keyword, setKeyword] = useState('')
  const [deptList, setDeptList] = useState([]);
  const prevShowTypeRef = useRef(showType);

  // 类型列表
  const [showTypeDict, setShowTypeDict] = useState<Obj[]>([]);
  
  useEffect(() => {
    service.commonApiService.dictInfo("audit_type").then(res => {
      setShowTypeDict(res.data);
      setShowType(res.data[0] ? res.data[0].code : "");
    });
  }, []);

  useEffect(() => {
    if(appStore.HOSPITAL_ID !== "whyx") return
    const prevShowType = prevShowTypeRef.current;
    if(showType==="nursePromotion" && prevShowType!=="nursePromotion") getDeptList()
    else if(showType !== "nursePromotion" && prevShowType =="nursePromotion") setDeptList([])
    prevShowTypeRef.current = showType;
  },[showType])

  const getDeptList = ()=>{
    service.commonApiService.getUserDept().then(res => {
      let arr = res.data.map((li:any)=>({
        code:li.deptCode,
        name:li.deptName
      }))
      setDeptList(arr)
    });
  }
  // 类型key值对应的name
  const showTypeName = useMemo(() => showTypeDict.find((v: any) => v.code === showType)?.name || '', [showType])

  return (
    <Wrapper>
      <ContextCon.Provider value={{showTypeName, showTypeDict, keyword, showType, selectedDate}}>
        <SelectCon
          deptList={deptList}
          showType={showType}
          setShowType={setShowType}
          keyword={keyword}
          setKeyword={setKeyword}
          needAudit={needAudit}
          setNeedAudit={setNeedAudit}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <ScrollCon>
          <NurseAudit
            setNeedAudit={setNeedAudit}
          />
        </ScrollCon>
      </ContextCon.Provider>
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
