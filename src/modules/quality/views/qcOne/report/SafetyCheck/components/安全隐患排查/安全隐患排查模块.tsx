import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { safetyCheckEditModel } from '../../model/SafetyCheckEditModel'
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

export default observer(function 安全隐患排查模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = safetyCheckEditModel.getSectionData(sectionId)
  let report: Report = safetyCheckEditModel.getDataInAllData('report')
  let safetyCheckRecordList = data ? data.safetyCheckRecordList || [] : []
  let safetyCheckList = data ? data.safetyCheckList || [] : []

  useEffect(() => { })

  return (
    <Wrapper>
      <div className='sup-title' style={{ width: '100px', height: '21px' }}></div>
      <Table safetyCheckRecordList={safetyCheckRecordList} safetyCheckList={safetyCheckList} />
      <EditButton onClick={() => safetyCheckEditModel.openEditModal(sectionId)}>编辑</EditButton>
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
