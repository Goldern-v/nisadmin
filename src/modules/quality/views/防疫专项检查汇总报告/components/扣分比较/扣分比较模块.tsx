import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../ReportPoolViewModal'
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

export default observer(function 扣分比较模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report')
  console.warn(report)
  let list = data ? data.list || [] : []

  useEffect(() => { })
  let title = ''

  if (report)
    title =
      report &&
      `（三）${report.year}年${report.indexInType}月与${report.indexInType == 1
        ? Number(report.year) - 1 : report.year}年${report.indexInType == 1 ? 12 : report.indexInType - 1}月质量扣分比较`
  return (
    <Wrapper>
      <div className='sup-title'>{title}</div>
      <Table list={list} />
      <EditButton onClick={() => qualityAnalysisReportViewModal.openEditModal(sectionId)}>编辑</EditButton>
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
    top: -3px;
    right: 20px;
  }
`
