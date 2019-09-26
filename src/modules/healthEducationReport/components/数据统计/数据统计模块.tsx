import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'

import ChartCon from './ChartCon'
import { Report } from '../../types'
import moment from 'moment'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 数据统计模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let list = data ? data.list || [] : []

  useEffect(() => {})

  return (
    <Wrapper>
      <div className='title'>
        3、数据统计：按时间和科室两个维度提取推送数据，推送数据包括新增患者数、推送患者数、阅读人数、推送课程量、阅读课程量、阅读率、评价率
      </div>
      <ChartCon label='新增患者数' dataKey='新增患者数' data={list} />
      <ChartCon label='阅读人数' dataKey='阅读人数' data={list} />
      <ChartCon label='推送课程量' dataKey='推送课程量' data={list} />
      <ChartCon label='阅读课程量' dataKey='阅读课程量' data={list} />
      <ChartCon label='阅读率' dataKey='阅读率' data={list} />
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
