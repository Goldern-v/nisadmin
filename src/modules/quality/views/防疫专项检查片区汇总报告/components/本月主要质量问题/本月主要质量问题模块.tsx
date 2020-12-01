import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { qualityAnalysisReportViewModal } from '../../ReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, DetailItem, Report } from '../../types'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 上月质量问题模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = qualityAnalysisReportViewModal.getSectionData(sectionId)
  let list: Partial<DetailItem>[] = data.list || []
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report')
  return (
    <Wrapper>
      <div className='title'>
        2.{report.groupRoleCode == 'QCR0010' ? '4' : '3'}.{sectionTitle}
      </div>

      {list.map((item, index: number) => (
        <div className='text-box' key={index}>
          <div className='label'>
            ({index + 1}){item.itemTypeName}(总扣分{item.totalDeductScore}分,共有{item.deductDeptSize}个扣分科室)
          </div>
          {item.detailList &&
            item.detailList.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <pre className='textarea'>{index + 1 + '.' + item.content}</pre>
                  <div className='img-con'>
                    {item.attachList &&
                      item.attachList.map((item: any, index: number) => (
                        <div className='img-box' key={index}>
                          <img className='img' src={item.attachUrl} alt='' key={index} />
                          <aside>({item.wardName})</aside>
                        </div>
                      ))}
                  </div>
                </div>
              )
            })}
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
    padding-right: 15px;
    padding-bottom: 20px;
    padding-top: 5px;
    .label {
      font-weight: bold;
      padding-bottom: 5px;
    }
    .textarea {
      white-space: pre-wrap;
      margin-bottom: 10px;
      padding-left: 22px;
    }
    .img-box {
      display: inline-block;
      aside {
        text-align: center;
        padding-left: 15px;
        position: relative;
        top: -10px;
      }
    }
    .img {
      /* width: 450px; */
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
