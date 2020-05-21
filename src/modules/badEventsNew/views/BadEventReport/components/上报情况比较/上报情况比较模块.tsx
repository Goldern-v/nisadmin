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

export default observer(function 上报情况比较模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = badEventReportModel.getSectionData(sectionId)
  let report: Report = badEventReportModel.getDataInAllData('report')
  let list = data ? data.list || [] : []
  const timeStr = '一月'
  const dataStr = `2019年第二季度不良事件上报总数与去年同期相比上升260%，与今年第一季度总数相比下降了40.6%，主要为检查/检验/病理标本事件上报总数下降了53.2%，其他事件基本持平。`

  useEffect(() => { })

  return (
    <Wrapper>
      <TwoLevelTitle text={`4.分析第二季度上报情况`} />
      <div className="text-con" style={{ textIndent: 12 }}>  (1)与上季度比较</div>
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
