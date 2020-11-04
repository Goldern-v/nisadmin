import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, InputNumber } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, message, Select } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare, DeptItem } from '../../types'
import { badEventReportModel } from '../../BadEventReportModel'
import { DictItem } from 'src/services/api/CommonApiService'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 发生阶段及可能原因弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  const { eventTypeList } = badEventReportModel
  let report: Report = badEventReportModel.getDataInAllData('report')
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
      title: '事件类型',
      render(text: any, record: DeptItem, idx: number) {
        return (
          <Select
            style={{ width: '100%' }}
            value={record.eventType}
            showSearch
            onSearch={(val: any) => {
              cloneData.list[idx].eventType = val
              setData(cloneData)
            }}
            filterOption={(input: string, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(val: any) => {
              cloneData.list[idx].eventType = val
              setData(cloneData)
            }}>
            {eventTypeList.map((item: any, index: number) => <Select.Option key={index} value={item.name}>{item.name}</Select.Option>)}
          </Select>
        )
      },
      width: 200
    },
    {
      title: '数量',
      render(text: any, record: DeptItem, index: number) {
        return (
          <InputNumber
            style={{ width: '100%' }}
            value={record.happenNum}
            onChange={(val: any) => {
              record.happenNum = val
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: '发生阶段',
      render(text: any, record: DeptItem, index: number) {
        return (
          <Input.TextArea
            autosize={{ minRows: 1 }}
            value={record.happenStage}
            onChange={(e) => {
              record.happenStage = e.target.value
              setData(cloneData)
            }}
          />
        )
      }
    },
    {
      title: '可能原因',
      render(text: any, record: DeptItem, index: number) {
        return (
          <Input.TextArea
            autosize={{ minRows: 1 }}
            value={record.happenReason}
            onChange={(e) => {
              record.happenReason = e.target.value
              setData(cloneData)
            }}
          />
        )
      }
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
      reportId: report.id,
      happenReason: '',
      happenStage: '',
      happenNum: '',
      eventType: ''
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
