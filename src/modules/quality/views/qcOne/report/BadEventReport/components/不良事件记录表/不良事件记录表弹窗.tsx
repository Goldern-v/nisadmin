import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Select, ColumnProps, AutoComplete, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'
import { badEventReportEditModel } from '../../model/BadEventReportEditModel'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import service from 'src/services/api'
import qs from 'qs'

import { badEventReportService } from './../../api/BadEventReportService'
// const commonApi = service.commonApiService

const Option = Select.Option

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default observer(function 星级考核表弹窗(props: Props) {
  let { location, history } = appStore
  let search = qs.parse(location.search.replace('?', ''))

  let { sectionId, setData, data } = props

  let cloneData: any = cloneJson(data || { list: [] })
  let report: Report = badEventReportEditModel.getDataInAllData('report')


  const [eventTypeList, setEventTypeList] = useState([] as any[])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      render(text: any, record: any, index: number) {
        return index + 1
      },
      width: 50,
      align: 'center'
    },
    {
      title: '当事人',
      align: 'center',
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.eventEmpNames}
          autosize
          onChange={(e: any) => {
            record.eventEmpNames = e.target.value
            setData(cloneData)
          }} />
      },
      width: 120
    },
    {
      title: '事件种类',
      width: 180,
      render(text: any, record: any, index: number) {
        return <Select
          style={{ width: '100%' }}
          value={record.eventType}
          onChange={(eventType: any) => {
            record.eventType = eventType
            let target = eventTypeList.find((item: any) => item.itemCode == eventType)
            if (target) record.eventTypeName = target.itemName
            setData(cloneData)
          }}>
          {eventTypeList.map((item: any, idx: number) =>
            <Option value={item.itemCode} key={idx}>{item.itemName}</Option>
          )}
        </Select>
      }
    },
    {
      title: `事件简要经过`,
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.briefCourseEvent}
          autosize
          onChange={(e: any) => {
            record.briefCourseEvent = e.target.value
            setData(cloneData)
          }} />
      }
    },
    {
      title: `结果`,
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.result}
          autosize
          onChange={(e: any) => {
            record.result = e.target.value
            setData(cloneData)
          }} />
      },
      width: 180
    },
    {
      title: '操作',
      key: '操作',
      width: 60,
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
      eventEmpNames: '',
      indexNo: cloneData.list.length,
      eventTypeName: '',
      eventType: '',
      briefCourseEvent: '',
      result: '',
      month: search.month,
      year: search.year,
      reportCode: "bad_event",
      wardCode: search.wardCode
    })

    setData(cloneData)
  }

  useEffect(() => {
    badEventReportService
      .getDict({
        groupCode: 'qc',
        dictCode: 'qc_bad_event_type'
      })
      .then((res: any) => {
        if (res.data) setEventTypeList(res.data.list || [])
      })

  }, [])

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
})

const defaultInputStyle = `
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
`

const activeInputStyle = `
  outline: none;
  border: none;
  box-shadow: none;
`

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
    padding: 0 !important;
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
  .ant-input{
      resize: none;
      word-break: break-all;
      ${defaultInputStyle}
      :hover{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
      :focus{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
    }
    .ant-select-selection{
      ${defaultInputStyle}
    }
  .ant-select-selection{
      ${defaultInputStyle}
    }

    .ant-select-open,.ant-select-focused{
      .ant-select-selection{
        ${activeInputStyle}
        &:focus{
          ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
        }
      }
    }
`

const HeadCon = styled.div``
