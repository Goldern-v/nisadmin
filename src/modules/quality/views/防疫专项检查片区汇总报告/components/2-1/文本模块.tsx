import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../ReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, Report } from '../../types'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 文本模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = data ? data.report || {} : {}

  if (report.groupRoleCode == 'QCR0010') {
    /** 文件书写 */
    return (
      <Wrapper>
        <div className='title'>2.1.{report.archiveDesc}</div>
        {/* <TextCon>{report.archiveDesc}</TextCon> */}
        <EditButton onClick={() => qualityAnalysisReportViewModal!.openEditModal(sectionId)}>编辑</EditButton>
      </Wrapper>
    )
  } else {
    return <div />
  }
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 16px;
    font-weight: bold;
    padding-left: 50px;
    padding-right: 50px;
  }
  button {
    position: absolute;
    top: -20px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
