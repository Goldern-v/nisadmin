import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'src/vendors/antd'
import { ColumnProps } from 'antd/lib/table'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'
import { Input } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}
export default function qualityIndexModal(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  let conclusion:any=cloneData&&cloneData.list&&cloneData.list.conclusion
  useEffect(() => { }, [])

const columns: ColumnProps<any>[] = [
  {
    title: '指标',
    align: 'center',
    dataIndex:"zb",
    width: 60,
    // render(text:string, record:any, index:number) {
    //   return (
    //     <TextArea
    //       className='cell-textArea'
    //       value={record.zb|| ''}
    //       onChange={(e) => {
    //         record.zb = e.target.value
    //         setData(cloneData)
    //       }}
    //     />
    //   )
    // },
  },
  {
    title: '主要问题',
    width: 100,
    align: 'center',
    render(text:string, record:any, index:number) {
      return (
        <TextArea
          className='cell-textArea'
          value={record.zywt|| ''}
          onChange={(e) => {
            record.zywt = e.target.value
            setData(cloneData)
          }}
        />
      )
    },
  },
  {
    title: '原因分析',
    width: 100,
    align: 'center',
    render(text:string, record:any, index:number) {
      return (
        <TextArea
          className='cell-textArea'
          value={record.yyfx|| ''}
          onChange={(e) => {
            record.yyfx = e.target.value
            setData(cloneData)
          }}
        />
      )
    },
  },
  {
    title: '整改措施',
    dataIndex: 'zgcs',
    width: 100,
    align: 'center',
    render(text:string, record:any, index:number) {
      return (
        <TextArea
          className='cell-textArea'
          value={record.zgcs|| ''}
          onChange={(e) => {
            record.zgcs = e.target.value
            setData(cloneData)
          }}
        />
      )
    },
  },
  {
    title: '效果评价',
    width: 100,
    align: 'center',
    render(text:string, record:any, index:number) {
      return (
        <TextArea
          className='cell-textArea'
          value={record.xgpj|| ''}
          onChange={(e) => {
            record.xgpj = e.target.value
            setData(cloneData)
          }}
        />
      )
    },
  },
]
  return (
    <Wrapper>
      <div>
        共<input value={conclusion && conclusion.zb} onChange={(e) => {
        cloneData.list.conclusion.zb = e.target.value;
        setData(cloneData)
      }} />
      项指标，达标<input value={conclusion && conclusion.db} onChange={(e) => {
        cloneData.list.conclusion.db = e.target.value;
        setData(cloneData)
      }} />
      项，未达标<input value={conclusion && conclusion.wdb} onChange={(e) => {
        cloneData.list.conclusion.wdb = e.target.value;
        setData(cloneData)
      }} />项</div>
      <div>科室不达标指标分析改进:</div>
      <BaseTable columns={columns} dataSource={cloneData.list&&cloneData.list.tableData}/>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  text {
    min-height: 200px !important;
    resize: none;
  }
  .cell-textArea {
    border: none;
    height:200px;
  }
`
