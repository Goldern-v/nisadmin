import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { patientVisitMonthModel } from '../../model/PatientVisitMonthModel'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
import Table from './Table'
import { Report } from '../../types'
import moment from 'moment'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 月度随访表模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = patientVisitMonthModel.getSectionData(sectionId)
  // let report: Report = patientVisitMonthModel.getDataInAllData('report')
  useEffect(() => { })

  return (
    <Wrapper>
      <div className='sup-title' style={{ width: '100px', height: '21px' }}></div>
      <Table report={data.report || {}} totalSorce={0} />
      <EditButton onClick={() => patientVisitMonthModel.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  padding: 5px 0;
  position: relative;

  .sup-title {
    color: #000;
    font-weight: bold;
    margin-left: 50px;
    margin-right: 50px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
`
