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

export default function 数据概况弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { obj: {} })

  const tableDate = [
    {
      name1: 'readingRate',
      value1: cloneData.obj.readingRate,
      label1: '总阅读率',
      name2: 'addReadingRate',
      value2: cloneData.obj.addReadingRate,
      label2: '新增阅读率'
    },
    {
      name1: 'totalPush',
      value1: cloneData.obj.totalPush,
      label1: '总推送量',
      name2: 'addPush',
      value2: cloneData.obj.addPush,
      label2: '新增推送量'
    },
    {
      name1: 'totalReading',
      value1: cloneData.obj.totalReading,
      label1: '总阅读量',
      name2: 'addReading',
      value2: cloneData.obj.addReading,
      label2: '新增阅读量'
    },
    {
      name1: 'totalQuestion',
      value1: cloneData.obj.totalQuestion,
      label1: '总疑问量',
      name2: 'addQuestion',
      value2: cloneData.obj.addQuestion,
      label2: '新增疑问量'
    },
    {
      name1: 'totalAnswer',
      value1: cloneData.obj.totalAnswer,
      label1: '总答疑量',
      name2: 'addAnswer',
      value2: cloneData.obj.addAnswer,
      label2: '新增答疑量'
    },
    {
      name1: 'readingCoverRate',
      value1: cloneData.obj.readingCoverRate,
      label1: '总阅读覆盖率',
      name2: 'addReadingCoverRate',
      value2: cloneData.obj.addReadingCoverRate,
      label2: '新增阅读覆盖率'
    },
    {
      name1: 'totalInPatients',
      value1: cloneData.obj.totalInPatients,
      label1: '总在院患者数',
      name2: 'addInPatients',
      value2: cloneData.obj.addInPatients,
      label2: '新增在院患者数'
    },
    {
      name1: 'totalReadNum',
      value1: cloneData.obj.totalReadNum,
      label1: '总阅读人数',
      name2: 'addReadNum',
      value2: cloneData.obj.addReadNum,
      label2: '新增阅读人数'
    },
    {
      name1: 'totalPushNum',
      value1: cloneData.obj.totalPushNum,
      label1: '总推送人数',
      name2: 'addPushNum',
      value2: cloneData.obj.addPushNum,
      label2: '新增推送人数'
    },
    {
      name1: 'totalPatientsNum',
      value1: cloneData.obj.totalPatientsNum,
      label1: '总患者数',
      name2: 'addPatientsNum',
      value2: cloneData.obj.addPatientsNum,
      label2: '新增患者数'
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '名称',
      dataIndex: 'label1',
      width: 100
    },
    {
      title: `数据`,
      render(text: any, record: any, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.value1}
            onChange={(e) => {
              cloneData.obj[record.name1] = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: '名称',
      dataIndex: 'label2',
      width: 100
    },
    {
      title: `数据`,
      render(text: any, record: any, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.value2}
            onChange={(e) => {
              cloneData.obj[record.name2] = e.target.value
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
        dataSource={tableDate}
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
