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

  list = [
    { title: '输血事件110件', stage: '以验血错误为主80件，备血错误11件,传送错误8件', reason: '以与人员个人因素相关为主，表现为人员技术不当，医嘱书写模糊难辨识' }
  ]

  useEffect(() => { })

  return (
    <Wrapper>
      <OneLevelTitle text={`三、发生阶段及可能原因`} />
      {list.map((item: any, idx: number) => <div key={idx} className="list-item">
        <TwoLevelTitle text={`${idx + 1}.${item.title || ''}`} />
        <div className="text-con">1) 错误发生阶段: {item.stage || ''}</div>
        <div className="text-con">2) 发生原因: {item.reason || ''}</div>
      </div>)}
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
  .list-item{
    margin-bottom: 15px;
  }
  .text-con{
    padding: 0 30px;
  }
`
