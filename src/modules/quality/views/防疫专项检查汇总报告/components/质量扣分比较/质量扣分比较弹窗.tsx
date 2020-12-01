import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'
import { qualityAnalysisReportViewModal } from '../../ReportPoolViewModal'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 质量扣分比较弹窗(props: Props) {
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
      title: '项目',
      key: '项目',
      render(text: any, record: TypeCompare, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.itemTypeName}
            onChange={(e) => {
              record.itemTypeName = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 200
    },
    {
      title: `${report.indexInType}月（分）`,
      key: 'currentDeductScore',
      render(text: any, record: TypeCompare, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.currentDeductScore}
            onChange={(e) => {
              if (
                !Number(e.target.value) &&
                Number(e.target.value) !== 0 &&
                e.target.value[e.target.value.length - 1] !== '.'
              ) {
                return message.warning('只能输入数字')
              }
              record.currentDeductScore = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: `${report.indexInType - 1}月（分）`,
      key: 'lastDeductScore',
      render(text: any, record: TypeCompare, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.lastDeductScore}
            onChange={(e) => {
              if (
                !Number(e.target.value) &&
                Number(e.target.value) !== 0 &&
                e.target.value[e.target.value.length - 1] !== '.'
              ) {
                return message.warning('只能输入数字')
              }
              record.lastDeductScore = e.target.value
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
                cloneData.list.splice(index + 1, 1)
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
