import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, Report } from '../../types'
import Table from './Table'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 护理工作计划模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = data ? data.report || {} : {}

  return (
    <Wrapper>
      <OneLevelTitle text='一、护理工作计划' />
      <Table tableList={[{}, {}]} />
      <EditButton onClick={() => qualityAnalysisReportViewModal!.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .sup-title {
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }
  /* &:hover {
    button {
      display: block;
    }
  } */
  button {
    /* display: none; */
    position: absolute;
    top: -28px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 50px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
