import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../ReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, Report } from '../../types'
import { numToChinese } from 'src/utils/number/numToChinese'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 病区质量考核前十模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = data ? data.report || {} : {}

  const Title = () => {
    let str = ''
    if (!report.indexInType) return ''
    if (report.type == 'month') {
      str = `${report.indexInType}月`
    } else {
      str = `第${numToChinese(report.indexInType)}季度`
    }
    return str
  }

  const MainTitle = () => {
    if (report.type && report.type !== 'month') return '本季度'

    return '本月'
  }

  return (
    <Wrapper>
      <TextCon>
        <span className='sup-title'>(四) {MainTitle()}质量考核排序</span>
        <br />
        <span className='sup-title'>1. {Title()}病区质量考核未扣分的科室</span>
        <br />
        {report.notDeductDeptDesc}
      </TextCon>
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
    top: 0px;
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
