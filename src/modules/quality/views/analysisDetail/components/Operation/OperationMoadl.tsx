import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { cloneJson } from 'src/utils/json/clone'
import { Input } from 'src/vendors/antd'
import {  Report } from '../../types'
import { OperationModCon } from '../../style/modal'

export interface Props {
  sectionId: string
  data: any
  setData: any
}
export default function OperationMoadl(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { value: {}})
  let value: any = cloneData ?  cloneData.value : {}
  let pageInfo: Report= cloneData ? cloneData.pageInfo : {}
  useEffect(() => { }, [])

  return (
    <OperationModCon>
        <div className='context context-title context-title'>(1) 人员情况:</div>
        <div className='context'>
          护士定编:<div><Input type='number' value={value && value.nurseCount} onChange={(e) => {
          value.nurseCount = e.target.value;
          setData(cloneData)
        }} /></div>人;
        实际护士编制:<div><Input type='number' value={value && value.actualNurseCount} onChange={(e) => {
            value.actualNurseCount = e.target.value;
            setData(cloneData)
          }} /></div>人;
        </div>
        <div className='context'>
          助理护士定编:<div><Input  type='number' value={value && value.assistantNurseCount} onChange={(e) => {
            value.assistantNurseCount = e.target.value;
            setData(cloneData)
          }} /></div>人;
          实际助理护士:<div><Input type='number' value={value && value.actualInternNurseCount} onChange={(e) => {
            value.actualInternNurseCount = e.target.value;
            setData(cloneData)
          }} /></div>人;
        </div>
        <div className='context'>
          截止本月底实际在岗护士:<div><Input type='number' value={value && value.actualDutyNursesCount} onChange={(e) => {
            value.actualDutyNursesCount = e.target.value;
            setData(cloneData)
          }} /></div>人;
          在岗助理护士:<div><Input type='number' value={value && value.actualDutyInternNurseCount} onChange={(e) => {
            value.actualDutyInternNurseCount = e.target.value;
            setData(cloneData)
          }} /></div>人;
        </div>
        <div className='context context-title'>(2) (<div style={{width:'30px',color:'blue',textAlign:'center'}}>{pageInfo&&!isNaN(pageInfo.reportMonth) && Number(pageInfo.reportMonth) - 1 != 0 ? Number(pageInfo.reportMonth) - 1 : 12}</div>月)上月科室住院病人动态:</div>
        <div className='context'>
          平均床位使用率%:<div><Input type='number' value={value && value.averageBedOccupancy} onChange={(e) => {
            value.averageBedOccupancy = e.target.value;
            setData(cloneData)
          }} /></div>人;病床周转次数:<div><Input type='number' value={value && value.bedTurnovers} onChange={(e) => {
            value.bedTurnovers = e.target.value;
            setData(cloneData)
          }} /></div>;科室平均住院日:<div><Input type='number' value={value && value.deptAverageInDepartment} onChange={(e) => {
            value.deptAverageInDepartment = e.target.value;
            setData(cloneData)
          }} /></div>;
        </div>
        <div className='context'>
          原有病人数:<div><Input type='number' value={value && value.existingPatientCount} onChange={(e) => {
            value.existingPatientCount = e.target.value;
            setData(cloneData)
          }} /></div>入院人数:<div><Input type='number' value={value && value.admissions} onChange={(e) => {
            value.admissions = e.target.value;
            setData(cloneData)
          }} /></div> 转入病人数:<div><Input type='number' value={value && value.transferredPatientCount} onChange={(e) => {
            value.transferredPatientCount = e.target.value;
            setData(cloneData)
          }} /></div> 出院人数:<div><Input  type='number' value={value && value.dischargedPeopleCount} onChange={(e) => {
            value.dischargedPeopleCount = e.target.value;
            setData(cloneData)
          }} /></div>
        </div>
        <div className='context'>
          转出病人数:<div><Input type='number' value={value && value.transferredOutPatientCount} onChange={(e) => {
            value.transferredOutPatientCount = e.target.value;
            setData(cloneData)
          }} /></div> 
          死亡人数:<div><Input type='number' value={value && value.deathToll} onChange={(e) => {
            value.deathToll = e.target.value;
            setData(cloneData)
          }} /></div>
          介入手术数:<div><Input type='number' value={value && value.interventionalProcedureCount} onChange={(e) => {
            value.interventionalProcedureCount = e.target.value;
            setData(cloneData)
          }} /></div> 
          外科手术数:<div><Input  type='number' value={value && value.numberOfSurgicalOperations} onChange={(e) => {
            value.numberOfSurgicalOperations = e.target.value;
            setData(cloneData)
          }} /></div>
        </div>
        <div className='context'>
          科室护理工作量得分：<Input type='number' value={value && value.deptNursingWorkloadScore} onChange={(e) => {
          value.deptNursingWorkloadScore = e.target.value;
          setData(cloneData)
        }} /></div>
        <div className='context context-title'>
          (3)(<div style={{width:'30px',color:'blue',textAlign:'center'}}>{pageInfo&&pageInfo.reportMonth}</div>月)科室DRGS情况:RW ＞2:<div><Input type='number' value={value && value.rw1} onChange={(e) => {
          value.rw1 = e.target.value;
          setData(cloneData)
        }} /></div>;
        RW ＜0.5:<div><Input type='number' value={value && value.rw2} onChange={(e) => {
          value.rw2 = e.target.value;
          setData(cloneData)
        }} /></div>;
        cmi值:<div><Input type='number' value={value && value.cmi} onChange={(e) => {
          value.cmi = e.target.value;
          setData(cloneData)
        }} /></div>;
        低风险死亡率:<div><Input type='number' value={value && value.lowRiskMortality} onChange={(e) => {
          value.lowRiskMortality = e.target.value;
          setData(cloneData)
        }} /></div>。 </div>
        <div className='context context-title'>
          (4)武汉市出院病人居家服务率：完成居家人数/同期武汉市出院病人数*100%=<div><Input style={{width:'200px'}} value={value && value.homeServiceRate} onChange={(e) => {
          value.homeServiceRate = e.target.value;
          setData(cloneData)
        }} /></div></div>
    </OperationModCon>
  )
}
