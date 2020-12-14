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

export default observer(function 本周防疫专项检查整改措施模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let report: Report = (data ? data.report : {}) || {}

  let originList = data.list || []

  let viewObj = {} as any

  for (let i = 0; i < originList.length; i++) {
    let item = originList[i]
    if (viewObj[item.wardName]) {
      viewObj[item.wardName].measureList.push(item.measure)
    } else {
      viewObj[item.wardName] = {
        wardName: item.wardName,
        measureList: [item.measure]
      }
    }
  }

  // if (!report.followUpDeptDesc) {
  //   return <div />
  // }
  return (
    <Wrapper>
      <OneLevelTitle text='四、本周防疫专项检查整改措施' />
      <EditButton onClick={() => qualityAnalysisReportViewModal!.openEditModal(sectionId)}>编辑</EditButton>
      {Object.keys(viewObj).map((key: string) => {
        return <div key={key} className="wardname-group">
          <div className="wardname">{viewObj[key].wardName}：</div>
          <div className="measure-group">
            {viewObj[key].measureList.map((text: string, idx: number) =>
              <div key={`${key}-${idx}`}>
                {idx + 1}.{text}
              </div>)}
          </div>
        </div>
      })}
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
    padding-bottom: 5px;
    padding-top: 5px;
  }
  .wardname-group{
    .wardname{
      font-size: 14px;
      font-weight: bold;
      margin-left: 65px;
      margin-right: 50px;
    }
    .measure-group{
      margin-left: 87px;
      margin-right: 50px;
      margin-bottom: 10px;
    }
  }
`

const TextCon = styled.pre`
  margin: 0px 65px;
  min-height: 20px;
  white-space: pre-wrap;
`
