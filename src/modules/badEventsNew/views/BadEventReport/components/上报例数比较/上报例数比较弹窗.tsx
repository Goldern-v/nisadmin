import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, InputNumber } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, message, Select } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare, DeptItem } from '../../types'
import { badEventReportModel } from '../../BadEventReportModel'
// import { EventTypeList } from './Table'
import { DictItem } from 'src/services/api/CommonApiService'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 上报例数比较弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  let report: Report = badEventReportModel.getDataInAllData('report')

  console.log(cloneData)

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
      title: '月份',
      dataIndex: 'timeSection',
      width: 50,
      align: 'center'
    },
    {
      title: '不良事件例次',
      className: "cell-input",
      dataIndex: 'happenNum',
      render(text: any, record: any, index: number) {
        return <InputNumber
          value={text}
          style={{ width: '100%' }}
          min={0}
          precision={0}
          onChange={(val) => {
            cloneData.list[index].happenNum = val
            setData(cloneData)
          }} />
      },
      align: 'center'
    },
    {
      title: '对比',
      className: "cell-input",
      dataIndex: 'contrastPercent',
      render(text: any, record: any, index: number) {
        return <Input
          value={text}
          onChange={(val) => {
            cloneData.list[index].contrastPercent = val
            setData(cloneData)
          }} />
      },
      align: 'center'
    }
  ]

  const addItem = () => {
    cloneData.list.push({
      id: '',
      itemCode: '',
      itemName: '',
      itemImproveDesc: '',
      contrastPercent: '',
      happenNum: '',
      timeSection: '',
    })
    setData(cloneData)
  }
  useEffect(() => { }, [])
  return (
    <Wrapper>
      {/* <div className='button-con'>
        <Button icon='plus' size='small' onClick={addItem}>
          添加
        </Button>
      </div> */}

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
  .cell-input {
    padding: 0 !important;
    outline: none;
    .ant-select-selection__rendered {
      margin: 0 !important;
      box-shadow: none;
    }
    .ant-select {
      width: 100%;
      box-shadow: none;
    }
    textarea {
      box-shadow: none;
      width: 100%;
      height: 100%;
      resize: none;
      border: 0;
      outline: none;
      border-radius: 0;
      padding: 4px !important;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
    }
  }
  .cell-input input,
  .cell-input .ant-select-selection,
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
