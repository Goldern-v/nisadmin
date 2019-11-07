import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Select, ColumnProps, DatePicker, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'
import { patientVisitMonthModel } from '../../model/PatientVisitMonthModel'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import service from 'src/services/api'
import moment from 'moment'
import qs from 'qs'

import { patientVisitMonthService } from '../../api/PatientVisitMonthService'
// const commonApi = service.commonApiService

const Option = Select.Option

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default observer(function 月度随访表弹窗(props: Props) {
  let { location, history } = appStore
  let search = qs.parse(location.search.replace('?', ''))

  let { sectionId, setData, data } = props

  let cloneData: any = cloneJson(data || { list: [] })
  let report: Report = patientVisitMonthModel.getDataInAllData('report')


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
      title: '患者姓名',
      align: 'center',
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.patientName}
          autosize
          onChange={(e: any) => {
            record.patientName = e.target.value
            setData(cloneData)
          }} />
      },
      width: 80
    },
    {
      title: '疾病诊断',
      width: 120,
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.diagnosis}
          autosize
          onChange={(e: any) => {
            record.diagnosis = e.target.value
            setData(cloneData)
          }} />
      }
    },
    {
      title: `家庭住址`,
      width: 120,
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.address}
          autosize
          onChange={(e: any) => {
            record.address = e.target.value
            setData(cloneData)
          }} />
      }
    },
    {
      title: `联系方式`,
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.contactInformation}
          autosize
          onChange={(e: any) => {
            record.contactInformation = e.target.value
            setData(cloneData)
          }} />
      },
      width: 120
    },
    {
      title: `住院时间`,
      render(text: any, record: any, index: number) {
        return <DatePicker
          value={
            record.admissionDate ?
              moment(record.admissionDate) :
              undefined
          }
          allowClear={false}
          format="YYYY-MM-DD"
          onChange={(_moment: any) => {
            record.admissionDate = _moment.format('YYYY-MM-DD')
            setData(cloneData)
          }} />
      },
      width: 120
    },
    {
      title: `出院时间`,
      render(text: any, record: any, index: number) {
        return <DatePicker
          value={
            record.dischargeDate ?
              moment(record.dischargeDate) :
              undefined
          }
          allowClear={false}
          format="YYYY-MM-DD"
          onChange={(_moment: any) => {
            record.dischargeDate = _moment.format('YYYY-MM-DD')
            setData(cloneData)
          }} />
      },
      width: 120
    },
    {
      title: `家访内容`,
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.accessContent}
          autosize
          onChange={(e: any) => {
            record.accessContent = e.target.value
            setData(cloneData)
          }} />
      }
    },
    {
      title: `患者反馈意见`,
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.feedBack}
          autosize
          onChange={(e: any) => {
            record.feedBack = e.target.value
            setData(cloneData)
          }} />
      },
      width: 120
    },
    {
      title: `家访参加人员`,
      render(text: any, record: any, index: number) {
        return <Input.TextArea
          value={record.empNames}
          autosize
          onChange={(e: any) => {
            record.empNames = e.target.value
            setData(cloneData)
          }} />
      },
      width: 120
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
      patientName: '',
      indexNo: cloneData.list.length,
      diagnosis: '',
      address: '',
      briefCourseEvent: '',
      contactInformation: '',
      admissionDate: '',
      dischargeDate: '',
      accessContent: '',
      feedBack: '',
      empNames: '',
      month: search.month,
      year: search.year,
      reportCode: "patient_visit_quarter",
      wardCode: search.wardCode
    })

    setData(cloneData)
  }

  useEffect(() => {
    // patientVisitMonthService
    //   .getDict({
    //     groupCode: 'qc',
    //     dictCode: 'qc_bad_event_type'
    //   })
    //   .then((res: any) => {
    //     if (res.data) setEventTypeList(res.data)
    //   })

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
