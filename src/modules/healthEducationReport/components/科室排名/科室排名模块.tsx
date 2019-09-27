import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'

import ChartCon1 from './ChartCon1'
import ChartCon2 from './ChartCon2'
import ChartCon3 from './ChartCon3'
import ChartCon4 from './ChartCon4'
import { Report } from '../../types'
import moment from 'moment'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 科室排名模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report')
  let list = data ? data.list || [] : []

  useEffect(() => {})

  return (
    <Wrapper>
      <div className='title'>5、月度TOP10科室排名</div>
      <div className='chart-part'>
        <div className='chart-con'>
          <ChartCon1 list={list} dataKey='推送量' label='推送量' />
        </div>
        <div className='chart-con'>
          <ChartCon1 list={list} dataKey='阅读率' label='阅读率' />
        </div>
        <div className='chart-con'>
          <ChartCon1 list={list} dataKey='新增患者量' label='新增患者量' />
        </div>
        <div className='chart-con'>
          <ChartCon4 />
        </div>
      </div>

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

  .chart-part {
    overflow: hidden;
    .chart-con {
      float: left;
      width: 50%;
    }
  }
`
