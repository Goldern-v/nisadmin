import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, message, DatePicker } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import moment from 'moment'
import { LastImproveItem, Report, TypeCompare, DeptItem } from '../../types'
import { workSummaryReportViewModal } from '../../WorkSummaryReportViewModal'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 本月片区人力资源调配弹窗(props: Props) {
  let { sectionId, setData, data } = props

  let cloneData: any = cloneJson(data || { list: [] })
  // let report: Report = workSummaryReportViewModal.getDataInAllData('report')
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'index',
      render(text: any, record: any, index: number) {
        return index + 1
      },
      width: 50,
      align: 'center'
    },
    {
      title: '姓名',
      key: '姓名',
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.empName}
            onChange={(e) => {
              record.empName = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 80
    },
    {
      title: '工号',
      key: '工号',
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.empNo}
            onChange={(e) => {
              record.empNo = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: `调配时间`,
      key: '调配时间',
      render(text: any, record: DeptItem, index: number) {
        return (
          <DatePicker
            className='cell-input'
            value={record.allocationDate ? moment(record.allocationDate) : undefined}
            onChange={(val) => {
              let newDate = val.format('YYYY-MM-DD')
              record.allocationDate = newDate || ''
              setData(cloneData)
            }}
          />
        )
      },
      width: 150
    },
    {
      title: `调出科室`,
      key: '调出科室',
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.transferOutWardName}
            onChange={(e) => {
              record.transferOutWardName = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 150
    },
    {
      title: `调入科室`,
      key: '调入科室',
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.transferInWardName}
            onChange={(e) => {
              record.transferInWardName = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 150
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
                cloneData.list.splice(index, 1)
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
    cloneData.list.push({
      id: '',
      empName: '',
      empNo: '',
      allocationDate: '',
      transferOutWardName: '',
      transferInWardName: ''
    })
    setData(cloneData)
  }
  useEffect(() => { }, [])
  return (
    <Wrapper>
      <div className='button-con'>
        <Button icon='plus' size='small' onClick={addItem}>
          添加
        </Button>
      </div>

      <BaseTable
        columns={columns}
        dataSource={cloneData.list || []}
        wrapperStyle={{
          padding: 0,
          paddingTop: 20
        }}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  text {
    min-height: 200px !important;
    resize: none;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }

  .cell-input input,
  input.cell-input {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    background: transparent;
    padding: 0 5px;
    border-radius: 0;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }

  .ant-calendar-picker{
    width: 100%;
    line-height: 29px;
    height: 29px;
    input{
      height: 29px;
    }
  }

  td {
    padding: 0 !important;
  }
  input {
    text-align: center;
  }
`

const HeadCon = styled.div``
