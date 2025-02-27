import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import {LastImproveItem, Report} from '../../types'
import {appStore} from "src/stores";
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 上月质量问题模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
    let list: Partial<LastImproveItem>[] = data.list || []
    let report: Report = (data ? data.report : {}) || {}
  return (
    <Wrapper>
      <OneLevelTitle text={sectionTitle} />
      <div className='aside'>（A:落实效果好 B:部分落实 C:未落实 评价B或C应进入下一阶段持续改进）</div>
        {
            appStore.HOSPITAL_ID ==='jmfy'?<TextCon>{report.preFollowUpDeptDesc}</TextCon>:
                list.map((item, index: number) => (
                        <div className='text-box' key={index}>
                            {index + 1 + '.'}
                            {item.itemImproveDesc || item.itemName} {item.result}
                        </div>
                    ))}
        }
      <EditButton onClick={() => qualityAnalysisReportViewModal!.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 60px;
  }
  button {
    position: absolute;
    top: 20px;
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
