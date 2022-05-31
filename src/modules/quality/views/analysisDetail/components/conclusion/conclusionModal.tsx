import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { cloneJson } from 'src/utils/json/clone'
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
  let cloneData: any = cloneJson(data || { list: [], value:{}})
  let conclusion: any = cloneData && cloneData.value 
  useEffect(() => { }, [])
  const columns: ColumnProps<any>[] = [
    {
      title: '指标',
      align: 'center',
      dataIndex: "zb",
      width: 60,
    },
    {
      title: '主要问题',
      width: 100,
      align: 'center',
      render(text: string, record: any, index: number) {
        return (
          <div className='inp_textArea'>
            <TextArea
              className='cell-textArea'
              value={record.mainProblem || ''}
              rows={14}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                record.mainProblem = e.target.value
                setData(cloneData)
              }}
            />
          </div>
        )
      },
    },
    {
      title: '原因分析',
      width: 100,
      align: 'center',
      render(text: string, record: any, index: number) {
        return (
          <div className='inp_textArea'>
            <TextArea
              className='cell-textArea'
              value={record.causeAnalysis || ''}
              rows={14}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                record.causeAnalysis = e.target.value
                setData(cloneData)
              }}
            />
          </div>
        )
      },
    },
    {
      title: '整改措施',
      dataIndex: 'zgcs',
      width: 100,
      align: 'center',
      render(text: string, record: any, index: number) {
        return (
          <div className='inp_textArea'>
            <TextArea
              className='cell-textArea'
              value={record.correctiveMeasures || ''}
              rows={14}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                record.correctiveMeasures = e.target.value
                setData(cloneData)
              }}
            />
          </div>

        )
      },
    },
    {
      title: '效果评价',
      width: 100,
      align: 'center',
      render(text: string, record: any, index: number) {
        return (
          <div className='inp_textArea'>
            <TextArea
              className='cell-textArea'
              value={record.evaluation || ''}
              rows={14}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                record.evaluation = e.target.value
                setData(cloneData)
              }}
            />
          </div>
        )
      },
    },
  ]
  return (
    <Wrapper>
      <div className='edit_text'>
        共<input value={conclusion && conclusion.overallIndicator} onChange={(e) => {
          conclusion.overallIndicator = e.target.value;
          setData(cloneData)
        }} />
        项指标，达标<input value={conclusion && conclusion.standardIndicators} onChange={(e) => {
          conclusion.standardIndicators= e.target.value;
          setData(cloneData)
        }} />
        项，未达标<input value={conclusion && conclusion.nonComplianceIndicators} onChange={(e) => {
          conclusion.nonComplianceIndicators = e.target.value;
          setData(cloneData)
        }} />项</div>
      <div className='table_title'>科室不达标指标分析改进:</div>
      <BaseTable columns={columns} dataSource={cloneData.list && cloneData.list.tableData} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
.edit_text input{
width:60px;
border: none;
text-align: center;
border-bottom: #000 solid 1px;
&:focus {
      background: ${(p) => p.theme.$mlc};
    }
}
  text {
    min-height: 200px !important;
    resize: none;
  }
  .cell-textArea {
    border: none;
    height:200px;
    text-align: start;
  }
  td {
    padding: 0 !important;
  }
  .table_title {
    font-size: 20px;
    color: #000;
  }
  .inp_textArea textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0;
    resize: none;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
`
