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

export default function 科室分布图表弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  const { deptList } = badEventReportModel
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
      title: '科室',
      render(text: any, record: DeptItem, idx: number) {
        return (
          <Select
            style={{ width: '100%' }}
            value={record.wardName}
            showSearch
            onSearch={(val: any) => {
              cloneData.list[idx].wardName = val
              setData(cloneData)
            }}
            filterOption={(input: string, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(val: any) => {
              cloneData.list[idx].wardName = val
              setData(cloneData)
            }}>
            {deptList.map((item: any, index: number) => <Select.Option key={index} value={item.name}>{item.name}</Select.Option>)}
          </Select>
        )
      },
      width: 100
    },
    {
      title: '事件数量',
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
      wardName: '',
      wardCode: '',
      happenNum: '',
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
