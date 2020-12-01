import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../ReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, DetailItem } from '../../types'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 重点问题模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let list: Partial<DetailItem>[] = data.list || []

  return (
    <Wrapper>
      <OneLevelTitle text='四、本月质量问题分析及持续改进' />
      <div className='title'>4.1.重点问题</div>
      {list.map((item, index: number) => (
        <div className='text-box' key={index}>
          <div className='label'>
            4.1.{index + 1}
            {item.itemTypeName}
          </div>
          <pre className='textarea'>{item.content}</pre>
          {item.attachUrls && item.attachUrls.split(',').map((item) => <img className='img' src={item} alt='' />)}
        </div>
      ))}

      {/* <TextCon>{textarea}</TextCon> */}
      <EditButton onClick={() => qualityAnalysisReportViewModal!.openEditModal(sectionId)}>编辑</EditButton>
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
    padding-right: 50px;
    padding-bottom: 5px;
    padding-top: 5px;
    .label {
      font-weight: bold;
      padding-bottom: 5px;
    }
    .textarea {
      white-space: pre-wrap;
      margin-bottom: 0px;
      padding-left: 22px;
    }
    .img {
      width: 450px;
      margin-bottom: 15px;
      margin-left: 15px;
    }
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
