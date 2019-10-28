import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { starRatingReportEditModel } from './../../model/StarRatingReportEditModel'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, Report, DetailItem } from '../../types'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 检查形式模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = starRatingReportEditModel.getSectionData(sectionId)
  let list: Partial<DetailItem>[] = data.list || []
  let report: Report = data ? data.report || {} : {}
  let contentKey: any = data.contentKey || ''
  let baseInfo = data ? data.baseInfo : {}
  return (
    <Wrapper>
      {sectionTitle && (
        <TextCon>
          <span className='sup-title'>{baseInfo && baseInfo.qcGroupName}</span>
        </TextCon>
      )}

      {list.map((item: any, index: number) => (
        <div className='text-box' key={index}>
          <pre className='textarea'>
            <div className='index'>{index + 1}.</div>
            <div className='content'>{item[contentKey]}</div>
          </pre>
        </div>
      ))}
      {list.length == 0 && <div className='null-text'>无</div>}
      <EditButton onClick={() => starRatingReportEditModel!.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 40px;
  position: relative;
  .sup-title {
    font-size: 14px;
    font-weight: bold;
    color: #5659ad;
  }
  /* &:hover {
    button {
      display: block;
    }
  } */
  button {
    /* display: none; */
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .text-box {
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
  .textarea {
    white-space: pre-wrap;
    margin-bottom: 5px;
    .index {
      float: left;
    }
    .content {
      margin-left: 25px;
    }
  }
  .null-text {
    margin-left: 75px;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  /* min-height: 40px; */
  white-space: pre-wrap;
`
