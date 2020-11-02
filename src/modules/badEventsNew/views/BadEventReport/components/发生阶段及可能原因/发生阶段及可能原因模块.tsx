import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { badEventReportModel } from '../../BadEventReportModel'
import { observer } from 'src/vendors/mobx-react-lite'
import EditButton from '../common/EditButton'
// import Chart from './Chart'
import { Report } from '../../types'
import moment from 'moment'
import OneLevelTitle from '../common/OneLevelTitle'
import TwoLevelTitle from '../common/TwoLevelTitle'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 发生阶段及可能原因模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = badEventReportModel.getSectionData(sectionId)
  let report: Report = badEventReportModel.getDataInAllData('report')
  let list = data ? data.list || [] : []

  useEffect(() => { })

  return (
    <Wrapper>
      <OneLevelTitle text={`三、发生阶段及可能原因`} />
      {list.map((item: any, idx: number) => <div key={idx} className="list-item">
        <TwoLevelTitle text={`${idx + 1}.${item.eventType || ''}${item.happenNum || 0}件`} />
        <div className="text-con">1) 错误发生阶段: {item.happenStage || ''}</div>
        <div className="text-con">2) 发生原因: {item.happenReason || ''}</div>
      </div>)}
      <EditButton
        onClick={() => badEventReportModel.openEditModal(sectionId)}>
        编辑
      </EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 120px;
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
  .list-item{
    margin-bottom: 15px;
  }
  .text-con{
    padding: 0 30px;
  }
`
