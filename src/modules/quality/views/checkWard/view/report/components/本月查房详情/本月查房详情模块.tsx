import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { checkWardReportViewModal } from '../../CheckWardReportViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from '../common/OneLevelTitle'
import EditButton from '../common/EditButton'
import { LastImproveItem, DetailItem, Report } from '../../types'
import ImgCon from '../common/ImgCon'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined
}

export default observer(function 本月查房详情模块(props: Props) {
  let { sectionId, sectionTitle } = props
  let data = checkWardReportViewModal.getSectionData(sectionId)
  let list: Partial<DetailItem>[] = data.list || []
  let report: Report = checkWardReportViewModal.getDataInAllData('report')
  let dataList = checkWardReportViewModal.dataList || []
  let specialData = checkWardReportViewModal.specialData || []
  let nightData = checkWardReportViewModal.nightData || []
  let key1 = 0
  let key2 = 0

  return (
    <Wrapper>
      <OneLevelTitle text='二、本月查房详情' />
      <div className='text-box'>1、特殊时段查房
        {specialData.map((item: any, a: number = 0) => (
        <div key={a}>
          {
            <div className='aside'>
              <div className='title'>
                {`(${a + 1})`}{item.record.wardName}：{item.record.nurseStatus == '0' && item.record.patientStatus == '0' ?
                  '护士及患者未检查到问题' : (item.record.nurseStatus == '1' && item.record.patientStatus == '1' ?
                    `${item.srPageItem.nurseProblem}；${item.srPageItem.patientProblem}` : (item.record.nurseStatus == '1' && item.record.patientStatus == '0' ?
                      `${item.srPageItem.nurseProblem}` : `${item.srPageItem.patientProblem}`))}
              </div>
              <div>
                {item.attachmentList.length > 0 && item.attachmentList.map((o: any, b: number) => (
                  <span key={b}>
                    {o.path &&
                      o.path.split(',').map((p: any, c: number) => <img className='img' src={p} alt='' key={c} />)}
                  </span>
                ))}
              </div>
            </div>
          }
        </div>
      ))}
      </div>
      <div className='text-box'>2、中夜班查房
        {nightData.map((item: any, k: any) => (
        <div key={k}>
          {
            <div className='aside'>
              <div className='title'>
                {`(${k + 1})`}{item.record.wardName}：{item.record.nurseStatus == '0' && item.record.patientStatus == '0' ?
                  '护士及患者未检查到问题' : (item.record.nurseStatus == '1' && item.record.patientStatus == '1' ?
                    `${item.srPageItem.nurseProblem}；${item.srPageItem.patientProblem}` : (item.record.nurseStatus == '1' && item.record.patientStatus == '0' ?
                      `${item.srPageItem.nurseProblem}` : `${item.srPageItem.patientProblem}`))}
              </div>
              <div>
                {item.attachmentList.length > 0 && item.attachmentList.map((o: any, a: number) => (
                  <span key={a}>
                    {o.path &&
                      o.path.split(',').map((o: any, k: number) => <img className='img' src={o} alt='' key={a} />)}
                  </span>
                ))}
              </div>
            </div>
          }
        </div>
      ))}
      </div>
      <ImgCon />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .aside {
    padding-left: 30px;
    margin-bottom: 15px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 20px;
    padding-top: 5px;
    font-size: 15px;
    font-weight: bold;
  }
  .img {
    margin: 5px 0 15px 20px;
    display: inline-block;
    width: 100px;
    height:100px;
  }
  .title {
    margin-top:5px;
  }

`
