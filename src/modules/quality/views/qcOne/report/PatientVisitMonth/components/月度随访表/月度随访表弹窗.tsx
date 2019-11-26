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

  let cloneData: any = cloneJson(data || { report: {} })

  const getVisiteRate = (record: any) => {
    let dischargeNumber = Number(record.dischargeNumber)
    if (isNaN(dischargeNumber)) dischargeNumber = 0

    let visitNumber = Number(record.visitNumber)
    if (isNaN(visitNumber)) visitNumber = 0

    // if (!dischargeNumber || visitNumber > dischargeNumber) return '100%'
    if (!dischargeNumber) return '100%'
    if (!visitNumber) return '0%'

    let rate = visitNumber / dischargeNumber
    rate = Math.round(rate * 10000) / 100
    return `${rate}%`
  }

  const handleChange = (val: any, key: string) => {
    let num = parseInt(val, 10)
    if (isNaN(num) || num < 0) num = 0

    let newReport = { ...cloneData.report }

    newReport[key] = num

    newReport.visitRate = getVisiteRate(newReport)

    setData({ report: newReport })
  }

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'dischargeNumber',
      title: '出院人数',
      render: (text: string, record: any) => {
        return <Input value={text} onChange={(e: any) => handleChange(e.target.value, 'dischargeNumber')} />
      }
    },
    {
      dataIndex: 'visitNumber',
      title: '出院人数',
      render: (text: string, record: any) => {
        return <Input value={text} onChange={(e: any) => handleChange(e.target.value, 'visitNumber')} />
      }
    },
    {
      dataIndex: 'visitRate',
      align: 'center',
      title: '回访率'
    }
  ]

  return (
    <Wrapper>
      <BaseTable
        surplusHeight={400}
        columns={columns}
        dataSource={[cloneData.report]}
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
