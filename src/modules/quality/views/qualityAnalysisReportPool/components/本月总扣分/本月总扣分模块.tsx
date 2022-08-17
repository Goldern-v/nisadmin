import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
import Table from './Table'
import { Report } from '../../types'
import moment from 'moment'
import { addNum } from "src/utils/number/algorithm"
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}


export default observer(function 本月总扣分模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report')
  let list = data ? data.list || [] : []
  let totalScore = 0
  for (let i = 0; i < list.length; i++) {
    //totalScore += list[i].deductScore || 0
    totalScore = addNum(list[i].deductScore || 0,totalScore)
  }
  totalScore =  Number(totalScore.toFixed(2))



  useEffect(() => {})

  return (
    <Wrapper>
      <div className='sup-title'>(二) 本月总扣分{totalScore}分，各项质量检查扣分反馈</div>
      <Table list={list} totalScore={totalScore} />
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
