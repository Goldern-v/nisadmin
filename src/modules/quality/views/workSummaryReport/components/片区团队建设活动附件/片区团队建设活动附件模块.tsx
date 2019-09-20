import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { workSummaryReportViewModal } from '../../WorkSummaryReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, DetailItem } from '../../types'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 片区团队建设活动附件模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = workSummaryReportViewModal.getSectionData(sectionId)
  let list: any[] = data.list || []

  return (
    <Wrapper>
      <TextCon>
        <div className="img-group">
          {list.map((item, index: number) => (
            <img src={item.attachUrl} alt="" className="img" key={index} />
          ))}
        </div>
      </TextCon>
      <EditButton onClick={() => workSummaryReportViewModal!.openEditModal(sectionId)}>附件编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  overflow: hidden;
  .sup-title {
    font-weight: bold;
    margin-left: 50px;
    margin-right: 50px;
    color: #000;
    margin-bottom: 5px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .img-group{
    margin-top: 30px;
  }
  .img {
    width: 305px;
    height: 200px;
    margin-bottom: 10px;
    &:nth-of-type(2n-1){
      margin-right: 10px;
    }
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
