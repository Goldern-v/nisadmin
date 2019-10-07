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

export default function 科室排名弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  let list = cloneData.list

  let deptList: any = []
  for (let i = 0; i < list.length; i++) {
    if (!deptList.includes(list[i].wardName)) {
      deptList.push(list[i].wardName)
    }
  }

  let tableData = []

  for (let i = 0; i < deptList.length; i++) {
    tableData.push({
      wardName: deptList[i],
      推送量: list.find((item: any) => item.wardName == deptList[i] && item.type == '推送量'),
      阅读率: list.find((item: any) => item.wardName == deptList[i] && item.type == '阅读率'),
      新增患者: list.find((item: any) => item.wardName == deptList[i] && item.type == '新增患者')
    })
  }

  const dataIndexList = ['推送量', '阅读率', '新增患者']
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
      title: '科室',
      dataIndex: 'wardName',
      width: 120
    },
    ...dataIndexList.map((item: any) => ({
      title: item,
      dataIndex: item,
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={text.typeValue}
            onChange={(e) => {
              text.typeValue = e.target.value
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
    width: calc(100% + 16px);
    margin: 0 -8px;
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
    /* padding: 0 !important; */
  }
  input {
    text-align: center;
  }
`

const HeadCon = styled.div``
