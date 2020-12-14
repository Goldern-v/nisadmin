import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../ReportViewModal'
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
  let currentTimeText = (() => {
    if (!report.beginDate || !report.endDate) return '...'
    let beginMoment = moment(report.beginDate)
    let endMoment = moment(report.endDate)
    let yearText1 = `${beginMoment.format('YYYY')}年`
    let yearText2 = `${endMoment.format('YYYY')}年`
    if (yearText1 == yearText2) yearText2 = ''
    return `${yearText1}${beginMoment.format('MM.DD')}至${yearText2}${endMoment.format('MM.DD')}`
  })()

  let lastTimeText = (() => {
    if (!report.lastBeginDate || !report.lastEndDate) return '...'
    let beginMoment = moment(report.lastBeginDate)
    let endMoment = moment(report.lastEndDate)
    let yearText1 = `${beginMoment.format('YYYY')}年`
    let yearText2 = `${endMoment.format('YYYY')}年`
    if (yearText1 == yearText2) yearText2 = ''
    return `${yearText1}${beginMoment.format('MM.DD')}至${yearText2}${endMoment.format('MM.DD')}`
  })()

  useEffect(() => { })
  let title = `1.${currentTimeText}与${lastTimeText}检查扣分比较`
  return (
    <Wrapper>
      <div className='title'>
        {title}
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
