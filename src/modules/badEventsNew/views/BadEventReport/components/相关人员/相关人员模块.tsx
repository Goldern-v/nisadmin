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

export default observer(function 相关人员模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = badEventReportModel.getSectionData(sectionId)
  let report: Report = badEventReportModel.getDataInAllData('report')
  let list = data ? data.list || [] : []

  const dataStr = `以护理人员为主，主要表现在护士、护师。`

  useEffect(() => { })

  return (
    <Wrapper>
      <TwoLevelTitle text={`5.不良事件相关人员`} />
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
