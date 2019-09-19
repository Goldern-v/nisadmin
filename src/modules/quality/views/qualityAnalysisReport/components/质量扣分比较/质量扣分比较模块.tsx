import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
import Table from './Table'
import Chart from './Chart'
import { Report } from '../../types'
import moment from 'moment'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 质量扣分比较模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report')
  let list = data ? data.list || [] : []

  useEffect(() => {})
  let title =
    report &&
    `${moment(report.endDate).format('YYYY年')}${report.indexInType}月与${
      report.indexInType == 1
        ? moment(report.beginDate)
            .subtract(1, 'year')
            .format('YYYY年')
        : moment(report.beginDate).format('YYYY年')
    }${report.indexInType == 1 ? 12 : report.indexInType - 1}月护理质量扣分比较`
  return (
    <Wrapper>
      <div className='title'>
        2.{report.groupRoleCode == 'QCR0010' ? '2' : '1'}.{title}
      </div>
      <Table list={list} />
      <Chart list={list} title={title} />
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
