import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { badEventReportModel } from '../../BadEventReportModel'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
// import Chart from './Chart'
import { Report } from '../../types'
import moment from 'moment'
// import OneLevelTitle from '../common/OneLevelTitle'
import TwoLevelTitle from '../common/TwoLevelTitle'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 伤害程度分类模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = badEventReportModel.getSectionData(sectionId)
  let report: Report = badEventReportModel.getDataInAllData('report')
  let list = data ? data.list || [] : []

  const dataStr = `按护理不良事件上报指引，发生护理不良事件后对病人造成的影响程度和伤害分类，本季度共126次不良事件，造成伤害共107例，占84.9%，其中无伤害的19例，占15%，轻度伤害107例，占84.9%。`

  useEffect(() => { })

  return (
    <Wrapper>
      <TwoLevelTitle text={`2.不良事件伤害程度分类`} />
      <div className="text-con">{dataStr}</div>
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
  .text-con{
    padding: 0 30px;
  }
`
