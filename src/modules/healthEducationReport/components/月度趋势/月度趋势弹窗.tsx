import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare, DeptItem } from '../../types'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

function getSortValue(key: string) {
  const valueMap: any = {
    宣教分析: 10000000,
    患者增长分析: 20000000,
    制作课程趋势: 30000000,
    满意度回收分析: 40000000,

    推送量: 1000000,
    阅读量: 2000000,
    新增患者量: 1000000,
    阅读患者量: 2000000,
    制作课程趋势量: 1000000
  }
  return valueMap[key] || 0
}

export default function 月度趋势弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  let tableData = cloneData.list.sort((a: any, b: any) => {
    return (
      getSortValue(a.type) +
      getSortValue(a.itemType) +
      Number(a.time.replace('-', '')) -
      (getSortValue(b.type) + getSortValue(b.itemType) + Number(b.time.replace('-', '')))
    )
  })
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
      title: '模块',
      dataIndex: 'type',
      width: 100
    },
    {
      title: '名称',
      dataIndex: 'itemType',
      width: 100
    },
    {
      title: '月份',
      dataIndex: 'time',
      width: 100
    },
    {
      title: `数量`,
      render(text: any, record: any, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.typeValue}
            onChange={(e) => {
              record.typeValue = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
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
  useEffect(() => {}, [])
  return (
    <Wrapper>
      <div className='button-con'>
        <Button icon='plus' size='small' onClick={addItem}>
          添加
        </Button>
      </div>

      <BaseTable
        columns={columns}
        dataSource={tableData}
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
    width: calc(100% + 16px);
    height: 100%;
    border: 0;
    outline: none;
    background: transparent;
    padding: 0 5px;
    margin: 0 -8px;
    border-radius: 0;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }

  td {
    /* padding: 0 !important; */
  }
  input {
    text-align: center;
  }
`

const HeadCon = styled.div``
