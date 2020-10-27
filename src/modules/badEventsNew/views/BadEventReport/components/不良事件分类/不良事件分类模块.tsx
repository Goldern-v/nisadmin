import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { badEventReportModel } from '../../BadEventReportModel'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
import Table from './Table'
// import Chart from './Chart'
import { Report } from '../../types'
import moment from 'moment'
import OneLevelTitle from '../common/OneLevelTitle'
import TwoLevelTitle from '../common/TwoLevelTitle'
import CenterText from '../common/CenterText'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 不良事件分类模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = badEventReportModel.getSectionData(sectionId)
  let report: Report = badEventReportModel.getDataInAllData('report')
  let list = data ? data.list || [] : []
  const timeStr = report.timeSection || ''


  let viewList = JSON.parse(JSON.stringify(list))
  let total = 0

  for (let i = 0; i < viewList.length; i++) {
    let times = Number(viewList[i].happenNum)
    if (isNaN(times)) times = 0
    viewList[i].times = times
    total += times
  }

  useEffect(() => { })

  return (
    <Wrapper>
      <OneLevelTitle text={`一、${timeStr}护理不良事件统计分类`} />
      <TwoLevelTitle text={`1.统计${timeStr}共发生不良事件${total}件`} />
      <Table list={viewList} total={total} />
      <CenterText text="表1-1 不良事件分类" />
      <EditButton onClick={() => badEventReportModel.openEditModal(sectionId)}>编辑</EditButton>
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
