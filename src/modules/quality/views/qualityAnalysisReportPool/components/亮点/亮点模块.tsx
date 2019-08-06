import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, DetailItem } from '../../types'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 亮点模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let list: Partial<DetailItem>[] = data.list || []

  return (
    <Wrapper>
      <div className={'sup-title'}>三、本月质量检查亮点</div>
      <div className={'sup-title'}>(一) 亮点</div>
      {list.map((item, index: number) => (
        <div className='text-box' key={index}>
          <pre className='textarea'>
            {index + 1}. {item.content}
          </pre>
          {item.attachUrls &&
            item.attachUrls.split(',').map((item, index) => <img className='img' src={item} alt='' key={index} />)}
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
  .text-box {
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 0px;
    padding-top: 5px;
    .label {
      font-weight: bold;
      padding-bottom: 5px;
    }
    .textarea {
      white-space: pre-wrap;
      margin-bottom: 5px;
    }
    .img {
      width: 450px;
      margin-bottom: 15px;
    }
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
