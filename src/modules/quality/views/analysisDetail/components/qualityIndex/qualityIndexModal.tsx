import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { Input } from 'src/vendors/antd'
export interface Props {
  sectionId: string
  data: any
  setData: any
}
export default function qualityIndexModal(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { value: {} })
  let value: any = cloneData &&cloneData.value ? cloneData.value : {}
  useEffect(() => { }, [])
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
      align: 'center',
      width: 60,
      render(text: string, record: any, index: number) {
        return (
          <div className='inp_textArea'>
            <Input
              className='cell-textArea'
              value={record.type || ''}
              onChange={(e) => {
                record.type = e.target.value
                setData(cloneData)
              }}
            />
          </div>
        )
      },
      
    },
    {
      title: '项目',
      dataIndex: 'item',
      align: 'center',
      width: 120,
      render(text: string, record: any, index: number) {
        return (
          <div className='inp_textArea'>
            <Input
              className='cell-textArea'
              value={record.item || ''}
              onChange={(e) => {
                record.item = e.target.value
                setData(cloneData)
              }}
            />
          </div>
        )
      },
    },
    {
      title: '达标值',
      align: 'center',
      children: [
        {
          title: '质量合格分',
          dataIndex: 'qualityPassScore',
          align: 'center',
          width:60,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
                <Input
                  className='cell-textArea'
                  value={record.qualityPassScore || ''}
                  onChange={(e) => {
                    record.qualityPassScore = e.target.value
                    setData(cloneData)
                  }}
                />
              </div>
            )
          },
        },
        {
          title: '合格率',
          dataIndex: 'standardPassRate',
          align: 'center',
          width:60,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
                <Input
                  className='cell-textArea'
                  value={record.standardPassRate || ''}
                  onChange={(e) => {
                    record.standardPassRate = e.target.value
                    setData(cloneData)
                  }}
                />
              </div>
            )
          },
        }
      ]
    },
    {
      title: '检查结果',
      align: 'center',
      children: [
        {
          title: '合格数/抽查数',
          align: 'center',
          width: 110,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea double' >
                <Input
                  className='cell-textArea'
                  value={record.qualifiedCount|| ''}
                  onChange={(e) => {
                    record.qualifiedCount= e.target.value
                    setData(cloneData)
                  }}
                />/
                <Input
                  className='cell-textArea'
                  value={record.checkCount|| ''}
                  onChange={(e) => {
                    record.checkCount= e.target.value
                    setData(cloneData)
                  }}
                />
              </div>
            )
          },
        },
        {
          title: '平均分',
          dataIndex: 'averageScore',
          align: 'center',
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
                <Input
                  className='cell-textArea'
                  value={record.averageScore || ''}
                  onChange={(e) => {
                    record.averageScore = e.target.value
                    setData(cloneData)
                  }}
                />
              </div>
            )
          },
        },
        {
          title: '合格率%',
          dataIndex: 'passRate',
          align: 'center',
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
                <Input
                  className='cell-textArea'
                  value={record.passRate || ''}
                  onChange={(e) => {
                    record.passRate = e.target.value
                    record.standardStatus=!record.passRate ? "" : Number(record.passRate) >= 90 ? "达标" : "未达标"
                    setData(cloneData)
                  }}
                />
              </div>
            )
          },
        },
        {
          title: '未达标',
          dataIndex: 'standardStatus',
          align: 'center',
          width:60,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
                <Input
                  className='cell-textArea'
                  value={!record.passRate? "" : Number(record.passRate)>=90? "达标" : "未达标"}
                  onChange={(e) => {
                    record.standardStatus = e.target.value
                    setData(cloneData)
                  }}
                />
              </div>
            )
          },
        }
      ]
    },
  ]

  return (
    <Wrapper>
      <BaseTable columns={columns} dataSource={(cloneData && cloneData.list|| [])}
      />
      <div className='table_Bottom'>
        <div>1、上报不良事件：<input value={value.reportAdverseEvents || ""}
          onChange={(e) => {
            value.reportAdverseEvents = e.target.value
            setData(cloneData)
          }} /></div>
        <div>2、事件类型及级别：<input value={value.eventTypeAndLevel || ""} onChange={(e) => {
          value.eventTypeAndLevel = e.target.value
          setData(cloneData)
        }} /></div>
      </div>

    </Wrapper>
  )
}
const Wrapper = styled.div`
  text {
    min-height: 200px !important;
    resize: none;
  }
  input {
    border: none;
  }
  .inp_textArea  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    align-items: center;
    border-radius: 0;
    resize: none;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
  .double input {
    width: 46%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    align-items: center;
    border-radius: 0;
    resize: none;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
  .table_Bottom input{
    align-items: center;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
`
