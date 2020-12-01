import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../ReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
import Table from './Table'
import Chart from './Chart'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function ChartTableSection(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let text = data ? data.text : ''
  useEffect(() => { })
  return (
    <Wrapper>
      <div className='title'>{sectionTitle}</div>
      <Table />
      <Chart />
      <EditButton onClick={() => qualityAnalysisReportViewModal.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  padding: 5px 0;
  position: relative;

  .title {
    font-size: 16px;
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
