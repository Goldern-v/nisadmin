import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'src/vendors/antd'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'

export interface Props {
  sectionId: string
  data: any
  setData: any
}
export default function qualityIndexModal(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { value: {} })
  let value: any = cloneData ? cloneData.value : {}
  console.log(value)
  useEffect(() => { }, [])
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      render(text: any, record: any, index: number) {
        return index + 1
      },
    },
    {
      title: '类型',
      dataIndex: 'lx',
      align: 'center'
    },
    {
      title: '项目',
      dataIndex: 'xm',
      align: 'center',
      width: 120
    },
    {
      title: '达标值',
      align: 'center',
      children: [
        {
          title: '质量合格分',
          dataIndex: 'zlhgf',
          align: 'center',
        },
        {
          title: '合格率',
          dataIndex: 'hgl',
          align: 'center',
        }
      ]
    },
    {
      title: '检查结果',
      dataIndex: 'jcjg',
      align: 'center',
      children: [
        {
          title: '合格数/抽查数',
          dataIndex: 'hgsccs',
          align: 'center',
        },
        {
          title: '平均分',
          dataIndex: 'pjf',
          align: 'center',
        },
        {
          title: '合格率%',
          dataIndex: 'hgl2',
          align: 'center',
        },
        {
          title: '未达标',
          dataIndex: 'wdb',
          align: 'center',
        }
      ]
    },
    {
      title: '操作',
      key: '操作',
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span
              onClick={(e) => {
                cloneData.list.tableData.splice(index, 1)
                setData(cloneData)
              }}
            >
              删除
            </span>
          </DoCon>
        )
      }
    }
  ]

  const addItem = () => {
    setData(cloneData)

  }
  return (
    <Wrapper>
      <Button icon='plus' size='small' onClick={addItem}>
        添加
      </Button>
      <BaseTable columns={columns} dataSource={(cloneData.list && cloneData.list.tableData || [])}

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
`
