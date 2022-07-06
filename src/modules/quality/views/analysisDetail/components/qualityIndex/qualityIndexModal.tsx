import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { cloneJson } from 'src/utils/json/clone'
import { Input, Select } from 'src/vendors/antd'

const { Option } = Select;
export interface Props {
  sectionId: string
  data: any
  setData: any
}
export default function qualityIndexModal(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { value: {},list: [] })
  cloneData.list = cloneData?.list.map((v: any) => v.averageScore !=null ? {...v, averageScore: Number(v.averageScore).toFixed(2)}:v)
  let value: any = cloneData && cloneData.value ? cloneData.value : {}
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
          width: 70,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
               <Input
                  className='cell-textArea'
                  type="number"
                  min={0}
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
          width: 70,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
               <Input
                  className='cell-textArea'
                  type="number"
                  min={0}
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
          width: 160,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea double' >
               <Input
                  className='cell-textArea'
                  type="number"
                  min={0}
                  placeholder='合格数'
                  value={record.qualifiedCount || ''}
                  onChange={(e) => {
                    let value=e.target.value.match(/^\d*(\.?\d{0,2})/g)?e.target.value.match(/^\d*(\.?\d{0,2})/g):[]
                    record.qualifiedCount = value&&value[0]
                    setData(cloneData)
                  }}
                />/
               <Input
                  className='cell-textArea'
                  type="number"
                  min={0}
                  placeholder='抽查数'
                  value={record.checkCount || ''}
                  onChange={(e) => {
                    let value=e.target.value.match(/^\d*(\.?\d{0,2})/g)?e.target.value.match(/^\d*(\.?\d{0,2})/g):[]
                    record.checkCount = value&&value[0]
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
          width: 70,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
               <Input
                  className='cell-textArea'
                  type="number"
                  step={0.01}
                  min={0}
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
          width: 70,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
               <Input
                  className='cell-textArea'
                  type="number"
                  min={0}
                  value={record.passRate || ''}
                  onChange={(e) => {
                    record.passRate = e.target.value
                    record.standardStatus = !record.passRate ? "" : Number(record.passRate) >= 90 ? "达标" : "未达标"
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
          width: 90,
          render(text: string, record: any, index: number) {
            return (
              <div className='inp_textArea'>
                <Select value={record.standardStatus} className="select"
                  onChange={(value: any) => {
                    record.standardStatus = value
                    setData(cloneData)
                  }}
                >
                  <Option value="达标">达标</Option>
                  <Option value="未达标">未达标</Option>
                </Select>
              </div>
            )
          },
        }
      ]
    },
  ]

  return (
    <Wrapper>
      <BaseTable columns={columns} dataSource={(cloneData && cloneData.list || [])}
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
  .border-input {
    border:1px solid rgb(228, 228, 228);
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
  .select {
    padding: 0;
    width: 100%;
    text-align: center;
  }
`
