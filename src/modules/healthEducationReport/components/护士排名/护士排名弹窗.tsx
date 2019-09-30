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

export default function 护士排名弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  let list = cloneData.list

  // let deptList: any = []
  // for (let i = 0; i < list.length; i++) {
  //   if (!deptList.includes(list[i].empName)) {
  //     deptList.push(list[i].empName)
  //   }
  // }

  let tableData = []
  let list1 = list.filter((item: any) => item.type == '推送前十')
  let list2 = list.filter((item: any) => item.type == '阅读前十')

  for (let i = 0; i < 10; i++) {
    tableData.push({
      empName1: list1[i] ? list1[i].empName : '',
      empName2: list2[i] ? list2[i].empName : '',
      value1: list1[i] || {},
      value2: list2[i] || {}
    })
  }

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
      dataIndex: 'empName1',
      width: 120
    },
    {
      title: '数量',
      dataIndex: 'value1',
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
    },
    {
      title: '姓名',
      dataIndex: 'empName2',
      width: 120
    },
    {
      title: '数量',
      dataIndex: 'value2',
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
