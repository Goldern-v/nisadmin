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

export default function 数据分析弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })

  let dataMap = [
    {
      name: 'push',
      label: '推送量'
    },
    {
      name: 'reading',
      label: '阅读量'
    },
    {
      name: 'pushClass',
      label: '推送课程数'
    },
    {
      name: 'inPatients',
      label: '在院患者数'
    },
    {
      name: 'pushNum',
      label: '推送人数'
    },
    {
      name: 'readingNum',
      label: '阅读人数'
    }
  ]
  let tableData = [...cloneData.list].reverse()
  const columns: ColumnProps<any>[] = [
    {
      title: '日期',
      width: 120,
      align: 'center',
      dataIndex: 'showDate'
    },
    ...dataMap.map((item: any) => ({
      title: item.label,
      render(text: any, record: any, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record[item.name]}
            onChange={(e) => {
              record[item.name] = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 80
    }))
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
