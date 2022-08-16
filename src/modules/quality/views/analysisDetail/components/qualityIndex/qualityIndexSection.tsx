import BaseTable from 'src/components/BaseTable'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
import styled from 'styled-components'
import React, { Children, useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'

import { LastImproveItem, Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}
export default observer(function qualityIndexSection(props: Props) {
  let { sectionId, sectionTitle} = props
  const analysisDetailModal = useRef(getModal())
  let data:any = analysisDetailModal.current.getSectionData(sectionId)
  // const value:any=data?data.value:{}
  let value: any = (data ? data.value : {}) || {}  
  let list: any[] = (data ? data.list : []) || [];
  
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      align: 'center',
      width: 40,
    render(text: any, record: any, index: number) {
      return index + 1
    },
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 40,
      align: 'center'
    },
    {
      title: '项目',
      dataIndex: 'item',
      align: 'center',
      width: 160
    },
    {
      title: '达标值',
      width: 100,
      align: 'center',
      children:[
        {
        title: '质量合格分',
        dataIndex: 'qualityPassScore',
        align: 'center',
        width: 90
      },
      {
        title: '合格率',
        dataIndex: 'standardPassRate',
        align: 'center',
        width: 60
      }
    ]
    },
    {
      title: '检查结果',
      width: 100,
      align: 'center',
      children:[
        {
        title: '合格数/抽查数',
        align: 'center',
        width: 60,
        render(text: string, record: any, index: number) {
          return (
            <div className='inp_textArea'>
            {record.qualifiedCount ? record.qualifiedCount : ""}/{record.checkCount ? record.checkCount : ""}
            </div>
          )
        },
      },
      {
        title: '平均分',
        dataIndex: 'averageScore',
        align: 'center',
        width: 60,
        render(text:any, row: any) {
          return text != null ? Number(text).toFixed(2) : '-'
        }

      },
        {
        title: '合格率%',
        dataIndex: 'passRate',
        align: 'center',
        width: 60,
      },
      {
        title: '未达标',
        align: 'center',
        width: 60,
        render(text: string, record: any, index: number) {
          return (
            <div className='inp_textArea'>
            {!record.standardStatus&&record.passRate? ( Number(record.passRate)>=90?'达标':'不达标' ): record.standardStatus}
            </div>
          )
        },
      }
    ]
    },
  ]
  const footer=(
    <div className='table_Bottom'>
   <div>1、上报不良事件：{value.reportAdverseEvents}</div>
    <div>2、事件类型及级别：{value.eventTypeAndLevel}</div>
    </div>)
  return (
    <Wrapper>
      <TwoLevelTitle  text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)} >编辑</EditButton>
      <BaseTable  columns={columns}  dataSource={ data&&data.list}
       footer={()=>footer}
       fixedFooter={true}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-right: 60px;
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
  .table_Bottom {
    position: relative;
    bottom: 0;
    /* display: inline-block; */

  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
  input {
    border: none;
  }
`
const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
