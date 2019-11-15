import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare, DeptItem } from '../../types'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 人力资源调配弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  let report: Report = qualityAnalysisReportViewModal.getDataInAllData('report')
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
      title: '调配方式',
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.typeName}
            onChange={(e) => {
              record.typeName = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: `姓名`,
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
      width: 100
    },
    {
      title: `调往科室`,
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.anotherWardName}
            onChange={(e) => {
              record.anotherWardName = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: `开始时间`,
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.duration}
            onChange={(e) => {
              record.duration = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: `事由`,
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.remark}
            onChange={(e) => {
              record.remark = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
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
      itemCode: '',
      itemName: '',
      itemImproveDesc: '',
      result: ''
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
        dataSource={(cloneData.list || []).filter((item: TypeCompare) => item.itemTypeName != '总扣分')}
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

  td {
    padding: 0 !important;
  }
  input {
    text-align: center;
  }
`

const HeadCon = styled.div``
