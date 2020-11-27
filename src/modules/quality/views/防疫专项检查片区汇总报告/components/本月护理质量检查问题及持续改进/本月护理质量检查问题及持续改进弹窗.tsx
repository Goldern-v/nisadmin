import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare, DeptItem } from '../../types'
import { workSummaryReportViewModal } from '../../ReportModal'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 本月护理质量检查问题及持续改进弹窗(props: Props) {
  let { sectionId, setData, data } = props

  let cloneData: any = cloneJson(data || { list: [] })
  let report: Report = workSummaryReportViewModal.getDataInAllData('report')
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
      key: '科室',
      render(text: any, record: DeptItem, index: number) {
        return (
          <Input
            className='cell-input'
            value={record.wardName}
            onChange={(e) => {
              record.wardName = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 150
    },
    {
      title: '问题',
      key: '问题',
      render(text: any, record: DeptItem, index: number) {
        return (
          <Input.TextArea
            autosize
            className='cell-input'
            value={record.content}
            onChange={(e) => {
              record.content = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 200
    },
    {
      title: `持续改进`,
      key: '持续改进',
      render(text: any, record: DeptItem, index: number) {
        return (
          <Input.TextArea
            autosize
            className='cell-input'
            value={record.improveContent}
            onChange={(e) => {
              record.improveContent = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 150
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
      wardName: '',
      content: '',
      improveContent: ''
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
        surplusHeight={400}
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

  td {
    padding: 0!important;
  }
  textarea{
    resize: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    :hover{
      outline: none;
      border: none;
      background: none;
      box-shadow: none;
    }
    :focus{
      outline: none;
      border: none;
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }
  input {
    text-align: center;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    :hover{
      outline: none;
      border: none;
      background: none;
      box-shadow: none;
    }
    :focus{
      outline: none;
      border: none;
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }
`

const HeadCon = styled.div``
