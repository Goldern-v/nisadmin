import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
import { ColumnProps } from 'antd/lib/table'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
import { OperationSecCon } from '../../style/section'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}
export default observer(function OperationSection(props: Props) {
  let { sectionId, sectionTitle } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId) 
  let pageInfo: Report= data ? data.pageInfo : {}
  let value = data.value ? data.value : {}
  let report: Report = (data ? data.report : {}) || {}
  return (
    <Wrapper>
      <TwoLevelTitle text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <div className='context context-title'>(1) 人员情况:</div>
      <div className='context'>
        护士定编:<div>{value.nurseCount}</div>人;实际护士编制:<div>{value.actualNurseCount}</div>人;
      </div>
      <div className='context'>
      助理护士定编:<div>{value.assistantNurseCount}</div>人;实际助理护士:<div>{value.actualInternNurseCount}</div>人;
      </div>
      <div className='context'>
      截止本月底实际在岗护士:<div>{value.actualDutyNursesCount}</div>人;在岗助理护士:<div>{value.actualDutyInternNurseCount}</div>人;
      </div>
      <div className='context context-title'>(2) (<div>{pageInfo&&!isNaN(pageInfo.reportMonth) && Number(pageInfo.reportMonth) - 1 != 0 ? Number(pageInfo.reportMonth) - 1 : 12}</div>月)上月科室住院病人动态:</div>
      <div className='context'>
      平均床位使用率%:<div>{value.averageBedOccupancy}</div>;病床周转次数:<div>{value.bedTurnovers}</div>;科室平均住院日:<div>{value.deptAverageInDepartment}</div>;
      </div>
      <div className='context'>
      原有病人数:<div>{value.existingPatientCount}</div>入院人数:<div>{value.admissions}</div> 转入病人数:<div>{value.transferredPatientCount}</div> 出院人数:<div>{value.dischargedPeopleCount}</div>
      </div>
      <div className='context'>
      转出病人数:<div>{value.transferredOutPatientCount}</div> 死亡人数:<div>{value.deathToll}</div>介入手术数:<div>{value.interventionalProcedureCount}</div> 外科手术数:<div>{value.numberOfSurgicalOperations}</div>
      </div>
      <div className='context'>科室护理工作量得分：:<div>{value.deptNursingWorkloadScore}</div></div>
      <div className='context context-title'>(3) (<div>{pageInfo&&pageInfo.reportMonth}</div>月)科室DRGS情况：RW ＞2:<div>{value.rw1}</div>;RW ＜0.5:<div>{value.rw2}</div>;CMI值:<div>{value.cmi}</div>;低风险死亡率:<div>{value.lowRiskMortality}</div>。 </div>
      <div className='context context-title'>(4)武汉市出院病人居家服务率：完成居家人数/同期武汉市出院病人数*100%=<div>{value.homeServiceRate}</div></div>
    </Wrapper>
  )
})
const Wrapper = styled(OperationSecCon)`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 60px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .context div {
    text-align: center;
  }
`
