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
  let cloneData: any = cloneJson(data || { list: [] })

  const tableDate = [
    {
      name1: 'readingRate',
      value1: '',
      label: '总阅读率',
      name2: 'addReadingRate',
      value2: '',
      labe2: '新增阅读率'
    },
    {
      name1: 'totalPush',
      value1: '',
      label: '总推送量',
      name2: 'addPush',
      value2: '',
      labe2: '新增推送量'
    },
    {
      name1: 'totalReading',
      value1: '',
      label: '总阅读量',
      name2: 'addReading',
      value2: '',
      labe2: '新增阅读量'
    },
    {
      name1: '',
      value1: '',
      label: '总疑问量',
      name2: '',
      value2: '',
      labe2: '新增疑问量'
    },
    {
      name1: 'totalQuestion',
      value1: '',
      label: '总答疑量',
      name2: '',
      value2: 'addQuestion',
      labe2: '新增答疑量'
    },
    {
      name1: 'readingCoverRate',
      value1: '',
      label: '总阅读覆盖率',
      name2: 'addReadingCoverRate',
      value2: '',
      labe2: '新增阅读覆盖率'
    },
    {
      name1: 'totalInPatients',
      value1: '',
      label: '总在院患者数',
      name2: 'addInPatients',
      value2: '',
      labe2: '新增在院患者数'
    },
    {
      name1: 'totalReadNum',
      value1: '',
      label: '总阅读人数',
      name2: 'addReadNum',
      value2: '',
      labe2: '新增阅读人数'
    },
    {
      name1: '',
      value1: '',
      label: '总推送人数',
      name2: '',
      value2: '',
      labe2: '新增推送人数'
    },
    {
      name1: 'totalPushNum',
      value1: '',
      label: '总患者数',
      name2: 'addPushNum',
      value2: '',
      labe2: '新增患者数'
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '名称',
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.wardName}
            onChange={(e) => {
              record.wardName = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 200
    },
    {
      title: `数据`,
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.deductScore}
            onChange={(e) => {
              if (
                !Number(e.target.value) &&
                Number(e.target.value) !== 0 &&
                e.target.value[e.target.value.length - 1] !== '.'
              ) {
                return message.warning('只能输入数字')
              }

              record.deductScore = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: '名称',
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.wardName}
            onChange={(e) => {
              record.wardName = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 200
    },
    {
      title: `数据`,
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.deductScore}
            onChange={(e) => {
              if (
                !Number(e.target.value) &&
                Number(e.target.value) !== 0 &&
                e.target.value[e.target.value.length - 1] !== '.'
              ) {
                return message.warning('只能输入数字')
              }

              record.deductScore = e.target.value
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
