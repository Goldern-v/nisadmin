import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { badEventReportEditModel as patientVisitQuarterModel } from '../../model/BadEventReportEditModel'
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

export default observer(function 星级考核表模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = patientVisitQuarterModel.getSectionData(sectionId)
  let report: Report = patientVisitQuarterModel.getDataInAllData('report')
  let list = data ? data.list || [] : []
  let totalSorce = 0
  for (let i = 0; i < list.length; i++) {
    totalSorce += list[i].deductScore || 0
  }

  useEffect(() => {})

  return (
    <Wrapper>
      <div className='sup-title' style={{ width: '100px', height: '21px' }} />
      <Table list={list} totalSorce={totalSorce} />
      <EditButton onClick={() => patientVisitQuarterModel.openEditModal(sectionId)}>编辑</EditButton>
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
