import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { badEventReportModel } from '../../BadEventReportModel'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
import ChartCon from './ChartCon'
import { Report } from '../../types'
import moment from 'moment'
import OneLevelTitle from '../common/OneLevelTitle'
import TwoLevelTitle from '../common/TwoLevelTitle'
import { numToChinese } from 'src/utils/number/numToChinese'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 不良事件分类比较模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = badEventReportModel.getSectionData(sectionId)
  // let report: Report = badEventReportModel.getDataInAllData('report')
  let list = data ? data.list || [] : []

  useEffect(() => { })

  return (
    <Wrapper>
      <OneLevelTitle text="二、结果分析" />
      <TwoLevelTitle text={`1.不良事件分类比较。本月护理不良事件归为${numToChinese(list.length)}大类`} />
      <ChartCon list={list} />
      <EditButton
        onClick={() => badEventReportModel.openEditModal(sectionId)}>
        编辑
      </EditButton>
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
