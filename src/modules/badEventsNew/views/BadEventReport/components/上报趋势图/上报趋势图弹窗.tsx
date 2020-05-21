import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
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

export default function 上报例数比较弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
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
      title: '时间',
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.eventDate}
            onChange={(e) => {
              record.eventDate = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: `当事人`,
      render(text: any, record: DeptItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.eventEmpNames}
            onChange={(e) => {
              record.eventEmpNames = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: `事情种类`,
      className: 'cell-input',
      render(text: any, record: DeptItem, index: number) {
        return (
          <Select
            value={record.eventType}
            onChange={(value: any) => {
              record.eventType = value
              setData(cloneData)
            }}
          >

          </Select>
          // <input
          //   type='text'
          //   className='cell-input'
          //   value={record.eventType}
          //   onChange={(e) => {
          //     record.eventType = e.target.value
          //     setData(cloneData)
          //   }}
          // />
        )
      },
      width: 100
    },
    {
      title: `事情简要经过`,
      className: 'cell-input',
      render(text: any, record: DeptItem, index: number) {
        return (
          <Input.TextArea
            autosize={true}
            className='cell-input'
            value={record.briefCourseEvent}
            onChange={(e) => {
              record.briefCourseEvent = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 100
    },
    {
      title: `后果`,
      className: 'cell-input',
      render(text: any, record: DeptItem, index: number) {
        return (
          <Input.TextArea
            autosize={true}
            className='cell-input'
            value={record.result}
            onChange={(e) => {
              record.result = e.target.value
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
