import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { checkWardReportViewModal } from '../../CheckWardReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, DetailItem, Report } from '../../types'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 本月查房情况模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = checkWardReportViewModal.getSectionData(sectionId)
  let list: Partial<DetailItem>[] = data.list || []
  let report: Report = checkWardReportViewModal.getDataInAllData('report')
  return (
    <Wrapper>
      <OneLevelTitle text='一、本月查房情况' />
      <div className='text-box'>{checkWardReportViewModal.year}年{checkWardReportViewModal.month}月中夜班查房共{checkWardReportViewModal.searchRoom1 || '0'}次，特殊时段查房共{checkWardReportViewModal.searchRoom2 || '0'}次。</div>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 50px;
    margin-right: 50px;
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
    padding-bottom: 20px;
    padding-top: 5px;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
